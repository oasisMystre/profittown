
import { MessageCircle, Twitter, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6 max-h-16">
                                                        <img src="/logo.png" alt="ProfitTown" className="w-48 h-48 " />

                     
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                            Empowering traders with automated signals and copy trading technology. Success is just a copy away.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/30 dark:hover:text-purple-400 transition-colors">
                                <MessageCircle size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/30 dark:hover:text-purple-400 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/30 dark:hover:text-purple-400 transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Home</a></li>
                            <li><a href="#features" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Why Join</a></li>
                            <li><a href="#results" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Live Results</a></li>
                            <li><a href="#start" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Get Started</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-6">Legal</h4>
                        <ul className="space-y-4 text-gray-600 dark:text-gray-400">
                            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Terms of Use</a></li>
                            <li><a href="#" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Disclaimer</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 dark:text-gray-500 text-sm">
                        © 2025 ProfitTown. All rights reserved.
                    </p>
                    <p className="text-gray-400 text-sm text-center md:text-right max-w-md">
                        Trading involves risk. Past performance is not indicative of future results.
                    </p>
                </div>
            </div>
        </footer>
    );
}
