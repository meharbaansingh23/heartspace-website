import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sql } from "@/lib/db";
import { sendConfirmationEmail } from "@/lib/email";

function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  timestamp: string
): boolean {
  const message = timestamp + rawBody;
  const expectedSig = crypto
    .createHmac("sha256", process.env.CASHFREE_SECRET_KEY!)
    .update(message)
    .digest("base64");
  return expectedSig === signature;
}

export async function POST(request: NextRequest) {
  // CRITICAL: read raw body BEFORE parsing JSON (needed for signature verification)
  const rawBody = await request.text();
  const signature = request.headers.get("x-webhook-signature") ?? "";
  const timestamp = request.headers.get("x-webhook-timestamp") ?? "";

  if (!verifyWebhookSignature(rawBody, signature, timestamp)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let event: { type: string; data: Record<string, unknown> };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { type, data } = event;

  if (type === "PAYMENT_SUCCESS_WEBHOOK") {
    const orderData = data.order as { order_id: string };
    const paymentData = data.payment as { cf_payment_id?: string } | undefined;
    const orderId = orderData.order_id;
    const cfPaymentId = paymentData?.cf_payment_id ?? null;

    const updated = await sql`
      UPDATE registrations
      SET
        payment_status = 'success',
        cashfree_payment_id = ${cfPaymentId},
        updated_at = NOW()
      WHERE
        cashfree_order_id = ${orderId}
        AND payment_status != 'success'
      RETURNING id, full_name, email, workshop_id
    `;

    if (updated.length > 0) {
      const reg = updated[0];
      const workshops = await sql`
        SELECT name, date_1, date_2, session_time, zoom_link
        FROM workshops WHERE id = ${reg.workshop_id}
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
  }

  if (type === "PAYMENT_FAILED_WEBHOOK") {
    const orderData = data.order as { order_id: string };
    const orderId = orderData.order_id;
    await sql`
      UPDATE registrations
      SET payment_status = 'failed', updated_at = NOW()
      WHERE cashfree_order_id = ${orderId}
        AND payment_status NOT IN ('success', 'failed')
    `;
  }

  return NextResponse.json({ received: true });
}
