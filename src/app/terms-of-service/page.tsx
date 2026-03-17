import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Heart Space",
  description: "Terms governing your use of Heart Space and its workshops.",
};

export default function TermsOfServicePage() {
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
            <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
            <p className="text-white/70 text-sm">Last Updated: March 17, 2026</p>
          </div>

          <div className="px-10 py-10 space-y-8 text-sm leading-relaxed" style={{ color: "#1A1A2E" }}>
            <p style={{ color: "#6B6B8A" }}>
              Welcome to Heart Spaces. These Terms of Service ("Terms") govern your use of{" "}
              www.heart-spaces.com, operated by Buntikki, a product studio based in Delhi, India.
            </p>

            <Section title="A. Acceptance of Terms">
              <p>
                By using www.heart-spaces.com or purchasing a seat in our workshop, you agree to these Terms.
              </p>
            </Section>

            <Section title="B. Digital Content & Intellectual Property">
              <p>
                <strong>License:</strong> We grant you a limited, non-exclusive, non-transferable license to
                download and view the free e-book for personal, non-commercial use only.
              </p>
              <p>
                <strong>Restrictions:</strong> You may not modify, resell, or redistribute the e-book content
                without express written permission from Buntikki. All design, branding, and content remain the
                sole property of Buntikki.
              </p>
              <p>
                <strong>Live Workshop Participation:</strong> Your ₹499 payment grants you access to one (1)
                specific pilot workshop. We may record live sessions for internal review or to share with
                participants. By joining, you consent to being recorded if you participate via audio or video.
                We reserve the right to remove any participant who is disruptive or uses offensive language,
                without a refund.
              </p>
            </Section>

            <Section title="C. User Obligations">
              <p>
                You agree to provide accurate and current information (email/phone). Use of automated "bot"
                sign-ups or providing fraudulent information is prohibited.
              </p>
            </Section>

            <Section title="D. Limitation of Liability">
              <p>
                The e-book and website content are provided for informational purposes "as is." Buntikki makes
                no warranties regarding the completeness or accuracy of the content and shall not be held
                liable for any direct or indirect damages resulting from your use of the site or the e-book.
              </p>
            </Section>

            <Section title="E. Governing Law & Jurisdiction">
              <p>
                These Terms are governed by the laws of the National Capital Territory of Delhi, India. Any
                disputes arising from these Terms shall be resolved exclusively in the courts located in Delhi.
              </p>
            </Section>

            <Section title="F. Intellectual Property">
              <p>
                All material provided (e-books, slide decks, frameworks) is owned by Buntikki. You are granted
                a personal, non-transferable license. You may not resell or publicly share our course materials.
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
