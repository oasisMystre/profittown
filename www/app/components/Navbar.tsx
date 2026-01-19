
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 dark:bg-gray-950/80 dark:border-gray-800 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center gap-2">
                                                  <img src="/logo.png" alt="ProfitTown" className="w-64 h-64 " />

                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 font-medium transition-colors">Features</a>
                        <a href="#stats" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 font-medium transition-colors">Results</a>
                        <a href="#steps" className="text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400 font-medium transition-colors">How it Works</a>
                        <button className="bg-gray-900 text-white px-5 py-2.5 rounded-full font-medium hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-purple-500/20">
                            Join VIP Free
                        </button>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden absolute w-full bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 shadow-xl">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-200 dark:hover:bg-gray-900">Features</a>
                        <a href="#stats" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-200 dark:hover:bg-gray-900">Results</a>
                        <a href="#steps" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 dark:text-gray-200 dark:hover:bg-gray-900">How it Works</a>
                        <div className="pt-4">
                            <button className="w-full bg-purple-600 text-white px-5 py-3 rounded-xl font-bold hover:bg-purple-700 transition-colors shadow-lg shadow-purple-500/30">
                                Join VIP Free
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
