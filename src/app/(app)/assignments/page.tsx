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
    <main className="mx-auto max-w-4xl space-y-7 pb-10">
      <div>
        <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Assignments
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Track and manage your coursework deadlines.
        </p>
      </div>

      <AssignmentForm subjects={subjects} />
      <AssignmentList assignments={assignments} />
    </main>
  );
}
