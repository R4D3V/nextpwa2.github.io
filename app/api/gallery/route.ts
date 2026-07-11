import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, title, description, image, created_at
      FROM gallery_images
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows);
  } catch (err) {
    console.error("GET /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { title, description, image } = await req.json();
    if (!title || !image) {
      return NextResponse.json({ error: "title and image are required" }, { status: 400 });
    }
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    await sql`
      INSERT INTO gallery_images (id, title, description, image, created_at)
      VALUES (${id}, ${title}, ${description ?? ""}, ${image}, NOW())
    `;
    return NextResponse.json({ id, title, description: description ?? "", image, created_at: new Date().toISOString() });
  } catch (err) {
    console.error("POST /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }
    await sql`DELETE FROM gallery_images WHERE id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/gallery error:", err);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
}
