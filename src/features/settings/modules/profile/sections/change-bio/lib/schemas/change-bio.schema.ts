import { z } from "zod";
import { BIO_MIN, BIO_MAX } from "../../../../lib/schemas/profile.schema";

export const changeBioSchema = z.object({
  bio: z
    .string()
    .min(BIO_MIN, `Bio must be at least ${BIO_MIN} characters`)
    .max(BIO_MAX, `Bio must be at most ${BIO_MAX} characters`),
});

export type ChangeBioInput = z.infer<typeof changeBioSchema>;
