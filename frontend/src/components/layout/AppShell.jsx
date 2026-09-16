import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, ChevronLeft, LogOut, Menu, Search, Settings, User, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { notificationsApi, getCurrentSession } from "@/api/campusApi";
import { Avatar } from "@/components/common";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Logo } from "@/components/layout/Logo";
import { navConfig, roleLabel } from "@/components/layout/nav";
import { useAuth } from "@/lib/auth";

export function AppShell({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [drawer, setDrawer] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const [unread, setUnread] = useState(0);

  useEffect(() => { setDrawer(false); }, [pathname]);
  useEffect(() => {
    let alive = true;
    const loadUnread = async () => {
      try {
        const d = await notificationsApi.list();
        const id = Number(getCurrentSession()?.id);
        const count = (d || []).filter(n => (!n.userId || Number(n.userId) === id) && !n.read).length;
        if (alive) setUnread(count);
      } catch { if (alive) setUnread(0); }
    };
    loadUnread();
    const timer = setInterval(loadUnread, 30000);
    return () => { alive = false; clearInterval(timer); };
  }, [pathname, user?.id]);

  const groups = useMemo(() => (user ? navConfig[user.role] : []), [user]);
  if (!user) return null;

  const nav = (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4" aria-label="Main">
      {groups.map((group, gi) => (
        <div key={group.group ?? gi}>
          {group.group && !collapsed ? <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{group.group}</p> : null}
          <ul className="space-y-1">{group.items.map((item) => { const active = pathname === item.to; return <li key={item.to}><Link to={item.to} title={item.label} aria-current={active ? "page" : undefined} className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", active ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground hover:bg-muted", collapsed && "justify-center px-2")}><item.icon className="h-4 w-4 shrink-0" aria-hidden />{!collapsed && <span className="truncate">{item.label}</span>}</Link></li>; })}</ul>
        </div>
      ))}
      <div className="mt-auto px-1 pt-2"><Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={() => { logout(); toast.success("Signed out"); navigate({ to: "/login" }); }}><LogOut className="h-4 w-4" aria-hidden /> {!collapsed && "Logout"}</Button></div>
    </nav>
  );

  return <div className="min-h-screen bg-background"><aside className={cn("fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar lg:flex", collapsed ? "w-[72px]" : "w-64")}><div className={cn("flex h-16 items-center border-b border-sidebar-border px-4", collapsed && "justify-center px-2")}><Link to="/" aria-label="CampusConnect home"><Logo compact={collapsed} /></Link></div>{nav}<button type="button" onClick={() => setCollapsed(c => !c)} className="flex items-center justify-center gap-2 border-t border-sidebar-border py-3 text-xs font-medium text-muted-foreground hover:bg-muted" aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}><ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} aria-hidden />{!collapsed && "Collapse"}</button></aside>
  {drawer ? <div className="fixed inset-0 z-50 lg:hidden"><div className="absolute inset-0 bg-foreground/40" onClick={() => setDrawer(false)} aria-hidden /><div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-sidebar shadow-pop"><div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4"><Logo /><button type="button" aria-label="Close menu" onClick={() => setDrawer(false)} className="rounded p-2 hover:bg-muted"><X className="h-5 w-5" /></button></div>{nav}</div></div> : null}
  <div className={cn("flex min-h-screen flex-col transition-[padding]", collapsed ? "lg:pl-[72px]" : "lg:pl-64")}><header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/90 px-4 backdrop-blur sm:px-6"><button type="button" aria-label="Open menu" className="rounded-md p-2 hover:bg-muted lg:hidden" onClick={() => setDrawer(true)}><Menu className="h-5 w-5" /></button><div className="relative hidden flex-1 md:block md:max-w-sm"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden /><form onSubmit={e => { e.preventDefault(); toast.info(query ? `Showing results for “${query}”` : "Type something to search"); }}><Input aria-label="Search CampusConnect" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search students, courses, drives…" className="pl-9" /></form></div><div className="ml-auto flex items-center gap-1 sm:gap-2"><ThemeToggle /><Link to={`/${user.role}/notifications`} className="relative rounded-md p-2 hover:bg-muted" aria-label={`Notifications, ${unread} unread`}><Bell className="h-5 w-5" aria-hidden />{unread > 0 ? <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">{unread}</span> : null}</Link><DropdownMenu><DropdownMenuTrigger className="flex items-center gap-2 rounded-full p-1 hover:bg-muted" aria-label="Account menu"><Avatar name={user.name} /><span className="hidden text-left sm:block"><span className="block text-sm font-semibold leading-tight">{user.name}</span><span className="block text-xs text-muted-foreground">{roleLabel[user.role]}</span></span></DropdownMenuTrigger><DropdownMenuContent align="end" className="w-56"><DropdownMenuLabel>{user.email}</DropdownMenuLabel><DropdownMenuSeparator /><DropdownMenuItem asChild><Link to={`/${user.role}/profile`}><User className="h-4 w-4" /> Profile</Link></DropdownMenuItem>{user.role === "admin" ? <DropdownMenuItem asChild><Link to="/admin/settings"><Settings className="h-4 w-4" /> Settings</Link></DropdownMenuItem> : null}<DropdownMenuSeparator /><DropdownMenuItem onClick={() => { logout(); toast.success("Signed out"); navigate({ to: "/login" }); }}> <LogOut className="h-4 w-4" /> Logout</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></header><main className="flex-1 px-4 py-6 sm:px-6 lg:px-8"><div className="mx-auto w-full max-w-7xl">{children}</div></main></div></div>;
}
