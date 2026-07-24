import { DocumentForm } from "@/features/documents/components/document-form";
import { DocumentList } from "@/features/documents/components/document-list";
import { getCurrentUserDocuments } from "@/features/documents/services/document.service";
import { getCurrentSubjects } from "@/features/subjects/services/subject.service";

export default async function DocumentsPage() {
  const [subjects, documents] = await Promise.all([
    getCurrentSubjects(),
    getCurrentUserDocuments(),
  ]);

  return (
    <main className="mx-auto max-w-4xl space-y-8 pb-12">
      <div className="border-b border-[#E7E2D9] pb-6">
        <p className="text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Workspace
        </p>
        <h1 className="mt-1.5 text-[1.75rem] font-semibold tracking-tight text-slate-900">
          Documents & Lectures
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Manage your PDFs, lecture slides, and study links.
        </p>
      </div>
      <div className="mx-auto max-w-2xl">
        <DocumentForm subjects={subjects} />
      </div>
      <div>
        <p className="mb-4 text-[10px] font-semibold tracking-[0.15em] text-slate-400 uppercase">
          Your files
        </p>
        <DocumentList documents={documents} />
      </div>
    </main>
  );
}
