import Image from "next/image";

import { LoginForm } from "@/features/auth/components/LoginForm";
import { Card } from "@/components/ui/Card";

export default function Login() {
  return (
    <div className="relative flex min-h-lvh flex-col items-center justify-center">
      <Image
        src="/images/promax/login.webp"
        alt="Achtergrond voor login"
        fill
        sizes="100vw"
        className="-z-10 object-cover dark:brightness-75"
        priority
      />
      <Card className="w-full max-w-xs space-y-8 border-border/30 bg-background/90 backdrop-blur-xs md:max-w-md">
        <LoginForm />
      </Card>
    </div>
  );
}
