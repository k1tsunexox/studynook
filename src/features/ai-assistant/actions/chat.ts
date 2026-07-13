"use server";

import { revalidatePath } from "next/cache";

import { messageSchema, type MessageInput } from "../schemas/chat-schema";
import { processUserMessage } from "../services/chat.service";

export async function sendMessageAction(values: MessageInput) {
  const parsed = messageSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid message." };
  }

  try {
    const chatId = await processUserMessage(
      parsed.data.content,
      parsed.data.chatId,
    );
    revalidatePath("/ai-assistant");

    return { success: true, chatId };
  } catch {
    return { success: false, message: "Failed to process message." };
  }
}
