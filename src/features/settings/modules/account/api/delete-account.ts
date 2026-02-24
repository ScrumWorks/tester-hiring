export const deleteAccount = async () => {
  const res = await fetch("/api/account", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "delete-account" }),
  });
  return res;
};
