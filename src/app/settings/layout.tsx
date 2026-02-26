import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Sidebar } from "@/components/Sidebar";

export default async function SettingsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50" >
      <Sidebar />
      <main className="md:pl-72 p-4 pt-20 md:pt-4">{children}</main>
      {modal}
    </div>
  );
}
