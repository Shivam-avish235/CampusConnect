import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CalendarCheck, CheckCircle2, ListChecks, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Callout, PageHeader, Panel, PanelHeader, StatCard, StatusBadge } from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { ChartCard, SimpleBarChart } from "@/components/charts";
import { attendanceApi, getCurrentSession } from "@/api/campusApi";
import { pct, attendanceStatus } from "@/utils";

export const Route=createFileRoute("/student/attendance")({head:()=>({meta:[{title:"My Attendance — CampusConnect"}]}),component:StudentAttendance});
function StudentAttendance(){
 const [records,setRecords]=useState([]),[loading,setLoading]=useState(true),[month,setMonth]=useState("All months");
 const session=getCurrentSession(),studentId=Number(session?.profileId || session?.id);
 useEffect(()=>{attendanceApi.list().then(data=>setRecords((data||[]).filter(r=>r.studentId===studentId))).catch(e=>toast.error(e.response?.data?.message||"Unable to load attendance")).finally(()=>setLoading(false))},[]);
 const rows=useMemo(()=>{const map=new Map();records.forEach(r=>{const key=r.course||"Unknown";const x=map.get(key)||{id:key,subject:key,code:key,attended:0,total:0};x.total++;if(r.present)x.attended++;map.set(key,x)});return [...map.values()]},[records]);
 const attended=rows.reduce((s,r)=>s+r.attended,0),total=rows.reduce((s,r)=>s+r.total,0),overall=pct(attended,total),low=rows.filter(r=>pct(r.attended,r.total)<75);
 const cols=[{key:"subject",header:"Subject",render:r=><p className="font-medium">{r.subject}</p>},{key:"attended",header:"Attended",render:r=>r.attended},{key:"total",header:"Total classes",render:r=>r.total},{key:"pct",header:"Percentage",render:r=><span className="font-semibold">{pct(r.attended,r.total)}%</span>},{key:"status",header:"Status",render:r=>{const s=attendanceStatus(pct(r.attended,r.total));return <StatusBadge label={s.label} tone={s.tone} icon={s.tone==="success"?CheckCircle2:s.tone==="warning"?AlertTriangle:XCircle}/>}}];
 return <><PageHeader title="My Attendance" description="Live subject-wise attendance from the backend." breadcrumb={[{label:"Student",to:"/student/dashboard"},{label:"Attendance"}]}/>{loading?<div className="p-8 text-center text-sm text-muted-foreground">Loading attendance…</div>:<><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Overall attendance" value={`${overall}%`} icon={CalendarCheck} tone={overall>=75?"success":"warning"}/><StatCard label="Classes attended" value={attended} icon={CheckCircle2} tone="success"/><StatCard label="Total classes" value={total} icon={ListChecks} tone="primary"/><StatCard label="Low attendance subjects" value={low.length} icon={AlertTriangle} tone={low.length?"danger":"success"}/></div>{low.length?<div className="mt-4 space-y-3">{low.map(l=><Callout key={l.id} tone="danger" title={`${l.subject} — ${pct(l.attended,l.total)}% attendance`}>Attend more classes to reach the 75% requirement.</Callout>)}</div>:null}<div className="mt-6"><ChartCard title="Attendance by subject" description="Calculated from saved attendance records"><SimpleBarChart data={rows.map(r=>({subject:r.code,percent:pct(r.attended,r.total)}))} xKey="subject" yKey="percent"/></ChartCard></div><Panel className="mt-5"><PanelHeader title="Detailed records" description={`${rows.length} subjects · ${month}`}/><DataTable columns={cols} rows={rows} pageSize={10} caption="Subject-wise attendance"/></Panel></>}</>;
}
