import { NextRequest, NextResponse } from "next/server";
import { projectsRepo } from "@/lib/repositories/projects";
import type { ProjectInput } from "@/lib/types";

export const runtime = "nodejs";

// GET /api/projects            -> hanya yang aktif
// GET /api/projects?all=1      -> semua (untuk pengelolaan)
export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "1";
  return NextResponse.json({ data: projectsRepo.list(all) });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Partial<ProjectInput> | null;
  if (!body?.slug || !body?.title) {
    return NextResponse.json({ error: "slug dan title wajib diisi" }, { status: 400 });
  }
  try {
    const created = projectsRepo.create({
      slug: body.slug,
      number: body.number ?? "",
      title: body.title,
      client: body.client ?? "",
      description: body.description ?? "",
      image: body.image ?? "",
      imageAlt: body.imageAlt ?? body.title,
      href: body.href ?? "#projects",
      sortOrder: body.sortOrder ?? 0,
      isActive: body.isActive ?? true,
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Slug sudah digunakan" }, { status: 409 });
  }
}
