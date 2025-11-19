import Image from "next/image";

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
