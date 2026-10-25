import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import Link from "next/link";
import "bootstrap-icons/font/bootstrap-icons.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { SiteNav } from "@/components/site-nav";
import { LocalTime } from "@/components/local-time";
import { Footer } from "@/components/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Priyanka Pudi | Freelancer, Builder, Problem Solver, Your Next Best Hire",
  description:
    "I ship products in hours, not months. End-to-end solutions, any tech stack. Got chaos? I fix it. From bug nightmares to broken systems — I'm here to help you build what matters.",
  keywords: [
    "developer",
    "full-stack",
    "product builder",
    "freelancer",
    "web development",
    "software engineer",
    "hire developer",
  ],
  authors: [{ name: "Priyanka Pudi" }],
  creator: "Priyanka Pudi",
  metadataBase: new URL("https://priyankapudi.online"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://priyankapudi.online",
    siteName: "Priyanka Pudi",
    title:
      "Priyanka Pudi | Freelancer, Builder, Problem Solver, Your Next Best Hire",
    description:
      "I ship products in hours, not months. End-to-end solutions, any tech stack. Got chaos? I fix it. From bug nightmares to broken systems — I'm here to help you build what matters.",
    images: [
      {
        url: "https://priyankapudi.online/profile.png",
        width: 800,
        height: 800,
        alt: "Priyanka Pudi - Developer & Product Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Priyanka Pudi | Freelancer, Builder, Problem Solver, Your Next Best Hire",
    description:
      "I ship products in hours, not months. End-to-end solutions, any tech stack. Got chaos? I fix it.",
    creator: "@priyankapudi",
    images: ["https://priyankapudi.online/profile.png"],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Priyanka Pudi",
              url: "https://priyankapudi.online",
              image: "https://priyankapudi.online/profile.png",
              jobTitle: "Freelancer & Full-Stack Developer",
              description:
                "Priyanka Pudi is a freelancer, builder, and problem solver who ships products end-to-end.",
              sameAs: ["https://twitter.com/priyankapudi"],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div
            className="flex items-center justify-between text-sm px-4 sm:px-6 pt-4 w-full"
            style={{ fontFamily: "'Onest', sans-serif" }}
          >
            <LocalTime />
            <ThemeToggle />
          </div>

          <div className="mx-auto max-w-6xl px-6 pt-6 pb-8 md:px-10 md:pt-10 md:pb-16 md:grid md:grid-cols-[160px_minmax(0,1fr)] md:gap-16">
            <aside className="flex items-center justify-between gap-4 mb-10 md:mb-0 md:flex-col md:items-start md:justify-start md:gap-12 md:sticky md:top-16 md:self-start">
              <Link href="/" aria-label="Home">
                <Image
                  src="/profile.png"
                  alt="Priyanka Pudi"
                  width={56}
                  height={56}
                  className="rounded-full object-cover object-top w-12 h-12 md:w-14 md:h-14"
                  priority
                />
              </Link>
              <SiteNav />
            </aside>

            <div className="min-w-0 max-w-3xl">
              <Link
                href="/"
                className="hidden md:block text-xl font-bold uppercase tracking-[0.08em] mb-16"
                style={{ fontFamily: "'Onest', sans-serif" }}
              >
                Priyanka Pudi
              </Link>
              {children}
              <Footer />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
