import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

import { AuthLayout } from "@/components/layout/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "@/components/common";
import { useAuth, dashboardPath } from "@/lib/auth";

import { loginUser } from "@/api/authApi";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — CampusConnect" },
      {
        name: "description",
        content:
          "Sign in to CampusConnect to access your student, faculty or administrator dashboard.",
      },
      {
        property: "og:title",
        content: "Login — CampusConnect",
      },
      {
        property: "og:description",
        content: "Access your CampusConnect role dashboard.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
  }),

  component: LoginPage,
});

function LoginPage() {
  const { user, ready, login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  // ---------------------------------------------------------
  // If already logged in, redirect to dashboard
  // ---------------------------------------------------------

  useEffect(() => {
    if (ready && user) {
      navigate({
        to: dashboardPath(user.role),
        replace: true,
      });
    }
  }, [ready, user, navigate]);

  // ---------------------------------------------------------
  // LOGIN
  // ---------------------------------------------------------

  async function submit(e) {
    e.preventDefault();

    const next = {};

    // Email validation
    if (!email.trim()) {
      next.email = "Email is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      next.email = "Enter a valid email address";
    }

    // Password validation
    if (!password) {
      next.password = "Password is required";
    } else if (password.length < 6) {
      next.password =
        "Password must be at least 6 characters";
    }

    setErrors(next);

    if (Object.keys(next).length > 0) {
      return;
    }

    try {
      setLoading(true);

      // -----------------------------------------------------
      // CALL SPRING BOOT
      // -----------------------------------------------------

      const data = await loginUser(
        email.trim(),
        password
      );

      console.log("Login response:", data);

      // -----------------------------------------------------
      // GET TOKEN
      // -----------------------------------------------------

      const token =
        data.token ||
        data.accessToken ||
        data.jwt;

      if (!token) {
        throw new Error(
          "Login successful but JWT token was not returned."
        );
      }

      // -----------------------------------------------------
      // GET ROLE
      // -----------------------------------------------------

      let role =
        data.role ||
        data.user?.role ||
        data.user?.roles?.[0];

      if (!role) {
        throw new Error(
          "Login successful but user role was not returned."
        );
      }

      // Normalize role
      role = role.toString().toLowerCase();

      // Remove ROLE_ prefix if backend sends it
      role = role.replace("role_", "");

      // -----------------------------------------------------
      // SAVE AUTH DATA
      // -----------------------------------------------------

      localStorage.setItem("token", token);

      localStorage.setItem("role", role);

      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // -----------------------------------------------------
      // UPDATE FRONTEND AUTH STATE
      // -----------------------------------------------------

      login(data);

      // -----------------------------------------------------
      // SUCCESS
      // -----------------------------------------------------

      toast.success(
        `Welcome back! Signed in as ${role}.`
      );

      // -----------------------------------------------------
      // REDIRECT
      // -----------------------------------------------------

      navigate({
        to: dashboardPath(role),
        replace: true,
      });

    } catch (error) {
      console.error("Login error:", error);

      let message =
        "Unable to login. Please try again.";

      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          message =
            "Invalid email or password.";
        } else if (status === 403) {
          message =
            "You are not authorized to login.";
        } else if (status === 400) {
          message =
            error.response.data?.message ||
            "Invalid login request.";
        } else if (status >= 500) {
          message =
            "Server error. Please try again later.";
        } else {
          message =
            error.response.data?.message ||
            message;
        }
      } else if (error.message) {
        message = error.message;
      }

      toast.error(message);

    } finally {
      setLoading(false);
    }
  }

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your CampusConnect dashboard."
    >
      <form
        onSubmit={submit}
        noValidate
        className="space-y-4"
      >
        {/* EMAIL */}

        <Field
          label="Email address"
          htmlFor="email"
          error={errors.email}
        >
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@campusconnect.edu.in"
            value={email}
            aria-invalid={!!errors.email}
            disabled={loading}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </Field>

        {/* PASSWORD */}

        <Field
          label="Password"
          htmlFor="password"
          error={errors.password}
        >
          <div className="relative">
            <Input
              id="password"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              aria-invalid={!!errors.password}
              disabled={loading}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="pr-10"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                setShow((s) => !s)
              }
              aria-label={
                show
                  ? "Hide password"
                  : "Show password"
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-muted-foreground hover:text-foreground"
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </Field>

        {/* REMEMBER / FORGOT */}

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <Checkbox
              id="remember"
              disabled={loading}
            />

            <span>Remember me</span>
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* LOGIN BUTTON */}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>

      {/* NO REGISTER */}
      
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Account access is managed by the CampusConnect administrator.
      </p>
    </AuthLayout>
  );
}