import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import img1 from "../assets/testimonies/1.webp";
import img2 from "../assets/testimonies/2.webp";
import img3 from "../assets/testimonies/3.webp";
import img4 from "../assets/testimonies/4.webp";
import img5 from "../assets/testimonies/5.webp";
import img6 from "../assets/testimonies/6.webp";

const originalImages = [img1, img2, img3, img4, img5, img6];
// Triple the images to allow smooth infinite scrolling in both directions
// This ensures that when we reach the end of one set, we have another set ready to show
const images = [...originalImages, ...originalImages, ...originalImages];

export function PastFlips() {
    // Start at the beginning of the second set (index 6) so we have buffer on both sides
    const [activeIndex, setActiveIndex] = useState(originalImages.length);
    const [isPaused, setIsPaused] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            if (!isAnimating) { // Only auto-advance if not currently animating
                nextSlide(); // IsAuto = true
            }
        }, 3000);
    }, [isAnimating]); // Re-create if isAnimating changes, to avoid stale closure (or access via ref if optimized)

    // Actually, timer re-creation on every animate might be too jittery.
    // Better to just check reference or state inside interval if possible.
    // But `isAnimating` in state might be stale in closure unless dependencies are right.
    // Let's rely on standard closure behavior: useCallback with [isAnimating] will reset timer.

    const stopTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (!isPaused) {
            startTimer();
        } else {
            stopTimer();
        }
        return () => stopTimer();
    }, [isPaused, startTimer, stopTimer, isAnimating]); // Added isAnimating to reset timer properly

    const nextSlide = () => {
        // Prevent manual or auto interaction if already moving
        // But if auto calls it, we might want to respect it? Or ignore?
        // If transitioning, we definitely want to ignore to avoid race.
        if (isAnimating) return;

        setIsAnimating(true);
        setActiveIndex((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (isAnimating) return;

        setIsAnimating(true);
        setActiveIndex((prev) => prev - 1);
    };

    const handleTransitionEnd = () => {
        setIsAnimating(false);
        // Infinite loop magic: seamless reset without animation
        // If we've scrolled past the second set (into the third set)
        if (activeIndex >= originalImages.length * 2) {
            setIsTransitioning(false);
            // Jump back to the same position in the second set
            setActiveIndex(activeIndex - originalImages.length);
            // Re-enable transition after a brief moment
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitioning(true);
                });
            });
        }
        // If we've scrolled into the first set (going backwards)
        else if (activeIndex < originalImages.length) {
            setIsTransitioning(false);
            // Jump forward to the same position in the second set
            setActiveIndex(activeIndex + originalImages.length);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsTransitioning(true);
                    // We don't need to unset isAnimating here because we just did it at the start of handleTransitionEnd
                    // BUT, setting state triggers re-render.
                    // If we set isAnimating false at start, user might click AGAIN before the jump happened?
                    // Actually, handleTransitionEnd happens AFTER animation.
                    // Then we jump instantly.
                    // Then we enable transition.
                    // It is safe to allow clicking now.
                });
            });
        }
    };

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden" id="past-flips">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium text-sm mb-6">
                        <TrendingUp className="w-4 h-4" />
                        <span>Proven Track Record</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        Past Flips & <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">Signals</span>
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Don't just take our word for it. See the results from our recent calls.
                    </p>
                </div>

                <div
                    className="relative max-w-7xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-lg border border-gray-100 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-pointer"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Carousel Viewport */}
                    <div className="overflow-hidden py-4">
                        <div
                            className={`flex will-change-transform ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''} [--slide-pct:100%] md:[--slide-pct:50%] lg:[--slide-pct:33.333%]`}
                            style={{
                                transform: `translateX(calc(var(--slide-pct) * -1 * ${activeIndex}))`
                            }}
                            onTransitionEnd={handleTransitionEnd}
                        >
                            {images.map((img, idx) => (
                                <div
                                    key={idx}
                                    // Make sure width matches the slide percentage
                                    className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                                >
                                    <div className="group relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 aspect-[9/16] md:aspect-[3/4] lg:aspect-[9/16]">
                                        <img
                                            src={img}
                                            alt={`Past flip result ${(idx % originalImages.length) + 1}`}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <span className="text-white font-medium">Result #{(idx % originalImages.length) + 1}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mt-8">
                        {originalImages.map((_, idx) => (
                            <button
                                key={idx}
                                // When clicking indicator, we want to jump to the corresponding item in the MIDDLE set
                                onClick={() => {
                                    setIsTransitioning(true);
                                    setActiveIndex(idx + originalImages.length);
                                }}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === (activeIndex % originalImages.length)
                                    ? "w-8 bg-purple-600"
                                    : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
