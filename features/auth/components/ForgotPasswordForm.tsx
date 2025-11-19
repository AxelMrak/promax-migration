"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import type { ForgotPasswordSchema } from "@/features/auth/schema";
import { forgotPasswordSchemaDef } from "@/features/auth/schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { sendForgotPasswordEmail } from "@/features/auth/services/forgotPassword";
import { getErrorMessage } from "@/lib/api/errorHandler";

interface ForgotPasswordFormProps {
  handleModeSwitch?: (mode: "login" | "forgot") => void;
}

export function ForgotPasswordForm({
  handleModeSwitch,
}: ForgotPasswordFormProps) {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [sentEmail, setSentEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchemaDef),
    mode: "onChange",
  });

  const emailValue = watch("email");

  const onSubmit = async (values: ForgotPasswordSchema) => {
    toast.promise(sendForgotPasswordEmail(values), {
      loading: "Versturen...",
      success: () => {
        setIsEmailSent(true);
        setSentEmail(values.email);
        return "Herstellink verzonden! Controleer je e-mail.";
      },
      error: (err) => getErrorMessage(err),
    });
  };

  if (isEmailSent) {
    return (
      <div className="grid gap-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">E-mail verzonden naar</p>
          <p className="text-sm font-medium break-all">{sentEmail}</p>
        </div>

        <section className="flex flex-col items-center w-full gap-2">
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              setIsEmailSent(false);
              setSentEmail("");
            }}
          >
            Opnieuw proberen
          </Button>
          <Button
            variant="outline"
            type="button"
            className="flex items-center gap-2 w-full"
            onClick={() => handleModeSwitch?.("login")}
          >
            Terug naar inloggen
          </Button>
        </section>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <Input
        label="E-mail"
        placeholder="alparslan@promax.com"
        autoComplete="email"
        required
        {...register("email")}
        error={errors.email?.message}
      />

      <section className="flex flex-col items-center w-full gap-2">
        <Button
          type="submit"
          className="w-full"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Herstellink verzenden
        </Button>
        <Button
          variant="outline"
          type="button"
          className="flex items-center gap-2 w-full"
          onClick={() => handleModeSwitch?.("login")}
        >
          Terug naar inloggen
        </Button>
      </section>
    </form>
  );
}
