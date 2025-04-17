import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { formSchema } from "./schema";
import prisma from "$lib/server/databases/prisma";
import { countries } from "$lib/server/config/countries";

export const load: PageServerLoad = async ({locals}) => {
    const session = await locals.auth()
    if (!session) {
      throw redirect(303, '/signin')
    }

    if (!session?.user || !session.user.email) redirect(302, "/signin")

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            applicant: {
                include: {
                    membership: true
                }
            },
            subscriptions: {
                include: {
                    membership: true
                }
            }
        }
    })

    if (!user) redirect(303, "/signin")

    let formData = {}
    if (user.applicant.length == 1) {
        formData = {
            specialisation: user.applicant[0].specialisation,
            title: user.applicant[0].jobTitle,
            organisation: user.applicant[0].organisation,
            experience: user.applicant[0].workExperience,
            country: user.applicant[0].country
        }
    }

    return {
        user,
        countries: countries,
        form: await superValidate(formData, zod(formSchema))
    }
}

export const actions = {
	default: async ({ request, locals }) => {
        const session = await locals.auth()
        if (!session?.user) redirect(302, "/signin")

        if (!session.user.email) redirect(302, "/signin")

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            },
            include: {
                applicant: {
                    include: {
                        membership: {
                            include: {
                                subscriptions: true
                            }
                        }
                    }
                }
            }
        })

        if (!user) redirect(303, "/signin")

        const form = await superValidate(request, zod(formSchema));
        if (!form.valid) {
          return fail(400, {
            form,
          });
        }

        try {
            if (user.applicant.length == 1) {
                await prisma.membershipApplication.update({
                    data: {
                        jobTitle: form.data.title,
                        workExperience: form.data.experience,
                        specialisation: form.data.specialisation,
                        organisation: form.data.organisation,
                        country: form.data.country
                    },
                    where: {
                        userId: user.id
                    }
                })
                return message(form, "Successfully updated details")
            }

            await prisma.membershipApplication.create({
                data: {
                    userId: user.id,
                    jobTitle: form.data.title,
                    workExperience: form.data.experience,
                    specialisation: form.data.specialisation,
                    organisation: form.data.organisation,
                    country: form.data.country
                }
            })
            // TODO: Notify the los Admins of the new user applications
            return message(form, "Successfully submitted application")
        }
        catch(err) {
            console.log(err)
            return message(form, "Unable to save data, please try again later.", {
                status: 400
            })
        }
    }
} satisfies Actions;