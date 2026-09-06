import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, FileText, Send } from "lucide-react";
import { toast } from "sonner";
import { EmptyState, Field, FilterSelect, FormModal, PageHeader, Panel, PanelHeader, SearchBar, StatCard, StatusBadge } from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { assignmentsApi, submissionsApi, getCurrentSession } from "@/api/campusApi";
import { formatDate, assignmentTone } from "@/utils";

export const Route=createFileRoute("/student/assignments")({head:()=>({meta:[{title:"My Assignments — CampusConnect"}]}),component:StudentAssignments});
const tabs=["All","Pending","Submitted","Graded","Overdue"];
function StudentAssignments(){
 const [rows,setRows]=useState([]),[subs,setSubs]=useState([]),[tab,setTab]=useState("All"),[query,setQuery]=useState(""),[detail,setDetail]=useState(null),[submitFor,setSubmitFor]=useState(null),[comment,setComment]=useState("");
 const studentId=Number(getCurrentSession()?.profileId || getCurrentSession()?.id);
 const load=async()=>{try{const[a,s]=await Promise.all([assignmentsApi.list(),submissionsApi.list()]);setRows(a||[]);setSubs((s||[]).filter(x=>x.studentId===studentId))}catch(e){toast.error(e.response?.data?.message||"Unable to load assignments")}};
 useEffect(()=>{load()},[]);
 const normalized=useMemo(()=>rows.map(a=>{const s=subs.find(x=>x.assignmentId===a.id);const overdue=!s&&a.dueDate&&new Date(a.dueDate)<new Date();return {...a,status:s?(s.marks!=null||s.status==="Graded"?"Graded":"Submitted"):(overdue?"Overdue":"Pending"),submission:s};}),[rows,subs]);
 const filtered=normalized.filter(a=>(tab==="All"||a.status===tab)&&((a.title||"").toLowerCase().includes(query.toLowerCase())||(a.course||"").toLowerCase().includes(query.toLowerCase())));
 const count=s=>normalized.filter(a=>a.status===s).length;
 const cols=[{key:"title",header:"Assignment",render:a=><div><p className="font-medium">{a.title}</p><p className="text-caption">{a.course} · {a.faculty||"Faculty"}</p></div>},{key:"due",header:"Due date",render:a=>formatDate(a.dueDate)},{key:"marks",header:"Marks",render:a=>a.submission?.marks!=null?`${a.submission.marks}/${a.maxMarks}`:`— / ${a.maxMarks}`},{key:"status",header:"Status",render:a=><StatusBadge label={a.status} tone={assignmentTone[a.status]||"info"}/>}];
 async function submit(){try{await submissionsApi.create({assignmentId:submitFor.id,studentId,submittedAt:new Date().toISOString(),fileUrl:"",feedback:comment,status:"Submitted"});toast.success("Assignment submitted");setSubmitFor(null);setComment("");load()}catch(e){toast.error(e.response?.data?.message||"Unable to submit assignment")}}
 return <><PageHeader title="Assignments" description="Live assignments from your faculty." breadcrumb={[{label:"Student",to:"/student/dashboard"},{label:"Assignments"}]}/><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"><StatCard label="Total" value={normalized.length} icon={FileText} tone="primary"/><StatCard label="Pending" value={count("Pending")} icon={FileText} tone="warning"/><StatCard label="Submitted" value={count("Submitted")} icon={Send} tone="primary"/><StatCard label="Graded" value={count("Graded")} icon={CheckCircle2} tone="success"/><StatCard label="Overdue" value={count("Overdue")} icon={FileText} tone="danger"/></div><Panel className="mt-6"><div className="flex flex-wrap items-center gap-3 border-b border-border p-4"><div role="tablist" className="flex flex-wrap gap-1 rounded-lg bg-muted p-1">{tabs.map(t=><button key={t} onClick={()=>setTab(t)} className={`rounded-md px-3 py-1.5 text-sm font-medium ${tab===t?"bg-card shadow-card":"text-muted-foreground"}`}>{t}</button>)}</div><SearchBar value={query} onChange={setQuery} placeholder="Search assignments…"/></div><DataTable columns={cols} rows={filtered} onRowClick={setDetail} caption="Assignment list" empty={<EmptyState title="No assignments" description="Your assignment list is empty."/>}/></Panel><FormModal open={!!submitFor} onOpenChange={v=>!v&&setSubmitFor(null)} title={`Submit: ${submitFor?.title||""}`} description="Submit your work to the backend." submitLabel="Submit assignment" onSubmit={submit}><Field label="Comment (optional)"><Textarea rows={4} value={comment} onChange={e=>setComment(e.target.value)}/></Field></FormModal>{detail?<Panel className="mt-5"><PanelHeader title={detail.title} description={`${detail.course||""} · due ${formatDate(detail.dueDate)}`}/><div className="p-5 space-y-3 text-sm"><p>{detail.description}</p><p>Maximum marks: <b>{detail.maxMarks}</b></p>{detail.submission?<p>Submission status: <b>{detail.status}</b></p>:detail.status==="Pending"||detail.status==="Overdue"?<Button onClick={()=>setSubmitFor(detail)}>Submit work</Button>:null}</div></Panel>:null}</>;
}
