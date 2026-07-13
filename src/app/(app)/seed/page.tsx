import { redirect } from "next/navigation";

import { seedUESemester } from "@/features/academic/actions/seed-ue-data";

export default function SeedPage() {
  async function seed() {
    "use server";

    await seedUESemester();

    redirect("/subjects");
  }

  return (
    <main className="mx-auto mt-20 max-w-md">
      <form action={seed}>
        <button
          type="submit"
          className="w-full rounded-lg bg-black px-6 py-3 text-white"
        >
          Import UE Schedule
        </button>
      </form>
    </main>
  );
}
