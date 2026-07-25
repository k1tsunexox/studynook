import { AssignmentForm } from "@/features/assignments/components/assignment-form";
import { AssignmentList } from "@/features/assignments/components/assignment-list";
import {
  getCurrentAssignments,
  getCurrentSubjects,
} from "@/features/assignments/services/assignment.service";

export default async function AssignmentsPage() {
  const [assignments, subjects] = await Promise.all([
    getCurrentAssignments(),
    getCurrentSubjects(),
  ]);
  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="border-b border-[#e7e2d9] pb-7">
        <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
          Workspace
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
          Assignments
        </h1>
        <p className="mt-1.5 text-sm font-light tracking-wide text-[#9c9890]">
          Track coursework and deadlines.
        </p>
      </div>
      <AssignmentForm subjects={subjects} />
      <AssignmentList assignments={assignments} />
    </main>
  );
}
