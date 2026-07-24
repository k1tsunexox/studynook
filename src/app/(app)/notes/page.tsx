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
    <main className="mx-auto max-w-4xl space-y-7 pb-10">
      <div>
        <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Notes
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Manage your study notes and link them to your subjects.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <NoteForm subjects={subjects} />
      </div>

      <div className="pt-2">
        <h2 className="mb-4 text-sm font-semibold text-slate-700">
          Your Notes
        </h2>
        <NoteList notes={notes} />
      </div>
    </main>
  );
}
