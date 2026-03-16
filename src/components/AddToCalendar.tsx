"use client";

interface WorkshopDetails {
  name: string;
  date_1: string;
  date_2: string;
  session_time: string;
  zoom_link: string | null;
}

function toIcsDate(dateStr: string) {
  // dateStr is "YYYY-MM-DD" → "YYYYMMDD"
  return dateStr.replace(/-/g, "");
}

function generateIcs(workshop: WorkshopDetails, sessionNum: 1 | 2) {
  const dateStr = sessionNum === 1 ? workshop.date_1 : workshop.date_2;
  const icsDate = toIcsDate(dateStr);
  // Use next day as DTEND (all-day style; adjust if needed)
  const nextDay = new Date(dateStr + "T00:00:00Z");
  nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  const icsDateEnd = nextDay.toISOString().slice(0, 10).replace(/-/g, "");

  const description = workshop.zoom_link
    ? `Join Zoom: ${workshop.zoom_link}\\nTime: ${workshop.session_time}`
    : `Time: ${workshop.session_time}\\nZoom link will be emailed 24 hours before.`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Heart Space//Workshop//EN",
    "BEGIN:VEVENT",
    `DTSTART;VALUE=DATE:${icsDate}`,
    `DTEND;VALUE=DATE:${icsDateEnd}`,
    `SUMMARY:${workshop.name} — Session ${sessionNum}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadIcs(content: string, filename: string) {
  const blob = new Blob([content], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function AddToCalendar({ workshop }: { workshop: WorkshopDetails }) {
  return (
    <div>
      <p className="text-sm font-semibold mb-3" style={{ color: "#1A1A2E" }}>
        Add to your calendar
      </p>
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={() =>
            downloadIcs(generateIcs(workshop, 1), "heartspace-session-1.ics")
          }
          className="text-sm px-4 py-2 rounded-full border font-medium transition-colors hover:bg-purple-50"
          style={{ borderColor: "#7C5CBF", color: "#7C5CBF" }}
        >
          Session 1 (.ics)
        </button>
        <button
          onClick={() =>
            downloadIcs(generateIcs(workshop, 2), "heartspace-session-2.ics")
          }
          className="text-sm px-4 py-2 rounded-full border font-medium transition-colors hover:bg-purple-50"
          style={{ borderColor: "#7C5CBF", color: "#7C5CBF" }}
        >
          Session 2 (.ics)
        </button>
      </div>
    </div>
  );
}
