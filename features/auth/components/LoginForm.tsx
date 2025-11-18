"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import type { LoginSchema } from "@/features/auth/schema";
import { loginSchemaDef } from "@/features/auth/schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchemaDef),
    mode: "onChange",
  });

  const onSubmit = async (values: LoginSchema) => {
    const loginPromise = (async () => {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Inloggen mislukt");
      }

      return data;
    })();

    toast.promise(loginPromise, {
      loading: "Bezig met inloggen...",
      success: "Succesvol ingelogd",
      error: (err) => (err instanceof Error ? err.message : "Inloggen mislukt"),
    });

    try {
      await loginPromise;
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <Input
        label="Gebruikersnaam of E-mail"
        placeholder="alparslan@promax.com"
        autoComplete="username"
        {...register("username")}
        error={errors.username?.message}
      />
      <Input
        type="password"
        label="Wachtwoord"
        placeholder="Uw wachtwoord"
        autoComplete="current-password"
        {...register("password")}
        error={errors.password?.message}
      />
      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Inloggen
      </Button>
    </form>
  );
}
