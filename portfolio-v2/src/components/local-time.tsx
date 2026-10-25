"use client";

import { useEffect, useState } from "react";

function formatIndiaTime() {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function LocalTime() {
  const [time, setTime] = useState(formatIndiaTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(formatIndiaTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href="https://www.timeanddate.com/worldclock/india"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-[var(--accent)] transition-colors tabular-nums"
      // The page is built ahead of time, so the server's time is always older than the visitor's.
      suppressHydrationWarning
    >
      IN&nbsp;&nbsp;{time}
    </a>
  );
}
