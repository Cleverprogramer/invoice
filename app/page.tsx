import { Hero } from "@/components/ui/Her";
import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Hero />
    </main>
  );
}
