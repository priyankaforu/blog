import type { Metadata } from "next";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Testimonials } from "@/components/testimonials";

export const metadata: Metadata = {
  title: "What people say | Priyanka Pudi",
  description:
    "What people say online about Priyanka Pudi's products and work.",
};

export default function TestimonialsPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-8">What people say about me</h1>

      <Testimonials />
    </main>
  );
}
