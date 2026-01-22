import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { PastFlips } from "./components/PastFlips";
import { WhyJoin } from "./components/WhyJoin";
import { Steps } from "./components/Steps";
import { CallToAction } from "./components/CallToAction";
import { Footer } from "./components/Footer";

export default function App() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-purple-500 selection:text-white">
            <Navbar />
            <Hero />
            <Stats />
            <WhyJoin />
            <Steps />
            <PastFlips />
            <CallToAction />
            <Footer />
        </div>
    );
}
