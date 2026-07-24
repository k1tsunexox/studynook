"use client";

import {
  Bell,
  BookOpen,
  Brain,
  CalendarDays,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  NotebookPen,
  Search,
  Settings,
  Timer,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/notes", label: "Notes", icon: NotebookPen },
  { href: "/assignments", label: "Assignments", icon: ClipboardList },
  { href: "/exams", label: "Exams", icon: GraduationCap },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/flashcards", label: "Flashcards", icon: Brain },
];

const utilityLinks = [
  { href: "/search", label: "Search", icon: Search },
  { href: "/pomodoro", label: "Pomodoro", icon: Timer },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavIcon({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof BookOpen;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      title={label}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-150 ${
        active
          ? "bg-sky-600 text-white shadow-sm"
          : "text-slate-400 hover:bg-[#E8E2D9] hover:text-slate-700"
      }`}
    >
      <Icon className="h-[18px] w-[18px]" />
      {/* Tooltip */}
      <span className="pointer-events-none absolute left-14 z-50 rounded-lg bg-[#2a2825] px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100">
        {label}
        <span className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-[#2a2825]" />
      </span>
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="hidden w-16 shrink-0 flex-col items-center border-r border-[#E7E2D9] bg-[#F3EEE7] py-4 lg:flex">
      {/* Logo mark */}
      <Link
        href="/dashboard"
        className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm transition hover:bg-sky-700"
        title="StudyNook"
      >
        <span className="text-sm font-bold tracking-tight">SN</span>
      </Link>

      <div className="mx-auto mb-3 h-px w-8 bg-[#E7E2D9]" />

      {/* Primary nav */}
      <nav className="flex flex-1 flex-col items-center gap-1 px-2">
        {primaryLinks.map((link) => (
          <NavIcon key={link.href} {...link} active={isActive(link.href)} />
        ))}

        <div className="my-2 h-px w-8 bg-[#E7E2D9]" />

        {utilityLinks.map((link) => (
          <NavIcon key={link.href} {...link} active={isActive(link.href)} />
        ))}
      </nav>
    </aside>
  );
}
