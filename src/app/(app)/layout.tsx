import type { ReactNode } from "react";

import { AppSidebar } from "@/components/layout/app-sidebar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F7F4EE]">
      <AppSidebar />

      {/* Offset for the fixed sidebar on desktop, bottom bar on mobile */}
      <main className="min-h-screen lg:pl-16">
        <div className="mx-auto max-w-[1600px] px-6 py-8 pb-24 lg:px-10 lg:py-10 lg:pb-10">
          {children}
        </div>
      </main>
    </div>
  );
}
