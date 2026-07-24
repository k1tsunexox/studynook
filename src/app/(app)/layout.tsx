import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <AppSidebar />

        <main className="flex min-h-screen flex-1 flex-col overflow-y-auto">
          {/* Topbar strip */}
          <div className="sticky top-0 z-10 flex h-12 items-center border-b border-[#E7E2D9] bg-[#F7F4EE]/80 px-6 backdrop-blur-sm lg:px-8">
            <div className="ml-auto flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-slate-400">Online</span>
            </div>
          </div>

          <div className="flex-1 px-6 py-7 lg:px-10 lg:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
