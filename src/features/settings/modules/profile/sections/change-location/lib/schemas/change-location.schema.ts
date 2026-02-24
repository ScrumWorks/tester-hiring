import { z } from "zod";

export const changeLocationSchema = z.object({
  country: z.string().optional(),
  city: z.string().optional(),
});

export type ChangeLocationInput = z.infer<typeof changeLocationSchema>;
