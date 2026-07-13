"use client";

import { ExternalLink, FileText, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { deleteDocumentAction } from "../actions/document";

interface Document {
  id: string;
  subjectId: string;
  title: string;
  fileUrl: string;
  createdAt: Date;
  subject?: {
    code: string;
    title: string;
  };
}

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this document?")) return;

    startTransition(async () => {
      await deleteDocumentAction(id);
      router.refresh();
    });
  };

  if (documents.length === 0) {
    return (
      <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
        No documents found. Link your first file above!
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {documents.map((doc) => (
        <Card key={doc.id} className="flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
            <div className="space-y-1">
              <CardTitle className="line-clamp-1 flex items-center gap-2 text-lg">
                <FileText className="text-muted-foreground h-5 w-5" />
                {doc.title}
              </CardTitle>
              {doc.subject && (
                <CardDescription>{doc.subject.code}</CardDescription>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-destructive/10 hover:text-destructive h-8 w-8 shrink-0"
              onClick={() => handleDelete(doc.id)}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Delete document</span>
            </Button>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col justify-between pt-4">
            <p className="text-muted-foreground text-xs">
              Added {new Date(doc.createdAt).toLocaleDateString()}
            </p>
            <Button
              asChild
              variant="secondary"
              className="mt-4 w-full"
              size="sm"
            >
              <a href={doc.fileUrl} target="_blank" rel="noreferrer noopener">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Document
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
