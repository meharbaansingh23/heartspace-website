export function trackEvent(action: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, params ?? {});
}

export function trackWorkshopView(workshopName: string) {
  trackEvent("workshop_view", { event_category: "engagement", event_label: workshopName });
}

export function trackBeginCheckout(priceInRupees: number) {
  trackEvent("begin_checkout", { currency: "INR", value: priceInRupees });
}

export function trackAddPaymentInfo() {
  trackEvent("add_payment_info", { event_category: "ecommerce" });
}

export function trackPurchase(transactionId: string, priceInRupees: number) {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value: priceInRupees,
    currency: "INR",
  });
}

export function trackPaymentFailed(orderId: string) {
  trackEvent("payment_failed", { event_category: "ecommerce", event_label: orderId });
}
