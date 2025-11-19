"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Image from "next/image";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useRouter } from "next/navigation";

export function AuthPanel() {
  const [mode] = useState<"login" | "forgot">("login");
  const router = useRouter();

  return (
    <Card className="w-full max-w-xs space-y-4 border-border/30 bg-background/90 backdrop-blur-xs md:max-w-md">
      <CardHeader className="flex flex-col items-center space-y-2">
        <Image
          src="/logo/promax.svg"
          alt="Company Logo"
          width={150}
          height={150}
        />
        <CardTitle className="text-center text-2xl">
          {mode === "login" ? "Welkom terug" : "Wachtwoord herstellen"}
        </CardTitle>
        <p className="text-md text-muted-foreground">
          {mode === "login"
            ? "Log in op uw account"
            : "Voer uw e-mailadres in om uw wachtwoord te herstellen"}
        </p>
      </CardHeader>
      <CardContent>
        {mode === "login" ? (
          <LoginForm />
        ) : (
          <p className="mb-4 text-sm text-muted-foreground">
            Voer uw e-mailadres in om uw wachtwoord te herstellen.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
