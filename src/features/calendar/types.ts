export type CalendarEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  resource: "class" | "assignment" | "exam";
};
