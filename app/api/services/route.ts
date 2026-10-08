import { NextRequest, NextResponse } from "next/server";
import { servicesRepo } from "@/lib/repositories/services";
import type { ServiceInput } from "@/lib/types";

// GET /api/services            -> hanya yang aktif
// GET /api/services?all=1      -> semua (untuk pengelolaan)
export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "1";
  return NextResponse.json({ data: servicesRepo.list(all) });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Partial<ServiceInput> | null;
  if (!body?.slug || !body?.name) {
    return NextResponse.json({ error: "slug dan name wajib diisi" }, { status: 400 });
  }
  try {
    const created = servicesRepo.create({
      slug: body.slug,
      name: body.name,
      description: body.description ?? "",
      image: body.image ?? "",
      href: body.href ?? "#contact",
      sortOrder: body.sortOrder ?? 0,
      isActive: body.isActive ?? true,
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 });
  }
}
