import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Meaning, getMeaning } from "@/app/actions";
import { ResultCard } from "./result-card";
import { CalculationBreakdown } from "./calculation-breakdown";
import { personalYearMeanings, challengeMeanings, karmicLessonMeanings, hiddenTendencyMeanings, missionMeanings } from "@/lib/data-definitions";

interface FullReportProps {
    profile: any;
    name?: string;
    date?: string;
}

export function FullReport({ profile, name, date }: FullReportProps) {
    const [meanings, setMeanings] = useState<Record<string, Meaning | undefined>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            const keys = ['destiny', 'motivation', 'impression', 'expression'];
            const newMeanings: Record<string, Meaning | undefined> = {};

            for (const key of keys) {
                const val = profile.core[key];
                if (val) {
                    newMeanings[key] = await getMeaning(val);
                }
            }
            setMeanings(newMeanings);
            setLoading(false);
        };
        fetchAll();
    }, [profile]);

    const handleDownloadPDF = async () => {
        const element = document.getElementById('pdf-export-container');
        if (!element) {
            alert("Erro: Container PDF não encontrado.");
            return;
        }

        const btn = document.getElementById('btn-download-pdf');
        if (btn) btn.innerHTML = '⏳ Gerando...';

        // Store original styles
        const originalDisplay = element.style.display;
        const originalPosition = element.style.position;
        const originalLeft = element.style.left;

        // Create style element to override oklab colors with RGB
        const styleEl = document.createElement('style');
        styleEl.id = 'pdf-color-override';
        styleEl.innerHTML = `
            #pdf-export-container * {
                color: inherit !important;
                border-color: inherit !important;
                background-color: transparent !important;
            }
            #pdf-export-container { background-color: #050510 !important; }
            #pdf-export-container .text-primary { color: #FFD700 !important; }
            #pdf-export-container .text-gray-200 { color: #E5E7EB !important; }
            #pdf-export-container .text-gray-300 { color: #D1D5DB !important; }
            #pdf-export-container .text-gray-400 { color: #9CA3AF !important; }
            #pdf-export-container .text-gray-500 { color: #6B7280 !important; }
            #pdf-export-container .text-white { color: #FFFFFF !important; }
            #pdf-export-container .text-red-200 { color: #FECACA !important; }
            #pdf-export-container .text-red-300 { color: #FCA5A5 !important; }
            #pdf-export-container .text-red-400 { color: #F87171 !important; }
            #pdf-export-container .text-indigo-200 { color: #C7D2FE !important; }
            #pdf-export-container .bg-gray-900 { background-color: #111827 !important; }
            #pdf-export-container .bg-gray-800 { background-color: #1F2937 !important; }
            #pdf-export-container .bg-red-900 { background-color: #7F1D1D !important; }
            #pdf-export-container .bg-red-900\\/20 { background-color: rgba(127, 29, 29, 0.2) !important; }
            #pdf-export-container .border-primary { border-color: #FFD700 !important; }
            #pdf-export-container .border-white { border-color: #FFFFFF !important; }
            #pdf-export-container .border-white\\/10 { border-color: rgba(255, 255, 255, 0.1) !important; }
            #pdf-export-container .border-gray-800 { border-color: #1F2937 !important; }
            #pdf-export-container .border-red-500 { border-color: #EF4444 !important; }
            #pdf-export-container .border-red-500\\/30 { border-color: rgba(239, 68, 68, 0.3) !important; }
            #pdf-export-container .border-l-4 { border-left-width: 4px !important; border-left-style: solid !important; }
            #pdf-export-container .border-b { border-bottom-width: 1px !important; border-bottom-style: solid !important; }
            #pdf-export-container .border { border-width: 1px !important; border-style: solid !important; }
        `;
        document.head.appendChild(styleEl);

        try {
            // Temporarily make visible (off-screen)
            element.style.display = 'block';
            element.style.position = 'absolute';
            element.style.left = '-9999px';

            // Wait for styles to apply
            await new Promise(resolve => setTimeout(resolve, 300));

            // Import and use html2canvas
            const html2canvas = (await import('html2canvas')).default;
            const canvas = await html2canvas(element, {
                backgroundColor: '#050510',
                useCORS: true,
                scale: 2,
                logging: false,
                windowWidth: 1000,
                ignoreElements: (el) => {
                    // Skip elements that might have problematic styles
                    return false;
                }
            });

            const imgData = canvas.toDataURL('image/jpeg', 0.85);
            const jsPDF = (await import('jspdf')).default;

            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const pdfWidth = 210;
            const ratio = pdfWidth / imgWidth;
            const pdfHeight = imgHeight * ratio;

            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [pdfWidth, pdfHeight]
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Mapa_Numerologico_${profile.name.replace(/\s+/g, '_')}.pdf`);

        } catch (err) {
            console.error("PDF Generation Error:", err);
            const errorMsg = err instanceof Error ? err.message : 'Erro desconhecido';
            alert(`Erro ao criar PDF: ${errorMsg}`);
        } finally {
            // Restore original styles
            element.style.display = originalDisplay;
            element.style.position = originalPosition;
            element.style.left = originalLeft;

            // Remove color override styles
            const styleOverride = document.getElementById('pdf-color-override');
            if (styleOverride) styleOverride.remove();

            if (btn) btn.innerHTML = '📥 Baixar Mapa (PDF)';
        }
    };

    if (loading) return <div className="text-white text-center p-10">Revelando o mapa completo...</div>;

    return (
        <div className="w-full max-w-5xl mx-auto p-4 space-y-12">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-4xl font-cinzel text-primary mb-1">Mapa Completo</h2>
                    <p className="text-gray-400 text-sm">Visão 360º da sua existência.</p>
                </motion.div>

                <button
                    id="btn-download-pdf"
                    onClick={handleDownloadPDF}
                    className="flex items-center gap-2 px-6 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-full text-primary transition-all group"
                >
                    <span className="text-xl">📄</span>
                    <span className="font-semibold text-sm uppercase tracking-wide">Baixar PDF Completo</span>
                </button>
            </div>

            {/* Calculation Breakdown */}
            {name && date && (
                <CalculationBreakdown name={name} date={date} profile={profile} />
            )}

            {/* Interactive Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResultCard number={profile.core.destiny} label="Caminho de Vida" meaning={meanings.destiny} />
                <ResultCard number={profile.core.motivation} label="Alma" meaning={meanings.motivation} />
                <ResultCard number={profile.core.impression} label="Personalidade" meaning={meanings.impression} />
                <ResultCard number={profile.core.expression} label="Expressão" meaning={meanings.expression} />
            </div>

            {/* Números Derivados Section */}
            <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-white px-2">Números Derivados</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-black border border-cyan-500/20 p-6 rounded-2xl relative overflow-hidden">
                        <h4 className="text-cyan-300 font-cinzel mb-4 text-lg">Número do Poder</h4>
                        <div className="flex justify-center mb-4">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.core.powerNumber}.png`} alt={`Número ${profile.core.powerNumber}`} width={120} height={120} className="object-contain" />
                        </div>
                        <p className="text-xs text-gray-400 mb-3 text-center">Expressão + Destino</p>
                        <p className="text-sm text-gray-300 leading-relaxed">A energia disponível para agir, assumir responsabilidade e exercer liderança sobre si e sobre os outros.</p>
                    </div>
                    <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/20 p-6 rounded-2xl relative overflow-hidden">
                        <h4 className="text-red-300 font-cinzel mb-4 text-lg">Número de Stress</h4>
                        <div className="flex justify-center mb-4">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.core.stressNumber}.png`} alt={`Número ${profile.core.stressNumber}`} width={120} height={120} className="object-contain" />
                        </div>
                        <p className="text-xs text-gray-400 mb-3 text-center">|Expressão - Destino|</p>
                        <p className="text-sm text-gray-300 leading-relaxed">O conflito entre personalidade e missão da alma. Onde existe maior desgaste e stress energético.</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-900/30 to-black border border-yellow-500/20 p-6 rounded-2xl relative overflow-hidden">
                        <h4 className="text-yellow-300 font-cinzel mb-4 text-lg">Número Final</h4>
                        <div className="flex justify-center mb-4">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.core.finalNumber}.png`} alt={`Número ${profile.core.finalNumber}`} width={120} height={120} className="object-contain" />
                        </div>
                        <p className="text-xs text-gray-400 mb-3 text-center">Integração Total</p>
                        <p className="text-sm text-gray-300 leading-relaxed">O alinhamento entre Alma e Personalidade para encarnar verdadeiramente o papel kármico.</p>
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            {missionMeanings[profile.core.mission] && (
                <div className="bg-gradient-to-br from-orange-900/30 to-black border border-orange-500/20 p-8 rounded-2xl">
                    <div className="flex flex-col items-center gap-4 mb-6">
                        <h3 className="text-2xl font-cinzel text-orange-300">Missão de Vida</h3>
                        <Image src={`/assets/Num_Pequenos/Peq_${profile.core.mission}.png`} alt={`Número ${profile.core.mission}`} width={150} height={150} className="object-contain" />
                        <p className="text-sm text-gray-400">Seu propósito e direcionamento espiritual</p>
                    </div>
                    <div className="text-gray-300 leading-relaxed text-justify bg-black/30 p-6 rounded-xl border border-orange-500/10">
                        {missionMeanings[profile.core.mission]}
                    </div>
                </div>
            )}


            {/* Forecast Section - Expanded */}
            <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-white px-2">Previsões Pessoais</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gradient-to-br from-indigo-900/40 to-black border border-indigo-500/20 p-6 rounded-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="text-6xl font-cinzel text-white">{profile.forecast.personalYear}</span>
                        </div>
                        <h4 className="text-indigo-200 font-cinzel mb-2 text-lg">Ano Pessoal</h4>
                        <div className="text-4xl font-bold text-indigo-400 mb-2 relative z-10">{profile.forecast.personalYear}</div>
                        <p className="text-xs text-gray-400 mb-3">Vibração anual (Jan-Dez)</p>
                        <p className="text-sm text-gray-300 leading-relaxed">{personalYearMeanings[profile.forecast.personalYear]?.substring(0, 120)}...</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/20 p-6 rounded-2xl">
                        <h4 className="text-purple-200 font-cinzel mb-4 text-lg">Mês Pessoal</h4>
                        <div className="flex justify-center mb-4">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.forecast.personalMonth}.png`} alt={`Número ${profile.forecast.personalMonth}`} width={100} height={100} className="object-contain" />
                        </div>
                        <p className="text-xs text-gray-400 mb-3 text-center">Ano Pessoal + Mês atual</p>
                        <p className="text-sm text-gray-300 leading-relaxed">A energia e as tendências específicas para o mês vigente.</p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-900/30 to-black border border-teal-500/20 p-6 rounded-2xl">
                        <h4 className="text-teal-200 font-cinzel mb-4 text-lg">Dia Pessoal</h4>
                        <div className="flex justify-center mb-4">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.forecast.personalDay}.png`} alt={`Número ${profile.forecast.personalDay}`} width={100} height={100} className="object-contain" />
                        </div>
                        <p className="text-xs text-gray-400 mb-3 text-center">Mês Pessoal + Dia atual</p>
                        <p className="text-sm text-gray-300 leading-relaxed">A vibração energética específica para o dia de hoje.</p>
                    </div>
                </div>
            </div>

            {/* Cycles Section */}
            <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-white px-2">Ciclos de Vida & Objetivo Kármico</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h4 className="text-primary font-cinzel mb-3 text-center">1º Ciclo (Formativo)</h4>
                        <div className="flex justify-center mb-3">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.cycles.cycle1.ruler}.png`} alt={`Número ${profile.cycles.cycle1.ruler}`} width={80} height={80} className="object-contain" />
                        </div>
                        <div className="text-xs text-gray-400 mb-2 text-center">Do nascimento até {profile.cycles.cycle1.endAge} anos</div>
                        <p className="text-xs text-gray-500 text-center">Influência do Mês</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h4 className="text-primary font-cinzel mb-3 text-center">2º Ciclo (Produtivo)</h4>
                        <div className="flex justify-center mb-3">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.cycles.cycle2.ruler}.png`} alt={`Número ${profile.cycles.cycle2.ruler}`} width={80} height={80} className="object-contain" />
                        </div>
                        <div className="text-xs text-gray-400 mb-2 text-center">Dos {profile.cycles.cycle1.endAge + 1} aos {profile.cycles.cycle2.endAge} anos</div>
                        <p className="text-xs text-gray-500 text-center">Influência do Dia</p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h4 className="text-primary font-cinzel mb-3 text-center">3º Ciclo (Colheita)</h4>
                        <div className="flex justify-center mb-3">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.cycles.cycle3.ruler}.png`} alt={`Número ${profile.cycles.cycle3.ruler}`} width={80} height={80} className="object-contain" />
                        </div>
                        <div className="text-xs text-gray-400 mb-2 text-center">A partir dos {profile.cycles.cycle2.endAge + 1} anos</div>
                        <p className="text-xs text-gray-500 text-center">Influência do Ano</p>
                    </div>
                    <div className="bg-gradient-to-br from-rose-900/30 to-black border border-rose-500/20 p-6 rounded-2xl">
                        <h4 className="text-rose-300 font-cinzel mb-3 text-center">Objetivo Kármico</h4>
                        <div className="flex justify-center mb-3">
                            <Image src={`/assets/Num_Pequenos/Peq_${profile.cycles.karmicObjective}.png`} alt={`Número ${profile.cycles.karmicObjective}`} width={80} height={80} className="object-contain" />
                        </div>
                        <div className="text-xs text-gray-400 mb-2 text-center">Meta espiritual final</div>
                        <p className="text-xs text-gray-500 text-center">Regente do Ciclo 3</p>
                    </div>
                </div>
            </div>

            {/* Challenges Section */}
            <div className="space-y-4">
                <h3 className="text-2xl font-cinzel text-white px-2">Desafios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-2xl">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="text-red-200 font-bold">Desafio Principal</h4>
                            <span className="text-3xl font-bold text-red-400">{profile.challenges.main}</span>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{challengeMeanings[profile.challenges.main]}</p>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex justify-between mb-2">
                                <span className="text-xs text-gray-400">1º Desafio Menor</span>
                                <span className="text-xl font-bold text-white">{profile.challenges.challenge1}</span>
                            </div>
                            <span className="text-gray-300 text-xs">{challengeMeanings[profile.challenges.challenge1]}</span>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <div className="flex justify-between mb-2">
                                <span className="text-xs text-gray-400">2º Desafio Menor</span>
                                <span className="text-xl font-bold text-white">{profile.challenges.challenge2}</span>
                            </div>
                            <span className="text-gray-300 text-xs">{challengeMeanings[profile.challenges.challenge2]}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Analysis Block (Karmic + Hidden side by side, then Temperament full width) */}
            <div className="space-y-8">
                {/* Karmic Lessons and Hidden Tendencies side by side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-lg font-cinzel text-white mb-4">Tendências Ocultas</h3>
                        {profile.analysis.hiddenTendencies.length > 0 ? (
                            <div className="space-y-3">
                                {profile.analysis.hiddenTendencies.map((num: number) => (
                                    <div key={num} className="p-3 bg-indigo-900/10 border-l-2 border-indigo-500 text-sm">
                                        <div className="font-bold text-indigo-300 mb-1">Tendência {num}</div>
                                        <div className="text-gray-400 text-xs">{hiddenTendencyMeanings[num]}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm italic">Sem tendências ocultas marcantes.</p>
                        )}
                    </div>

                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                        <h3 className="text-lg font-cinzel text-white mb-4">Lições Cármicas</h3>
                        {profile.analysis.karmicLessons.length > 0 ? (
                            <div className="space-y-3">
                                {profile.analysis.karmicLessons.map((num: number) => (
                                    <div key={num} className="p-3 bg-red-900/10 border-l-2 border-red-500 text-sm">
                                        <div className="font-bold text-red-300 mb-1">Lição {num}</div>
                                        <div className="text-gray-400 text-xs">{karmicLessonMeanings[num]}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-green-400 text-sm italic">Nenhuma lição cármica pendente.</p>
                        )}
                    </div>
                </div>

                {/* Temperament full width */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl">
                    <h3 className="text-xl font-cinzel text-white mb-6">Temperamento</h3>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-24 text-right text-xs text-gray-400">Físico</div>
                            <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${profile.analysis.temperament.physical}%` }}></div>
                            </div>
                            <div className="w-12 text-sm font-bold text-primary">{profile.analysis.temperament.physical}%</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 text-right text-xs text-gray-400">Mental</div>
                            <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-400" style={{ width: `${profile.analysis.temperament.mental}%` }}></div>
                            </div>
                            <div className="w-12 text-sm font-bold text-blue-400">{profile.analysis.temperament.mental}%</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 text-right text-xs text-gray-400">Emocional</div>
                            <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden">
                                <div className="h-full bg-pink-400" style={{ width: `${profile.analysis.temperament.emotional}%` }}></div>
                            </div>
                            <div className="w-12 text-sm font-bold text-pink-400">{profile.analysis.temperament.emotional}%</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-24 text-right text-xs text-gray-400">Intuitivo</div>
                            <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-400" style={{ width: `${profile.analysis.temperament.intuitive}%` }}></div>
                            </div>
                            <div className="w-12 text-sm font-bold text-purple-400">{profile.analysis.temperament.intuitive}%</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hidden Container for PDF Export - Uses inline RGB colors to avoid oklab() issues */}
            <div
                id="pdf-export-container"
                className="fixed top-0 left-0 w-[1000px] text-white p-12 hidden"
                style={{ backgroundColor: '#050510' }}
            >
                <div className="mb-12 text-center border-b border-white/10 pb-8">
                    <h1 className="text-5xl font-cinzel text-primary mb-4">{profile.name}</h1>
                    <p className="text-xl text-gray-400">{profile.date} • Mapa Numerológico Completo</p>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-3xl font-cinzel text-primary mb-6 border-l-4 border-primary pl-4">Números Principais</h2>
                        <div className="grid grid-cols-2 gap-8">
                            <StaticCard label="Caminho de Vida" number={profile.core.destiny} meaning={meanings.destiny} />
                            <StaticCard label="Alma" number={profile.core.motivation} meaning={meanings.motivation} />
                            <StaticCard label="Personalidade" number={profile.core.impression} meaning={meanings.impression} />
                            <StaticCard label="Expressão" number={profile.core.expression} meaning={meanings.expression} />
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-cinzel text-white mb-6 border-l-4 border-white pl-4">Números Derivados</h2>
                        <div className="grid grid-cols-3 gap-6">
                            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                                <div className="text-cyan-400 font-bold mb-2">Número do Poder</div>
                                <div className="text-4xl font-bold font-cinzel text-white mb-2">{profile.core.powerNumber}</div>
                                <div className="text-xs text-gray-500 mb-2">Expressão + Destino</div>
                                <div className="text-xs text-gray-400">Energia disponível para agir e liderar</div>
                            </div>
                            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                                <div className="text-red-400 font-bold mb-2">Número de Stress</div>
                                <div className="text-4xl font-bold font-cinzel text-white mb-2">{profile.core.stressNumber}</div>
                                <div className="text-xs text-gray-500 mb-2">|Expressão - Destino|</div>
                                <div className="text-xs text-gray-400">Conflito entre personalidade e missão</div>
                            </div>
                            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                                <div className="text-yellow-400 font-bold mb-2">Número Final</div>
                                <div className="text-4xl font-bold font-cinzel text-white mb-2">{profile.core.finalNumber}</div>
                                <div className="text-xs text-gray-500 mb-2">Integração Total</div>
                                <div className="text-xs text-gray-400">Alinhamento Alma-Personalidade</div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-cinzel text-white mb-6 border-l-4 border-white pl-4">Previsões Pessoais</h2>
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                                <h3 className="text-xl font-cinzel text-indigo-400 mb-2">Ano Pessoal</h3>
                                <div className="text-5xl font-bold font-cinzel text-white mb-2">{profile.forecast.personalYear}</div>
                                <p className="text-gray-400 text-xs mb-3">Vibração anual (Jan-Dez)</p>
                                <p className="text-gray-300 text-sm text-justify leading-relaxed">{personalYearMeanings[profile.forecast.personalYear]}</p>
                            </div>
                            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                                <h3 className="text-xl font-cinzel text-purple-400 mb-2">Mês Pessoal</h3>
                                <div className="text-5xl font-bold font-cinzel text-white mb-2">{profile.forecast.personalMonth}</div>
                                <p className="text-gray-400 text-xs mb-3">Ano + Mês atual</p>
                                <p className="text-gray-300 text-sm">Energia do mês vigente</p>
                            </div>
                            <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl">
                                <h3 className="text-xl font-cinzel text-teal-400 mb-2">Dia Pessoal</h3>
                                <div className="text-5xl font-bold font-cinzel text-white mb-2">{profile.forecast.personalDay}</div>
                                <p className="text-gray-400 text-xs mb-3">Mês + Dia atual</p>
                                <p className="text-gray-300 text-sm">Vibração do dia de hoje</p>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-cinzel text-white mb-6 border-l-4 border-white pl-4">Ciclos de Vida & Objetivo Kármico</h2>
                        <div className="grid grid-cols-4 gap-6">
                            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                                <div className="text-primary font-bold mb-2">1º Ciclo (Nasc. ao {profile.cycles.cycle1.endAge} anos)</div>
                                <div className="text-4xl font-bold font-cinzel text-white mb-1">Regente {profile.cycles.cycle1.ruler}</div>
                                <div className="text-xs text-gray-500">Influência do Mês</div>
                            </div>
                            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                                <div className="text-primary font-bold mb-2">2º Ciclo (até {profile.cycles.cycle2.endAge} anos)</div>
                                <div className="text-4xl font-bold font-cinzel text-white mb-1">Regente {profile.cycles.cycle2.ruler}</div>
                                <div className="text-xs text-gray-500">Influência do Dia</div>
                            </div>
                            <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
                                <div className="text-primary font-bold mb-2">3º Ciclo (após {profile.cycles.cycle2.endAge} anos)</div>
                                <div className="text-4xl font-bold font-cinzel text-white mb-1">Regente {profile.cycles.cycle3.ruler}</div>
                                <div className="text-xs text-gray-500">Influência do Ano</div>
                            </div>
                            <div className="p-6 bg-gray-900 rounded-xl border border-rose-500/30">
                                <div className="text-rose-400 font-bold mb-2">Objetivo Kármico</div>
                                <div className="text-4xl font-bold font-cinzel text-white mb-1">{profile.cycles.karmicObjective}</div>
                                <div className="text-xs text-gray-500">Meta espiritual final</div>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-3xl font-cinzel text-red-400 mb-6 border-l-4 border-red-500 pl-4">Desafios e Lições</h2>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-2xl text-red-300 mb-4 font-cinzel">Desafios</h3>
                                <div className="space-y-4">
                                    <div className="p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
                                        <div className="font-bold text-red-200 text-lg mb-2">Desafio Principal: {profile.challenges.main}</div>
                                        <div className="text-sm text-gray-300 leading-relaxed text-justify">{challengeMeanings[profile.challenges.main]}</div>
                                    </div>
                                    <div className="p-6 bg-gray-900 border border-gray-800 rounded-lg">
                                        <div className="font-bold text-gray-200 mb-1">Desafios Menores ({profile.challenges.challenge1}, {profile.challenges.challenge2})</div>
                                        <div className="text-xs text-gray-400 mt-1 space-y-2">
                                            <p>{challengeMeanings[profile.challenges.challenge1]}</p>
                                            <p>{challengeMeanings[profile.challenges.challenge2]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-2xl text-white mb-4 font-cinzel">Lições Cármicas</h3>
                                {profile.analysis.karmicLessons.length > 0 ? profile.analysis.karmicLessons.map((num: number) => (
                                    <div key={num} className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
                                        <div className="font-bold text-lg mb-2 text-white">Lição {num}</div>
                                        <div className="text-sm text-gray-400 text-justify">{karmicLessonMeanings[num]}</div>
                                    </div>
                                )) : <div className="text-green-500 italic">Nenhuma lição pendente.</div>}

                                <h3 className="text-2xl text-white mb-4 font-cinzel mt-8">Tendências Ocultas</h3>
                                {profile.analysis.hiddenTendencies.length > 0 ? profile.analysis.hiddenTendencies.map((num: number) => (
                                    <div key={num} className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-800">
                                        <div className="font-bold text-lg mb-2 text-white">Tendência {num}</div>
                                        <div className="text-sm text-gray-400 text-justify">{hiddenTendencyMeanings[num]}</div>
                                    </div>
                                )) : <div className="text-gray-500 italic">Sem tendências marcantes.</div>}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function StaticCard({ label, number, meaning }: { label: string, number: number, meaning?: Meaning }) {
    if (!meaning) return null;
    return (
        <div className="p-6 bg-gray-900 border border-gray-800 rounded-xl h-full">
            <div className="text-xs uppercase tracking-widest text-primary mb-2 opacity-70">{label}</div>
            <div className="flex items-center gap-4 mb-4 border-b border-gray-800 pb-4">
                <div className="text-5xl font-bold font-cinzel text-white">{number}</div>
                <div className="text-2xl font-cinzel text-gray-300">{meaning.title}</div>
            </div>
            {meaning.tarot_card && <div className="text-xs text-purple-400 mb-2 font-mono">Arcano: {meaning.tarot_card}</div>}
            <div className="text-sm text-gray-300 leading-relaxed text-justify mb-4 min-h-[100px]">
                {meaning.description}
            </div>
            <div className="pt-4 border-t border-gray-800 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-500">
                <div><span className="text-gray-400">Positivo:</span> {meaning.positive?.substring(0, 50)}...</div>
                <div><span className="text-gray-400">Negativo:</span> {meaning.negative?.substring(0, 50)}...</div>
                <div><span className="text-gray-400">Elemento:</span> {meaning.element}</div>
                <div><span className="text-gray-400">Cristal:</span> {meaning.gemstone}</div>
            </div>
        </div>
    );
}
