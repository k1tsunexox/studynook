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
    <main className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="border-b border-[#e7e2d9] pb-7">
        <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
          Workspace
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
          Exams
        </h1>
        <p className="mt-1.5 text-sm font-light tracking-wide text-[#9c9890]">
          Upcoming exams and exam history.
        </p>
      </div>
      <ExamForm subjects={subjects} />
      <ExamList exams={exams} />
    </main>
  );
}
