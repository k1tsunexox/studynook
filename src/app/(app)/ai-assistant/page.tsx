import { ChatInterface } from "@/features/ai-assistant/components/chat-interface";
import {
  getChatHistory,
  getChatMessages,
} from "@/features/ai-assistant/services/chat.service";

export default async function AIAssistantPage({
  searchParams,
}: {
  searchParams: { chatId?: string };
}) {
  const chatId = searchParams.chatId;

  // We omit the 'chats' variable here since it is currently unused in the UI
  const [, messages] = await Promise.all([
    getChatHistory(),
    chatId ? getChatMessages(chatId) : Promise.resolve([]),
  ]);

  // Safely map the role to the expected literal type to avoid the 'any' cast
  const formattedMessages = messages.map((m) => ({
    ...m,
    role: m.role as "user" | "assistant",
  }));

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">AI Study Assistant</h1>
        <p className="text-muted-foreground">
          Your personal AI tutor powered by your StudyNook data.
        </p>
      </div>

      <div className="mx-auto max-w-4xl">
        <ChatInterface initialMessages={formattedMessages} chatId={chatId} />
      </div>
    </main>
  );
}
