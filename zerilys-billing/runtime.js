import crypto from "node:crypto";
export const PRICES={
solo_monthly:{plan:"solo",id:"price_1UbSA7PE44VJyRBnrLHv3Ukq"},
solo_annual:{plan:"solo",id:"price_1UbSA9PE44VJyRBn1j8IfIFy"},
team_monthly:{plan:"team",id:"price_1UbSACPE44VJyRBnl6QuhRQN"},
team_annual:{plan:"team",id:"price_1UbSAEPE44VJyRBnqFClUzFA"},
business_monthly:{plan:"business",id:"price_1UbSAIPE44VJyRBnCJ61goKT"},
business_annual:{plan:"business",id:"price_1UbSAJPE44VJyRBn6pF5H8Ab"}
};
export const configured=()=>!!(process.env.STRIPE_SECRET_KEY&&process.env.STRIPE_WEBHOOK_SECRET&&process.env.ZERIHLINK_PUBLIC_URL);
async function stripe(path,method="GET",params={},key){
 const secret=process.env.STRIPE_SECRET_KEY;if(!secret)throw Error("BILLING_NOT_CONFIGURED");
 const headers={Authorization:"Bearer "+secret};const body=method==="GET"?undefined:new URLSearchParams(params).toString();
 if(body)headers["Content-Type"]="application/x-www-form-urlencoded";if(key)headers["Idempotency-Key"]=key;
 const r=await fetch("https://api.stripe.com/v1/"+path,{method,headers,body,signal:AbortSignal.timeout(15000)});
 const d=await r.json().catch(()=>({}));if(!r.ok){const e=Error(d.error?.code||"STRIPE_REQUEST_FAILED");e.status=r.status;throw e;}return d;
}
function origin(){const u=new URL(process.env.ZERIHLINK_PUBLIC_URL||"");if(process.env.NODE_ENV==="production"&&u.protocol!=="https:")throw Error("BILLING_PUBLIC_URL_MISSING");return u.origin;}
export async function createCheckoutSession(user,key){
 if(user?.accountType!=="company")throw Error("COMPANY_ACCOUNT_REQUIRED");const p=PRICES[key];if(!p)throw Error("INVALID_PRICE_SELECTION");
 if(["active","trialing"].includes(user.billing?.status))throw Error("SUBSCRIPTION_ALREADY_ACTIVE");if(!configured())throw Error("BILLING_NOT_CONFIGURED");
 const base=origin(),d={mode:"subscription","line_items[0][price]":p.id,"line_items[0][quantity]":"1",success_url:base+"/?billing=success&session_id={CHECKOUT_SESSION_ID}",cancel_url:base+"/?billing=cancelled",client_reference_id:user.id,customer_email:user.email,billing_address_collection:"required","tax_id_collection[enabled]":"true","automatic_tax[enabled]":"true","subscription_data[metadata][zerilys_user_id]":user.id,"subscription_data[metadata][zerilys_plan]":p.plan,"metadata[zerilys_user_id]":user.id,"metadata[zerilys_price_key]":key};
 if(user.billing?.customerId){delete d.customer_email;d.customer=user.billing.customerId;}
 return stripe("checkout/sessions","POST",d,"zerilys-"+user.id+"-"+key+"-"+Math.floor(Date.now()/600000));
}
export async function createPortalSession(user){
 if(user?.accountType!=="company")throw Error("COMPANY_ACCOUNT_REQUIRED");if(!configured())throw Error("BILLING_NOT_CONFIGURED");
 if(!user.billing?.customerId)throw Error("BILLING_CUSTOMER_NOT_FOUND");
 return stripe("billing_portal/sessions","POST",{customer:user.billing.customerId,return_url:origin()+"/?billing=manage"});
}
export function verifyStripeSignature(raw,header,secret,now=Date.now()){
 if(!Buffer.isBuffer(raw)||!header||!secret)return false;const parts=header.split(",").map(x=>x.split("=")),t=parts.find(x=>x[0]==="t")?.[1],v=parts.filter(x=>x[0]==="v1").map(x=>x[1]);
 if(!t||!/^\d+$/.test(t)||Math.abs(now/1000-Number(t))>300)return false;
 const expected=crypto.createHmac("sha256",secret).update(t+".").update(raw).digest();
 return v.some(x=>{if(!/^[a-f0-9]{64}$/i.test(x))return false;const b=Buffer.from(x,"hex");return b.length===expected.length&&crypto.timingSafeEqual(b,expected);});
}
function userFor(store,s){const id=s?.metadata?.zerilys_user_id;if(id)return store.state.users.find(u=>u.id===id&&u.accountType==="company");const cid=typeof s?.customer==="string"?s.customer:s?.customer?.id;return store.state.users.find(u=>u.accountType==="company"&&u.billing?.customerId===cid);}
function sync(u,s){if(!u||!s?.id)return;const id=s.items?.data?.[0]?.price?.id,entry=Object.entries(PRICES).find(([,p])=>p.id===id);u.billing={...(u.billing||{}),provider:"stripe",customerId:typeof s.customer==="string"?s.customer:s.customer?.id,subscriptionId:s.id,priceId:id||null,priceKey:entry?.[0]||null,plan:s.metadata?.zerilys_plan||entry?.[1]?.plan||null,status:s.status||"unknown",currentPeriodEnd:s.current_period_end?new Date(s.current_period_end*1000).toISOString():null,cancelAtPeriodEnd:!!s.cancel_at_period_end,updatedAt:new Date().toISOString()};}
export async function processStripeEvent(e,store){
 store.state.billingEvents??=[];if(store.state.billingEvents.some(x=>x.id===e.id))return;const o=e.data?.object;
 if(e.type==="checkout.session.completed"||e.type==="checkout.session.async_payment_succeeded"){
  const u=store.state.users.find(x=>x.id===(o.client_reference_id||o.metadata?.zerilys_user_id)&&x.accountType==="company");
  if(u){u.billing??={};u.billing.customerId=typeof o.customer==="string"?o.customer:o.customer?.id;delete u.billing.pendingCheckout;if(o.subscription){const id=typeof o.subscription==="string"?o.subscription:o.subscription.id;sync(u,await stripe("subscriptions/"+encodeURIComponent(id)));}}
 }else if(e.type==="checkout.session.expired"){
  const u=store.state.users.find(x=>x.id===(o.client_reference_id||o.metadata?.zerilys_user_id)&&x.accountType==="company");if(u)delete u.billing?.pendingCheckout;
 }else if(["customer.subscription.created","customer.subscription.updated","customer.subscription.deleted"].includes(e.type)){
  const u=userFor(store,o);if(u){sync(u,o);delete u.billing.pendingCheckout;}
 }else if(e.type==="invoice.paid"||e.type==="invoice.payment_failed"){
  const ref=o.subscription||o.parent?.subscription_details?.subscription,id=typeof ref==="string"?ref:ref?.id;if(id){const s=await stripe("subscriptions/"+encodeURIComponent(id)),u=userFor(store,s);if(u)sync(u,s);}
 }
 store.state.billingEvents.push({id:e.id,type:e.type,processedAt:new Date().toISOString()});if(store.state.billingEvents.length>5000)store.state.billingEvents.splice(0,store.state.billingEvents.length-5000);await store.save();
}
export const summary=u=>({plan:u?.billing?.plan||null,status:u?.billing?.status||"inactive",currentPeriodEnd:u?.billing?.currentPeriodEnd||null,cancelAtPeriodEnd:!!u?.billing?.cancelAtPeriodEnd,canManage:!!u?.billing?.customerId});
export const active=u=>u?.accountType==="company"&&["active","trialing"].includes(u.billing?.status);
