import { z } from "zod";

export const notificationSchema = z.object({
  title: z.string(),
  message: z.string(),
  type: z.enum(["reminder", "alert", "system"]),
  link: z.string().optional(),
});

export type NotificationInput = z.infer<typeof notificationSchema>;
