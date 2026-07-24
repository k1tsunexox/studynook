import { SubjectForm } from "@/features/subjects/components/subject-form";
import { SubjectList } from "@/features/subjects/components/subject-list";
import { getCurrentSubjects } from "@/features/subjects/services/subject.service";

export default async function SubjectsPage() {
  const subjects = await getCurrentSubjects();

  return (
    <main className="mx-auto max-w-4xl space-y-7 pb-10">
      <div>
        <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Subjects
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Manage your enrolled subjects.
        </p>
      </div>

      <SubjectForm />
      <SubjectList subjects={subjects} />
    </main>
  );
}
