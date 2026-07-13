import {
  createChat,
  findChats,
  findMessagesByChatId,
  insertMessage,
} from "../repositories/chat.repository";

export async function getChatHistory() {
  return await findChats();
}

export async function getChatMessages(chatId: string) {
  return await findMessagesByChatId(chatId);
}

export async function processUserMessage(content: string, chatId?: string) {
  // 1. Create a new chat if one doesn't exist
  let activeChatId = chatId;
  if (!activeChatId) {
    const title =
      content.length > 30 ? `${content.substring(0, 30)}...` : content;
    const newChat = await createChat(title);
    activeChatId = newChat.id;
  }

  // 2. Save user message
  await insertMessage(activeChatId, "user", content);

  // 3. TODO: Call your actual AI Provider here (OpenAI, Gemini, Claude)
  // For now, simulate a network delay and a generic study response
  await new Promise((resolve) => setTimeout(resolve, 1500));
  const aiResponse = `I am your StudyNook AI Assistant. You asked: "${content}". How else can I help you study?`;

  // 4. Save AI response
  await insertMessage(activeChatId, "assistant", aiResponse);

  return activeChatId;
}
