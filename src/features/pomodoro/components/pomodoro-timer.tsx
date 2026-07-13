"use client";

import { Brain, Coffee, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { saveSessionAction } from "../actions/pomodoro";

interface Subject {
  id: string;
  code: string;
  title: string;
}

const MODES = {
  pomodoro: {
    label: "Pomodoro",
    minutes: 25,
    icon: Brain,
  },
  short_break: {
    label: "Short Break",
    minutes: 5,
    icon: Coffee,
  },
  long_break: {
    label: "Long Break",
    minutes: 15,
    icon: Coffee,
  },
};

type ModeType = keyof typeof MODES;

export function PomodoroTimer({ subjects }: { subjects: Subject[] }) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [mode, setMode] = useState<ModeType>("pomodoro");

  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.minutes * 60);

  const [isActive, setIsActive] = useState(false);

  const [selectedSubject, setSelectedSubject] = useState("none");

  const switchMode = useCallback((newMode: ModeType) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode].minutes * 60);
  }, []);

  const handleComplete = useCallback(() => {
    setIsActive(false);

    startTransition(async () => {
      await saveSessionAction({
        subjectId: selectedSubject === "none" ? undefined : selectedSubject,
        duration: MODES[mode].minutes,
        sessionType: mode,
      });

      if (mode === "pomodoro") {
        switchMode("short_break");
      } else {
        switchMode("pomodoro");
      }

      router.refresh();

      alert(`${MODES[mode].label} completed!`);
    });
  }, [mode, router, selectedSubject, startTransition, switchMode]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          queueMicrotask(() => {
            handleComplete();
          });

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, handleComplete]);

  const toggleTimer = () => {
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[mode].minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const CurrentIcon = MODES[mode].icon;

  return (
    <Card className="border-primary/20 mx-auto w-full max-w-md shadow-lg">
      <CardContent className="flex flex-col items-center space-y-8 p-8">
        <div className="bg-muted flex w-full justify-center gap-2 rounded-lg p-1">
          {(Object.keys(MODES) as ModeType[]).map((key) => (
            <Button
              key={key}
              type="button"
              variant={mode === key ? "default" : "ghost"}
              size="sm"
              onClick={() => switchMode(key)}
              className="flex-1 rounded-md text-xs sm:text-sm"
            >
              {MODES[key].label}
            </Button>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <CurrentIcon
            className={`mb-4 h-8 w-8 ${
              mode === "pomodoro" ? "text-primary" : "text-blue-500"
            }`}
          />

          <div className="text-7xl font-bold tracking-tighter tabular-nums">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="w-full space-y-2">
          <label className="text-muted-foreground block text-center text-sm font-medium">
            Linking to Subject (Optional)
          </label>

          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">General Study (No Subject)</SelectItem>

              {subjects.map((subject) => (
                <SelectItem key={subject.id} value={subject.id}>
                  {subject.code} — {subject.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            type="button"
            size="lg"
            className="h-14 w-32 text-lg"
            onClick={toggleTimer}
            disabled={isPending}
          >
            {isActive ? (
              <>
                <Pause className="mr-2 h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="mr-2 h-5 w-5" />
                Start
              </>
            )}
          </Button>

          <Button
            type="button"
            size="icon"
            variant="outline"
            className="h-14 w-14"
            onClick={resetTimer}
            disabled={isPending}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
