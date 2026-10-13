import { NextRequest, NextResponse } from "next/server";
import { statsRepo } from "@/lib/repositories/stats";
import type { CompanyStatInput } from "@/lib/types";

// GET /api/stats            -> hanya statistik aktif
// GET /api/stats?all=1      -> semua statistik (untuk CMS/pengelolaan)
export async function GET(request: NextRequest) {
  const all = request.nextUrl.searchParams.get("all") === "1";
  return NextResponse.json({ data: statsRepo.list(all) });
}

// PUT /api/stats -> pembaruan nilai statistik (mendukung objek tunggal maupun array)
export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Payload tidak valid" }, { status: 400 });
  }

  // Jika payload adalah array untuk pembaruan batch (misal update angka sekaligus)
  if (Array.isArray(body)) {
    const updated = [];
    for (const item of body) {
      if (typeof item === "object" && item !== null) {
        if ("id" in item && typeof item.id === "number") {
          const res = statsRepo.update(item.id, item);
          if (res) updated.push(res);
        } else if ("key" in item && typeof item.key === "string") {
          const res = statsRepo.updateByKey(item.key, item);
          if (res) updated.push(res);
        }
      }
    }
    return NextResponse.json({ data: updated });
  }

  // Jika payload adalah single item
  if (typeof body === "object") {
    if ("id" in body && typeof body.id === "number") {
      const res = statsRepo.update(body.id, body);
      if (!res) return NextResponse.json({ error: "Statistik tidak ditemukan" }, { status: 404 });
      return NextResponse.json({ data: res });
    }
    if ("key" in body && typeof body.key === "string") {
      const res = statsRepo.updateByKey(body.key, body);
      if (!res) return NextResponse.json({ error: "Statistik tidak ditemukan" }, { status: 404 });
      return NextResponse.json({ data: res });
    }
  }

  return NextResponse.json({ error: "Harap sertakan id atau key statistik" }, { status: 400 });
}

// POST /api/stats -> buat statistik baru jika diperlukan
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Partial<CompanyStatInput> | null;
  if (!body?.key || !body?.labelLine1) {
    return NextResponse.json({ error: "key dan labelLine1 wajib diisi" }, { status: 400 });
  }

  try {
    const created = statsRepo.create({
      key: body.key,
      value: body.value ?? 0,
      suffix: body.suffix ?? "+",
      prefix: body.prefix ?? "",
      labelLine1: body.labelLine1,
      labelLine2: body.labelLine2 ?? "",
      sortOrder: body.sortOrder ?? 0,
      isActive: body.isActive ?? true,
    });
    return NextResponse.json({ data: created }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Key statistik sudah digunakan" }, { status: 409 });
  }
}
