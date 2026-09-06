import {
  LayoutDashboard,
  CalendarCheck,
  FileText,
  GraduationCap,
  CalendarDays,
  Briefcase,
  Sparkles,
  Bell,
  User,
  Users,
  BookOpen,
  Library,
  Building2,
  Layers,
  Megaphone,
  BarChart3,
  ScrollText,
  Settings,
  ClipboardList,
  FolderOpen,
} from "lucide-react";

export const navConfig = {
  student: [
    {
      items: [
        { label: "Dashboard", to: "/student/dashboard", icon: LayoutDashboard },
        { label: "Attendance", to: "/student/attendance", icon: CalendarCheck },
        { label: "Assignments", to: "/student/assignments", icon: FileText },
        { label: "Academics", to: "/student/academics", icon: GraduationCap },
        { label: "Timetable", to: "/student/timetable", icon: CalendarDays },
        { label: "Placements", to: "/student/placements", icon: Briefcase },
        { label: "Events", to: "/student/events", icon: Sparkles },
        { label: "Notifications", to: "/student/notifications", icon: Bell },
      ],
    },
    { group: "Account", items: [{ label: "Profile", to: "/student/profile", icon: User }] },
  ],
  faculty: [
    {
      items: [
        { label: "Dashboard", to: "/faculty/dashboard", icon: LayoutDashboard },
        { label: "My Classes", to: "/faculty/classes", icon: BookOpen },
        { label: "Attendance", to: "/faculty/attendance", icon: CalendarCheck },
        { label: "Assignments", to: "/faculty/assignments", icon: FileText },
        { label: "Materials", to: "/faculty/materials", icon: FolderOpen },
        { label: "Students", to: "/faculty/students", icon: Users },
        { label: "Announcements", to: "/faculty/announcements", icon: Megaphone },
        { label: "Events", to: "/faculty/events", icon: Sparkles },
        { label: "Notifications", to: "/faculty/notifications", icon: Bell },
      ],
    },
    { group: "Account", items: [{ label: "Profile", to: "/faculty/profile", icon: User }] },
  ],
  admin: [
    { items: [{ label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard }] },
    {
      group: "Users",
      items: [
        { label: "Students", to: "/admin/students", icon: Users },
        { label: "Faculty", to: "/admin/faculty", icon: GraduationCap },
      ],
    },
    {
      group: "Academics",
      items: [{ label: "Departments", to: "/admin/departments", icon: Building2 }],
    },
    {
      group: "Engagement",
      items: [
        { label: "Placements", to: "/admin/placements", icon: Briefcase },
        { label: "Announcements", to: "/admin/announcements", icon: Megaphone },
        { label: "Events", to: "/admin/events", icon: Sparkles },
        { label: "Notifications", to: "/admin/notifications", icon: Bell },
      ],
    },
    {
      group: "System",
      items: [
        { label: "Settings", to: "/admin/settings", icon: Settings },
        { label: "Profile", to: "/admin/profile", icon: User },
      ],
    },
  ],
};

export const roleLabel = { student: "Student", faculty: "Faculty", admin: "Administrator" };
