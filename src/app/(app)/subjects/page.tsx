import { SubjectForm } from "@/features/subjects/components/subject-form";
import { SubjectList } from "@/features/subjects/components/subject-list";
import { getCurrentSubjects } from "@/features/subjects/services/subject.service";

export default async function SubjectsPage() {
  const subjects = await getCurrentSubjects();

  return (
    <main className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Subjects</h1>

        <p className="text-muted-foreground">Manage your enrolled subjects.</p>
      </div>

      <SubjectForm />

      <SubjectList subjects={subjects} />
    </main>
  );
}
