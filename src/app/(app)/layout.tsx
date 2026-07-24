import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <div className="mx-auto flex min-h-screen max-w-[1700px]">
        <AppSidebar />
        <main className="flex min-h-screen flex-1 flex-col overflow-y-auto">
          <div className="flex-1 px-7 py-8 lg:px-10 lg:py-9">{children}</div>
        </main>
      </div>
    </div>
  );
}
