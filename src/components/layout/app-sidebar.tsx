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

function NavLink({
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
      className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${
        active
          ? "bg-sky-500/10 text-sky-700"
          : "text-slate-500 hover:bg-[#EAE6DF] hover:text-slate-800"
      }`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 transition-colors ${
          active ? "text-sky-600" : "text-slate-400 group-hover:text-slate-600"
        }`}
      />
      {label}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-[#E7E2D9] bg-[#F3EEE7] lg:flex">
      {/* Brand */}
      <div className="px-5 py-5">
        <Link href="/dashboard" className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold tracking-tight text-sky-700">
            StudyNook
          </span>
          <span className="rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wider text-sky-600 uppercase">
            Beta
          </span>
        </Link>
        <p className="mt-0.5 text-xs text-slate-400">Student Workspace</p>
      </div>

      <div className="mx-4 mb-3 h-px bg-[#E7E2D9]" />

      {/* Primary nav */}
      <nav className="flex-1 overflow-y-auto px-3">
        <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
          Workspace
        </p>
        <div className="space-y-0.5">
          {primaryLinks.map((link) => (
            <NavLink key={link.href} {...link} active={isActive(link.href)} />
          ))}
        </div>

        <div className="my-4 h-px bg-[#E7E2D9]" />

        <p className="mb-1.5 px-3 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
          Tools
        </p>
        <div className="space-y-0.5">
          {utilityLinks.map((link) => (
            <NavLink key={link.href} {...link} active={isActive(link.href)} />
          ))}
        </div>
      </nav>

      {/* Footer hint */}
      <div className="px-5 py-4">
        <p className="text-[11px] text-slate-400">
          &copy; {new Date().getFullYear()} StudyNook
        </p>
      </div>
    </aside>
  );
}
