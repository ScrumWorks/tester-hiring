import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  profileSchema,
  type ProfileInput,
} from "@/features/settings/modules/profile/lib/schemas/profile.schema";

export const useProfileForm = (defaultValues: Partial<ProfileInput>) => {
  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      nickname: "",
      bio: "",
      dateOfBirth: "",
      country: "",
      city: "",
      ...defaultValues,
    },
  });

  return { form };
};
