import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
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
  title: "Priyanka Pudi | Freelancer, Builder, Problem Solver, Your Next Best Hire",
  description: "I ship products in hours, not months. End-to-end solutions, any tech stack. Got chaos? I fix it. From bug nightmares to broken systems — I'm here to help you build what matters.",
  keywords: ["developer", "full-stack", "product builder", "freelancer", "web development", "software engineer", "hire developer"],
  authors: [{ name: "Priyanka Pudi" }],
  creator: "Priyanka Pudi",
  metadataBase: new URL("https://priyankapudi.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://priyankapudi.com",
    siteName: "Priyanka Pudi",
    title: "Priyanka Pudi | Freelancer, Builder, Problem Solver, Your Next Best Hire",
    description: "I ship products in hours, not months. End-to-end solutions, any tech stack. Got chaos? I fix it. From bug nightmares to broken systems — I'm here to help you build what matters.",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Priyanka Pudi - Developer & Product Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Priyanka Pudi | Freelancer, Builder, Problem Solver, Your Next Best Hire",
    description: "I ship products in hours, not months. End-to-end solutions, any tech stack. Got chaos? I fix it.",
    creator: "@priyankapudi",
    images: ["/profile.png"],
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
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }} suppressHydrationWarning>
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
