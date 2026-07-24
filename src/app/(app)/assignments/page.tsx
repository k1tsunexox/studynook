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
    <main className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Assignments
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Track and manage your coursework deadlines.
        </p>
      </div>
      <AssignmentForm subjects={subjects} />
      <AssignmentList assignments={assignments} />
    </main>
  );
}
