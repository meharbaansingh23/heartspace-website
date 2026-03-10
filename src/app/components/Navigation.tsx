import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

export function Navigation() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getCtaButton = () => {
    if (location.pathname === "/workshop") {
      return { text: "Book Now · ₹499 →", href: "/workshop" };
    }
    return { text: "Join Workshop 1 →", href: "/workshop" };
  };

  const cta = getCtaButton();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 bg-white/93 backdrop-blur-md border-b transition-shadow ${
        hasScrolled ? "shadow-[0_4px_24px_rgba(124,92,191,0.08)]" : ""
      }`}
      style={{ borderColor: "var(--border)" }}
    >
      <div className="h-full px-16 max-[900px]:px-5 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <HeartIcon />
          <span className="font-bold text-lg" style={{ color: "var(--ink)" }}>
            Heart Space
          </span>
        </Link>

        {/* Center Navigation - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" active={location.pathname === "/"}>
            Home
          </NavLink>
          <NavLink to="/about" active={location.pathname === "/about"}>
            About Shashi
          </NavLink>
          <NavLink to="/workshop" active={location.pathname === "/workshop"}>
            Workshop 1
          </NavLink>
        </div>

        {/* CTA Button */}
        <Link
          to={cta.href}
          className="btn-pr text-[13px] px-[22px] py-[11px] rounded-full font-bold transition-all hover:shadow-lg group"
          style={{
            background: "var(--purple)",
            color: "#FFFFFF",
            boxShadow: "0 4px 20px rgba(124, 92, 191, 0.3)",
          }}
        >
          {cta.text.split("→")[0]}
          <span className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </nav>
  );
}

function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`relative text-sm transition-colors ${
        active ? "font-semibold" : "font-medium"
      }`}
      style={{ color: active ? "var(--purple)" : "var(--ink-soft)" }}
    >
      {children}
      {active && (
        <div
          className="absolute -bottom-1 left-0 right-0 h-0.5"
          style={{ background: "var(--purple)" }}
        />
      )}
    </Link>
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
