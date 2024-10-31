import { DBConn } from "$lib/server/databases/pg/init";
import { Membership, Subscription } from "$lib/server/databases/pg/memberships";
import { Permission, Role } from "$lib/server/databases/pg/permissions";
import { Session, User } from "$lib/server/databases/pg/users";
import { json } from "@sveltejs/kit";

export async function GET() {
    const sequelize = DBConn
    await sequelize.sync({alter: true})
    User.findAll()
    Session.findAll()
    Membership.findAll()
    Subscription.findAll()
    Permission.findAll()
    Role.findAll()
    return json({"message": "hello world"})
}