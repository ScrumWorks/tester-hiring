"use client";

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Select } from "@/components/Select";
import { Button } from "@/components/Button";
import { BIO_MAX, BIO_MIN } from "@/features/settings/modules/profile/lib/schemas/profile.schema";
import { getBioCharCount } from "@/features/settings/modules/profile/utils/get-bio-char-count";
import { COUNTRIES } from "@/features/settings/modules/profile/const/countries.const";
import type { ProfileInput } from "@/features/settings/modules/profile/lib/schemas/profile.schema";

interface ProfileFormContentProps {
  cities: { value: string; label: string }[];
  citiesLoading: boolean;
  watchedCountry: string;
  watchedBio: string;
}

export const ProfileFormContent = ({
  cities,
  citiesLoading,
  watchedCountry,
  watchedBio,
}: ProfileFormContentProps) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext<ProfileInput>();

  const bioCount = getBioCharCount(watchedBio);

  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>

      <Input
        label="Nickname"
        id="nickname"
        {...register("nickname")}
        error={errors.nickname?.message}
        placeholder="3-20 characters, letters, numbers, underscores only"
        maxLength={20}
        disabled={isSubmitting}
      />

      <div className="space-y-1">
        <Textarea
          label="Bio"
          id="bio"
          {...register("bio")}
          error={errors.bio?.message}
          hint={`${bioCount} / ${BIO_MAX} characters (min ${BIO_MIN})`}
          maxLength={BIO_MAX + 100}
          disabled={isSubmitting}
        />
      </div>

      <Input
        label="Date of birth"
        id="dateOfBirth"
        type="date"
        {...register("dateOfBirth")}
        error={errors.dateOfBirth?.message}
        disabled={isSubmitting}
      />

      <Select
        label="Country"
        id="country"
        options={[...COUNTRIES]}
        {...register("country")}
        error={errors.country?.message}
        disabled={isSubmitting}
      />

      <Select
        label="City"
        id="city"
        options={cities}
        {...register("city")}
        error={errors.city?.message}
        disabled={!watchedCountry || citiesLoading || isSubmitting}
        placeholder={citiesLoading ? "Loading..." : "Select a city"}
      />

      <Button type="submit" isLoading={isSubmitting}>
        Save
      </Button>
    </>
  );
};
