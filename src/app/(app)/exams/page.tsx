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
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Exams</h1>
      </div>

      <ExamForm subjects={subjects} />

      <ExamList exams={exams} />
    </main>
  );
}
