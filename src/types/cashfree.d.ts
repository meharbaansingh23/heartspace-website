interface CashfreeInstance {
  checkout: (params: {
    paymentSessionId: string;
    redirectTarget?: string;
  }) => Promise<{ error?: { message: string }; redirect?: boolean }>;
}

interface Window {
  Cashfree?: (config: { mode: "production" | "sandbox" }) => CashfreeInstance;
}
