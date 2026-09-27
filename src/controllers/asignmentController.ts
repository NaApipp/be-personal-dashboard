import { Request, Response } from "express";
import clientPromise from "../lib/mongodb";

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

// Add Asignment
export const addAsignment = async (req: Request, res: Response) => {
  try {
    const body = await req.body;
    const {
      title,
      description,
      status,
      priority,
      deadline: [date, time],
      location,
      checklist: [{ title_checklist, isCompleted }],
      references: [{ title_references, url }],
    } = body; 

    // connection to mongodb atlas
    const db = await clientPromise;
    const dbName = process.env.DB_NAME;
    const asignmentCollection = db.db(dbName).collection("task");

    const uniqueId = Math.random().toString(36).substring(2, 8).toUpperCase();
    const id_task = `TASK-${uniqueId}`;
    const id_checklist = `CHK-${uniqueId}`;

    // insert to db
    const newTask = {
      id_task,
      title,
      description,
      status,
      priority,
      deadline: [date, time],
      location,
      checklist: [{ id_checklist, title_checklist, isCompleted }],
      references: [{ title_references, url }],
      createdAt: formatDateWIB(new Date()),
      updatedAt: formatDateWIB(new Date()),
      completedAt: null,
    };

    await asignmentCollection.insertOne(newTask);
    res.status(201).json({ success: true, data: newTask });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

// Get Alll Asignment
export const getAllAsignment = async (req: Request, res: Response) => {
  try {
    const db = await clientPromise;
    const dbName = process.env.DB_NAME;
    const asignmentCollection = db.db(dbName).collection("task");

    // get all asignment from db
    const asignment = await asignmentCollection.find({}).toArray();

    res.status(200).json({ success: true, data: asignment });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

// Get Asigment By Id
export const getAsignmentById = async (req: Request, res: Response) => {
  try {
    const { id_task } = req.params;
    const db = await clientPromise;
    const dbName = process.env.DB_NAME;
    const asignmentCollection = db.db(dbName).collection("task");

    // get asignment from db
    const asignment = await asignmentCollection.findOne({ id_task });

    if (!asignment) {
      return res
        .status(404)
        .json({ success: false, message: "Asignment tidak ditemukan" });
    }

    res.status(200).json({ success: true, data: asignment });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

// Update Asignment
export const updateAsignment = async (req: Request, res: Response) => {
  try {
    const { id_task } = req.params;
    const body = req.body;
    const db = await clientPromise;
    const dbName = process.env.DB_NAME;
    const asignmentCollection = db.db(dbName).collection("task");

    // update asignment in db
    const asignment = await asignmentCollection.updateOne(
      { id_task },
      { $set: body },
    );

    if (!asignment) {
      return res
        .status(404)
        .json({ success: false, message: "Asignment tidak ditemukan" });
    }

    res.status(200).json({ success: true, data: asignment });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

// Delete Asignment
export const deleteAsignment = async (req: Request, res: Response) => {
  try {
    const { id_task } = req.params;
    const db = await clientPromise;
    const dbName = process.env.DB_NAME;
    const asignmentCollection = db.db(dbName).collection("task");

    // delete asignment from db
    const asignment = await asignmentCollection.deleteOne({ id_task });

    if (!asignment) {
      return res
        .status(404)
        .json({ success: false, message: "Asignment tidak ditemukan" });
    }

    res.status(200).json({ success: true, data: asignment });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};
