import { useEffect, useState } from "react";
import { CalendarDays, MapPin, Plus, Trash2, Users } from "lucide-react";
import { toast } from "sonner";
import { ConfirmationModal, Field, FormModal, PageHeader, Panel, StatCard, StatusBadge } from "@/components/common";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { eventsApi, eventRegistrationsApi, getCurrentSession } from "@/api/campusApi";
import { formatDate } from "@/utils";

const blank = { title:"", description:"", date:"", time:"10:00", venue:"", category:"Technical", capacity:100, status:"Upcoming" };

export function EventsManagerPage({ role }) {
  const [rows,setRows]=useState([]); const [registrations,setRegistrations]=useState([]);
  const [open,setOpen]=useState(false); const [form,setForm]=useState(blank); const [remove,setRemove]=useState(null); const [loading,setLoading]=useState(true);

  const load=async()=>{
    try { setLoading(true); const [events, regs]=await Promise.all([eventsApi.list(),eventRegistrationsApi.list()]); setRows(events||[]); setRegistrations(regs||[]); }
    catch(e){toast.error(e.response?.data?.message||"Unable to load events");} finally{setLoading(false);}
  };
  useEffect(()=>{load()},[]);

  async function save(){
    if(!form.title.trim()||!form.date||!form.venue.trim()) return toast.error("Title, date and venue are required");
    try{
      const session=getCurrentSession();
      await eventsApi.create({...form, organizer:session?.name||(role==="admin"?"Administrator":"Faculty"), capacity:Number(form.capacity)||0});
      toast.success("Event created"); setOpen(false); setForm(blank); await load();
    }catch(e){toast.error(e.response?.data?.message||"Unable to create event")}
  }
  async function del(){try{await eventsApi.remove(remove.id);toast.success("Event deleted");setRemove(null);await load()}catch(e){toast.error(e.response?.data?.message||"Unable to delete event")}}

  return <>
    <PageHeader title="Events" description="Organise campus events and track registrations." breadcrumb={[{label:role==="admin"?"Admin":"Faculty",to:`/${role}/dashboard`},{label:"Events"}]} actions={<Button onClick={()=>setOpen(true)}><Plus className="h-4 w-4"/> Create Event</Button>}/>
    <div className="grid gap-4 sm:grid-cols-3">
      <StatCard label="Events" value={rows.length} icon={CalendarDays} tone="primary"/>
      <StatCard label="Registrations" value={registrations.length} icon={Users} tone="success"/>
      <StatCard label="Upcoming" value={rows.filter(e=>e.status==="Upcoming").length} icon={CalendarDays} tone="warning"/>
    </div>
    {loading?<div className="mt-6 p-8 text-center text-sm text-muted-foreground">Loading events…</div>:
      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {rows.map(e=><Panel key={e.id}>
          <div className="flex items-start justify-between gap-3 p-5 pb-3"><div><StatusBadge label={e.category||"General"} tone="info"/><h3 className="mt-2 text-base font-semibold">{e.title}</h3></div><Button variant="ghost" size="sm" className="text-destructive" onClick={()=>setRemove(e)}><Trash2 className="h-4 w-4"/></Button></div>
          <div className="px-5 pb-5"><p className="text-sm text-muted-foreground line-clamp-2">{e.description}</p>
            <div className="mt-4 space-y-2 text-sm"><p><CalendarDays className="mr-2 inline h-4 w-4"/>{formatDate(e.date)} · {e.time}</p><p><MapPin className="mr-2 inline h-4 w-4"/>{e.venue}</p><p><Users className="mr-2 inline h-4 w-4"/>{registrations.filter(r=>r.eventId===e.id).length} registrations · capacity {e.capacity||"—"}</p></div>
          </div>
        </Panel>)}
        {!rows.length&&<Panel><div className="p-8 text-center text-sm text-muted-foreground">No events yet.</div></Panel>}
      </div>}
    <FormModal open={open} onOpenChange={setOpen} wide title="Create event" description="Event details are stored in the backend database." submitLabel="Create event" onSubmit={save}>
      <Field label="Title"><Input value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/></Field>
      <Field label="Description"><Textarea rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></Field>
      <div className="grid gap-4 sm:grid-cols-2"><Field label="Date"><Input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></Field><Field label="Time"><Input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></Field><Field label="Venue"><Input value={form.venue} onChange={e=>setForm({...form,venue:e.target.value})}/></Field><Field label="Capacity"><Input type="number" min="1" value={form.capacity} onChange={e=>setForm({...form,capacity:e.target.value})}/></Field><Field label="Category"><Input value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/></Field></div>
    </FormModal>
    <ConfirmationModal open={remove} onOpenChange={v=>!v&&setRemove(null)} destructive title="Delete event?" description={`“${remove?.title||""}” will be removed.`} confirmLabel="Delete" onConfirm={del}/>
  </>;
}
