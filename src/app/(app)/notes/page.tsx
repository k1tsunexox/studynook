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
    <main className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Notes
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your study notes and link them to your subjects.
        </p>
      </div>
      <div className="mx-auto max-w-2xl">
        <NoteForm subjects={subjects} />
      </div>
      <div>
        <p className="mb-4 text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Your notes
        </p>
        <NoteList notes={notes} />
      </div>
    </main>
  );
}
