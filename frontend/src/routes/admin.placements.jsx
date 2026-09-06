import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, PanelHeader, StatCard, StatusBadge, FormModal, Field, ConfirmationModal } from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { placementsApi, placementApplicationsApi } from "@/api/campusApi";
import { formatDate } from "@/utils";

export const Route=createFileRoute("/admin/placements")({head:()=>({meta:[{title:"Placement Drives — CampusConnect"}]}),component:AdminPlacements});
const blank={company:"",role:"",location:"",packageLpa:0,driveDate:"",deadline:"",eligibility:"",status:"Open"};
function AdminPlacements(){
 const [drives,setDrives]=useState([]),[apps,setApps]=useState([]),[open,setOpen]=useState(false),[form,setForm]=useState(blank),[remove,setRemove]=useState(null);
 const load=async()=>{try{const[d,a]=await Promise.all([placementsApi.list(),placementApplicationsApi.list()]);setDrives(d||[]);setApps(a||[])}catch(e){toast.error(e.response?.data?.message||"Unable to load placements")}};
 useEffect(()=>{load()},[]);
 const cols=[
 {key:"company",header:"Company",render:d=><div><p className="font-medium">{d.company}</p><p className="text-caption">{d.role}</p></div>},
 {key:"package",header:"Package",render:d=>`${d.packageLpa||0} LPA`},{key:"eligibility",header:"Eligibility",render:d=>d.eligibility||"—"},
 {key:"date",header:"Drive date",render:d=>formatDate(d.driveDate)},{key:"applicants",header:"Applicants",render:d=>apps.filter(a=>a.driveId===d.id).length},
 {key:"status",header:"Status",render:d=><StatusBadge label={d.status||"Open"} tone={d.status==="Open"?"success":"neutral"}/>},
 {key:"actions",header:"",render:d=><Button variant="ghost" size="sm" className="text-destructive" onClick={()=>setRemove(d)}><Trash2 className="h-4 w-4"/></Button>}];
 async function save(){try{await placementsApi.create({...form,packageLpa:Number(form.packageLpa)||0});toast.success("Placement drive created");setOpen(false);setForm(blank);load()}catch(e){toast.error(e.response?.data?.message||"Unable to create drive")}}
 async function del(){try{await placementsApi.remove(remove.id);toast.success("Placement drive deleted");setRemove(null);load()}catch(e){toast.error(e.response?.data?.message||"Unable to delete drive")}}
 return <>
 <PageHeader title="Placements" description="Recruiter drives and student applications." breadcrumb={[{label:"Admin",to:"/admin/dashboard"},{label:"Placements"}]} actions={<Button onClick={()=>setOpen(true)}><Plus className="h-4 w-4"/> Create Drive</Button>}/>
 <div className="grid gap-4 sm:grid-cols-3"><StatCard label="Active drives" value={drives.filter(d=>d.status==="Open").length} icon={Briefcase} tone="primary"/><StatCard label="Applications" value={apps.length} icon={Briefcase} tone="purple"/><StatCard label="Selected" value={apps.filter(a=>a.status==="Selected").length} icon={Briefcase} tone="success"/></div>
 <Panel className="mt-6"><PanelHeader title="Drives" description="Live data from the backend"/><DataTable columns={cols} rows={drives} pageSize={10} caption="Placement drives"/></Panel>
 <FormModal open={open} onOpenChange={setOpen} wide title="Create placement drive" submitLabel="Create drive" onSubmit={save}>
  <div className="grid gap-4 sm:grid-cols-2"><Field label="Company"><Input value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></Field><Field label="Role"><Input value={form.role} onChange={e=>setForm({...form,role:e.target.value})}/></Field><Field label="Location"><Input value={form.location} onChange={e=>setForm({...form,location:e.target.value})}/></Field><Field label="Package (LPA)"><Input type="number" step="0.1" value={form.packageLpa} onChange={e=>setForm({...form,packageLpa:e.target.value})}/></Field><Field label="Drive date"><Input type="date" value={form.driveDate} onChange={e=>setForm({...form,driveDate:e.target.value})}/></Field><Field label="Deadline"><Input type="date" value={form.deadline} onChange={e=>setForm({...form,deadline:e.target.value})}/></Field><Field label="Eligibility"><Input value={form.eligibility} onChange={e=>setForm({...form,eligibility:e.target.value})}/></Field><Field label="Status"><select className="h-9 w-full rounded-md border border-input bg-card px-3 text-sm" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}><option>Open</option><option>Closed</option></select></Field></div>
 </FormModal>
 <ConfirmationModal open={remove} onOpenChange={v=>!v&&setRemove(null)} destructive title="Delete placement drive?" description={`Delete ${remove?.company||""}?`} confirmLabel="Delete" onConfirm={del}/>
 </>;
}
