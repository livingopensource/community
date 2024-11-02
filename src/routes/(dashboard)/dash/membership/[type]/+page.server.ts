import { Membership } from "$lib/server/databases/pg/memberships";

export async function load({ params }) {
    const membershipType  = params.type;
    const membership = await Membership.getMembershipDetails(membershipType)
  return {
    membership: membership?.toJSON()
  };
}