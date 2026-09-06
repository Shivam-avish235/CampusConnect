import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Field, PageHeader, Panel, PanelHeader } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Institution Settings — CampusConnect" },
      {
        name: "description",
        content:
          "Configure institution details, academic session, attendance thresholds and platform notification preferences.",
      },
      { property: "og:title", content: "Institution Settings — CampusConnect" },
      { property: "og:description", content: "Configure CampusConnect for your institution." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [name, setName] = useState("CampusConnect Institute of Technology");
  const [session, setSession] = useState("2026-2027");
  const [threshold, setThreshold] = useState("75");
  const [toggles, setToggles] = useState({ email: true, digest: false, selfRegister: true });

  return (
    <>
      <PageHeader
        title="Settings"
        description="Institution-wide configuration."
        breadcrumb={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Settings" }]}
      />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Institution profile" description="Shown across the platform" />
          <div className="space-y-4 p-5">
            <Field label="Institution name" htmlFor="iname">
              <Input id="iname" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Academic session" htmlFor="isess">
              <Input id="isess" value={session} onChange={(e) => setSession(e.target.value)} />
            </Field>
            <Field
              label="Minimum attendance (%)"
              htmlFor="ithresh"
              hint="Students below this are flagged for shortage."
            >
              <Input
                id="ithresh"
                type="number"
                min={0}
                max={100}
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
              />
            </Field>
            <Button onClick={() => toast.success("Settings saved")}>Save changes</Button>
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Platform preferences" description="Notifications and access" />
          <ul className="divide-y divide-border">
            {[
              ["email", "Email notifications", "Send email copies of announcements"],
              ["digest", "Weekly digest", "Summary of attendance and submissions every Monday"],
              [
                "selfRegister",
                "Allow student self-registration",
                "Students can create accounts with a valid roll number",
              ],
            ].map(([key, label, hint]) => (
              <li key={key} className="flex items-center justify-between gap-4 px-5 py-4">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-caption">{hint}</p>
                </div>
                <Switch
                  checked={toggles[key]}
                  aria-label={label}
                  onCheckedChange={(v) => {
                    setToggles((t) => ({ ...t, [key]: v }));
                    toast.success(`${label} ${v ? "enabled" : "disabled"}`);
                  }}
                />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
