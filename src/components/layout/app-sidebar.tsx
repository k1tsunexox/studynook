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

const links = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/subjects",
    label: "Subjects",
    icon: BookOpen,
  },
  {
    href: "/notes",
    label: "Notes",
    icon: NotebookPen,
  },
  {
    href: "/assignments",
    label: "Assignments",
    icon: ClipboardList,
  },
  {
    href: "/exams",
    label: "Exams",
    icon: GraduationCap,
  },
  {
    href: "/calendar",
    label: "Calendar",
    icon: CalendarDays,
  },
  {
    href: "/documents",
    label: "Documents",
    icon: FileText,
  },
  {
    href: "/flashcards",
    label: "Flashcards",
    icon: Brain,
  },
  {
    href: "/search",
    label: "Search",
    icon: Search,
  },
  {
    href: "/pomodoro",
    label: "Pomodoro",
    icon: Timer,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-[#E7E2D9] bg-[#F3EEE7] lg:flex lg:flex-col">
      <div className="border-b border-[#E7E2D9] p-8">
        <h1 className="text-3xl font-bold text-sky-700">StudyNook</h1>

        <p className="mt-1 text-sm text-slate-500">Student Workspace</p>
      </div>

      <nav className="flex-1 space-y-2 p-5">
        {links.map((link) => {
          const Icon = link.icon;

          const active =
            pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-sky-500 text-white shadow"
                  : "text-slate-600 hover:bg-white"
              }`}
            >
              <Icon className="h-5 w-5" />

              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
