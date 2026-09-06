import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader, Panel, PanelHeader, StatCard, StatusBadge } from "@/components/common";
import { DataTable } from "@/components/common/DataTable";
import { departmentsApi } from "@/api/campusApi";

export const Route=createFileRoute("/admin/departments")({head:()=>({meta:[{title:"Departments — CampusConnect"}]}),component:Departments});
function Departments(){const [rows,setRows]=useState([]);useEffect(()=>{departmentsApi.list().then(setRows).catch(e=>toast.error(e.response?.data?.message||"Unable to load departments"))},[]);const cols=[{key:"name",header:"Department",render:d=><div><p className="font-medium">{d.name}</p><p className="text-caption">{d.code}</p></div>},{key:"hod",header:"Head",render:d=>d.hod||"—"},{key:"students",header:"Students",render:d=>d.students},{key:"faculty",header:"Faculty",render:d=>d.faculty},{key:"status",header:"Status",render:d=><StatusBadge label={d.status||"Active"} tone={d.status==="Active"?"success":"neutral"}/>}];return <><PageHeader title="Departments" description="Live academic department data." breadcrumb={[{label:"Admin",to:"/admin/dashboard"},{label:"Departments"}]}/><div className="grid gap-4 sm:grid-cols-3"><StatCard label="Departments" value={rows.length} icon={Building2} tone="primary"/><StatCard label="Students" value={rows.reduce((s,d)=>s+(d.students||0),0)} icon={Building2} tone="success"/><StatCard label="Faculty" value={rows.reduce((s,d)=>s+(d.faculty||0),0)} icon={Building2} tone="purple"/></div><Panel className="mt-6"><PanelHeader title="All departments" description="Database records"/><DataTable columns={cols} rows={rows} caption="Departments"/></Panel></>;}
