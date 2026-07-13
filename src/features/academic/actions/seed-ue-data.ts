"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { academicProfiles, classSchedules, subjects } from "@/db/schema";
import { getCurrentUser } from "@/features/auth/profile/repositories/auth.repository";

export async function seedUESemester() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized.");
  }

  const academicProfile = await db.query.academicProfiles.findFirst({
    where: eq(academicProfiles.userId, user.id),
  });

  if (!academicProfile) {
    throw new Error("Create your academic profile first.");
  }

  const createdSubjects = await db
    .insert(subjects)
    .values([
      {
        academicProfileId: academicProfile.id,
        code: "NCP3201",
        title: "Introduction to HDL",
        units: 1,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "NCP4101",
        title: "Computer Engineering Drafting and Design",
        units: 1,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "NCP4102",
        title: "Digital Signal Processing Lecture",
        units: 3,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "NCP4103",
        title: "Digital Signal Processing Laboratory",
        units: 1,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "NCP4303",
        title: "Embedded Systems 2 Lecture",
        units: 3,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "NCP4304",
        title: "Embedded Systems 2 Laboratory",
        units: 1,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "NCP4980",
        title: "CpE Practice and Design 1",
        units: 1,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "ZGE1101",
        title: "Art Appreciation",
        units: 3,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "ZGE1102",
        title: "The Contemporary World",
        units: 3,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "ZGE1103",
        title: "Ethics",
        units: 3,
        section: "4CPE-1B",
      },
      {
        academicProfileId: academicProfile.id,
        code: "ZGE4309",
        title: "Great Books",
        units: 3,
        section: "4CPE-1B",
      },
    ])
    .returning();

  const map = Object.fromEntries(createdSubjects.map((s) => [s.code, s.id]));

  await db.insert(classSchedules).values([
    {
      subjectId: map.NCP3201,
      day: "Friday",
      startTime: "13:30",
      endTime: "16:30",
      room: "EN CLR6",
    },
    {
      subjectId: map.NCP4101,
      day: "Thursday",
      startTime: "13:30",
      endTime: "16:30",
      room: "EN CLR2",
    },
    {
      subjectId: map.NCP4102,
      day: "Monday",
      startTime: "10:30",
      endTime: "12:00",
      room: "EN 103",
    },
    {
      subjectId: map.NCP4102,
      day: "Wednesday",
      startTime: "10:30",
      endTime: "12:00",
      room: "EN 103",
    },
    {
      subjectId: map.NCP4103,
      day: "Thursday",
      startTime: "10:30",
      endTime: "13:30",
      room: "EN CLR3",
    },
    {
      subjectId: map.NCP4303,
      day: "Monday",
      startTime: "13:30",
      endTime: "15:00",
      room: "EN 417",
    },
    {
      subjectId: map.NCP4303,
      day: "Wednesday",
      startTime: "13:30",
      endTime: "15:00",
      room: "EN 417",
    },
    {
      subjectId: map.NCP4304,
      day: "Wednesday",
      startTime: "16:30",
      endTime: "19:30",
      room: "EN CLR4",
    },
    {
      subjectId: map.NCP4980,
      day: "Saturday",
      startTime: "11:00",
      endTime: "14:00",
      room: "EN 401",
    },
    {
      subjectId: map.ZGE1101,
      day: "Monday",
      startTime: "15:00",
      endTime: "16:30",
      room: "EN 420",
    },
    {
      subjectId: map.ZGE1101,
      day: "Wednesday",
      startTime: "15:00",
      endTime: "16:30",
      room: "EN 420",
    },
    {
      subjectId: map.ZGE1102,
      day: "Monday",
      startTime: "07:30",
      endTime: "09:00",
      room: "EN 420",
    },
    {
      subjectId: map.ZGE1102,
      day: "Wednesday",
      startTime: "07:30",
      endTime: "09:00",
      room: "EN 420",
    },
    {
      subjectId: map.ZGE1103,
      day: "Monday",
      startTime: "09:00",
      endTime: "10:30",
      room: "EN 420",
    },
    {
      subjectId: map.ZGE1103,
      day: "Wednesday",
      startTime: "09:00",
      endTime: "10:30",
      room: "EN 420",
    },
    {
      subjectId: map.ZGE4309,
      day: "Tuesday",
      startTime: "09:00",
      endTime: "10:30",
      room: "EN 420",
    },
    {
      subjectId: map.ZGE4309,
      day: "Thursday",
      startTime: "09:00",
      endTime: "10:30",
      room: "EN 420",
    },
  ]);
}
