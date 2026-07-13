"use client";

import { Bot, Send } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { sendMessageAction } from "../actions/chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatInterfaceProps {
  initialMessages: Message[];
  chatId?: string;
}

export function ChatInterface({ initialMessages, chatId }: ChatInterfaceProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [activeChatId, setActiveChatId] = useState<string | undefined>(chatId);
  const [isPending, startTransition] = useTransition();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isPending]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage = input.trim();
    setInput("");

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "user", content: userMessage },
    ]);

    startTransition(async () => {
      const result = await sendMessageAction({
        content: userMessage,
        chatId: activeChatId,
      });

      if (result.success && result.chatId) {
        if (!activeChatId) {
          setActiveChatId(result.chatId);
          // If this was a new chat, we might want to append the ID to the URL eventually
        }
        router.refresh();
      }
    });
  };

  return (
    <div className="bg-card text-card-foreground flex h-150 flex-col rounded-xl border shadow-sm">
      <div className="flex items-center border-b p-4">
        <Bot className="text-primary mr-2 h-5 w-5" />
        <h2 className="font-semibold">StudyNook AI Assistant</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-muted-foreground mt-20 flex h-full items-center justify-center">
              Ask me a question about your subjects or notes!
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex w-full ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex max-w-[80%] items-start gap-3 rounded-lg px-4 py-3 ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {m.role === "assistant" && (
                  <Bot className="mt-0.5 h-4 w-4 shrink-0" />
                )}
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {m.content}
                </p>
              </div>
            </div>
          ))}

          {isPending && (
            <div className="flex w-full justify-start">
              <div className="bg-muted flex items-center gap-3 rounded-lg px-4 py-3">
                <Bot className="h-4 w-4 animate-pulse" />
                <p className="text-muted-foreground animate-pulse text-sm">
                  Thinking...
                </p>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a study question..."
            disabled={isPending}
            className="flex-1"
          />
          <Button type="submit" disabled={isPending || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
