import { z } from "zod";

export const changeNicknameSchema = z.object({
  nickname: z
    .string()
    .min(3, "Nickname must be between 3 and 20 characters")
    .max(20, "Nickname must be between 3 and 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Nickname can only contain letters, numbers, and underscores"
    ),
});

export type ChangeNicknameInput = z.infer<typeof changeNicknameSchema>;
