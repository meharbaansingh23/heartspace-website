import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { verifyCashfreePayment } from "@/lib/cashfree";
import { sendConfirmationEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { order_id } = await request.json();

    if (!order_id || typeof order_id !== "string") {
      return NextResponse.json(
        { error: "order_id is required" },
        { status: 400 }
      );
    }

    const paymentResult = await verifyCashfreePayment(order_id);

    if (paymentResult.order_status === "PAID") {
      // Update registration — guard ensures we only send email once
      const updated = await sql`
        UPDATE registrations
        SET
          payment_status = 'success',
          cashfree_payment_id = ${paymentResult.cf_payment_id ?? null},
          updated_at = NOW()
        WHERE
          cashfree_order_id = ${order_id}
          AND payment_status != 'success'
        RETURNING id, full_name, email, workshop_id
      `;

      if (updated.length > 0) {
        const reg = updated[0];
        const workshops = await sql`
          SELECT name, date_1, date_2, session_time, zoom_link
          FROM workshops
          WHERE id = ${reg.workshop_id}
        `;

        if (workshops.length > 0) {
          await sendConfirmationEmail({
            to: reg.email,
            name: reg.full_name,
            workshop: workshops[0] as {
              name: string;
              date_1: string;
              date_2: string;
              session_time: string;
              zoom_link: string | null;
            },
          });
        }
      }

      return NextResponse.json({ status: "success" });
    }

    if (paymentResult.order_status === "FAILED") {
      await sql`
        UPDATE registrations
        SET payment_status = 'failed', updated_at = NOW()
        WHERE cashfree_order_id = ${order_id}
          AND payment_status NOT IN ('success', 'failed')
      `;
      return NextResponse.json({ status: "failed" });
    }

    return NextResponse.json({ status: "processing" });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
