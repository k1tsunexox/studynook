import { NoteForm } from "@/features/notes/components/note-form";
import { NoteList } from "@/features/notes/components/note-list";
import { getCurrentUserNotes } from "@/features/notes/services/note.service";
import { getCurrentSubjects } from "@/features/subjects/services/subject.service";

export default async function NotesPage() {
  const [subjects, notes] = await Promise.all([
    getCurrentSubjects(),
    getCurrentUserNotes(),
  ]);

  return (
    <main className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Notes</h1>
        <p className="text-muted-foreground">
          Manage your study notes and link them to your subjects.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <NoteForm subjects={subjects} />
      </div>

      <div className="pt-6">
        <h2 className="mb-4 text-2xl font-semibold">Your Notes</h2>
        <NoteList notes={notes} />
      </div>
    </main>
  );
}
