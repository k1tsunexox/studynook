"use client";

import { Bot, Files, FileText, Layers, Search, Timer } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

const ACTIONS = [
  {
    title: "Focus Timer",
    icon: Timer,
    href: "/pomodoro",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "My Notes",
    icon: FileText,
    href: "/notes",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Flashcards",
    icon: Layers,
    href: "/flashcards",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    title: "Documents",
    icon: Files,
    href: "/documents",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    title: "AI Assistant",
    icon: Bot,
    href: "/ai-assistant",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
  {
    title: "Global Search",
    icon: Search,
    href: "/search",
    color: "text-primary",
    bg: "bg-primary/10",
  },
];

export function QuickActions() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">Study Tools</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {ACTIONS.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="group hover:border-primary/50 h-full transition-all hover:shadow-md">
              <CardContent className="flex flex-col items-center justify-center space-y-3 p-6 text-center">
                <div
                  className={`rounded-full p-3 transition-colors ${action.bg} group-hover:bg-primary/20`}
                >
                  <action.icon className={`h-6 w-6 ${action.color}`} />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
