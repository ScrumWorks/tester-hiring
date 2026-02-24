export const getCities = async (country: string) => {
  const res = await fetch(
    `/api/cities?country=${encodeURIComponent(country)}`
  );
  const data = await res.json();
  return (data.cities ?? []).map((c: string) => ({ value: c, label: c }));
};
