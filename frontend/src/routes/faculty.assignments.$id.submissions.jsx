import { useEffect, useState } from "react";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { FileCheck2 } from "lucide-react";
import { toast } from "sonner";
import { Field, FormModal, PageHeader, Panel, PanelHeader, StatCard, StatusBadge } from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { assignmentsApi, submissionsApi } from "@/api/campusApi";
import { assignmentTone, formatDate } from "@/utils";

export const Route=createFileRoute("/faculty/assignments/$id/submissions")({head:()=>({meta:[{title:"Assignment Submissions — CampusConnect"}]}),component:Submissions});
function Submissions(){
 const {id}=useParams({from:"/faculty/assignments/$id/submissions"});const [assignment,setAssignment]=useState(null),[rows,setRows]=useState([]),[grading,setGrading]=useState(null),[marks,setMarks]=useState(""),[feedback,setFeedback]=useState("");
 const load=async()=>{try{const[a,s]=await Promise.all([assignmentsApi.get(id),submissionsApi.list()]);setAssignment(a);setRows((s||[]).filter(x=>x.assignmentId===Number(id)))}catch(e){toast.error(e.response?.data?.message||"Unable to load submissions")}};
 useEffect(()=>{load()},[id]);
 const cols=[{key:"student",header:"Student",render:s=><div><p className="font-medium">Student #{s.studentId}</p><p className="text-caption">{formatDate(s.submittedAt)}</p></div>},{key:"file",header:"File",render:s=>s.fileUrl||"—"},{key:"marks",header:"Marks",render:s=>s.marks!=null?`${s.marks}/${assignment?.maxMarks}`:"—"},{key:"status",header:"Status",render:s=><StatusBadge label={s.marks!=null?"Graded":"Submitted"} tone={s.marks!=null?"success":"warning"}/>},{key:"action",header:"",render:s=><Button variant="ghost" size="sm" onClick={()=>{setGrading(s);setMarks(String(s.marks??""));setFeedback(s.feedback||"")}}>Grade</Button>}];
 async function grade(){const n=Number(marks);if(!assignment||Number.isNaN(n)||n<0||n>assignment.maxMarks)return toast.error(`Enter marks between 0 and ${assignment?.maxMarks}`);try{await submissionsApi.update(grading.id,{...grading,marks:n,feedback,status:"Graded"});toast.success("Grade saved");setGrading(null);load()}catch(e){toast.error(e.response?.data?.message||"Unable to save grade")}}
 if(!assignment)return <div className="p-8 text-center">Loading…</div>;
 return <><PageHeader title={assignment.title} description={`${assignment.course} · ${assignment.section} · max ${assignment.maxMarks} marks`} breadcrumb={[{label:"Faculty",to:"/faculty/dashboard"},{label:"Assignments",to:"/faculty/assignments"},{label:"Submissions"}]}/><div className="grid gap-4 sm:grid-cols-3"><StatCard label="Submitted" value={rows.length} icon={FileCheck2} tone="primary"/><StatCard label="Graded" value={rows.filter(r=>r.marks!=null).length} icon={FileCheck2} tone="success"/><StatCard label="Pending grading" value={rows.filter(r=>r.marks==null).length} icon={FileCheck2} tone="warning"/></div><Panel className="mt-6"><PanelHeader title="Submissions" description="Live student submissions"/><DataTable columns={cols} rows={rows} caption="Student submissions"/></Panel><FormModal open={!!grading} onOpenChange={v=>!v&&setGrading(null)} title={`Grade submission #${grading?.id||""}`} description={`Maximum ${assignment.maxMarks} marks`} submitLabel="Save grade" onSubmit={grade}><Field label="Marks"><Input type="number" min="0" max={assignment.maxMarks} value={marks} onChange={e=>setMarks(e.target.value)}/></Field><Field label="Feedback"><Textarea rows={4} value={feedback} onChange={e=>setFeedback(e.target.value)}/></Field></FormModal></>;
}
