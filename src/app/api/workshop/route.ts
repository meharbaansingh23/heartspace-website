import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const workshops = await sql`
      SELECT
        id, name, description,
        date_1, date_2, session_time,
        regular_price, discounted_price,
        is_active, zoom_link
      FROM workshops
      WHERE is_active = true
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (workshops.length === 0) {
      return NextResponse.json(
        { error: "No active workshop found" },
        { status: 404 }
      );
    }

    return NextResponse.json(workshops[0]);
  } catch (error) {
    console.error("Workshop fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
