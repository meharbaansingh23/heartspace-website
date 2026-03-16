export function Pill({
  variant = "peach",
  children,
}: {
  variant?: "peach" | "sage" | "lavender" | "butter" | "coral";
  children: React.ReactNode;
}) {
  const styles = {
    peach: {
      background: "#FFD4B8",
      color: "#8B4513",
    },
    sage: {
      background: "#B8E8D4",
      color: "#1a5c3a",
    },
    lavender: {
      background: "#DDD4F8",
      color: "#5E3FA3",
    },
    butter: {
      background: "#FFF0B8",
      color: "#7A5200",
    },
    coral: {
      background: "#FF7F5C",
      color: "#FFFFFF",
    },
  };

  return (
    <span
      className="inline-block px-4 py-[7px] rounded-full text-[11px] font-bold uppercase tracking-[0.12em]"
      style={styles[variant]}
    >
      {children}
    </span>
  );
}
