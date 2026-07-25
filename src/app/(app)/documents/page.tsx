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
    <main className="mx-auto max-w-4xl space-y-8 pb-10">
      <div className="border-b border-[#e7e2d9] pb-7">
        <p className="text-[10px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
          Workspace
        </p>
        <h1 className="mt-2 text-3xl font-light tracking-tight text-[#1a1916]">
          Documents
        </h1>
        <p className="mt-1.5 text-sm font-light tracking-wide text-[#9c9890]">
          PDFs, lecture slides, and study links.
        </p>
      </div>
      <div className="mx-auto max-w-2xl">
        <DocumentForm subjects={subjects} />
      </div>
      <div>
        <p className="mb-4 text-[9px] font-medium tracking-[0.22em] text-[#b0aa9f] uppercase">
          Your files
        </p>
        <DocumentList documents={documents} />
      </div>
    </main>
  );
}
