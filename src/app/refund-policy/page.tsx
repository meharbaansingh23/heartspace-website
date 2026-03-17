import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Heart Space",
  description: "Heart Space refund and cancellation policy for live workshops.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen py-20 px-6" style={{ background: "#F4F1FF" }}>
      <div className="max-w-[720px] mx-auto">
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#ffffff", boxShadow: "0 4px 32px rgba(124,92,191,0.08)" }}
        >
          <div
            className="px-10 py-10"
            style={{ background: "linear-gradient(135deg,#7C5CBF,#5E3FA3)" }}
          >
            <h1 className="text-3xl font-bold text-white mb-2">Refund & Cancellation Policy</h1>
            <p className="text-white/70 text-sm">Effective Date: March 17, 2026</p>
          </div>

          <div className="px-10 py-10 space-y-8 text-sm leading-relaxed" style={{ color: "#1A1A2E" }}>
            <p style={{ color: "#6B6B8A" }}>
              At Heart Spaces, we strive to provide high-value experiences. For our Live Workshops, the
              following rules apply:
            </p>

            <Section title="A. Cancellation by the Participant">
              <p>
                <strong>Before the Workshop Starts:</strong> If you request a cancellation at least 24 hours
                before the first session, we will provide a 100% refund (minus any payment gateway processing
                fees, typically ~2–3%).
              </p>
              <p>
                <strong>After the Workshop Starts:</strong> Once the first session has commenced, no refunds
                will be issued. As this is a live, time-bound experience, your seat cannot be reassigned once
                the program begins.
              </p>
            </Section>

            <Section title="B. Cancellation by Heart Spaces">
              <p>
                If we cancel the workshop for any reason (technical issues, emergency), you will be offered a
                choice between:
              </p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>A 100% full refund.</li>
                <li>A seat in the next available workshop.</li>
              </ul>
            </Section>

            <Section title="C. No-Show Policy">
              <p>
                If you miss a live session, no partial refunds will be provided. Where possible, we may
                provide a recording or summary, but this is at our discretion.
              </p>
            </Section>

            <Section title="D. Refund Processing">
              <p>
                Approved refunds are processed within 5–7 working days and will be credited back to your
                original payment method (UPI/Card/Bank).
              </p>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-bold text-base mb-3" style={{ color: "#5E3FA3" }}>{title}</h2>
      <div className="space-y-2" style={{ color: "#1A1A2E" }}>{children}</div>
    </div>
  );
}
