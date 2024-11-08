import { Subscription } from '$lib/server/databases/pg/memberships';

export async function load({ parent }) {
    const data = await parent();
    const subscriptions = await Subscription.getUserActiveSubscriptions(data.user.User.id)
  return {
    subscription: subscriptions.map(m => m.toJSON())
  };
}