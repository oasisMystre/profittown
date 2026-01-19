
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
    return (
        <div className="relative overflow-hidden pt-32 pb-16 lg:pt-48 lg:pb-32">
            {/* Background blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-purple-50 dark:bg-purple-900/30 rounded-full px-4 py-1.5 border border-purple-100 dark:border-purple-800">
                            <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-pulse"></span>
                            <span className="text-sm font-medium text-purple-900 dark:text-purple-200">Limited Time Free Access</span>
                        </div>

                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
                            Stop Guessing. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">Start Copying.</span> <br />
                            Start Profiting.
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                            Unlock free signals and automated copy trading for Forex & Synthetic indices. No experience needed - let the pros do the work.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="inline-flex justify-center items-center px-8 py-4 text-lg font-bold rounded-2xl text-white bg-purple-600 hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-purple-500/30">
                                Get Free Signals Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-6 text-sm font-medium text-gray-500 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>No experience needed</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                                <span>Setup in 5 mins</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                            <div className="aspect-[4/3] relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center group overflow-hidden">
                                <img
                                    src="/telegram-bot.png"
                                    alt="Telegram Trading Bot Interface showing Buy Signal"
                                    className="object-contain w-full h-full transform transition-transform duration-700 group-hover:scale-105 p-4"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>

                                {/* Floating elements for dynamic feel */}
                                <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-gray-200">Total Profit</p>
                                            <p className="text-2xl font-bold font-mono text-green-400">+$12,450.00</p>
                                        </div>
                                        <div className="h-10 w-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                                            <ArrowRight className="h-5 w-5 -rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative blobs behind image */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-purple-500/20 to-indigo-500/20 blur-3xl rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
