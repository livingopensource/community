import { User } from "$lib/server/databases/pg/users";
import { json } from "@sveltejs/kit";

export async function GET() {
    User.findAll()
    return json({"message": "database migrations"})
}