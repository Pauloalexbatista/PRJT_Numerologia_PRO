"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Meaning } from "@/app/actions";
import { ImageWithFallback } from "./image-fallback";
import { X } from "lucide-react";

interface DetailedMeaningViewProps {
    meaning: Meaning;
    number: number;
    label: string;
    isOpen: boolean;
    onClose: () => void;
}

export function DetailedMeaningView({ meaning, number, label, isOpen, onClose }: DetailedMeaningViewProps) {
    const isMaster = number > 9;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-black/90 border border-primary/20 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-50 p-2 bg-white/10 rounded-full hover:bg-white/20 text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px]">
                            {/* Left: Giant Image */}
                            <div className="relative bg-black/40 flex items-center justify-center p-12 overflow-hidden min-h-[400px]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />

                                <div className="relative w-full h-full flex items-center justify-center">
                                    <div className="absolute w-full h-full bg-primary/5 rounded-full blur-3xl" />
                                    <div className="relative w-full max-w-[500px] hover:scale-105 transition-transform duration-700">
                                        <ImageWithFallback
                                            src={`/assets/tarot/${number}.png`}
                                            fallbackSrc={`/assets/tarot/${number}.jpg`}
                                            alt={meaning.tarot_card}
                                            className="w-full h-auto drop-shadow-2xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Full Details */}
                            <div className="p-8 lg:p-12 flex flex-col space-y-8 bg-gradient-to-br from-white/5 to-transparent">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="px-3 py-1 bg-primary/20 border border-primary/30 rounded text-primary text-xs uppercase tracking-wider font-bold">
                                            {label}
                                        </span>
                                        {isMaster && (
                                            <span className="text-gray-400 text-sm">Vibração Mestra</span>
                                        )}
                                    </div>

                                    <h2 className="text-4xl lg:text-5xl font-cinzel text-white mb-6">
                                        {meaning.title}
                                    </h2>

                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-xl text-gray-300 leading-relaxed font-light italic border-l-4 border-primary/40 pl-6 py-2">
                                            "{meaning.description}"
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                        <h4 className="flex items-center gap-2 text-green-400 font-bold mb-3 text-sm uppercase tracking-wider">
                                            Luz & Potencial
                                        </h4>
                                        <p className="text-gray-200 text-lg leading-relaxed">{meaning.positive}</p>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                                        <h4 className="flex items-center gap-2 text-red-400 font-bold mb-3 text-sm uppercase tracking-wider">
                                            Desafio & Sombra
                                        </h4>
                                        <p className="text-gray-200 text-lg leading-relaxed">{meaning.negative}</p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-8 border-t border-white/10">
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="text-center">
                                            <span className="block text-[10px] text-gray-500 uppercase mb-2">Elemento</span>
                                            <span className="text-base font-semibold text-primary">{meaning.element}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-[10px] text-gray-500 uppercase mb-2">Planeta</span>
                                            <span className="text-base font-semibold text-blue-400">{meaning.planet}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-[10px] text-gray-500 uppercase mb-2">Cor</span>
                                            <span className="text-base font-semibold text-purple-400">{meaning.color}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="block text-[10px] text-gray-500 uppercase mb-2">Cristal</span>
                                            <span className="text-base font-semibold text-pink-400">{meaning.gemstone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

// Exportable Component for PDF (Non-Modal, Static)
export function StaticDetailedMeanings({ meanings }: { meanings: { meaning: Meaning, number: number, label: string }[] }) {
    return (
        <div id="pdf-export-container" style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1200px', backgroundColor: '#050510', color: 'white' }}>
            {meanings.map((item, idx) => (
                <div key={idx} style={{ pageBreakAfter: 'always', padding: '40px', display: 'flex', flexDirection: 'column', gap: '30px', minHeight: '1600px', backgroundColor: '#050510' }}>
                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <h2 style={{ color: '#d4af37', fontSize: '40px', fontFamily: 'serif', margin: '0 0 10px 0' }}>{item.label}</h2>
                        <h1 style={{ color: 'white', fontSize: '60px', margin: 0 }}>{item.meaning.title}</h1>
                    </div>

                    {/* Image */}
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                        <img
                            src={`/assets/tarot/${item.number}.png`}
                            style={{ maxWidth: '600px', height: 'auto', display: 'block' }}
                            alt={item.meaning.tarot_card}
                        />
                    </div>

                    {/* Description */}
                    <div style={{ padding: '0 40px' }}>
                        <p style={{ fontSize: '24px', fontStyle: 'italic', color: '#e0e0e0', lineHeight: '1.6', borderLeft: '4px solid #d4af37', paddingLeft: '30px' }}>
                            "{item.meaning.description}"
                        </p>
                    </div>

                    {/* Attributes Table */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginTop: '40px', borderTop: '1px solid #333', paddingTop: '30px' }}>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: '#888', fontSize: '14px', textTransform: 'uppercase' }}>Elemento</span>
                            <div style={{ color: '#d4af37', fontSize: '20px', fontWeight: 'bold' }}>{item.meaning.element}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: '#888', fontSize: '14px', textTransform: 'uppercase' }}>Planeta</span>
                            <div style={{ color: '#60a5fa', fontSize: '20px', fontWeight: 'bold' }}>{item.meaning.planet}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: '#888', fontSize: '14px', textTransform: 'uppercase' }}>Cor</span>
                            <div style={{ color: '#c084fc', fontSize: '20px', fontWeight: 'bold' }}>{item.meaning.color}</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <span style={{ color: '#888', fontSize: '14px', textTransform: 'uppercase' }}>Cristal</span>
                            <div style={{ color: '#f472b6', fontSize: '20px', fontWeight: 'bold' }}>{item.meaning.gemstone}</div>
                        </div>
                    </div>

                    {/* Positive / Negative */}
                    <div style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '15px' }}>
                            <h3 style={{ color: '#4ade80', fontSize: '20px', marginTop: 0 }}>LUZ & POTENCIAL</h3>
                            <p style={{ color: '#ccc', fontSize: '18px' }}>{item.meaning.positive}</p>
                        </div>
                        <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '15px' }}>
                            <h3 style={{ color: '#f87171', fontSize: '20px', marginTop: 0 }}>DESAFIO & SOMBRA</h3>
                            <p style={{ color: '#ccc', fontSize: '18px' }}>{item.meaning.negative}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
