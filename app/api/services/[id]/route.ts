import { NextRequest, NextResponse } from "next/server";
import { servicesRepo } from "@/lib/repositories/services";
import type { ServiceInput } from "@/lib/types";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

async function parseId(ctx: Ctx) {
  const id = Number((await ctx.params).id);
  return Number.isInteger(id) ? id : null;
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  const id = await parseId(ctx);
  const item = id === null ? null : servicesRepo.get(id);
  return item
    ? NextResponse.json({ data: item })
    : NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
}

export async function PATCH(request: NextRequest, ctx: Ctx) {
  const id = await parseId(ctx);
  const body = (await request.json().catch(() => null)) as Partial<ServiceInput> | null;
  if (id === null || !body) return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
  try {
    const updated = servicesRepo.update(id, body);
    return updated
      ? NextResponse.json({ data: updated })
      : NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  } catch {
    return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 });
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const id = await parseId(ctx);
  if (id === null || !servicesRepo.remove(id)) {
    return NextResponse.json({ error: "Tidak ditemukan" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
