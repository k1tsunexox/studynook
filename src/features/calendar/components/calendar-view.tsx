"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

import type { CalendarEvent } from "../types";

type Props = { events: CalendarEvent[] };

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const resourceColor: Record<string, string> = {
  assignment: "bg-amber-400",
  exam: "bg-sky-500",
  class: "bg-emerald-400",
};

const resourceLabel: Record<string, string> = {
  assignment: "Assignment",
  exam: "Exam",
  class: "Class",
};

export function CalendarView({ events }: Props) {
  const today = new Date();
  const [current, setCurrent] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState<Date | null>(null);

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  // Build grid: 6 rows × 7 cols
  const cells: { date: Date; isCurrentMonth: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, daysInPrev - i),
      isCurrentMonth: false,
    });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }
  while (cells.length % 7 !== 0) {
    cells.push({
      date: new Date(
        year,
        month + 1,
        cells.length - daysInMonth - firstDay + 1,
      ),
      isCurrentMonth: false,
    });
  }

  const eventsForDate = (date: Date) =>
    events.filter((e) => {
      const start = new Date(e.start);
      return (
        start.getFullYear() === date.getFullYear() &&
        start.getMonth() === date.getMonth() &&
        start.getDate() === date.getDate()
      );
    });

  const isToday = (date: Date) =>
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();

  const isSelected = (date: Date) =>
    selected &&
    date.getFullYear() === selected.getFullYear() &&
    date.getMonth() === selected.getMonth() &&
    date.getDate() === selected.getDate();

  const selectedEvents = selected ? eventsForDate(selected) : [];

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-light text-[#1a1916]">{MONTHS[month]}</h2>
          <p className="text-[10px] font-medium tracking-[0.18em] text-[#b0aa9f] uppercase">
            {year}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setSelected(null);
              setCurrent(new Date(year, month - 1, 1));
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9c9890] transition hover:bg-[#F3EEE7] hover:text-[#1a1916]"
            aria-label="Previous month"
          >
            <ChevronLeft className="size-4" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => {
              setSelected(null);
              setCurrent(new Date(today.getFullYear(), today.getMonth(), 1));
            }}
            className="rounded-lg px-3 py-1.5 text-[9px] font-semibold tracking-[0.15em] text-[#9c9890] uppercase transition hover:bg-[#F3EEE7] hover:text-[#1a1916]"
          >
            Today
          </button>
          <button
            onClick={() => {
              setSelected(null);
              setCurrent(new Date(year, month + 1, 1));
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#9c9890] transition hover:bg-[#F3EEE7] hover:text-[#1a1916]"
            aria-label="Next month"
          >
            <ChevronRight className="size-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4">
        {Object.entries(resourceLabel).map(([key, label]) => (
          <span
            key={key}
            className="flex items-center gap-1.5 text-[10px] tracking-wide text-[#9c9890]"
          >
            <span className={`size-1.5 rounded-full ${resourceColor[key]}`} />
            {label}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="overflow-hidden rounded-2xl border border-[#e7e2d9] bg-white">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-[#f0ece5]">
          {DAYS.map((d) => (
            <div
              key={d}
              className="py-3 text-center text-[9px] font-semibold tracking-[0.18em] text-[#b0aa9f] uppercase"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7">
          {cells.map((cell, idx) => {
            const dayEvents = eventsForDate(cell.date);
            const today_ = isToday(cell.date);
            const sel = isSelected(cell.date);
            const col = idx % 7;
            const borderRight = col < 6 ? "border-r border-[#f0ece5]" : "";
            const borderBottom =
              idx < cells.length - 7 ? "border-b border-[#f0ece5]" : "";

            return (
              <button
                key={idx}
                onClick={() => setSelected(sel ? null : cell.date)}
                className={`group relative min-h-20 p-2 text-left transition-colors ${borderRight} ${borderBottom} ${
                  !cell.isCurrentMonth ? "bg-[#FAFAF8]" : ""
                } ${sel ? "bg-sky-50/60" : "hover:bg-[#FAFAF8]"}`}
              >
                {/* Day number */}
                <span
                  className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs transition ${
                    today_
                      ? "bg-[#1a1916] font-semibold text-white"
                      : sel
                        ? "font-medium text-sky-700"
                        : cell.isCurrentMonth
                          ? "font-light text-[#1a1916]"
                          : "font-light text-[#ccc8c1]"
                  }`}
                >
                  {cell.date.getDate()}
                </span>

                {/* Event dots */}
                {dayEvents.length > 0 && (
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {dayEvents.slice(0, 3).map((ev, i) => (
                      <span
                        key={i}
                        className={`h-1.5 w-1.5 rounded-full ${resourceColor[ev.resource] ?? "bg-slate-400"}`}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[8px] font-medium text-[#b0aa9f]">
                        +{dayEvents.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Event pills — show on larger cells */}
                <div className="mt-1 hidden flex-col gap-0.5 lg:flex">
                  {dayEvents.slice(0, 2).map((ev, i) => (
                    <span
                      key={i}
                      className="truncate rounded px-1 py-0.5 text-[9px] font-medium text-[#1a1916]"
                      style={{
                        background:
                          ev.resource === "assignment"
                            ? "#FEF3C7"
                            : ev.resource === "exam"
                              ? "#E0F2FE"
                              : "#D1FAE5",
                      }}
                    >
                      {ev.title.replace(/^[^\w\s]*\s*/, "")}
                    </span>
                  ))}
                  {dayEvents.length > 2 && (
                    <span className="text-[9px] text-[#b0aa9f]">
                      +{dayEvents.length - 2} more
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected day detail panel */}
      {selected && (
        <div className="overflow-hidden rounded-2xl border border-[#e7e2d9] bg-white">
          <div className="border-b border-[#f0ece5] px-6 py-4">
            <p className="text-[9px] font-semibold tracking-[0.22em] text-[#b0aa9f] uppercase">
              {selected.toLocaleDateString("en-US", { weekday: "long" })}
            </p>
            <h3 className="mt-0.5 text-base font-light text-[#1a1916]">
              {selected.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>
          </div>
          {selectedEvents.length === 0 ? (
            <p className="px-6 py-8 text-center text-sm font-light text-[#b0aa9f]">
              Nothing scheduled for this day.
            </p>
          ) : (
            <div className="divide-y divide-[#f0ece5]">
              {selectedEvents.map((ev) => (
                <div key={ev.id} className="flex items-center gap-4 px-6 py-4">
                  <span
                    className={`size-2 shrink-0 rounded-full ${resourceColor[ev.resource] ?? "bg-slate-400"}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-light text-[#1a1916]">
                      {ev.title.replace(/^[^\w\s]*\s*/, "")}
                    </p>
                    <p className="mt-0.5 text-[10px] tracking-wide text-[#b0aa9f]">
                      {new Date(ev.start).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      {ev.resource !== "assignment" &&
                        ` — ${new Date(ev.end).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`}
                    </p>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[9px] font-semibold tracking-[0.12em] uppercase ${
                      ev.resource === "assignment"
                        ? "bg-amber-50 text-amber-600"
                        : ev.resource === "exam"
                          ? "bg-sky-50 text-sky-600"
                          : "bg-emerald-50 text-emerald-600"
                    }`}
                  >
                    {resourceLabel[ev.resource] ?? ev.resource}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
