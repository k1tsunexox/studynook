import { redirect } from "next/navigation";

import { getDashboardData } from "@/features/dashboard/services/dashboard.service";

export default async function DashboardPage() {
  const data = await getDashboardData();

  if (!data) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-5xl space-y-6 p-8">
      <div>
        <h1 className="text-4xl font-bold">
          Welcome back, {data.displayName} 👋
        </h1>

        <p className="text-muted-foreground mt-2">Ready to study today?</p>
      </div>
    </main>
  );
}
