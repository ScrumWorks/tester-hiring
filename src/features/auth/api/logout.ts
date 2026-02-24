export const logout = async () => {
  const res = await fetch("/api/logout", { method: "POST" });
  return res.ok;
};
