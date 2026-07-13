import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { chats, messages } from "@/db/schema/chats";

export async function createChat(title: string) {
  const [chat] = await db.insert(chats).values({ title }).returning();
  return chat;
}

export async function insertMessage(
  chatId: string,
  role: "user" | "assistant",
  content: string,
) {
  const [message] = await db
    .insert(messages)
    .values({ chatId, role, content })
    .returning();
  return message;
}

export async function findChats() {
  return await db.query.chats.findMany({
    orderBy: [desc(chats.createdAt)],
  });
}

export async function findMessagesByChatId(chatId: string) {
  return await db.query.messages.findMany({
    where: eq(messages.chatId, chatId),
    orderBy: [asc(messages.createdAt)],
  });
}
