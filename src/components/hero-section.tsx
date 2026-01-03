"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, RefreshCw } from "lucide-react";
import { NumerologyEngine } from "@/lib/engine";
import { getMeaning, Meaning } from "@/app/actions";
import { ResultCard } from "./result-card";
import { FullReport } from "./full-report";
import Link from "next/link";

export function HeroSection() {
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [result, setResult] = useState<{ profile: any, meaning?: Meaning } | null>(null);
    const [loading, setLoading] = useState(false);
    const [showFullReport, setShowFullReport] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !date) return;
        setLoading(true);

        try {
            const profile = NumerologyEngine.calculateProfile(name, date);
            console.log("Numerology Profile:", profile);

            const meaning = await getMeaning(profile.core.destiny);
            setResult({ profile, meaning });
        } catch (error) {
            console.error(error);
            alert("Erro ao calcular mapa. Verifique a data.");
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setName("");
        setDate("");
    };

    if (result) {
        return (
            <section className="relative min-h-screen flex flex-col items-center justify-center p-4">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.15),transparent_70%)] pointer-events-none" />

                <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-8">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h2 className="text-4xl md:text-5xl font-cinzel text-white mb-2">Seu Caminho de Vida</h2>
                        <p className="text-gray-400">A vibração principal que rege o seu destino.</p>
                    </motion.div>

                    <ResultCard
                        number={result.profile.core.destiny}
                        label="Destino"
                        meaning={result.meaning}
                    />

                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Novo Cálculo
                    </button>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-black/40 border border-primary/20 p-6 rounded-lg max-w-lg text-center backdrop-blur-sm"
                    >
                        <h4 className="text-primary font-cinzel mb-2 text-xl">Queres saber mais?</h4>
                        <p className="text-gray-300 text-sm mb-4">
                            Este é apenas o início. O teu mapa completo revela a tua Alma, Personalidade, Lições Cármicas e Previsões Anuais.
                        </p>
                        <button
                            onClick={() => setShowFullReport(true)}
                            className="px-6 py-2 bg-primary text-black font-bold rounded hover:bg-white transition-colors"
                        >
                            Desbloquear Mapa Completo
                        </button>
                    </motion.div>
                </div>

                {showFullReport && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full mt-12 pt-12 border-t border-white/10"
                    >
                        <FullReport profile={result.profile} />
                    </motion.div>
                )}
            </section>
        );
    }

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(75,0,130,0.15),transparent_70%)] pointer-events-none" />

            <div className="z-10 w-full max-w-2xl text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium tracking-wide text-primary-hover">
                            Numerologia Pitagórica Moderna
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-white mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                        Descubra o Seu <span className="text-primary block md:inline">Destino</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 font-light max-w-lg mx-auto">
                        Decifre os códigos ocultos do seu nome e data de nascimento.
                        O mapa da sua alma está à espera.
                    </p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="w-full max-w-md mx-auto space-y-4 bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl"
                >
                    <div className="space-y-2 text-left">
                        <label htmlFor="name" className="text-sm uppercase tracking-wider text-gray-400 font-semibold">
                            Nome Completo de Nascimento
                        </label>
                        <input
                            type="text"
                            id="name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Como na certidão de nascimento"
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-300"
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <label htmlFor="date" className="text-sm uppercase tracking-wider text-gray-400 font-semibold">
                            Data de Nascimento
                        </label>
                        <input
                            type="date"
                            id="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-primary transition-colors duration-300 [color-scheme:dark]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full group relative overflow-hidden bg-gradient-to-r from-primary to-yellow-600 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-0.5"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Gerar Mapa Gratuito
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </button>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        * Seus dados são processados localmente e não são armazenados.
                    </p>
                </motion.form>
            </div>
        </section>
    );
}
