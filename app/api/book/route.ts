import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json();

  if (!payload.barberId || !payload.serviceId || !payload.date || !payload.time || !payload.name || !payload.phone || !payload.email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
