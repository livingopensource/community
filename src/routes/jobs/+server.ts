import { processPayments } from "$lib/server/workers/payments";
import { redirect } from "@sveltejs/kit";

export async function GET() {
    await processPayments();
    redirect(307, '/dash/membership')
}


export async function POST() {
    await processPayments();
    redirect(307, '/dash/membership')
}