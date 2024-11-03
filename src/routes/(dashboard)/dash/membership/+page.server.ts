import { Membership, Subscription } from '$lib/server/databases/pg/memberships';
import { env } from '$env/dynamic/private'
import crypto from 'crypto'
import {formatDate} from '$lib/utils';
import { XMLParser } from 'fast-xml-parser';
import { redirect } from '@sveltejs/kit';
import { Session } from '$lib/server/databases/pg/users.js';

export async function load({ parent }) {
    const data = await parent();
    const subscriptions = await Subscription.getUserActiveSubscriptions(data.user.User.id)
    const memberships = await Membership.getAllMemberships()
    const userSubscriptions = await Subscription.getUserSubscriptions(data.user.User.id)
  return {
    subscriptions: subscriptions.map(s => s.toJSON()),
    memberships: memberships.map(m => m.toJSON()),
    userSubscriptions: userSubscriptions.map(m => m.toJSON()),
    dpoHostedPage: env.DPO_HOSTED_PAGE
  };
}

export const actions = {
  default: async({request, cookies}) => {
    const losfCookie = cookies.get("losf");
    if (losfCookie == null) {
       return {
        status: 400,
        body: {
            message: 'Invalid session'
        }
      }
    }
    const user = await Session.getUser(losfCookie);
    if (user == null) {
      return {
        status: 400,
        body: {
            message: 'Invalid session'
        }
      }
    }
    let transactionPaymentRequestToken = "1234";
    const data = await request.formData()
    const id = data.get("id")
    if (id == null) {
      return {
        status: 400,
        body: {
            message: 'Invalid membership type'
        }
      }
    }
    const membership = await Membership.getMembership(id.toString())
    if (membership == null) {
      return {
        status: 400,
        body: {
            message: 'Invalid membership type'
        }
      }
    }

    const txnId = crypto.randomUUID()

    const subscription = await Subscription.createSubscription(user.toJSON().User.id, membership.toJSON().id, membership.toJSON().amount, membership.toJSON().currency, "DPO", txnId, "initialised", "membership subscription fees")
    if (subscription == null) {
      return {
        status: 400,
        body: {
            message: 'Invalid membership type'
        }
      }
    }
    const createToken = `
    <?xml version="1.0" encoding="utf-8"?>
    <API3G>
      <CompanyToken>${env.DPO_TOKEN}</CompanyToken>
      <Request>createToken</Request>
      <Transaction>
        <PaymentAmount>${membership.toJSON().amount}</PaymentAmount>
        <PaymentCurrency>${membership.toJSON().currency}</PaymentCurrency>
        <CompanyRef>${txnId}</CompanyRef>
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
              message: 'Unable to initiate transaction, please try again'
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
              message: 'Membership payment transaction validation failed'
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

      const subscriptionId: string = await subscription.toJSON().id
      await subscription.update({
        externalTransactionId: tokenPayload.API3G.TransToken
      }, {
        where: {
          id: subscriptionId
        }
      })
      transactionPaymentRequestToken = tokenPayload.API3G.TransToken
      } catch(err) {
        console.log(err)
        return {
          status: 400,
          body: {
              message: 'Unable to complete transaction, please try again later'
          }
        }
      }
      redirect(302, `${env.DPO_HOSTED_PAGE}?ID=${transactionPaymentRequestToken}`)
  }}