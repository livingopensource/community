import { XMLParser } from "fast-xml-parser";
import { Subscription } from "../databases/pg/memberships";
import { env } from "$env/dynamic/private";

async function processPayments() {
    const subscriptions = await Subscription.getAllPendingSubscriptions()
    for (const subscription of subscriptions) {
        const txnId = subscription.toJSON().externalTransactionId
        if (txnId == null) {
            await subscription.update({
                status: 'failed'
            })
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
                await subscription.update({
                    status: 'succeeded'
                })
            } else if(verifyTokenPayload.API3G.Result == "801" || verifyTokenPayload.API3G.Result == "802" || verifyTokenPayload.API3G.Result == "803"
                || verifyTokenPayload.API3G.Result == "804" || verifyTokenPayload.API3G.Result == "901" || verifyTokenPayload.API3G.Result == "902" || verifyTokenPayload.API3G.Result == "903"
                || verifyTokenPayload.API3G.Result == "804" || verifyTokenPayload.API3G.Result == "950"
            ) {
                await subscription.update({
                    status: 'failed'
                })
            }else {
                continue
            }
        }
    }
}

processPayments();