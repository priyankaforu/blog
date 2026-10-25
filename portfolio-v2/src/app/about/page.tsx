import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Timeline } from "@/components/sections/timeline";

export const metadata: Metadata = {
  title: "About | Priyanka Pudi",
};

export default function AboutPage() {
  return (
    <main>
      <Hero />
      <Timeline />
    </main>
  );
}
