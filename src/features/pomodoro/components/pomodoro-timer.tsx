"use client";

import { Brain, Coffee, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { saveSessionAction } from "../actions/pomodoro";

interface Subject {
  id: string;
  code: string;
  title: string;
}

const MODES = {
  pomodoro: { label: "Focus", minutes: 25, icon: Brain },
  short_break: { label: "Short break", minutes: 5, icon: Coffee },
  long_break: { label: "Long break", minutes: 15, icon: Coffee },
} as const;

type ModeKey = keyof typeof MODES;

export function PomodoroTimer({ subjects }: { subjects: Subject[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [mode, setMode] = useState<ModeKey>("pomodoro");
  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("none");

  const switchMode = useCallback((next: ModeKey) => {
    setIsActive(false);
    setMode(next);
    setTimeLeft(MODES[next].minutes * 60);
  }, []);

  const handleComplete = useCallback(() => {
    setIsActive(false);
    startTransition(async () => {
      await saveSessionAction({
        subjectId: selectedSubject === "none" ? undefined : selectedSubject,
        duration: MODES[mode].minutes,
        sessionType: mode,
      });
      switchMode(mode === "pomodoro" ? "short_break" : "pomodoro");
      router.refresh();
    });
  }, [mode, router, selectedSubject, startTransition, switchMode]);

  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          queueMicrotask(() => handleComplete());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isActive, handleComplete]);

  const progress = 1 - timeLeft / (MODES[mode].minutes * 60);
  const circumference = 2 * Math.PI * 88; // r=88

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="mx-auto max-w-sm space-y-6">
      {/* Mode switcher */}
      <div className="flex items-center rounded-2xl border border-[#e7e2d9] bg-white p-1">
        {(Object.keys(MODES) as ModeKey[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => switchMode(key)}
            className={`flex-1 rounded-xl py-2 text-[10px] font-semibold tracking-[0.12em] uppercase transition-all duration-150 ${
              mode === key
                ? "bg-[#1a1916] text-white shadow-sm"
                : "text-[#9c9890] hover:text-[#1a1916]"
            }`}
          >
            {MODES[key].label}
          </button>
        ))}
      </div>

      {/* Timer ring */}
      <div className="flex flex-col items-center rounded-2xl border border-[#e7e2d9] bg-white px-8 py-10">
        <div className="relative flex items-center justify-center">
          <svg width="200" height="200" className="-rotate-90">
            {/* Track */}
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="#f0ece5"
              strokeWidth="5"
            />
            {/* Progress */}
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke={mode === "pomodoro" ? "#1a1916" : "#38bdf8"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="transition-[stroke-dashoffset] duration-1000 ease-linear"
            />
          </svg>

          {/* Time + mode label */}
          <div className="absolute flex flex-col items-center">
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#b0aa9f] uppercase">
              {MODES[mode].label}
            </span>
            <span className="mt-1 text-5xl font-extralight tracking-tight text-[#1a1916] tabular-nums">
              {mm}:{ss}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setIsActive(false);
              setTimeLeft(MODES[mode].minutes * 60);
            }}
            disabled={isPending}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e7e2d9] text-[#b0aa9f] transition hover:border-[#1a1916] hover:text-[#1a1916]"
            aria-label="Reset"
          >
            <RotateCcw className="size-4" strokeWidth={1.5} />
          </button>

          <button
            type="button"
            onClick={() => setIsActive((p) => !p)}
            disabled={isPending}
            className={`flex h-14 w-28 items-center justify-center gap-2 rounded-xl text-sm font-medium tracking-wide transition ${
              isActive
                ? "border border-[#e7e2d9] bg-white text-[#1a1916] hover:bg-[#FAFAF8]"
                : "bg-[#1a1916] text-white hover:bg-[#37352f]"
            }`}
          >
            {isActive ? (
              <>
                <Pause className="size-4" strokeWidth={1.5} /> Pause
              </>
            ) : (
              <>
                <Play className="size-4" strokeWidth={1.5} /> Start
              </>
            )}
          </button>

          {/* Spacer to balance layout */}
          <div className="h-10 w-10" />
        </div>
      </div>

      {/* Subject selector */}
      <div className="overflow-hidden rounded-2xl border border-[#e7e2d9] bg-white px-5 py-4">
        <label className="mb-2 block text-[9px] font-semibold tracking-[0.18em] text-[#b0aa9f] uppercase">
          Studying for
        </label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full appearance-none rounded-xl border border-[#e7e2d9] bg-[#FAFAF8] px-4 py-2.5 text-sm font-light text-[#1a1916] transition-colors outline-none focus:border-sky-400"
        >
          <option value="none">General study — no subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.code} — {s.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
