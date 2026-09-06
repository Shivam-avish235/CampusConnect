import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Copy, Plus, Trash2, Users } from "lucide-react";
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
import { createStudent, getStudents, setUserStatus } from "@/api/adminApi";

export const Route = createFileRoute("/admin/students")({
  head: () => ({
    meta: [
      { title: "Student Management — CampusConnect" },
      {
        name: "description",
        content: "Add, search, filter and manage every student record across departments, years and sections.",
      },
    ],
  }),
  component: AdminStudents,
});

const blank = {
  rollNo: "",
  name: "",
  email: "",
  department: "CSE",
  section: "CSE-3A",
};

function AdminStudents() {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All departments");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(blank);
  const [remove, setRemove] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setRows(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filtered = useMemo(
    () =>
      rows.filter((s) => {
        const name = (s.name || "").toLowerCase();
        const roll = (s.rollNo || "").toLowerCase();
        const department = s.department || "";
        return (
          (name.includes(query.toLowerCase()) || roll.includes(query.toLowerCase())) &&
          (dept === "All departments" || department === dept)
        );
      }),
    [rows, query, dept],
  );

  const columns = [
    {
      key: "name",
      header: "Student",
      render: (s) => (
        <div className="flex items-center gap-3">
          <Avatar name={s.name} size="sm" />
          <div>
            <p className="font-medium">{s.name}</p>
            <p className="text-caption">{s.rollNo}</p>
          </div>
        </div>
      ),
    },
    { key: "dept", header: "Department", render: (s) => s.department || "—" },
    { key: "section", header: "Section", render: (s) => s.section || "—" },
    {
      key: "cgpa",
      header: "CGPA",
      render: (s) => <span className="tabular-nums">{Number(s.cgpa || 0).toFixed(2)}</span>,
    },
    {
      key: "attendance",
      header: "Attendance",
      render: (s) => <span className="tabular-nums">{Number(s.attendance || 0)}%</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (s) => (
        <StatusBadge
          label={s.status || "Active"}
          tone={(s.status || "Active") === "Active" ? "success" : "neutral"}
        />
      ),
    },
    {
      key: "actions",
      header: "Actions",
      mobileHidden: true,
      render: (s) => (
        <Button
          variant="ghost"
          size="sm"
          className="text-destructive"
          disabled={!s.userId}
          onClick={() => setRemove(s)}
          aria-label={`Deactivate ${s.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  async function submitStudent() {
    if (!form.name.trim() || !form.rollNo.trim() || !form.email.trim()) {
      toast.error("Name, roll number and email are required");
      return;
    }

    try {
      setSaving(true);

      const result = await createStudent(form);

      // Reload from MySQL instead of manually inserting into React state.
      await loadStudents();

      setOpen(false);
      setForm(blank);

      // This password is returned only at creation time.
      setCredentials({
        name: result.name,
        email: result.email,
        password: result.temporaryPassword,
      });

      toast.success("Student account created successfully");
    } catch (error) {
      console.error(error);

      const status = error.response?.status;
      const message =
        error.response?.data?.message ||
        (status === 409
          ? "Email or roll number is already registered."
          : status === 403
            ? "Only an administrator can create students."
            : "Unable to create student.");

      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function deactivateStudent() {
    if (!remove?.userId) {
      toast.error("This student is missing a linked login account.");
      return;
    }

    try {
      await setUserStatus(remove.userId, false);
      setRows((current) =>
        current.map((s) =>
          s.id === remove.id ? { ...s, status: "Inactive" } : s,
        ),
      );
      toast.success(`${remove.name} has been deactivated`);
      setRemove(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Unable to deactivate student");
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
        title="Students"
        description="All enrolled students across departments."
        breadcrumb={[{ label: "Admin", to: "/admin/dashboard" }, { label: "Students" }]}
        actions={
          <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" /> Add Student
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total students" value={rows.length} icon={Users} tone="primary" />
        <StatCard
          label="Active"
          value={rows.filter((s) => (s.status || "Active") === "Active").length}
          icon={Users}
          tone="success"
        />
        <StatCard
          label="Attendance shortage"
          value={rows.filter((s) => Number(s.attendance || 0) < 75).length}
          icon={Users}
          tone="danger"
        />
      </div>

      <Panel className="mt-6">
        <div className="flex flex-wrap items-end gap-3 border-b border-border p-4">
          <SearchBar value={query} onChange={setQuery} placeholder="Search students…" />
          <FilterSelect
            label="Department"
            value={dept}
            onChange={setDept}
            options={["All departments", ...departments.map((d) => d.code)]}
          />
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            Loading students from MySQL…
          </div>
        ) : (
          <DataTable columns={columns} rows={filtered} pageSize={10} caption="Student records" />
        )}
      </Panel>

      <FormModal
        open={open}
        onOpenChange={setOpen}
        wide
        title="Add student"
        description="The backend will create the login and generate a secure temporary password."
        submitLabel={saving ? "Creating..." : "Create student"}
        onSubmit={submitStudent}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="sname">
            <Input id="sname" value={form.name} disabled={saving}
              onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </Field>

          <Field label="Roll number" htmlFor="sroll">
            <Input id="sroll" value={form.rollNo} disabled={saving}
              onChange={(e) => setForm({ ...form, rollNo: e.target.value })} />
          </Field>

          <Field label="Email" htmlFor="semail">
            <Input id="semail" type="email" value={form.email} disabled={saving}
              onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </Field>

          <Field label="Department" htmlFor="sdept">
            <Input id="sdept" value={form.department} disabled={saving}
              onChange={(e) => setForm({ ...form, department: e.target.value })} />
          </Field>

          <Field label="Section" htmlFor="ssec">
            <Input id="ssec" value={form.section} disabled={saving}
              onChange={(e) => setForm({ ...form, section: e.target.value })} />
          </Field>
        </div>
      </FormModal>

      <ConfirmationModal
        open={remove}
        onOpenChange={(v) => !v && setRemove(null)}
        destructive
        title="Deactivate student?"
        description={`${remove?.name} (${remove?.rollNo}) will no longer be able to log in. Their database record will remain intact.`}
        confirmLabel="Deactivate"
        onConfirm={deactivateStudent}
      />

      <Dialog
        open={!!credentials}
        onOpenChange={(openState) => !openState && setCredentials(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Student account created</DialogTitle>
            <DialogDescription>
              Give these login credentials to the student. The temporary password is shown only now.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 rounded-lg border bg-muted/40 p-4">
            <div>
              <p className="text-xs text-muted-foreground">Student</p>
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
