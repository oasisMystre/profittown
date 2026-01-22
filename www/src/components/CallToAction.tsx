
import { ArrowRight } from "lucide-react";

export function CallToAction() {
    return (
        <div className="py-24 bg-white dark:bg-gray-950">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 dark:from-purple-900 dark:to-indigo-900 shadow-2xl px-6 py-16 md:px-16 md:py-20 text-center">
                    {/* Background patterns */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-500 blur-3xl"></div>
                        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Your Free VIP Signals Are Waiting
                        </h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                            Free access open for a limited time. Don't miss out on the opportunity to copy professional trades.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <a target="_blank"   href="https://t.me/profittownsynth" className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-2xl text-purple-900 bg-white hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 shadow-lg">
                                Join Free VIP Signals
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </a>
                        </div>

                        <p className="text-sm text-gray-400 mt-6">
                            No credit card required • Instant access
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
