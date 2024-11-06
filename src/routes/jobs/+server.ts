import { env } from "$env/dynamic/private";
import { Subscription } from "$lib/server/databases/pg/memberships";
import { redirect } from "@sveltejs/kit";
import { XMLParser } from 'fast-xml-parser';

export async function GET() {
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
                    status: 'succeeded',
                    paid: true,
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
    redirect(307, '/dash/membership')
}


export async function POST() {
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
              <Request>verifyToken</Request>arthur@kalikiti.net
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
                    status: 'failed',
                    paid: true,
                })
            }else {
                continue
            }
        }
    }
    redirect(307, '/dash/membership')
}