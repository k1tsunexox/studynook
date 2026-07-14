import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <AppSidebar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
