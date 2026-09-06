import { Link, useNavigate } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/AppShell";
import { useAuth, dashboardPath } from "@/lib/auth";

import { useEffect } from "react";

export function RoleGate({ role, children }) {
  const { user, ready } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && !user) navigate({ to: "/login", replace: true });
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div
        className="grid min-h-screen place-items-center text-sm text-muted-foreground"
        aria-busy="true"
      >
        Loading CampusConnect…
      </div>
    );
  }

  if (user.role !== role) {
    return (
      <div className="grid min-h-screen place-items-center bg-background px-4">
        <div className="max-w-md text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-danger-soft text-destructive">
            <ShieldAlert className="h-7 w-7" aria-hidden />
          </span>
          <h1 className="mt-4 text-page-title">Access Restricted</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You don't have permission to access this page. This area is for {role} accounts.
          </p>
          <Button asChild className="mt-6">
            <Link to={dashboardPath(user.role)}>Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return <AppShell>{children}</AppShell>;
}
