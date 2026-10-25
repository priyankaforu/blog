import type { Metadata } from "next";
import { RoughDrafts } from "@/components/sections/rough-drafts";

export const metadata: Metadata = {
  title: "Random | Priyanka Pudi",
};

export default function RandomPage() {
  return (
    <main>
      <h1 className="sr-only">Random</h1>
      <RoughDrafts />
    </main>
  );
}
