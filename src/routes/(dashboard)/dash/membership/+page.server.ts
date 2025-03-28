import { env } from '$env/dynamic/private'
import crypto from 'crypto'
import {formatDate} from '$lib/utils';
import { XMLParser } from 'fast-xml-parser';
import { redirect } from '@sveltejs/kit';
import { createSubscription, updateSubscription, userPaidSubscriptions, userSubscriptions } from '$lib/server/databases/subscriptions';
import { membershipByID, memberships } from '$lib/server/databases/memberships';
import { userData } from '$lib/server/databases/users';

export async function load(event) {
  const session = await event.locals.auth();

  if (!session?.user) {
          redirect(303, `/signin`);
  }

  if (!session.user.email) throw redirect(303, "/signin");

    const subscriptions = await userPaidSubscriptions(session.user.email)
    const membershipsTiers = await memberships();
    const usersSubscriptions = await userSubscriptions(session.user.email)
  return {
    subscriptions,
    memberships: membershipsTiers,
    userSubscriptions: usersSubscriptions,
    dpoHostedPage: env.DPO_HOSTED_PAGE
  };
}

export const actions = {
  default: async({request, locals}) => {
    const session = await locals.auth();

    if (session == null || session.user == null || session.user.email == null) {
      return {
        status: 400,
        body: {
            message: 'Invalid user'
        }
      }
    }

    const user = await userData(session.user.email)
    if (user == null) {
      return {
        status: 400,
        body: {
            message: 'Invalid user'
        }
      }
    }
    let transactionPaymentRequestToken = "1234";
    const data = await request.formData()
    const id = data.get("id")?.toString()
    if (id == null) {
      return {
        status: 400,
        body: {
            message: 'Invalid membership type'
        }
      }
    }
    const membership = await membershipByID(id)
    if (membership == null) {
      return {
        status: 400,
        body: {
            message: 'Invalid membership type'
        }
      }
    }

    const txnId = crypto.randomUUID()

    const subscription = await createSubscription(user.id, membership.id, membership.amount, membership.currency, "DPO", txnId, "initialised", "membership subscription fees")
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
        <PaymentAmount>${membership.amount}</PaymentAmount>
        <PaymentCurrency>${membership.currency}</PaymentCurrency>
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

      const updatedSubscription = await updateSubscription(subscription.id, "pending", "membership subscription fees", tokenPayload.API3G.TransToken)

      if (updatedSubscription == null) {
        return {
          status: 400,
          body: {
              message: 'Unable to complete transaction, please try again later'
          }
        }
      }

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