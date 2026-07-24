import { SubjectForm } from "@/features/subjects/components/subject-form";
import { SubjectList } from "@/features/subjects/components/subject-list";
import { getCurrentSubjects } from "@/features/subjects/services/subject.service";

export default async function SubjectsPage() {
  const subjects = await getCurrentSubjects();

  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Subjects
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your enrolled subjects.
        </p>
      </div>
      <SubjectForm />
      <SubjectList subjects={subjects} />
    </main>
  );
}
