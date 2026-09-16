import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Award, GraduationCap, TrendingUp } from "lucide-react";
import { PageHeader, Panel, PanelHeader, StatCard, StatusBadge } from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { ChartCard, SimpleLineChart } from "@/components/charts";
import { resultsApi, marksApi, getCurrentSession } from "@/api/campusApi";
import { toast } from "sonner";

export const Route=createFileRoute("/student/academics")({head:()=>({meta:[{title:"Academics — CampusConnect"}]}),component:Academics});
function Academics(){
 const [results,setResults]=useState([]),[marks,setMarks]=useState([]);const session=getCurrentSession();const userId=Number(session?.id);const studentId=Number(session?.profileId || session?.studentId);
 useEffect(()=>{Promise.all([resultsApi.list(),marksApi.list()]).then(([r,m])=>{const rid=studentId||userId;setResults((r||[]).filter(x=>Number(x.studentId)===rid));setMarks((m||[]).filter(x=>Number(x.studentId)===rid))}).catch(e=>toast.error(e.response?.data?.message||"Unable to load academics"))},[studentId,userId]);
 const current=results.length?results[results.length-1]:null;const cols=[{key:"subject",header:"Subject",render:m=><div><p className="font-medium">{m.subject}</p><p className="text-caption">Semester {m.semester}</p></div>},{key:"marks",header:"Marks",render:m=>`${m.marks}/${m.maxMarks}`},{key:"grade",header:"Grade",render:m=><StatusBadge label={m.grade||"—"} tone="info"/>}];
 return <><PageHeader title="Academics" description="Live results and subject marks." breadcrumb={[{label:"Student",to:"/student/dashboard"},{label:"Academics"}]}/><div className="grid gap-4 sm:grid-cols-3"><StatCard label="Current CGPA" value={current?.cgpa??"—"} icon={GraduationCap} tone="primary"/><StatCard label="Current semester" value={current?`Sem ${current.semester}`:"—"} icon={Award} tone="purple"/><StatCard label="Previous SGPA" value={results.length>1?results[results.length-2].sgpa:"—"} icon={TrendingUp} tone="success"/></div><div className="mt-5"><ChartCard title="SGPA trend" description="Saved semester results"><SimpleLineChart data={results.map(r=>({semester:`Sem ${r.semester}`,sgpa:r.sgpa}))} xKey="semester" yKey="sgpa"/></ChartCard></div><Panel className="mt-5"><PanelHeader title="Subject marks" description="Live marks from faculty/admin"/><DataTable columns={cols} rows={marks} caption="Subject marks"/></Panel></>;
}
