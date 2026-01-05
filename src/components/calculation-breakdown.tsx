"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface LetterBreakdown {
    char: string;
    value: number;
    isVowel: boolean;
}

interface CalculationBreakdownProps {
    name: string;
    date: string;
    profile: any;
}

const pythagoreanTable: Record<string, number> = {
    A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
    J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
    S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

const vowels = ['A', 'E', 'I', 'O', 'U'];

export function CalculationBreakdown({ name, date, profile }: CalculationBreakdownProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Process name into letters
    const nameUpper = name.toUpperCase().replace(/[^A-Z]/g, '');
    const letters: LetterBreakdown[] = [];

    for (const char of nameUpper) {
        if (pythagoreanTable[char]) {
            letters.push({
                char,
                value: pythagoreanTable[char],
                isVowel: vowels.includes(char)
            });
        }
    }

    const vowelLetters = letters.filter(l => l.isVowel);
    const consonantLetters = letters.filter(l => !l.isVowel);

    const vowelSum = vowelLetters.reduce((sum, l) => sum + l.value, 0);
    const consonantSum = consonantLetters.reduce((sum, l) => sum + l.value, 0);

    // Process date
    const dateDigits = date.replace(/\D/g, '').split('').map(Number);
    const dateSum = dateDigits.reduce((sum, d) => sum + d, 0);

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-between text-left"
            >
                <div>
                    <h3 className="text-xl font-cinzel text-primary mb-1">🔍 Como Calculamos</h3>
                    <p className="text-sm text-gray-400">Veja todos os cálculos passo-a-passo</p>
                </div>
                {isExpanded ? (
                    <ChevronUp className="w-6 h-6 text-primary" />
                ) : (
                    <ChevronDown className="w-6 h-6 text-primary" />
                )}
            </button>

            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 space-y-6"
                >
                    {/* Name Breakdown */}
                    <div className="bg-black/30 p-6 rounded-xl border border-primary/20">
                        <h4 className="text-lg font-bold text-white mb-4">📝 Análise do Nome</h4>

                        {/* Full name with values */}
                        <div className="mb-4">
                            <div className="text-sm text-gray-400 mb-2">Nome completo:</div>
                            <div className="font-mono text-lg flex flex-wrap gap-2">
                                {name.toUpperCase().split('').map((char, i) => {
                                    const value = pythagoreanTable[char];
                                    if (!value) {
                                        return <span key={i} className="text-gray-600 px-1">{char}</span>;
                                    }
                                    const isVowel = vowels.includes(char);
                                    return (
                                        <div key={i} className="flex flex-col items-center">
                                            <span className={`font-bold ${isVowel ? 'text-purple-400' : 'text-blue-400'}`}>
                                                {char}
                                            </span>
                                            <span className="text-xs text-gray-500">{value}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Vowels */}
                        <div className="mb-4 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                            <div className="text-sm font-bold text-purple-300 mb-2">Vogais (Alma/Motivação):</div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {vowelLetters.map((l, i) => (
                                    <span key={i} className="text-purple-400 font-mono">
                                        {l.char}={l.value}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-2 text-sm text-gray-300">
                                {vowelLetters.map(l => l.value).join(' + ')} = {vowelSum} → <span className="text-purple-400 font-bold text-lg">{profile.core.motivation}</span>
                            </div>
                        </div>

                        {/* Consonants */}
                        <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                            <div className="text-sm font-bold text-blue-300 mb-2">Consoantes (Personalidade/Impressão):</div>
                            <div className="flex items-center gap-2 flex-wrap">
                                {consonantLetters.map((l, i) => (
                                    <span key={i} className="text-blue-400 font-mono">
                                        {l.char}={l.value}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-2 text-sm text-gray-300">
                                {consonantLetters.map(l => l.value).join(' + ')} = {consonantSum} → <span className="text-blue-400 font-bold text-lg">{profile.core.impression}</span>
                            </div>
                        </div>
                    </div>

                    {/* Date Breakdown */}
                    <div className="bg-black/30 p-6 rounded-xl border border-primary/20">
                        <h4 className="text-lg font-bold text-white mb-4">📅 Análise da Data</h4>
                        <div className="mb-4">
                            <div className="text-sm text-gray-400 mb-2">Data de nascimento:</div>
                            <div className="font-mono text-2xl text-primary mb-2">{date}</div>
                        </div>
                        <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                            <div className="text-sm font-bold text-primary mb-2">Caminho de Vida (Destino):</div>
                            <div className="text-sm text-gray-300">
                                {dateDigits.join(' + ')} = {dateSum} → <span className="text-primary font-bold text-lg">{profile.core.destiny}</span>
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="text-xs text-gray-500 italic border-t border-white/10 pt-4">
                        💡 Números mestres (11, 22, 33) não são reduzidos. Todos os outros são reduzidos somando os dígitos até obter um único dígito.
                    </div>
                </motion.div>
            )}
        </div>
    );
}
