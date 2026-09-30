import { Request, Response } from "express";
import clientPromise from "../lib/mongodb";


// Add Schedule

// Format WIB
function formatDateWIB(date: Date) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = fmt.formatToParts(date);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;

  return `${map.day}/${map.month}/${map.year} ${map.hour}:${map.minute}:${map.second}`;
}


export const addSchedule = async (req: Request, res: Response) => {
    try {
        const body = await req.body;
        const {
            title,
            description,
            date,
            start_time,
            location,
            priority,
            isRecurring,
            recurrence,
        } = body;

        const db =  await clientPromise;
        const dbName = process.env.DB_NAME;
        const scheduleCollection = db.db(dbName).collection("schedules");

        const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
        const id_schedule = `SCHEDULE-${uniqueId}`;

        // insert to db
        const newSchedule = {
            id_schedule,
            title,
            description,
            date,
            start_time,
            location,
            priority,
            isRecurring,
            recurrence,
            createdAt: formatDateWIB(new Date()),
            updatedAt: formatDateWIB(new Date()),
        };

        await scheduleCollection.insertOne(newSchedule);
        res.status(201).json({ success: true, data: newSchedule });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error });
    }
}

export const getAllSchedule = async (req: Request, res: Response) => {
    try {
        const db = await clientPromise;
        const dbName = process.env.DB_NAME;
        const scheduleCollection = db.db(dbName).collection("schedules");

        // get all schedule from db
        const schedule = await scheduleCollection.find({}).toArray();

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error });
    }
}

export const deleteSchedule = async (req: Request, res: Response) => {
    try {
        const { id_schedule } = req.params;
        const db = await clientPromise;
        const dbName = process.env.DB_NAME;
        const scheduleCollection = db.db(dbName).collection("schedules");

        // delete schedule from db
        const schedule = await scheduleCollection.deleteOne({ id_schedule });

        if (!schedule) {
            return res
                .status(404)
                .json({ success: false, message: "Schedule tidak ditemukan" });
        }

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan server", error });
    }
}

