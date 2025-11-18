import Image from "next/image";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { Card } from "@/components/ui/Card";
import { AuthPanel } from "@/features/auth/views/AuthPanel";

export default function AuthPage() {
  return (
    <main className="relative flex min-h-lvh flex-col items-center justify-center">
      <Image
        src="/images/promax/login.webp"
        alt="Achtergrond voor login"
        fill
        sizes="100vw"
        className="-z-10 object-cover dark:brightness-75"
        priority
      />
      <AuthPanel />
    </main>
  );
}
