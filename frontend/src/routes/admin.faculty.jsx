import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, GraduationCap, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  Avatar,
  ConfirmationModal,
  Field,
  FilterSelect,
  FormModal,
  PageHeader,
  Panel,
  SearchBar,
  StatCard,
  StatusBadge,
} from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
const departments = [{ code: "CSE" }, { code: "ECE" }, { code: "IT" }, { code: "ME" }];
import { createFaculty, getFaculty, setUserStatus } from "@/api/adminApi";

export const Route = createFileRoute("/admin/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty Management — CampusConnect" },
      {
        name: "description",
        content: "Manage faculty records, designations and allocations across departments.",
      },
    ],
  }),
  component: AdminFaculty,
});

const blank = {
  facultyId: "",
  name: "",
  email: "",
  department: "CSE",
  designation: "Assistant Professor",
};

function AdminFaculty() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All departments");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [remove, setRemove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const loadFaculty = async () => {
    try {
      setLoading(true);
      const data = await getFaculty();
      setRows(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to load faculty");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaculty();
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter((f) => {
        const name = (f.name || "").toLowerCase();
        const id = (f.facultyId || "").toLowerCase();
        return (
          (name.includes(query.toLowerCase()) || id.includes(query.toLowerCase())) &&
          (dept === "All departments" || (f.department || "") === dept)
        );
      }),
    [rows, query, dept],
  );

  const columns = [
    {
      key: "name",
      header: "Faculty",
      render: (f) => (
        <div className="flex items-center gap-3">
          <Avatar name={f.name} size="sm" />
          <div>
            <p className="font-medium">{f.name}</p>
            <p className="text-caption">{f.facultyId}</p>
          </div>
        </div>
      ),
    },
    { key: "dept", header: "Department", render: (f) => f.department || "—" },
    { key: "designation", header: "Designation", render: (f) => f.designation || "—" },
    {
      key: "courses",
      header: "Courses",
      render: (f) => f.courses ? f.courses : "—",
    },
    {
      key: "sections",
      header: "Sections",
      render: (f) => f.sections ? f.sections : "—",
    },
    {
      key: "status",
      header: "Status",
      render: (f) => (
        <StatusBadge
          label={f.status || "Active"}
          tone={(f.status || "Active") === "Active" ? "success" : "neutral"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      mobileHidden: true,
      render: (f) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          disabled={!f.userId}
          onClick={() => setRemove(f)}
          aria-label={`Deactivate ${f.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  async function submitFaculty() {
    if (!form.name.trim() || !form.facultyId.trim() || !form.email.trim()) {
      toast.error("Name, faculty ID and email are required");
      return;
    }

    try {
      setSaving(true);

      const result = await createFaculty(form);

      await loadFaculty();

      setOpen(false);
      setForm(blank);

      setCredentials({
        name: result.name,
        email: result.email,
        password: result.temporaryPassword,
      });

      toast.success("Faculty account created successfully");
    } catch (error) {
      console.error(error);

      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        (status === 409
          ? "Email or faculty ID is already registered."
          : status === 403
            ? "Only an administrator can create faculty accounts."
            : "Unable to create faculty.");

      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function deactivateFaculty() {
    if (!remove?.userId) {
      toast.error("This faculty member is missing a linked login account.");
      return;
    }

    try {
      await setUserStatus(remove.userId, false);
      setRows((current) =>
        current.map((f) =>
          f.id === remove.id ? { ...f, status: "Inactive" } : f,
        ),
      );
      toast.success(`${remove.name} has been deactivated`);
      setRemove(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to deactivate faculty");
    }
  }

  async function copyPassword() {
    if (!credentials?.password) return;
    await navigator.clipboard.writeText(credentials.password);
    toast.success("Temporary password copied");
  }

  return (
    <>
      <PageHeader
        title="Faculty"
        description="Teaching staff, designations and allocations."
        breadcrumb={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Faculty" }]}
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add Faculty
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Faculty members" value={rows.length} icon={GraduationCap} tone="primary" />
        <StatCard
          label="Departments covered"
          value={new Set(rows.map((f) => f.department).filter(Boolean)).size}
          icon={GraduationCap}
          tone="purple"
        />
        <StatCard
          label="Active"
          value={rows.filter((f) => (f.status || "Active") === "Active").length}
          icon={GraduationCap}
          tone="success"
        />
      </div>

      <Panel className="mt-6">
        <div className="flex flex-wrap items-end gap-3 border-b border-border p-4">
          <SearchBar value={query} onChange={setQuery} placeholder="Search faculty…" />
          <FilterSelect
            label="Department"
            value={dept}
            onChange={setDept}
            options={["All departments", ...departments.map((d) => d.code)]}
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Loading faculty from MySQL…
          </div>
        ) : (
          <DataTable columns={columns} rows={filtered} pageSize={10} caption="Faculty records" />
        )}
      </Panel>

      <FormModal
        open={open}
        onOpenChange={setOpen}
        wide
        title="Add faculty"
        description="The backend will create the login and generate a secure temporary password."
        submitLabel={saving ? "Creating..." : "Create faculty"}
        onSubmit={submitFaculty}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="fname">
            <Input id="fname" value={form.name} disabled={saving}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>

          <Field label="Faculty ID" htmlFor="fid">
            <Input id="fid" value={form.facultyId} disabled={saving}
              onChange={(e) => setForm({ ...form, facultyId: e.target.value })} />
          </Field>

          <Field label="Email" htmlFor="femail">
            <Input id="femail" type="email" value={form.email} disabled={saving}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>

          <Field label="Department" htmlFor="fdept">
            <Input id="fdept" value={form.department} disabled={saving}
              onChange={(e) => setForm({ ...form, department: e.target.value })} />
          </Field>

          <Field label="Designation" htmlFor="fdesig">
            <Input id="fdesig" value={form.designation} disabled={saving}
              onChange={(e) => setForm({ ...form, designation: e.target.value })} />
          </Field>
        </div>
      </FormModal>

      <ConfirmationModal
        open={remove}
        onOpenChange={(v) => !v && setRemove(null)}
        destructive
        title="Deactivate faculty?"
        description={`${remove?.name} will no longer be able to log in. Their database record will remain intact.`}
        confirmLabel="Deactivate"
        onConfirm={deactivateFaculty}
      />

      <Dialog
        open={!!credentials}
        onOpenChange={(openState) => !openState && setCredentials(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Faculty account created</DialogTitle>
            <DialogDescription>
              Give these login credentials to the faculty member. The temporary password is shown only now.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 rounded-lg border bg-muted/40 p-4">
            <div>
              <p className="text-xs text-muted-foreground">Faculty</p>
              <p className="font-medium">{credentials?.name}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium">{credentials?.email}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">Temporary password</p>
              <div className="mt-1 flex items-center gap-2">
                <Input readOnly value={credentials?.password || ""} />
                <Button type="button" variant="outline" onClick={copyPassword}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setCredentials(null)}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
