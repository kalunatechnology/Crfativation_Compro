import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { dummyProjects, dummyServices, dummyStats } from "@/data/dummy";

// Optional path for persistent SQLite volumes on a stateful host. Defaults to
// the exact legacy database path so existing projects and migration history stay intact.
const DB_PATH = process.env.CRAFTIVATION_DB_PATH
  ? path.resolve(process.env.CRAFTIVATION_DB_PATH)
  : path.join(process.cwd(), "data", "craftivation.db");
const DB_DIR = path.dirname(DB_PATH);

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

    CREATE TABLE IF NOT EXISTS company_stats (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      key         TEXT NOT NULL UNIQUE,
      value       INTEGER NOT NULL DEFAULT 0,
      suffix      TEXT NOT NULL DEFAULT '+',
      prefix      TEXT NOT NULL DEFAULT '',
      label_line1 TEXT NOT NULL,
      label_line2 TEXT NOT NULL,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      is_active   INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS craftivation_seed_migrations (
      key        TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Additive migration: kolom gallery gambar tambahan (JSON array) untuk slider pop up detail.
  const projectCols = db.prepare("PRAGMA table_info(projects)").all() as { name: string }[];
  if (!projectCols.some(c => c.name === "images")) {
    db.exec("ALTER TABLE projects ADD COLUMN images TEXT NOT NULL DEFAULT '[]'");
  }

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
      `INSERT INTO projects (slug, number, title, client, description, image, image_alt, href, sort_order, is_active, images)
       VALUES (@slug, @number, @title, @client, @description, @image, @imageAlt, @href, @sortOrder, @isActive, @images)`
    );
    db.transaction(() => {
      for (const p of dummyProjects) insert.run({ ...p, isActive: p.isActive ? 1 : 0, images: JSON.stringify(p.images ?? []) });
    })();
  }

  if (count("company_stats") === 0) {
    const insert = db.prepare(
      `INSERT INTO company_stats (key, value, suffix, prefix, label_line1, label_line2, sort_order, is_active)
       VALUES (@key, @value, @suffix, @prefix, @labelLine1, @labelLine2, @sortOrder, @isActive)`
    );
    db.transaction(() => {
      for (const s of dummyStats) insert.run({ ...s, isActive: s.isActive ? 1 : 0 });
    })();
  }

  // One-time, additive upgrade for installations created when MidCafe was
  // the only seeded example. The two projects already shown in the portfolio
  // are now represented in SQLite too, without overwriting edited rows.
  // The migration is recorded once, so intentionally removed rows stay removed.
  const migrationKey = "hub-showcase-projects-v1";
  const migrationApplied = db
    .prepare("SELECT key FROM craftivation_seed_migrations WHERE key = ?")
    .get(migrationKey);
  if (!migrationApplied) {
    db.transaction(() => {
      const legacyMidCafeOnly =
        count("projects") === 1 &&
        Boolean(db.prepare("SELECT id FROM projects WHERE slug = ?").get("mid-century-coffeebooth"));
      if (legacyMidCafeOnly) {
        const insert = db.prepare(
          `INSERT OR IGNORE INTO projects (slug, number, title, client, description, image, image_alt, href, sort_order, is_active)
           VALUES (@slug, @number, @title, @client, @description, @image, @imageAlt, @href, @sortOrder, @isActive)`
        );
        for (const project of dummyProjects.slice(1)) {
          insert.run({ ...project, isActive: project.isActive ? 1 : 0, images: JSON.stringify(project.images ?? []) });
        }
      }
      db.prepare("INSERT INTO craftivation_seed_migrations (key) VALUES (?)").run(migrationKey);
    })();
  }

  // Seed company stats for existing databases that were created before the company_stats table
  const statsMigrationKey = "hero-company-stats-v1";
  const statsMigrationApplied = db
    .prepare("SELECT key FROM craftivation_seed_migrations WHERE key = ?")
    .get(statsMigrationKey);
  if (!statsMigrationApplied) {
    db.transaction(() => {
      const insert = db.prepare(
        `INSERT OR IGNORE INTO company_stats (key, value, suffix, prefix, label_line1, label_line2, sort_order, is_active)
         VALUES (@key, @value, @suffix, @prefix, @labelLine1, @labelLine2, @sortOrder, @isActive)`
      );
      for (const stat of dummyStats) {
        insert.run({ ...stat, isActive: stat.isActive ? 1 : 0 });
      }
      db.prepare("INSERT INTO craftivation_seed_migrations (key) VALUES (?)").run(statsMigrationKey);
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
