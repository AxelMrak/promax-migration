import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { ResetPasswordForm } from "@/features/auth/components/ResetPasswordForm";

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
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
        <Card className="w-full max-w-xs space-y-4 border-border bg-background/90 backdrop-blur-xs md:max-w-md">
          <CardHeader className="flex flex-col items-center space-y-2">
            <Image
              src="/logo/promax.svg"
              alt="Company Logo"
              width={150}
              height={150}
            />
            <CardTitle className="text-center text-2xl">Fout</CardTitle>
            <p className="text-md text-muted-foreground text-center">
              Ongeldig reset token. Vraag alstublieft een nieuwe herstellink aan.
            </p>
          </CardHeader>
        </Card>
      </main>
    );
  }

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
      <Card className="w-full max-w-xs space-y-4 border-border bg-background/90 backdrop-blur-xs md:max-w-md">
        <CardHeader className="flex flex-col items-center space-y-2">
          <Image
            src="/logo/promax.svg"
            alt="Company Logo"
            width={150}
            height={150}
          />
          <CardTitle className="text-center text-2xl">Wachtwoord herstellen</CardTitle>
          <p className="text-md text-muted-foreground text-center">
            Voer uw nieuwe wachtwoord in
          </p>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>
    </main>
  );
}
