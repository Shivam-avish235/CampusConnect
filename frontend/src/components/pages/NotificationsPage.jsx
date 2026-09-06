import { useEffect, useState } from "react";
import { Bell, BellOff, CheckCheck } from "lucide-react";
import { toast } from "sonner";
import { EmptyState, PageHeader, Panel, StatusBadge } from "@/components/common";
import { Button } from "@/components/ui/button";
import { notificationsApi, getCurrentSession } from "@/api/campusApi";

const cats=["All","Academic","Assignment","Placement","Announcement","System"];
const catTone={Academic:"info",Assignment:"warning",Placement:"purple",Announcement:"success",System:"neutral"};
export function NotificationsPage({role}){
 const [items,setItems]=useState([]),[cat,setCat]=useState("All");const userId=Number(getCurrentSession()?.profileId || getCurrentSession()?.id);
 const load=async()=>{try{const d=await notificationsApi.list();setItems((d||[]).filter(n=>!n.userId||n.userId===userId))}catch(e){toast.error(e.response?.data?.message||"Unable to load notifications")}};
 useEffect(()=>{load()},[]);
 const list=items.filter(n=>cat==="All"||n.type===cat),unread=items.filter(n=>!n.read).length;
 async function toggle(n){try{await notificationsApi.update(n.id,{...n,read:!n.read});load()}catch(e){toast.error("Unable to update notification")}}
 async function markAll(){try{await Promise.all(items.filter(n=>!n.read).map(n=>notificationsApi.update(n.id,{...n,read:true})));toast.success("All notifications marked as read");load()}catch(e){toast.error("Unable to mark notifications as read")}}
 return <><PageHeader title="Notifications" description={`${unread} unread of ${items.length} notifications`} breadcrumb={[{label:role[0].toUpperCase()+role.slice(1),to:`/${role}/dashboard`},{label:"Notifications"}]} actions={<Button variant="outline" disabled={!unread} onClick={markAll}><CheckCheck className="h-4 w-4"/> Mark all read</Button>}/><div role="tablist" className="mb-5 flex flex-wrap gap-1 rounded-lg bg-muted p-1">{cats.map(c=><button key={c} onClick={()=>setCat(c)} className={`rounded-md px-3 py-1.5 text-sm font-medium ${cat===c?"bg-card":"text-muted-foreground"}`}>{c}</button>)}</div><Panel>{list.length?<ul className="divide-y divide-border">{list.map(n=><li key={n.id} className={n.read?"":"bg-primary-soft/25"}><button type="button" className="flex w-full items-start gap-4 px-5 py-4 text-left hover:bg-muted/40" onClick={()=>toggle(n)}><span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">{n.read?<BellOff className="h-4 w-4"/>:<Bell className="h-4 w-4"/>}</span><span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="font-medium">{n.title}</span><StatusBadge label={n.type||"System"} tone={catTone[n.type]||"neutral"}/>{!n.read?<StatusBadge label="Unread" tone="danger"/>:null}</span><span className="mt-1 block text-sm text-muted-foreground">{n.message}</span><span className="text-caption mt-1 block">{n.createdAt||""}</span></span></button></li>)}</ul>:<EmptyState title="No notifications here" description="You have no notifications in this category."/>}</Panel></>;
}
