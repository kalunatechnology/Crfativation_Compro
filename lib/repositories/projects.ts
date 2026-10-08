import { getDb } from "@/lib/db";
import type { Project, ProjectInput } from "@/lib/types";

interface Row {
  id: number;
  slug: string;
  number: string;
  title: string;
  client: string;
  description: string;
  image: string;
  image_alt: string;
  href: string;
  sort_order: number;
  is_active: number;
}

const toProject = (r: Row): Project => ({
  id: r.id,
  slug: r.slug,
  number: r.number,
  title: r.title,
  client: r.client,
  description: r.description,
  image: r.image,
  imageAlt: r.image_alt,
  href: r.href,
  sortOrder: r.sort_order,
  isActive: r.is_active === 1,
});

const toParams = (p: ProjectInput) => ({ ...p, isActive: p.isActive ? 1 : 0 });

export const projectsRepo = {
  list(includeInactive = false): Project[] {
    const where = includeInactive ? "" : "WHERE is_active = 1";
    const rows = getDb()
      .prepare(`SELECT * FROM projects ${where} ORDER BY sort_order ASC, id ASC`)
      .all() as Row[];
    return rows.map(toProject);
  },

  get(id: number): Project | null {
    const row = getDb().prepare("SELECT * FROM projects WHERE id = ?").get(id) as Row | undefined;
    return row ? toProject(row) : null;
  },

  create(input: ProjectInput): Project {
    const info = getDb()
      .prepare(
        `INSERT INTO projects (slug, number, title, client, description, image, image_alt, href, sort_order, is_active)
         VALUES (@slug, @number, @title, @client, @description, @image, @imageAlt, @href, @sortOrder, @isActive)`
      )
      .run(toParams(input));
    return this.get(Number(info.lastInsertRowid))!;
  },

  update(id: number, input: Partial<ProjectInput>): Project | null {
    const current = this.get(id);
    if (!current) return null;
    const { id: _id, ...merged } = { ...current, ...input };
    void _id;
    getDb()
      .prepare(
        `UPDATE projects SET slug=@slug, number=@number, title=@title, client=@client,
         description=@description, image=@image, image_alt=@imageAlt, href=@href,
         sort_order=@sortOrder, is_active=@isActive WHERE id=@id`
      )
      .run({ ...toParams(merged), id });
    return this.get(id);
  },

  remove(id: number): boolean {
    return getDb().prepare("DELETE FROM projects WHERE id = ?").run(id).changes > 0;
  },
};
