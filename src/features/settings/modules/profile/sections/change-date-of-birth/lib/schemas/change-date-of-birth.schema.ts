import { z } from "zod";

export const changeDateOfBirthSchema = z.object({
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine(
      (val) => {
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
});

export type ChangeDateOfBirthInput = z.infer<typeof changeDateOfBirthSchema>;
