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
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Assignments</h1>
      </div>

      <AssignmentForm subjects={subjects} />

      <AssignmentList assignments={assignments} />
    </main>
  );
}
