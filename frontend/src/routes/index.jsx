import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Briefcase,
  CalendarCheck,
  ClipboardList,
  LayoutDashboard,
  Quote,
  ShieldCheck,
  Star,
} from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/common";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CampusConnect — One Platform. Every Role. A Smarter Campus." },
      {
        name: "description",
        content:
          "CampusConnect unifies attendance, assignments, academics, placements and announcements for students, faculty and college administrators.",
      },
      {
        property: "og:title",
        content: "CampusConnect — One Platform. Every Role. A Smarter Campus.",
      },
      {
        property: "og:description",
        content:
          "Role-based college management: attendance tracking, grading, placement drives and campus-wide analytics.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const features = [
  {
    icon: CalendarCheck,
    title: "Attendance tracking",
    text: "Subject-wise attendance with automatic shortage alerts before it becomes a problem.",
  },
  {
    icon: ClipboardList,
    title: "Assignments & grading",
    text: "Post work, collect submissions, grade with feedback — all in one queue.",
  },
  {
    icon: Briefcase,
    title: "Placement drives",
    text: "Eligibility rules, applications and an end-to-end recruiter pipeline.",
  },
  {
    icon: Bell,
    title: "Real-time announcements",
    text: "Target notices by college, department, section or role with priority levels.",
  },
  {
    icon: BarChart3,
    title: "Academic analytics",
    text: "CGPA trends, department attendance and placement conversion at a glance.",
  },
  {
    icon: LayoutDashboard,
    title: "Role-based dashboards",
    text: "Every user sees exactly what they need — nothing more, nothing less.",
  },
];

const roles = [
  {
    name: "Student",
    tone: "text-primary bg-primary-soft",
    desc: "Your academic life in one place.",
    bullets: [
      "Attendance and CGPA insights",
      "Assignment submissions & marks",
      "Placement drives and applications",
    ],
    preview: [
      ["Attendance", "86%"],
      ["CGPA", "8.42"],
      ["Pending work", "3"],
    ],
  },
  {
    name: "Faculty",
    tone: "text-success bg-success-soft",
    desc: "Teaching workflow without paperwork.",
    bullets: [
      "Mark attendance in seconds",
      "Create and grade assignments",
      "Track your sections' progress",
    ],
    preview: [
      ["Today's classes", "4"],
      ["Pending reviews", "6"],
      ["My students", "120"],
    ],
  },
  {
    name: "Admin",
    tone: "text-purple bg-purple-soft",
    desc: "College-wide oversight and control.",
    bullets: ["Manage users and academics", "Run placement drives", "Reports and audit trails"],
    preview: [
      ["Students", "1,880"],
      ["Faculty", "136"],
      ["Active drives", "6"],
    ],
  },
];

const testimonials = [
  {
    name: "Ananya Iyer",
    role: "Final year, CSE",
    quote:
      "I stopped chasing notice boards. Attendance shortage alerts and placement updates reach me the same day.",
  },
  {
    name: "Dr. Ramesh Iyer",
    role: "Professor & HOD, CSE",
    quote:
      "Marking attendance for two sections now takes under a minute, and grading has an actual queue instead of a spreadsheet.",
  },
  {
    name: "Nandita Krishnan",
    role: "Registrar",
    quote:
      "Department attendance and placement conversion used to take a week to compile. It is now a dashboard I open every morning.",
  },
];

function Landing() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="border-b border-border bg-gradient-to-b from-primary-soft/50 to-surface">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-3 py-1 text-xs font-medium text-primary">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden /> Trusted campus operations platform
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
              One Platform. Every Role.
              <br />A Smarter Campus.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:text-lg">
              CampusConnect brings attendance, assignments, academics, placements and announcements
              together — with dedicated experiences for students, faculty and administrators.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/register">
                  Get Started Free <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/login">Login</Link>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-warning" aria-hidden />
              Used by students, faculty &amp; admins across departments
            </p>
          </div>

          {/* Stylised product preview */}
          <div className="rounded-2xl border border-border bg-card p-3 shadow-pop">
            <div className="flex items-center gap-1.5 px-2 pb-3">
              {["bg-destructive/40", "bg-warning/50", "bg-success/50"].map((c) => (
                <span key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />
              ))}
              <span className="ml-3 text-caption">campusconnect.edu.in/student/dashboard</span>
            </div>
            <div className="grid gap-3 rounded-xl bg-background p-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  ["Attendance", "86%", "text-success"],
                  ["CGPA", "8.42", "text-primary"],
                  ["Applied", "05", "text-purple"],
                ].map(([l, v, c]) => (
                  <div key={l} className="rounded-lg border border-border bg-card p-3">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{l}</p>
                    <p className={`font-display text-lg font-bold ${c}`}>{v}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <p className="text-card-title">Subject-wise attendance</p>
                <div className="mt-4 flex h-28 items-end gap-3">
                  {[92, 75, 67, 87, 78, 73].map((h, i) => (
                    <div key={i} className="flex-1">
                      <div
                        className={`rounded-t ${h < 75 ? "bg-warning" : "bg-primary"}`}
                        style={{ height: `${h}%` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Graph Traversal Report</span>
                  <span className="rounded-full bg-warning-soft px-2 py-0.5 text-xs font-medium text-warning-foreground">
                    Due in 2 days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight">
            Everything a campus runs on
          </h2>
          <p className="mt-3 text-muted-foreground">
            Purpose-built modules instead of a generic ERP. Each one is designed around a real daily
            workflow.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <article
              key={f.title}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/30"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-card-title">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <h2 className="font-display text-3xl font-bold tracking-tight">Built for every role</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Permissions and dashboards adapt to who is signed in, so no one wades through screens
            they don't need.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {roles.map((r) => (
              <article
                key={r.name}
                className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <span
                  className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${r.tone}`}
                >
                  {r.name}
                </span>
                <p className="mt-4 text-card-title">{r.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {r.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden>•</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 grid grid-cols-3 gap-2 rounded-lg border border-border bg-background p-3">
                  {r.preview.map(([l, v]) => (
                    <div key={l}>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {l}
                      </p>
                      <p className="font-display text-sm font-bold">{v}</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid divide-y divide-border rounded-xl border border-border bg-card text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            ["15+", "Departments"],
            ["500+", "Students onboarded"],
            ["98%", "Attendance accuracy"],
          ].map(([v, l]) => (
            <div key={l} className="px-6 py-8">
              <p className="font-display text-3xl font-extrabold text-primary">{v}</p>
              <p className="mt-1 text-sm text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <h2 className="font-display text-3xl font-bold tracking-tight">What campuses say</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-xl border border-border bg-card p-6 shadow-card"
            >
              <Quote className="h-5 w-5 text-primary" aria-hidden />
              <blockquote className="mt-3 text-sm leading-relaxed">{t.quote}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Avatar name={t.name} />
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-foreground">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex flex-col items-center gap-5 rounded-2xl bg-primary px-6 py-14 text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-bold">Ready to modernize your campus?</h2>
          <p className="max-w-xl text-sm text-primary-foreground/85">
            Create an account and explore the student, faculty and admin experiences with realistic
            sample data.
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/register">
              Create your account <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </PublicLayout>
  );
}
