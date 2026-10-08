import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { dummyProjects, dummyServices } from "@/data/dummy";

const DB_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DB_DIR, "craftivation.db");

const globalForDb = globalThis as unknown as { __craftivationDb?: Database.Database };

function init(db: Database.Database) {
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS services (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slug        TEXT NOT NULL UNIQUE,
      name        TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      image       TEXT NOT NULL DEFAULT '',
      href        TEXT NOT NULL DEFAULT '#contact',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS projects (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      slug        TEXT NOT NULL UNIQUE,
      number      TEXT NOT NULL DEFAULT '',
      title       TEXT NOT NULL,
      client      TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      image       TEXT NOT NULL DEFAULT '',
      image_alt   TEXT NOT NULL DEFAULT '',
      href        TEXT NOT NULL DEFAULT '#projects',
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1
    );
  `);

  // Seed hanya jika tabel kosong.
  const count = (table: string) =>
    (db.prepare(`SELECT COUNT(*) AS c FROM ${table}`).get() as { c: number }).c;

  if (count("services") === 0) {
    const insert = db.prepare(
      `INSERT INTO services (slug, name, description, image, href, sort_order, is_active)
       VALUES (@slug, @name, @description, @image, @href, @sortOrder, @isActive)`
    );
    db.transaction(() => {
      for (const s of dummyServices) insert.run({ ...s, isActive: s.isActive ? 1 : 0 });
    })();
  }

  if (count("projects") === 0) {
    const insert = db.prepare(
      `INSERT INTO projects (slug, number, title, client, description, image, image_alt, href, sort_order, is_active)
       VALUES (@slug, @number, @title, @client, @description, @image, @imageAlt, @href, @sortOrder, @isActive)`
    );
    db.transaction(() => {
      for (const p of dummyProjects) insert.run({ ...p, isActive: p.isActive ? 1 : 0 });
    })();
  }
}

export function getDb(): Database.Database {
  if (!globalForDb.__craftivationDb) {
    fs.mkdirSync(DB_DIR, { recursive: true });
    const db = new Database(DB_PATH);
    init(db);
    globalForDb.__craftivationDb = db;
  }
  return globalForDb.__craftivationDb;
}
