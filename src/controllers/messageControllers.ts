import { Request, Response } from "express";
import { Resend } from "resend";
import clientPromise from "../lib/mongodb";

// GET Api Key Resend Service Email
const resend = new Resend(process.env.RESEND_API_KEY);

// Format date to "DD/MM/YYYY HH:MM:SS"  For Message Date
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

export const addMessage = async (req: Request, res: Response) => {
  try {
    const body = await req.body;
    const { email, name, message } = body;

    // Send Email After succes Send Mesasage
    const data = await resend.emails.send({
      from: "appsporto <no-reply@appsporto.my.id>",
      to: "nabilapipp2@gmail.com",
      subject: `Pesan baru dari ${name}`,
      html: `
        <h2 style="color: black; margin: 0 auto; padding-bottom: 10px; ">Anda mendapat pesan baru dari website Appsporto</h2>
        <p style="border: 2px solid black; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; ">
          <strong>Dari:</strong> ${name}
        </p>
        <p style="border: 2px solid black; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; ">
          <strong>Email:</strong> ${email}
        </p>
        <p style="border: 2px solid black; padding-top: 10px; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; ">
          <strong>Pesan:</strong> ${message}
        </p>
      `,
    });
    // Cek Inputan User
    if (!email || !name || !message) {
      return res
        .status(400)
        .json({ message: "Email, nama, dan pesan wajib diisi" });
    }

    // Cek Koneksi Database
    const db = await clientPromise;
    const dbName = process.env.DB_NAME;
    const messageCollection = db.db(dbName).collection("messages");

    // Masukan Data Ke Database
    const newMessage = {
      email,
      name,
      message,
      date: formatDateWIB(new Date()),
    };

    await messageCollection.insertOne(newMessage);

    res.status(201).json({
      success: true,
      message: "Pesan berhasil ditambahkan dan email berhasil diterima",
      data: newMessage,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

export const getMessage = async (req: Request, res: Response) => {
  try {
    const db = await clientPromise;
    const dbName = process.env.DB_NAME;
    const messageCollection = db.db(dbName).collection("messages");

    // Ambil semua pesan dari database
    const message = await messageCollection.find({}).toArray();

    res.status(200).json({ success: true, data: message });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server", error });
  }
};

