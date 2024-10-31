import { DBConn } from "$lib/server/databases/pg/init";
import { Subscription } from "$lib/server/databases/pg/memberships";
import { User } from "$lib/server/databases/pg/users";
import { json } from "@sveltejs/kit";

export async function GET() {
    const sequelize = DBConn
    await sequelize.sync({alter: true})
    User.findAll()
    Subscription.findAll()
    return json({"message": "database migrations"})
}