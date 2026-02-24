import { z } from "zod";

export const BIO_MIN = 10;
export const BIO_MAX = 300;

export const profileSchema = z.object({
  nickname: z
    .string()
    .min(3, "Nickname must be between 3 and 20 characters")
    .max(20, "Nickname must be between 3 and 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Nickname can only contain letters, numbers, and underscores"
    ),
  bio: z
    .string()
    .min(BIO_MIN, `Bio must be at least ${BIO_MIN} characters`)
    .max(BIO_MAX, `Bio must be at most ${BIO_MAX} characters`),
  dateOfBirth: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        const dob = new Date(val);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < dob.getDate())
        ) {
          age--;
        }
        return age >= 18;
      },
      { message: "You must be at least 18 years old" }
    ),
  country: z.string().optional(),
  city: z.string().optional(),
});

export type ProfileInput = z.infer<typeof profileSchema>;
