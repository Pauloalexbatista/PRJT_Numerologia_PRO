"use client";

import { useState } from "react";
import { NumerologyEngine } from "@/lib/engine";
import { ArrowLeft, Car, Home, Phone } from "lucide-react";
import Link from "next/link";

export default function ExtraTools() {
    const [carInput, setCarInput] = useState("");
    const [houseInput, setHouseInput] = useState("");
    const [phoneInput, setPhoneInput] = useState("");

    const calculate = (input: string) => {
        if (!input) return null;
        return NumerologyEngine.calculateStringValue(input, 'all');
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 font-outfit">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
                    <ArrowLeft size={16} /> Voltar ao Início
                </Link>

                <h1 className="text-4xl font-cinzel text-primary mb-12">Ferramentas Extras</h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Matrícula */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <Car />
                            <h2 className="text-xl font-bold">Matrícula</h2>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">Descubra a energia do seu veículo.</p>
                        <input
                            className="w-full bg-black/50 border border-white/20 p-2 rounded text-white mb-4 uppercase"
                            placeholder="AA-00-BB"
                            value={carInput}
                            onChange={e => setCarInput(e.target.value)}
                        />
                        {carInput && (
                            <div className="text-center p-4 bg-primary/10 rounded">
                                <span className="block text-xs uppercase">Vibração</span>
                                <span className="text-4xl font-cinzel font-bold text-primary">{calculate(carInput)}</span>
                            </div>
                        )}
                    </div>

                    {/* Casa */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4 text-green-400">
                            <Home />
                            <h2 className="text-xl font-bold">Casa</h2>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">A harmonia do seu lar (Número + Letra).</p>
                        <input
                            className="w-full bg-black/50 border border-white/20 p-2 rounded text-white mb-4 uppercase"
                            placeholder="104 B"
                            value={houseInput}
                            onChange={e => setHouseInput(e.target.value)}
                        />
                        {houseInput && (
                            <div className="text-center p-4 bg-green-500/10 rounded">
                                <span className="block text-xs uppercase">Vibração</span>
                                <span className="text-4xl font-cinzel font-bold text-green-400">{calculate(houseInput)}</span>
                            </div>
                        )}
                    </div>

                    {/* Telefone */}
                    <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-4 text-blue-400">
                            <Phone />
                            <h2 className="text-xl font-bold">Telefone</h2>
                        </div>
                        <p className="text-xs text-gray-400 mb-4">A energia da sua comunicação.</p>
                        <input
                            className="w-full bg-black/50 border border-white/20 p-2 rounded text-white mb-4"
                            placeholder="912345678"
                            value={phoneInput}
                            onChange={e => setPhoneInput(e.target.value)}
                        />
                        {phoneInput && (
                            <div className="text-center p-4 bg-blue-500/10 rounded">
                                <span className="block text-xs uppercase">Vibração</span>
                                <span className="text-4xl font-cinzel font-bold text-blue-400">{calculate(phoneInput)}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
