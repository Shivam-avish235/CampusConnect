import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MailCheck } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/common";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — CampusConnect" },
      {
        name: "description",
        content:
          "Request a CampusConnect password reset link for your student, faculty or admin account.",
      },
      { property: "og:title", content: "Reset your CampusConnect password" },
      {
        property: "og:description",
        content: "Request a password reset link for your CampusConnect account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="grid min-h-screen place-items-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-card">
        <Link to="/" aria-label="CampusConnect home">
          <Logo />
        </Link>
        {sent ? (
          <div className="mt-8 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-success-soft text-success">
              <CheckCircle2 className="h-6 w-6" aria-hidden />
            </span>
            <h1 className="mt-4 text-section-heading">Check your inbox</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              If an account exists for <strong>{email}</strong>, a reset link is on its way. The
              link expires in 30 minutes.
            </p>
            <Button asChild className="mt-6 w-full">
              <Link to="/login">Back to Login</Link>
            </Button>
          </div>
        ) : (
          <>
            <h1 className="mt-8 text-page-title">Reset your password</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Enter your registered email and we&apos;ll send a reset link.
            </p>
            <form
              className="mt-6 space-y-4"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                  setError("Enter a valid email address");
                  return;
                }
                setError("");
                setSent(true);
              }}
            >
              <Field label="Email address" htmlFor="fpemail" error={error}>
                <Input
                  id="fpemail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@campusconnect.edu.in"
                  aria-invalid={!!error}
                />
              </Field>
              <Button type="submit" className="w-full" size="lg">
                <MailCheck className="h-4 w-4" /> Send reset link
              </Button>
            </form>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Remembered it?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Back to Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
