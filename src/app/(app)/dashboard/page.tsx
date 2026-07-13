import { QuickActions } from "@/features/dashboard/components/quick-actions";
import { StudyMetrics } from "@/features/dashboard/components/study-metrics";
import { getCurrentUserFlashcards } from "@/features/flashcards/services/flashcard.service";
import { getCurrentUserNotes } from "@/features/notes/services/note.service";
import { getNotifications } from "@/features/notifications/services/notification.service";
import { fetchTodayStats } from "@/features/pomodoro/services/pomodoro.service";

// TODO: Keep your existing imports here (e.g., AssignmentsList, getAssignments, etc.)

export default async function DashboardPage() {
  // Combine all your data fetching here
  const [
    focusMinutes,
    notes,
    flashcards,
    notifications /*, existingAssignments, etc. */,
  ] = await Promise.all([
    fetchTodayStats(),
    getCurrentUserNotes(),
    getCurrentUserFlashcards(),
    getNotifications(),
    // TODO: Put your existing getAssignments(), getClasses() calls here
  ]);

  // Explicit type added to fix the "implicit any" error
  const unreadCount = notifications.filter(
    (n: { isRead: boolean }) => !n.isRead,
  ).length;

  return (
    <main className="space-y-8 p-6">
      {/* 1. New Polished Top Section */}
      <StudyMetrics
        focusMinutes={focusMinutes}
        notesCount={notes.length}
        flashcardsCount={flashcards.length}
        unreadNotifications={unreadCount}
      />

      <QuickActions />

      {/* 2. Your Existing Sections */}
      {/* TODO: Put your existing JSX for Assignments, Classes, and Exams down here */}
    </main>
  );
}
