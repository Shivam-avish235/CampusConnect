import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, MapPin, Users, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, StatCard, StatusBadge } from "@/components/common";
import { Button } from "@/components/ui/button";
import { eventsApi, eventRegistrationsApi, getCurrentSession } from "@/api/campusApi";
import { formatDate } from "@/utils";

export const Route=createFileRoute("/student/events")({head:()=>({meta:[{title:"Events — CampusConnect"}]}),component:StudentEvents});

function StudentEvents(){
 const [events,setEvents]=useState([]),[regs,setRegs]=useState([]),[loading,setLoading]=useState(true);
 const session=getCurrentSession(); const studentId=Number(session?.profileId || session?.id);
 const load=async()=>{try{setLoading(true);const [e,r]=await Promise.all([eventsApi.list(),eventRegistrationsApi.list()]);setEvents(e||[]);setRegs(r||[])}catch(e){toast.error(e.response?.data?.message||"Unable to load events")}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const mine=new Set(regs.filter(r=>r.studentId===studentId).map(r=>r.eventId));
 async function register(event){try{await eventRegistrationsApi.create({eventId:event.id,studentId,registeredAt:new Date().toISOString(),status:"Registered"});toast.success("Registered for event");await load()}catch(e){toast.error(e.response?.data?.message||"Unable to register")}}
 return <>
  <PageHeader title="Events" description="Discover and register for campus events." breadcrumb={[{label:"Student",to:"/student/dashboard"},{label:"Events"}]}/>
  <div className="grid gap-4 sm:grid-cols-3"><StatCard label="Upcoming events" value={events.filter(e=>e.status==="Upcoming").length} icon={CalendarDays} tone="primary"/><StatCard label="My registrations" value={mine.size} icon={CheckCircle2} tone="success"/><StatCard label="Total registrations" value={regs.length} icon={Users} tone="purple"/></div>
  {loading?<div className="mt-6 p-8 text-center text-sm text-muted-foreground">Loading events…</div>:
  <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{events.map(e=><Panel key={e.id}><div className="p-5"><StatusBadge label={e.category||"General"} tone="info"/><h2 className="mt-2 text-lg font-semibold">{e.title}</h2><p className="mt-2 text-sm text-muted-foreground">{e.description}</p><div className="mt-4 space-y-2 text-sm"><p><CalendarDays className="mr-2 inline h-4 w-4"/>{formatDate(e.date)} · {e.time}</p><p><MapPin className="mr-2 inline h-4 w-4"/>{e.venue}</p><p><Users className="mr-2 inline h-4 w-4"/>{regs.filter(r=>r.eventId===e.id).length}/{e.capacity||"∞"} registered</p></div><Button className="mt-5 w-full" disabled={mine.has(e.id)||e.status!=="Upcoming"} onClick={()=>register(e)}>{mine.has(e.id)?"Registered":"Register"}</Button></div></Panel>)}</div>}
 </>;
}
