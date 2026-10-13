import { getDb } from "@/lib/db";
import type { CompanyStat, CompanyStatInput } from "@/lib/types";

interface Row {
  id: number;
  key: string;
  value: number;
  suffix: string;
  prefix: string;
  label_line1: string;
  label_line2: string;
  sort_order: number;
  is_active: number;
}

const toStat = (r: Row): CompanyStat => ({
  id: r.id,
  key: r.key,
  value: r.value,
  suffix: r.suffix,
  prefix: r.prefix,
  labelLine1: r.label_line1,
  labelLine2: r.label_line2,
  sortOrder: r.sort_order,
  isActive: r.is_active === 1,
});

const toParams = (s: CompanyStatInput) => ({
  ...s,
  prefix: s.prefix ?? "",
  suffix: s.suffix ?? "",
  isActive: s.isActive ? 1 : 0,
});

export const statsRepo = {
  list(includeInactive = false): CompanyStat[] {
    const where = includeInactive ? "" : "WHERE is_active = 1";
    const rows = getDb()
      .prepare(`SELECT * FROM company_stats ${where} ORDER BY sort_order ASC, id ASC`)
      .all() as Row[];
    return rows.map(toStat);
  },

  get(id: number): CompanyStat | null {
    const row = getDb().prepare("SELECT * FROM company_stats WHERE id = ?").get(id) as Row | undefined;
    return row ? toStat(row) : null;
  },

  getByKey(key: string): CompanyStat | null {
    const row = getDb().prepare("SELECT * FROM company_stats WHERE key = ?").get(key) as Row | undefined;
    return row ? toStat(row) : null;
  },

  create(input: CompanyStatInput): CompanyStat {
    const info = getDb()
      .prepare(
        `INSERT INTO company_stats (key, value, suffix, prefix, label_line1, label_line2, sort_order, is_active)
         VALUES (@key, @value, @suffix, @prefix, @labelLine1, @labelLine2, @sortOrder, @isActive)`
      )
      .run(toParams(input));
    return this.get(Number(info.lastInsertRowid))!;
  },

  update(id: number, input: Partial<CompanyStatInput>): CompanyStat | null {
    const current = this.get(id);
    if (!current) return null;
    const { id: _id, ...merged } = { ...current, ...input };
    void _id;
    getDb()
      .prepare(
        `UPDATE company_stats SET key=@key, value=@value, suffix=@suffix, prefix=@prefix,
         label_line1=@labelLine1, label_line2=@labelLine2, sort_order=@sortOrder,
         is_active=@isActive WHERE id=@id`
      )
      .run({ ...toParams(merged), id });
    return this.get(id);
  },

  updateByKey(key: string, input: Partial<CompanyStatInput>): CompanyStat | null {
    const current = this.getByKey(key);
    if (!current) return null;
    return this.update(current.id, input);
  },

  remove(id: number): boolean {
    return getDb().prepare("DELETE FROM company_stats WHERE id = ?").run(id).changes > 0;
  },
};
