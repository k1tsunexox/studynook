import { ExamForm } from "@/features/exams/components/exam-form";
import { ExamList } from "@/features/exams/components/exam-list";
import {
  getCurrentExams,
  getCurrentSubjects,
} from "@/features/exams/services/exam.service";

export default async function ExamsPage() {
  const [subjects, exams] = await Promise.all([
    getCurrentSubjects(),
    getCurrentExams(),
  ]);

  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Exams
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Upcoming exams and exam history.
        </p>
      </div>
      <ExamForm subjects={subjects} />
      <ExamList exams={exams} />
    </main>
  );
}
