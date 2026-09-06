import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin } from "lucide-react";
import { EmptyState, PageHeader, Panel, PanelHeader, StatusBadge } from "@/components/common";
import { timetableApi } from "@/api/campusApi";
import { toast } from "sonner";

export const Route=createFileRoute("/student/timetable")({head:()=>({meta:[{title:"Timetable — CampusConnect"}]}),component:Timetable});
const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function Timetable(){
 const [view,setView]=useState("Today"),[rows,setRows]=useState([]);const todayName=days[Math.min(Math.max(new Date().getDay()-1,0),5)];
 useEffect(()=>{timetableApi.list().then(setRows).catch(e=>toast.error(e.response?.data?.message||"Unable to load timetable"))},[]);
 const time=r=>`${r.startTime||""}${r.endTime?` - ${r.endTime}`:""}`;
 const today=rows.filter(c=>c.day===todayName);
 return <><PageHeader title="Timetable" description={`Live class schedule · ${todayName}`} breadcrumb={[{label:"Student",to:"/student/dashboard"},{label:"Timetable"}]} actions={<div className="flex gap-1 rounded-lg bg-muted p-1">{["Today","Week"].map(v=><button key={v} onClick={()=>setView(v)} className={`rounded-md px-3 py-1.5 text-sm font-medium ${view===v?"bg-card":"text-muted-foreground"}`}>{v}</button>)}</div>}/>{view==="Today"?<Panel><PanelHeader title={`${todayName}'s classes`} description={`${today.length} scheduled`}/>{today.length?<ul className="divide-y divide-border">{today.map((c,i)=><li key={c.id} className="flex flex-wrap items-center gap-4 px-5 py-4"><span className="w-32 shrink-0 text-sm font-medium">{time(c)}</span><div className="min-w-0 flex-1"><p className="font-medium">{c.course}</p><p className="text-caption flex gap-3"><span>{c.faculty}</span><span><MapPin className="mr-1 inline h-3 w-3"/>{c.room}</span></p></div><StatusBadge label={i===0?"Up next":"Upcoming"} tone={i===0?"success":"neutral"} icon={Clock}/></li>)}</ul>:<EmptyState title="No classes today" description="No timetable entries are scheduled."/>}</Panel>:<div className="overflow-x-auto rounded-xl border border-border bg-card shadow-card"><div className="grid min-w-[900px] grid-cols-6 divide-x divide-border">{days.map(d=><div key={d}><div className="border-b border-border px-4 py-3 text-sm font-semibold">{d}</div><ul className="space-y-3 p-3">{rows.filter(c=>c.day===d).map(c=><li key={c.id} className="rounded-lg border border-border p-3"><p className="text-xs font-semibold text-primary">{time(c)}</p><p className="mt-1 text-sm font-medium">{c.course}</p><p className="text-caption">{c.faculty}</p><p className="text-caption">{c.room}</p></li>)}{!rows.some(c=>c.day===d)&&<li className="text-caption">No classes</li>}</ul></div>)}</div></div>}</>;
}
