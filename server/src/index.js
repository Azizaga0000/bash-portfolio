import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import {
  activity,
  profile,
  projects,
  skillGroups,
  timeline
} from "./data.js";

const app = express();
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, "../../client/dist");

const inboundMessages = [];

app.use(cors());
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "portfolio-api" });
});

app.get("/api/profile", (_req, res) => {
  res.json(profile);
});

app.get("/api/projects", (_req, res) => {
  res.json(projects);
});

app.get("/api/skills", (_req, res) => {
  res.json(skillGroups);
});

app.get("/api/timeline", (_req, res) => {
  res.json(timeline);
});

app.get("/api/activity", (_req, res) => {
  res.json(activity);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      error: "name, email и message обязательны"
    });
  }

  if (message.length < 10) {
    return res.status(400).json({
      ok: false,
      error: "Сообщение слишком короткое"
    });
  }

  const entry = {
    id: crypto.randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString()
  };

  inboundMessages.unshift(entry);

  return res.status(201).json({
    ok: true,
    message: "Сообщение отправлено. Я отвечу в ближайшее время.",
    ticket: entry.id
  });
});

app.get("/api/contact/messages", (_req, res) => {
  res.json({
    total: inboundMessages.length,
    latest: inboundMessages.slice(0, 10)
  });
});

if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }

    return res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Portfolio API is running on http://localhost:${port}`);
});
