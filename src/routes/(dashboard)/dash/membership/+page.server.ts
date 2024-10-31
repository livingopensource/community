import { Subscription } from '$lib/server/databases/pg/memberships.js';
import { env } from '$env/dynamic/private'
import crypto from 'crypto'
import {formatDate} from '$lib/utils';
import { XMLParser } from 'fast-xml-parser';
import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
    const data = await parent();
    const subscriptions = await Subscription.getUserActiveSubscriptions(data.user.User.id)
  return {
    subscriptions: subscriptions
  };
}

export const actions = {
  default: async({request}) => {
    let transactionPaymentRequestToken = "1234";
    const amount: number = 1;
    const data = await request.formData()
    const type = data.get("title")
    const createToken = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
      <CompanyToken>${env.DPO_TOKEN}</CompanyToken>
      <Request>createToken</Request>
      <Transaction>
        <PaymentAmount>${amount}</PaymentAmount>
        <PaymentCurrency>ZMW</PaymentCurrency>
        <CompanyRef>${crypto.randomUUID()}</CompanyRef>
        <RedirectURL>${env.DPO_REDIRECT_URL}</RedirectURL>
        <BackURL>${env.DPO_BACK_URL}</BackURL>
        <CompanyRefUnique>1</CompanyRefUnique>
        <PTL>5</PTL>
      </Transaction>
      <Services>
        <Service>
          <ServiceType>${env.DPO_SERVICE_ID}</ServiceType>
          <ServiceDescription>Membership subscription</ServiceDescription>
          <ServiceDate>${formatDate(new Date())}</ServiceDate>
        </Service>
      </Services>
    </API3G>`;

    try {
      const parser = new XMLParser()
      const createTokenRequest = await fetch(`${env.DPO_API}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
          "Accept": "application/xml"
        },
        body: createToken
      })

      if (createTokenRequest.status != 200) {
        return {
          status: createTokenRequest.status,
          body: {
              message: 'Token creation failed for membership of type '+type
          }
        }
      }

      const xmlTransaction = await createTokenRequest.text();
      const tokenPayload = parser.parse(xmlTransaction)
      console.log(tokenPayload)

      if (tokenPayload.API3G.Result != "000") {
        return {
          status: createTokenRequest.status,
          body: {
              message: 'Transaction not initiated, reason: '+tokenPayload.API3G.ResultExplanation
          }
        }
      }

      const verifyTransactionToken = `
      <?xml version="1.0" encoding="utf-8"?>
      <API3G>
        <CompanyToken>${env.DPO_TOKEN}</CompanyToken>
        <Request>verifyToken</Request>
        <TransactionToken>${tokenPayload.API3G.TransToken}</TransactionToken>
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
        return {
          status: createTokenRequest.status,
          body: {
              message: 'Token validation failed for membership of type '+type
          }
        }
      }

      const verifyToken = await verifyTokenRequest.text();
      const verifyTokenPayload = parser.parse(verifyToken)
      console.log(verifyTokenPayload)

      if (verifyTokenPayload.API3G.Result != "900") {
        return {
          status: createTokenRequest.status,
          body: {
              message: 'Transaction not initiated, reason: '+verifyTokenPayload.API3G.ResultExplanation
          }
        }
      }

      transactionPaymentRequestToken = tokenPayload.API3G.TransToken

      } catch(err) {
        console.log(err)
        return {
          status: 400,
          body: {
              message: 'Token creation failed for membership of '+type
          }
        }
      }

      redirect(302, `${env.DPO_HOSTED_PAGE}?ID=${transactionPaymentRequestToken}`)

  }
}