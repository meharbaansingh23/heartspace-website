const CASHFREE_BASE_URL =
  process.env.CASHFREE_ENV === "PROD"
    ? "https://api.cashfree.com/pg"
    : "https://sandbox.cashfree.com/pg";

interface CashfreeOrderRequest {
  order_id: string;
  order_amount: number; // in rupees (e.g., 499.00) — NOT paise
  order_currency: string;
  customer_details: {
    customer_id: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
  };
  order_meta: {
    return_url: string;
    notify_url: string;
  };
}

interface CashfreeOrderResponse {
  cf_order_id: string;
  order_id: string;
  payment_session_id: string;
  order_status: string;
}

export async function createCashfreeOrder(
  params: CashfreeOrderRequest
): Promise<CashfreeOrderResponse> {
  const response = await fetch(`${CASHFREE_BASE_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": process.env.CASHFREE_APP_ID!,
      "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Cashfree order creation failed: ${JSON.stringify(error)}`
    );
  }

  return response.json();
}

export async function verifyCashfreePayment(orderId: string): Promise<{
  order_status: string;
  cf_payment_id?: string;
}> {
  const response = await fetch(
    `${CASHFREE_BASE_URL}/orders/${orderId}/payments`,
    {
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Cashfree payment verification failed: ${response.status}`
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payments: any[] = await response.json();

  if (!Array.isArray(payments) || payments.length === 0) {
    return { order_status: "ACTIVE" };
  }

  const successPayment = payments.find(
    (p) => p.payment_status === "SUCCESS"
  );
  if (successPayment) {
    return {
      order_status: "PAID",
      cf_payment_id: successPayment.cf_payment_id,
    };
  }

  const failedPayment = payments.find((p) => p.payment_status === "FAILED");
  if (failedPayment) {
    return { order_status: "FAILED" };
  }

  return { order_status: "ACTIVE" };
}
