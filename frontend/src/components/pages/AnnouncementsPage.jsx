import { useEffect, useMemo, useState } from "react";
import { Megaphone, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  ConfirmationModal, EmptyState, Field, FilterSelect, FormModal, PageHeader,
  Panel, SearchBar, StatCard, StatusBadge,
} from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { announcementsApi, getCurrentSession } from "@/api/campusApi";
import { formatDate } from "@/utils";

const priorityTone = { High: "danger", Normal: "info", Low: "neutral" };
const blank = { title: "", content: "", audience: "ALL", priority: "Normal", published: true };

function normalize(a) {
  return {
    ...a,
    message: a.content || "",
    status: a.published ? "Published" : "Draft",
    date: a.publishDate || a.createdAt || new Date().toISOString(),
  };
}

export function AnnouncementsPage({ role }) {
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All statuses");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [remove, setRemove] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const data = await announcementsApi.list();
      setRows(Array.isArray(data) ? data.map(normalize) : []);
    } catch (e) {
      toast.error(e.response?.data?.message || "Unable to load announcements");
    } finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => rows.filter(a =>
    (a.title || "").toLowerCase().includes(query.toLowerCase()) &&
    (status === "All statuses" || a.status === status)
  ), [rows, query, status]);

  const audiences = role === "admin"
    ? ["ALL", "STUDENTS", "FACULTY", "EVERYONE", "CSE"]
    : ["CSE-3A", "CSE-3B", "ALL"];

  const columns = [
    { key: "title", header: "Announcement", render: a => <div><p className="font-medium">{a.title}</p><p className="text-caption line-clamp-1">{a.message}</p></div> },
    { key: "audience", header: "Audience", render: a => a.audience || "ALL" },
    { key: "author", header: "Author", render: a => a.author || "—" },
    { key: "date", header: "Date", render: a => formatDate(a.date) },
    { key: "priority", header: "Priority", render: a => <StatusBadge label={a.priority || "Normal"} tone={priorityTone[a.priority] || "info"} /> },
    { key: "status", header: "Status", render: a => <StatusBadge label={a.status} tone={a.status === "Published" ? "success" : "warning"} /> },
    { key: "actions", header: "Actions", mobileHidden: true, render: a => (
      <div className="flex gap-1">
        <Button variant="ghost" size="sm" onClick={() => { setEditing(a); setForm({
          title: a.title || "", content: a.content || a.message || "", audience: a.audience || "ALL",
          priority: a.priority || "Normal", published: a.published ?? true
        }); setOpen(true); }}><Pencil className="h-4 w-4" /></Button>
        <Button variant="ghost" size="sm" className="text-destructive" onClick={() => setRemove(a)}><Trash2 className="h-4 w-4" /></Button>
      </div>
    )},
  ];

  async function save() {
    if (!form.title.trim() || !form.content.trim()) return toast.error("Title and content are required");
    try {
      const session = getCurrentSession();
      const payload = {
        ...form,
        author: session?.name || (role === "admin" ? "Administrator" : "Faculty"),
        publishDate: new Date().toISOString().slice(0, 10),
      };
      if (editing) await announcementsApi.update(editing.id, payload);
      else await announcementsApi.create(payload);
      toast.success(editing ? "Announcement updated" : "Announcement published");
      setOpen(false); setEditing(null); setForm(blank); await load();
    } catch (e) { toast.error(e.response?.data?.message || "Unable to save announcement"); }
  }

  async function removeAnnouncement() {
    try { await announcementsApi.remove(remove.id); toast.success("Announcement deleted"); setRemove(null); await load(); }
    catch (e) { toast.error(e.response?.data?.message || "Unable to delete announcement"); }
  }

  return <>
    <PageHeader title="Announcements" description="Create and manage campus notices." breadcrumb={[{ label: role === "admin" ? "Admin" : "Faculty", to: `/${role}/dashboard` }, { label: "Announcements" }]}
      actions={<Button onClick={() => { setEditing(null); setForm(blank); setOpen(true); }}><Plus className="h-4 w-4" /> Create Announcement</Button>} />
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="Total" value={rows.length} icon={Megaphone} tone="primary" />
      <StatCard label="Published" value={rows.filter(r => r.published).length} icon={Megaphone} tone="success" />
      <StatCard label="Drafts" value={rows.filter(r => !r.published).length} icon={Megaphone} tone="warning" />
    </div>
    <Panel className="mt-6">
      <div className="flex flex-wrap items-end gap-3 border-b border-border p-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search announcements…" />
        <FilterSelect label="Status" value={status} onChange={setStatus} options={["All statuses", "Published", "Draft"]} />
      </div>
      {loading ? <div className="p-8 text-center text-sm text-muted-foreground">Loading announcements…</div> :
        <DataTable columns={columns} rows={filtered} pageSize={10} caption="Announcements" empty={<EmptyState title="No announcements" description="Create the first campus notice." action={<Button onClick={() => setOpen(true)}>Create announcement</Button>} />} />}
    </Panel>
    <FormModal open={open} onOpenChange={setOpen} wide title={editing ? "Edit announcement" : "Create announcement"} description="This is saved in the CampusConnect database." submitLabel={editing ? "Save changes" : "Publish"} onSubmit={save}>
      <Field label="Title" htmlFor="atitle"><Input id="atitle" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} /></Field>
      <Field label="Content" htmlFor="acontent"><Textarea id="acontent" rows={5} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} /></Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Audience" htmlFor="aaudience"><select id="aaudience" value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })} className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">{audiences.map(a => <option key={a}>{a}</option>)}</select></Field>
        <Field label="Priority" htmlFor="apriority"><select id="apriority" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm">{["High","Normal","Low"].map(a => <option key={a}>{a}</option>)}</select></Field>
        <Field label="Published" htmlFor="apublished"><select id="apublished" value={String(form.published)} onChange={e => setForm({ ...form, published: e.target.value === "true" })} className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm"><option value="true">Yes</option><option value="false">No</option></select></Field>
      </div>
    </FormModal>
    <ConfirmationModal open={remove} onOpenChange={v => !v && setRemove(null)} destructive title="Delete announcement?" description={`“${remove?.title || ""}” will be removed from the database.`} confirmLabel="Delete" onConfirm={removeAnnouncement} />
  </>;
}
