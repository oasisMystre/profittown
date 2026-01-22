
import { Users2, TrendingUp, ShieldCheck } from "lucide-react";

export function Stats() {
    return (
        <div id="stats" className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Traders Following ProfitTown
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">Join a growing community of successful traders</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-center">

                    <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                            <Users2 size={32} />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">3000+</h3>
                        <p className="font-medium text-gray-500 dark:text-gray-400">Members Worldwide</p>
                        <p className="text-sm text-gray-400 mt-2">Active in Telegram</p>
                    </div>

                    <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 mx-auto mb-6 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                            <TrendingUp size={32} />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Beginners</h3>
                        <p className="font-medium text-gray-500 dark:text-gray-400">& Busy Traders</p>
                        <p className="text-sm text-gray-400 mt-2">Perfect for all levels</p>
                    </div>

                    <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 group">
                        <div className="w-16 h-16 mx-auto mb-6 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Clear</h3>
                        <p className="font-medium text-gray-500 dark:text-gray-400">Entries & Targets</p>
                        <p className="text-sm text-gray-400 mt-2">Risk management included</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
