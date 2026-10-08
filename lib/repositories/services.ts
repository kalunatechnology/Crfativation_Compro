import { getDb } from "@/lib/db";
import type { Service, ServiceInput } from "@/lib/types";

interface Row {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  href: string;
  sort_order: number;
  is_active: number;
}

const toService = (r: Row): Service => ({
  id: r.id,
  slug: r.slug,
  name: r.name,
  description: r.description,
  image: r.image,
  href: r.href,
  sortOrder: r.sort_order,
  isActive: r.is_active === 1,
});

const toParams = (s: ServiceInput) => ({ ...s, isActive: s.isActive ? 1 : 0 });

export const servicesRepo = {
  list(includeInactive = false): Service[] {
    const where = includeInactive ? "" : "WHERE is_active = 1";
    const rows = getDb()
      .prepare(`SELECT * FROM services ${where} ORDER BY sort_order ASC, id ASC`)
      .all() as Row[];
    return rows.map(toService);
  },

  get(id: number): Service | null {
    const row = getDb().prepare("SELECT * FROM services WHERE id = ?").get(id) as Row | undefined;
    return row ? toService(row) : null;
  },

  create(input: ServiceInput): Service {
    const info = getDb()
      .prepare(
        `INSERT INTO services (slug, name, description, image, href, sort_order, is_active)
         VALUES (@slug, @name, @description, @image, @href, @sortOrder, @isActive)`
      )
      .run(toParams(input));
    return this.get(Number(info.lastInsertRowid))!;
  },

  update(id: number, input: Partial<ServiceInput>): Service | null {
    const current = this.get(id);
    if (!current) return null;
    const { id: _id, ...merged } = { ...current, ...input };
    void _id;
    getDb()
      .prepare(
        `UPDATE services SET slug=@slug, name=@name, description=@description, image=@image,
         href=@href, sort_order=@sortOrder, is_active=@isActive WHERE id=@id`
      )
      .run({ ...toParams(merged), id });
    return this.get(id);
  },

  remove(id: number): boolean {
    return getDb().prepare("DELETE FROM services WHERE id = ?").run(id).changes > 0;
  },
};
