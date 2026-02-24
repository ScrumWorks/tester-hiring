import Image from "next/image";
import { LoginFormProvider } from "@/features/auth";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <Image
          src="/ama-logo.png"
          alt="Amateri"
          width={200}
          height={60}
          className="mx-auto h-12 w-auto object-contain"
          priority
        />
        <LoginFormProvider />
      </div>
    </main>
  );
}
