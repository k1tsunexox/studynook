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
    <main className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Documents & Lectures</h1>
        <p className="text-muted-foreground">
          Manage your PDFs, lecture slides, and study links.
        </p>
      </div>

      <div className="mx-auto max-w-2xl">
        <DocumentForm subjects={subjects} />
      </div>

      <div className="pt-6">
        <h2 className="mb-4 text-2xl font-semibold">Your Files</h2>
        <DocumentList documents={documents} />
      </div>
    </main>
  );
}
