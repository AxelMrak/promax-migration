"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import type { LoginSchema } from "@/features/auth/schema";
import { loginSchemaDef } from "@/features/auth/schema";
import { loginAction } from "@/features/auth/actions";
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
    mode: "onBlur",
  });

  const onSubmit = async (values: LoginSchema) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("password", values.password);

    try {
      await toast.promise(loginAction(formData), {
        loading: "Bezig met inloggen...",
        success: "Succesvol ingelogd",
        error: (error) =>
          error instanceof Error ? error.message : "Inloggen mislukt",
      });
      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Login failed", error);
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
      <Button type="submit" className="w-full" isLoading={isSubmitting}>
        Inloggen
      </Button>
    </form>
  );
}
