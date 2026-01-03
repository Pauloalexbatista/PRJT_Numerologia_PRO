"use client";

import { motion } from "framer-motion";
import { Meaning } from "@/app/actions";
import { useState } from "react";
import { ImageWithFallback } from "./image-fallback";
import { DetailedMeaningView } from "./detailed-meaning";

interface ResultCardProps {
    number: number;
    label: string;
    meaning?: Meaning;
}

export function ResultCard({ number, label, meaning }: ResultCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const isMaster = number > 9;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setIsExpanded(true)}
                className="cursor-pointer group relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
                {/* Glow Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-center p-6 gap-6">
                    {/* Thumbnail Image */}
                    <div className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/40 transition-colors">
                        <ImageWithFallback
                            src={`/assets/tarot/${number}.png`}
                            fallbackSrc={`/assets/tarot/${number}.jpg`}
                            alt={meaning?.tarot_card || "Tarot"}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Brief Info */}
                    <div className="flex-grow">
                        <span className="text-xs uppercase tracking-widest text-gray-500 mb-1 block group-hover:text-primary transition-colors">{label}</span>
                        <div className="flex items-baseline gap-3 mb-2">
                            <span className="text-3xl font-cinzel font-bold text-white">
                                {isMaster ? `${number} / ${number % 9 === 0 ? 9 : number % 9}` : number}
                            </span>
                        </div>
                        <h3 className="text-xl font-cinzel text-white/90 mb-1 group-hover:text-white transition-colors">{meaning?.title}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2 italic">"{meaning?.description}"</p>
                    </div>

                    {/* CTA Icon */}
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <span className="text-xl group-hover:scale-110 transition-transform">👁️</span>
                    </div>
                </div>
            </motion.div>

            {/* Expanded Modal */}
            {meaning && (
                <DetailedMeaningView
                    meaning={meaning}
                    number={number}
                    label={label}
                    isOpen={isExpanded}
                    onClose={() => setIsExpanded(false)}
                />
            )}
        </>
    );
}
