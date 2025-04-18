import { XMLParser } from "fast-xml-parser";
import { env } from "$env/dynamic/private";
import { pendingSubscriptions, updateSubscriptionStatus } from "../databases/subscriptions";

export async function processPayments() {
    const subscriptions = await pendingSubscriptions()
    console.log(`Found ${subscriptions.length} pending transactions`)
    for (const subscription of subscriptions) {
        const txnId = subscription.externalTransactionId
        if (txnId == null) {
            await updateSubscriptionStatus(subscription.id, 'failed')
        } else {
            const verifyTransactionToken = `
            <?xml version="1.0" encoding="utf-8"?>
            <API3G>
              <CompanyToken>${env.DPO_TOKEN}</CompanyToken>
              <Request>verifyToken</Request>
              <TransactionToken>${txnId}</TransactionToken>
            </API3G>
            `;

            const verifyTokenRequest = await fetch(`${env.DPO_API}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/xml",
                "Accept": "application/xml"
              },
              body: verifyTransactionToken
            })
        
            if (verifyTokenRequest.status != 200) {
              console.log(verifyTokenRequest.status)
              continue
            }
        
            const parser = new XMLParser()
            const verifyToken = await verifyTokenRequest.text();
            const verifyTokenPayload = parser.parse(verifyToken)
            console.log(verifyTokenPayload)
            if (verifyTokenPayload.API3G.Result == "000") {
                await updateSubscriptionStatus(subscription.id, 'succeeded')
            } else if(verifyTokenPayload.API3G.Result == "801" || verifyTokenPayload.API3G.Result == "802" || verifyTokenPayload.API3G.Result == "803"
                || verifyTokenPayload.API3G.Result == "804" || verifyTokenPayload.API3G.Result == "901" || verifyTokenPayload.API3G.Result == "902" || verifyTokenPayload.API3G.Result == "903"
                || verifyTokenPayload.API3G.Result == "804" || verifyTokenPayload.API3G.Result == "950"
            ) {
                await updateSubscriptionStatus(subscription.id, 'failed')
            }else {
                continue
            }
        }
    }
}

processPayments();