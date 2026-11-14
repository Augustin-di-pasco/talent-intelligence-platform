import test from "node:test";
import assert from "node:assert/strict";
import {createCheckoutSession,createPortalSession,processStripeEvent,PRICES,active} from "../src/billing.js";
const envKeys=["STRIPE_BILLING_ENABLED","STRIPE_SECRET_KEY","STRIPE_WEBHOOK_SECRET","ZERIHLINK_PUBLIC_URL"];
async function withStripeMock(fetcher,fn){
 const previous=Object.fromEntries(envKeys.map(key=>[key,process.env[key]])),oldFetch=globalThis.fetch;
 process.env.STRIPE_BILLING_ENABLED="true";process.env.STRIPE_SECRET_KEY="sk_test_local_only";process.env.STRIPE_WEBHOOK_SECRET="whsec_local_only";process.env.ZERIHLINK_PUBLIC_URL="https://zerilys.example";
 globalThis.fetch=fetcher;
 try{return await fn();}finally{globalThis.fetch=oldFetch;for(const key of envKeys){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}}
}
test("company checkout creates a recurring Stripe session with tax, customer and return settings",async()=>{
 let request;
 await withStripeMock(async(url,options)=>{request={url,options};return new Response(JSON.stringify({id:"cs_test_123",url:"https://checkout.stripe.com/c/pay/cs_test_123"}),{status:200,headers:{"Content-Type":"application/json"}});},async()=>{
  const session=await createCheckoutSession({id:"company-42",accountType:"company",email:"billing@example.test"},"team_annual");
  assert.equal(session.id,"cs_test_123");assert.equal(session.url,"https://checkout.stripe.com/c/pay/cs_test_123");
 });
 assert.equal(request.url,"https://api.stripe.com/v1/checkout/sessions");
 assert.equal(request.options.method,"POST");
 assert.equal(request.options.headers.Authorization,"Bearer sk_test_local_only");
 const body=new URLSearchParams(request.options.body);
 assert.equal(body.get("mode"),"subscription");
 assert.equal(body.get("line_items[0][price]"),PRICES.team_annual.id);
 assert.equal(body.get("line_items[0][quantity]"),"1");
 assert.equal(body.get("customer_email"),"billing@example.test");
 assert.equal(body.get("success_url"),"https://zerilys.example/?billing=success&session_id={CHECKOUT_SESSION_ID}");
 assert.equal(body.get("cancel_url"),"https://zerilys.example/?billing=cancelled");
 assert.equal(body.get("automatic_tax[enabled]"),"true");
 assert.equal(body.get("tax_id_collection[enabled]"),"true");
 assert.equal(body.get("billing_address_collection"),"required");
 assert.equal(body.get("subscription_data[metadata][zerilys_user_id]"),"company-42");
 assert.equal(body.get("subscription_data[metadata][zerilys_plan]"),"team");
 assert.match(request.options.headers["Idempotency-Key"],/^zerilys-company-42-team_annual-/);
});
test("existing Stripe customers are reused for the next checkout",async()=>{
 let body;
 await withStripeMock(async(url,options)=>{body=new URLSearchParams(options.body);return new Response(JSON.stringify({id:"cs_test_existing",url:"https://checkout.stripe.com/existing"}),{status:200});},async()=>{
  await createCheckoutSession({id:"company-43",accountType:"company",email:"new@example.test",billing:{customerId:"cus_existing"} },"solo_monthly");
 });
 assert.equal(body.get("customer"),"cus_existing");
 assert.equal(body.has("customer_email"),false);
});
test("company billing portal opens the existing customer portal with the ZERILYS return URL",async()=>{
 let request;
 await withStripeMock(async(url,options)=>{request={url,options};return new Response(JSON.stringify({url:"https://billing.stripe.com/p/session"}),{status:200});},async()=>{
  const portal=await createPortalSession({accountType:"company",billing:{customerId:"cus_portal"}});
  assert.equal(portal.url,"https://billing.stripe.com/p/session");
 });
 assert.equal(request.url,"https://api.stripe.com/v1/billing_portal/sessions");
 const body=new URLSearchParams(request.options.body);
 assert.equal(body.get("customer"),"cus_portal");
 assert.equal(body.get("return_url"),"https://zerilys.example/?billing=manage");
});
test("completed Stripe Checkout webhook activates the matching company idempotently",async()=>{
 const user={id:"company-44",accountType:"company",billing:{pendingCheckout:{priceKey:"solo_monthly"}}};
 const store={state:{users:[user],billingEvents:[]},async save(){this.saved=(this.saved||0)+1;}};
 await withStripeMock(async(url)=>{assert.equal(url,"https://api.stripe.com/v1/subscriptions/sub_completed");return new Response(JSON.stringify({id:"sub_completed",customer:"cus_completed",status:"active",metadata:{zerilys_user_id:user.id,zerilys_plan:"solo"},current_period_end:1893456000,items:{data:[{price:{id:PRICES.solo_monthly.id}}]}}),{status:200});},async()=>{
  const event={id:"evt_checkout_completed",type:"checkout.session.completed",data:{object:{id:"cs_completed",client_reference_id:user.id,customer:"cus_completed",subscription:"sub_completed",metadata:{zerilys_user_id:user.id}}}};
  await processStripeEvent(event,store);
  assert.equal(active(user),true);
  assert.equal(user.billing.customerId,"cus_completed");
  assert.equal(user.billing.subscriptionId,"sub_completed");
  assert.equal(user.billing.plan,"solo");
  assert.equal(user.billing.pendingCheckout,undefined);
  await processStripeEvent(event,store);
 });
 assert.equal(store.state.billingEvents.length,1);
});
