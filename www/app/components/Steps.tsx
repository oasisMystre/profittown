
import { MessageCircle, Bell, PieChart } from "lucide-react";

export function Steps() {
    const steps = [
        {
            id: "01",
            title: "Join the free Telegram",
            items: ["Tap the button", "Instant Access"],
            icon: <MessageCircle size={32} />,
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "02",
            title: "Follow signals in realtime",
            items: ["Entries & Stop Loss", "Take Profit Targets"],
            icon: <Bell size={32} />,
            image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "03",
            title: "Copy trades & Manage risk",
            items: ["Consistent Growth", "Risk Management"],
            icon: <PieChart size={32} />,
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div id="steps" className="py-24 bg-white dark:bg-gray-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <span className="text-purple-600 font-bold tracking-wider uppercase text-sm">How it works</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3">
                        3 Simple Steps to Start
                    </h2>
                </div>

                <div className="space-y-24">
                    {steps.map((step, index) => (
                        <div key={index} className={`flex flex-col md:flex-row gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 space-y-6">
                                <div className="inline-block p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                    {step.icon}
                                </div>
                                <div className="text-6xl font-black text-gray-100 dark:text-gray-800">{step.id}</div>
                                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {step.title}
                                </h3>
                                <ul className="space-y-3">
                                    {step.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-lg text-gray-600 dark:text-gray-400">
                                            <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex-1 w-full">
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-80 object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
