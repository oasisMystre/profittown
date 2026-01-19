
import { Check, BarChart2, GraduationCap } from "lucide-react";

export function WhyJoin() {
    const features = [
        {
            icon: <Check size={28} />,
            title: "Copy trading step by step",
            description: "No guesswork. We guide you through every single trade setup.",
            color: "bg-blue-500"
        },
        {
            icon: <BarChart2 size={28} />,
            title: "Trade Forex & Synthetic Indices",
            description: "Get precise Entries, Stop Loss, and Take Profit levels.",
            color: "bg-purple-500"
        },
        {
            icon: <GraduationCap size={28} />,
            title: "Learn While you earn",
            description: "Beginner friendly analysis to help you understand the market.",
            color: "bg-pink-500"
        }
    ];

    return (
        <div id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Why Traders Join ProfitTown
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        We provide everything you need to start trading profitably, even if you are a complete beginner.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white dark:bg-gray-950 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 relative z-10">
                            <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center text-white mb-8 shadow-lg`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
