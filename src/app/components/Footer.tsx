import { Link } from "react-router";

export function Footer() {
  return (
    <footer
      className="bg-white border-t pt-[60px] pb-8 px-16 max-[900px]:px-6"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Main Grid */}
        <div className="flex justify-between max-[900px]:flex-col gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <HeartIcon />
              <span className="font-bold text-lg" style={{ color: "var(--ink)" }}>
                Heart Space
              </span>
            </div>
            <p
              className="text-sm mb-6 max-w-[310px]"
              style={{ color: "var(--ink-soft)" }}
            >
              Guided conversations for better relationships — with yourself, others, and
              life.
            </p>
            
            
          </div>

          {/* Right side columns */}
          <div className="flex gap-20">
            {/* Navigate */}
            <div>
              <h4
                className="font-bold text-sm mb-4 uppercase tracking-wide"
                style={{ color: "var(--ink)" }}
              >
                Navigate
              </h4>
              <div className="flex flex-col gap-2.5">
                <FooterLink to="/">Home</FooterLink>
                <FooterLink to="/about">About Shashi</FooterLink>
                <FooterLink to="/workshop">Workshop 1</FooterLink>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4
                className="font-bold text-sm mb-4 uppercase tracking-wide"
                style={{ color: "var(--ink)" }}
              >
                Connect
              </h4>
              <div className="flex flex-col gap-2.5">
                <FooterLink href="#">Instagram</FooterLink>
                <FooterLink href="#">WhatsApp</FooterLink>
                <FooterLink href="#">Contact</FooterLink>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="pt-6 border-t flex items-center justify-between max-[900px]:flex-col max-[900px]:gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--ink-soft)" }}>© 2026 Buntikki Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--ink-soft)" }}>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <span>·</span>
            <FooterLink href="#">Terms of Service</FooterLink>
            <span>·</span>
            <FooterLink href="#">Refund Policy</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  to,
  href,
  children,
}: {
  to?: string;
  href?: string;
  children: React.ReactNode;
}) {
  const className = "text-sm hover:opacity-70 transition-opacity";
  const style = { color: "var(--ink-soft)" };

  if (to) {
    return (
      <Link to={to} className={className} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="w-9 h-9 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors"
      style={{ borderColor: "var(--border)" }}
      aria-label={label}
    >
      <span className="text-xs" style={{ color: "var(--ink-soft)" }}>
        {label[0]}
      </span>
    </a>
  );
}

function HeartIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 24.5C14 24.5 3.5 18.5 3.5 10.5C3.5 8.5 4.5 6 7 5C9.5 4 11.5 5 14 7.5C16.5 5 18.5 4 21 5C23.5 6 24.5 8.5 24.5 10.5C24.5 18.5 14 24.5 14 24.5Z"
        stroke="#FF7F5C"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 12C10 12 11 13.5 13 14C15 14.5 16.5 13.5 18 12"
        stroke="#FF7F5C"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}