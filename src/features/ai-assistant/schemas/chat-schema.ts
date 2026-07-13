import { z } from "zod";

export const messageSchema = z.object({
  chatId: z.string().uuid().optional(),
  content: z.string().min(1, { message: "Message cannot be empty." }),
});

export type MessageInput = z.infer<typeof messageSchema>;
