import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { Logo } from "@/components/layout/Logo";

export function AuthLayout({ title, subtitle, children, points }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <aside className="relative hidden flex-col justify-between bg-primary p-10 text-primary-foreground lg:flex">
        <Link to="/" aria-label="CampusConnect home">
          <Logo className="text-primary-foreground [&>span:first-child]:bg-primary-foreground [&>span:first-child]:text-primary" />
        </Link>
        <div>
          <h2 className="max-w-sm font-display text-3xl font-bold leading-snug">
            One platform. Every role. A smarter campus.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/80">
            Attendance, assignments, academics, placements and announcements — connected for
            students, faculty and administrators.
          </p>
          <ul className="mt-8 space-y-3">
            {(
              points ?? [
                "Role-based dashboards",
                "Live attendance & academic analytics",
                "End-to-end placement pipeline",
              ]
            ).map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4" aria-hidden /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center text-sm">
          {[
            ["15+", "Departments"],
            ["500+", "Students"],
            ["98%", "Accuracy"],
          ].map(([v, l]) => (
            <div key={l} className="rounded-lg bg-primary-foreground/10 py-3">
              <p className="font-display text-xl font-bold">{v}</p>
              <p className="text-xs text-primary-foreground/75">{l}</p>
            </div>
          ))}
        </div>
      </aside>

      <div className="flex flex-col justify-center px-5 py-10 sm:px-10">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden">
            <Link to="/" aria-label="CampusConnect home">
              <Logo />
            </Link>
          </div>
          <h1 className="mt-6 text-page-title lg:mt-0">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
