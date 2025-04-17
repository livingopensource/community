import { z } from "zod";

export const formSchema = z.object({
 title: z.string().min(2, {message: "Job Title must contain at least two characters"}).max(50),
 organisation: z.string().min(2),
 specialisation: z.string().min(2),
 experience: z.number(),
 country: z.string().min(2),
});

export type FormSchema = typeof formSchema;