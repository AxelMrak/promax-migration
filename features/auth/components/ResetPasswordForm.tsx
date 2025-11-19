"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import type { ResetPasswordSchema } from "@/features/auth/schema";
import { resetPasswordSchemaDef } from "@/features/auth/schema";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { resetPassword } from "@/features/auth/services/resetPassword";
import { getErrorMessage } from "@/lib/api/errorHandler";

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchemaDef),
    mode: "onChange",
    defaultValues: {
      token,
    },
  });

  const onSubmit = async (values: ResetPasswordSchema) => {
    toast.promise(resetPassword(values), {
      loading: "Wachtwoord resetten...",
      success: () => {
        setIsPasswordReset(true);
        return "Wachtwoord succesvol gereset!";
      },
      error: (err) => getErrorMessage(err),
    });
  };

  if (isPasswordReset) {
    return (
      <div className="grid gap-4">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Uw wachtwoord is succesvol gereset
          </p>
          <p className="text-sm font-medium">
            U kunt nu inloggen met uw nieuw wachtwoord
          </p>
        </div>

        <Link href="/login" className="w-full">
          <Button type="button" className="w-full">
            Naar inloggen
          </Button>
        </Link>
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

      <Input
        type="password"
        label="Nieuw wachtwoord"
        placeholder="Uw nieuw wachtwoord"
        autoComplete="new-password"
        required
        {...register("password")}
        error={errors.password?.message}
      />

      <Input
        type="password"
        label="Bevestig wachtwoord"
        placeholder="Bevestig uw nieuw wachtwoord"
        autoComplete="new-password"
        required
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <input type="hidden" {...register("token")} />

      <Button
        type="submit"
        className="w-full"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        Wachtwoord resetten
      </Button>
    </form>
  );
}
