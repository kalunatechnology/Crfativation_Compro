import { NextRequest, NextResponse } from "next/server";
import { projectsRepo } from "@/lib/repositories/projects";
import type { ProjectInput } from "@/lib/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

async function parseId(ctx: Ctx) {
  const id = Number((await ctx.params).id);
  return Number.isInteger(id) ? id : null;
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const id = await parseId(ctx);
  const item = id === null ? null : projectsRepo.get(id);
  return item
    ? NextResponse.json({ data: item })
    : NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
}

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const id = await parseId(ctx);
  const body = (await request.json().catch(() => null)) as Partial<ProjectInput> | null;
  if (id === null || !body) return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
  try {
    const updated = projectsRepo.update(id, body);
    return updated
      ? NextResponse.json({ data: updated })
      : NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const id = await parseId(ctx);
  if (id === null || !projectsRepo.remove(id)) {
    return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
