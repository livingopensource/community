import { DBConn } from "$lib/server/databases/pg/init";
import { Membership } from "$lib/server/databases/pg/memberships";
import { Permission, Role } from "$lib/server/databases/pg/permissions";
import { User } from "$lib/server/databases/pg/users";
import { json } from "@sveltejs/kit";

export async function GET() {
    const sequelize = DBConn
    await sequelize.sync({alter: true})
    User.findAll()
    Role.findAll()
    Permission.findAll()
    Membership.findAll()
    return json({"message": "database migrations"})
}