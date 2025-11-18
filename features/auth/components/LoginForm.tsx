"use client";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginSchema } from "@/features/auth/schema";
import { loginSchemaDef } from "@/features/auth/schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type LoginFormProps = {
  onSuccess?: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchemaDef),
    mode: "onChange",
  });

  const onSubmit = async (values: LoginSchema) => {
    const loginPromise = fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Inloggen mislukt");
      }

      return data;
    });

    try {
      await toast.promise(loginPromise, {
        loading: "Bezig met inloggen...",
        success: "Succesvol ingelogd",
        error: (err) =>
          err instanceof Error ? err.message : "Inloggen mislukt",
      });

      onSuccess?.();
    } catch {}
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
        disabled={isSubmitting || !isValid}
      >
        Inloggen
      </Button>
    </form>
  );
}
