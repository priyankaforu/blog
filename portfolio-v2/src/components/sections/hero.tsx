"use client";

import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useState, useEffect } from "react";
import { EMAIL, socialLinks } from "@/components/socials";

const BOOKING_URL = "https://cal.com/priyanka-pudi-88w8oj/30min";

export function Hero() {
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowEmail(false);
    }, 1000);
  };

  // Close email popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showEmail && !target.closest("[data-email-popup]")) {
        setShowEmail(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showEmail]);

  return (
    <>
      <section className="flex flex-col justify-start pb-6">
        {/* Bio */}
        <div
          className="text-sm mb-4 leading-relaxed space-y-3"
          style={{ color: "var(--foreground)" }}
        >
          <p>
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              4 years of electrical engineering
            </span>{" "}
            taught me how systems work at their core.{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              5 years in Germany
            </span>{" "}
            taught me how to build them for real users.
          </p>
          <p>
            I&apos;m a{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              full-stack engineer
            </span>{" "}
            who ships{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              end-to-end products
            </span>
            : from database design to deployment, auth to real-time features. I
            built and launched{" "}
            <a
              href="https://postmaker.online"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
              style={{ color: "var(--accent)" }}
            >
              PostMaker
            </a>
            , which made its first sales within a day, and I pick up whatever
            stack the problem demands. Currently building for{" "}
            <a
              href="https://filently.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
              style={{ color: "var(--accent)" }}
            >
              Filently
            </a>
            , a Swiss-based startup.
          </p>
          <p>
            Before I write code, I want to know{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              why a feature matters to the user
            </span>
            . I help shape the scope, build it end to end, and speak openly
            about trade-offs. When something breaks in production, I fix it.
            People sometimes{" "}
            <Link
              href="/testimonials"
              className="font-medium underline underline-offset-2"
              style={{ color: "var(--accent)" }}
            >
              say good things about me
            </Link>{" "}
            online.
          </p>
          <p>
            If your team needs an engineer who cares about{" "}
            <span className="font-medium" style={{ color: "var(--accent)" }}>
              the product as much as the code
            </span>
            ,{" "}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
              style={{ color: "var(--accent)" }}
            >
              let&apos;s talk
            </a>
            .
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-2 mb-3">
          <a
            href="https://drive.google.com/file/d/1z0ePGLEKKLjCBI6dw-jX9uoMn4OBb4kN/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm rounded-full bg-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            style={{
              color: "var(--cv-text)",
              borderWidth: "1px",
              borderColor: "var(--cv-border)",
            }}
          >
            <i className="bi bi-download text-xs" />
            Download CV
          </a>
          <a
            href="https://x.com/priyankapudi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm rounded-full bg-[var(--muted)] border border-green-600 hover:border-green-500 transition-all"
          >
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-600 animate-pulse" />
            I am super active here, just hire me with dm
            <i className="bi bi-twitter-x text-xs sm:text-sm" />
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm rounded-full bg-[var(--muted)] border border-[var(--accent)] hover:opacity-80 transition-all"
          >
            <i className="bi bi-calendar-check text-xs sm:text-sm" />
            Book a call to discuss your ideas
          </a>
        </div>

        {/* Social Links */}
        <div className="space-y-2">
          <p className="text-xs text-[var(--muted-foreground)]">
            You can also find me here
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="relative" data-email-popup>
              <button
                onClick={() => setShowEmail(!showEmail)}
                className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--accent)] transition-all cursor-pointer"
              >
                <i className="bi bi-envelope text-sm" />
                Email Me
              </button>
              {showEmail && (
                <div className="absolute top-full left-0 mt-2 flex items-center gap-2 px-3 py-2 rounded-lg bg-[var(--card)] border border-[var(--border)] z-10 whitespace-nowrap cursor-pointer">
                  <span className="text-xs text-[var(--foreground)]">
                    {EMAIL}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                    title="Copy email"
                  >
                    <i
                      className={`bi ${copied ? "bi-check-lg text-green-400" : "bi-copy"} text-sm`}
                    />
                  </button>
                </div>
              )}
            </div>
            {socialLinks.map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-28 h-9 text-sm rounded-full bg-[var(--muted)] border border-[var(--border)] hover:border-[var(--accent)] transition-all cursor-pointer"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
