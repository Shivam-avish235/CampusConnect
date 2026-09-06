import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const links = [
  { label: "Features", href: "#features" },
  { label: "Roles", href: "#roles" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function PublicLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-4 sm:px-6">
          <Link to="/" aria-label="CampusConnect home">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="ml-4 hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="ml-auto hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button asChild variant="ghost">
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
          <ThemeToggle className="ml-auto md:hidden" />
          <button
            type="button"
            className="rounded-md p-2 hover:bg-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open ? (
          <div className="border-t border-border bg-surface px-4 py-4 md:hidden">
            <nav aria-label="Mobile" className="flex flex-col gap-3">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/register">Get Started</Link>
                </Button>
              </div>
            </nav>
          </div>
        ) : null}
      </header>

      <main>{children}</main>

      <footer id="contact" className="border-t border-border bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              One platform for attendance, academics, assignments and placements — built for Indian
              campuses.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              hello@campusconnect.edu.in · +91 80 4567 2200
            </p>
          </div>
          {[
            { title: "Product", items: ["Features", "Roles", "Placements", "Analytics"] },
            { title: "Company", items: ["About", "Careers", "Partners", "Contact"] },
            { title: "Legal", items: ["Privacy", "Terms", "Security", "Accessibility"] },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="text-card-title">{col.title}</h3>
              <ul className="mt-3 space-y-2">
                {col.items.map((i) => (
                  <li key={i}>
                    <a
                      href="#features"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CampusConnect. All rights reserved. Prototype UI with mock
          data.
        </div>
      </footer>
    </div>
  );
}
