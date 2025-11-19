"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import type { LoginSchema } from "@/features/auth/schema";
import { loginSchemaDef } from "@/features/auth/schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { getErrorMessage } from "@/lib/api/errorHandler";

interface LoginFormProps {
  handleModeSwitch?: (mode: "login" | "forgot") => void;
}

export function LoginForm({ handleModeSwitch }: LoginFormProps) {
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
        throw new Error(data.error || data.detail || data.message || "Inloggen mislukt");
      }

      return data;
    })();

    toast.promise(loginPromise, {
      loading: "Bezig met inloggen...",
      success: "Succesvol ingelogd",
      error: (err) => getErrorMessage(err),
    });

    try {
      await loginPromise;
      router.refresh();
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <Input
        label="Gebruikersnaam of E-mail"
        placeholder="alparslan@promax.com"
        autoComplete="username"
        required
        {...register("username")}
        error={errors.username?.message}
      />
      <section className="w-full flex flex-col items-start ">
        <Input
          type="password"
          label="Wachtwoord"
          placeholder="Uw wachtwoord"
          autoComplete="current-password"
          className="w-full"
          required
          {...register("password")}
          error={errors.password?.message}
        />
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-0 px-0 m-0  min-h-0 text-primary transition-colors hover:bg-transparent hover:underline mt-1 cursor-pointer"
          onClick={() => handleModeSwitch?.("forgot")}
          type="button"
        >
          Wachtwoord vergeten?
        </Button>
      </section>
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
