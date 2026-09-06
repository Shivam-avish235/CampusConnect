import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, Briefcase, CheckCircle2, IndianRupee, MapPin, Send, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, PanelHeader, StatCard, StatusBadge } from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { placementsApi, placementApplicationsApi, getCurrentSession } from "@/api/campusApi";
import { formatDate } from "@/utils";

export const Route=createFileRoute("/student/placements")({head:()=>({meta:[{title:"Placements — CampusConnect"}]}),component:Placements});
const stages=["Applied","Shortlisted","Interview","Selected","Rejected"];
function Placements(){
 const [tab,setTab]=useState("Available Drives"),[drives,setDrives]=useState([]),[apps,setApps]=useState([]),[loading,setLoading]=useState(true);
 const session=getCurrentSession();const studentId=Number(session?.profileId || session?.id);
 const load=async()=>{try{setLoading(true);const[d,a]=await Promise.all([placementsApi.list(),placementApplicationsApi.list()]);setDrives(d||[]);setApps((a||[]).filter(x=>x.studentId===studentId))}catch(e){toast.error(e.response?.data?.message||"Unable to load placements")}finally{setLoading(false)}};
 useEffect(()=>{load()},[]);
 const applied=new Set(apps.map(a=>a.driveId));
 async function apply(d){try{await placementApplicationsApi.create({driveId:d.id,studentId,appliedAt:new Date().toISOString(),status:"Applied"});toast.success(`Application submitted to ${d.company}`);await load()}catch(e){toast.error(e.response?.data?.message||"Unable to submit application")}}
 const cols=[{key:"drive",header:"Company",render:a=>{const d=drives.find(x=>x.id===a.driveId);return <div><p className="font-medium">{d?.company||`Drive #${a.driveId}`}</p><p className="text-caption">{d?.role||""}</p></div>}},{key:"date",header:"Applied on",render:a=>formatDate(a.appliedAt)},{key:"status",header:"Stage",render:a=><StatusBadge label={a.status||"Applied"} tone={a.status==="Selected"?"success":a.status==="Rejected"?"danger":"info"}/>}];
 return <>
 <PageHeader title="Placements" description="Browse live drives and track your applications." breadcrumb={[{label:"Student",to:"/student/dashboard"},{label:"Placements"}]}/>
 <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Open drives" value={drives.filter(d=>d.status==="Open").length} icon={Briefcase} tone="primary"/><StatCard label="Applied" value={apps.length} icon={Send} tone="purple"/><StatCard label="Shortlisted" value={apps.filter(a=>["Shortlisted","Interview"].includes(a.status)).length} icon={Users} tone="warning"/><StatCard label="Selected" value={apps.filter(a=>a.status==="Selected").length} icon={Award} tone="success"/></div>
 <div role="tablist" className="my-6 flex flex-wrap gap-1 rounded-lg bg-muted p-1">{["Available Drives","My Applications","Status"].map(t=><button key={t} onClick={()=>setTab(t)} className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab===t?"bg-card shadow-card":"text-muted-foreground"}`}>{t}</button>)}</div>
 {loading?<div className="p-8 text-center text-sm text-muted-foreground">Loading placements…</div>:tab==="Available Drives"?<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{drives.filter(d=>d.status==="Open").map(d=><article key={d.id} className="rounded-xl border border-border bg-card p-5 shadow-card"><div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold">{d.company}</h2><p className="text-caption">{d.role}</p></div><StatusBadge label={applied.has(d.id)?"Applied":"Open"} tone={applied.has(d.id)?"purple":"success"} icon={applied.has(d.id)?CheckCircle2:undefined}/></div><dl className="mt-4 grid grid-cols-2 gap-3 text-sm"><div><dt className="text-caption">Package</dt><dd className="font-medium"><IndianRupee className="mr-1 inline h-3.5 w-3.5"/>{d.packageLpa} LPA</dd></div><div><dt className="text-caption">Location</dt><dd className="font-medium"><MapPin className="mr-1 inline h-3.5 w-3.5"/>{d.location}</dd></div><div><dt className="text-caption">Drive date</dt><dd className="font-medium">{formatDate(d.driveDate)}</dd></div><div><dt className="text-caption">Deadline</dt><dd className="font-medium">{formatDate(d.deadline)}</dd></div></dl><Button className="mt-5 w-full" disabled={applied.has(d.id)} onClick={()=>apply(d)}>{applied.has(d.id)?"Already applied":"Apply now"}</Button></article>)}</div>:tab==="My Applications"?<Panel><PanelHeader title="My applications" description={`${apps.length} applications`}/><DataTable columns={cols} rows={apps} caption="Placement applications"/></Panel>:<Panel><PanelHeader title="Placement pipeline" description="Current status of your applications"/><div className="grid gap-4 p-5 md:grid-cols-5">{stages.map(s=><div key={s} className="rounded-lg border border-border bg-muted/30 p-3"><div className="flex justify-between"><p className="text-xs font-semibold uppercase text-muted-foreground">{s}</p><span className="font-bold">{apps.filter(a=>a.status===s).length}</span></div>{apps.filter(a=>a.status===s).map(a=><p key={a.id} className="mt-2 rounded border bg-card p-2 text-sm">{drives.find(d=>d.id===a.driveId)?.company||`Drive #${a.driveId}`}</p>)}</div>)}</div></Panel>}
 </>;
}
