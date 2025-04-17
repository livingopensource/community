import { z } from "zod";

export const formSchema = z.object({
    membership: z.string(),
    user: z.string()
});

export type FormSchema = typeof formSchema;