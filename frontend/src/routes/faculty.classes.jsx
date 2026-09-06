import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { PageHeader, Panel, PanelHeader, StatusBadge } from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { timetableApi } from "@/api/campusApi";
import { toast } from "sonner";

export const Route=createFileRoute("/faculty/classes")({head:()=>({meta:[{title:"My Classes — CampusConnect"}]}),component:Classes});
function Classes(){
 const [tab,setTab]=useState("Today"),[rows,setRows]=useState([]);const day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
 useEffect(()=>{timetableApi.list().then(setRows).catch(e=>toast.error(e.response?.data?.message||"Unable to load classes"))},[]);
 const shown=tab==="Today"?rows.filter(r=>r.day===day):rows;
 const cols=[{key:"subject",header:"Course",render:c=><div><p className="font-medium">{c.course}</p><p className="text-caption">{c.faculty}</p></div>},{key:"section",header:"Section",render:c=>c.section},{key:"day",header:"Day",render:c=>c.day},{key:"time",header:"Time",render:c=>`${c.startTime||""} - ${c.endTime||""}`},{key:"room",header:"Room",render:c=>c.room},{key:"status",header:"Status",render:()=> <StatusBadge label="Scheduled" tone="info"/>}];
 return <><PageHeader title="My Classes" description="Live timetable entries assigned to faculty." breadcrumb={[{label:"Faculty",to:"/faculty/dashboard"},{label:"My Classes"}]} actions={<div className="flex gap-1 rounded-lg bg-muted p-1">{["Today","This Week"].map(t=><button key={t} onClick={()=>setTab(t)} className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab===t?"bg-card":"text-muted-foreground"}`}>{t}</button>)}</div>}/><Panel><PanelHeader title={tab==="Today"?"Today's schedule":"Weekly schedule"} description={`${shown.length} sessions`}/><DataTable columns={cols} rows={shown} pageSize={10} caption="Class schedule"/></Panel><div className="mt-4"><Button asChild><Link to="/faculty/attendance"><Users className="h-4 w-4"/> Mark attendance</Link></Button></div></>;
}
