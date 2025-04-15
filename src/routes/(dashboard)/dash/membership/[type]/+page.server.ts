import { membershipByID } from '$lib/server/databases/memberships.js';

export async function load({ params }) {
    const membershipType  = params.type;
    const membership = await membershipByID(membershipType)
  return {
    membership: membership
  };
}