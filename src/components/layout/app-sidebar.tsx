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
      aria-label={label}
      className={`group relative flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 ${
        active
          ? "bg-[#1a1916] text-white"
          : "text-[#9c9890] hover:bg-[#eae6df] hover:text-[#1a1916]"
      }`}
    >
      <Icon className="h-4.25 w-4.25 shrink-0" strokeWidth={active ? 2 : 1.5} />

      {/* Floating tooltip */}
      <span
        className="pointer-events-none absolute top-1/2 left-[calc(100%+10px)] z-100 -translate-y-1/2 rounded-md bg-[#1a1916] px-2.5 py-1.5 text-[10px] font-medium tracking-[0.12em] whitespace-nowrap text-white uppercase opacity-0 shadow-lg transition-all duration-150 group-hover:opacity-100"
        role="tooltip"
      >
        {label}
      </span>
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ── Fixed vertical rail — desktop ───────────────────── */}
      <aside className="fixed top-0 left-0 z-50 hidden h-screen w-16 flex-col items-center border-r border-[#e7e2d9] bg-[#F3EEE7] py-5 lg:flex">
        {/* Logomark */}
        <Link
          href="/dashboard"
          title="StudyNook"
          className="mb-6 flex h-9 w-9 items-center justify-center rounded-lg bg-[#1a1916] text-white transition hover:bg-[#37352f]"
        >
          <span className="text-[11px] font-semibold tracking-[0.08em]">
            SN
          </span>
        </Link>

        <div className="mb-3 h-px w-7 bg-[#e7e2d9]" />

        {/* Primary links */}
        <nav className="flex flex-1 flex-col items-center gap-1 overflow-y-auto px-3">
          {primaryLinks.map((link) => (
            <NavIcon key={link.href} {...link} active={isActive(link.href)} />
          ))}

          <div className="my-2 h-px w-7 bg-[#e7e2d9]" />

          {utilityLinks.map((link) => (
            <NavIcon key={link.href} {...link} active={isActive(link.href)} />
          ))}
        </nav>

        {/* Bottom dot indicator */}
        <div
          className="mt-4 h-1.5 w-1.5 rounded-full bg-emerald-400"
          title="Online"
        />
      </aside>

      {/* ── Bottom tab bar — mobile ──────────────────────────── */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-[#e7e2d9] bg-[#F3EEE7]/95 py-2 backdrop-blur-sm lg:hidden">
        {[...primaryLinks.slice(0, 4), utilityLinks[0], utilityLinks[3]].map(
          ({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`flex flex-col items-center gap-0.5 px-2 py-1 transition-colors ${
                  active ? "text-[#1a1916]" : "text-[#b0aa9f]"
                }`}
              >
                <Icon className="h-5 w-5" strokeWidth={active ? 2 : 1.5} />
                <span className="text-[9px] tracking-[0.08em] uppercase">
                  {label}
                </span>
              </Link>
            );
          },
        )}
      </nav>
    </>
  );
}
