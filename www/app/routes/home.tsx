import type { Route } from "./+types/home";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { WhyJoin } from "../components/WhyJoin";
import { Steps } from "../components/Steps";
import { CallToAction } from "../components/CallToAction";
import { Footer } from "../components/Footer";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ProfitTown - Copy Trading Forex Bot" },
    { name: "description", content: "Stop guessing. Start copying. Join ProfitTown for free forex signals and copy trading." },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-purple-500 selection:text-white">
      <Navbar />
      <Hero />
      <Stats />
      <WhyJoin />
      <Steps />
      <CallToAction />
      <Footer />
    </div>
  );
}
