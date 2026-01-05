"use client";

import { useState } from "react";
import { Meaning } from "@/app/actions";
import { updateMeaning } from "@/app/admin-actions";
import { Edit2, Save, ChevronDown, ChevronUp, Calculator, Database } from "lucide-react";
import { NumerologyEngine } from "@/lib/engine";
import { calculationVariables, pythagoreanTable } from "@/lib/calculation-docs";

export function DashboardClient({ initialMeanings }: { initialMeanings: Meaning[] }) {
    const [meanings, setMeanings] = useState(initialMeanings);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Meaning>>({});

    // Card expansion states
    const [numbersExpanded, setNumbersExpanded] = useState(false);
    const [calculatorExpanded, setCalculatorExpanded] = useState(false);

    // Calculator test inputs
    const [testName, setTestName] = useState("Paulo Silva");
    const [testDate, setTestDate] = useState("1974-07-23");
    const [calculatedProfile, setCalculatedProfile] = useState<any>(null);

    const handleEdit = (meaning: Meaning) => {
        setEditingId(meaning.id);
        setEditForm(meaning);
    };

    const handleSave = async () => {
        if (!editingId) return;

        // Optimistic update
        setMeanings(meanings.map(m => m.id === editingId ? { ...m, ...editForm } as Meaning : m));
        setEditingId(null);

        try {
            await updateMeaning(editingId, editForm);
        } catch (e) {
            alert("Erro ao salvar");
            console.error(e);
        }
    };

    const handleCalculate = () => {
        if (!testName || !testDate) return;
        const profile = NumerologyEngine.calculateProfile(testName, testDate);
        setCalculatedProfile(profile);
    };

    // Auto-calculate on input change
    const handleNameChange = (name: string) => {
        setTestName(name);
        if (name && testDate) {
            const profile = NumerologyEngine.calculateProfile(name, testDate);
            setCalculatedProfile(profile);
        }
    };

    const handleDateChange = (date: string) => {
        setTestDate(date);
        if (testName && date) {
            const profile = NumerologyEngine.calculateProfile(testName, date);
            setCalculatedProfile(profile);
        }
    };

    return (
        <div className="space-y-6">
            {/* CARD 1: Number Maintenance */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button
                    onClick={() => setNumbersExpanded(!numbersExpanded)}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/20 rounded-lg">
                            <Database className="text-primary" size={24} />
                        </div>
                        <div className="text-left">
                            <h2 className="text-2xl font-cinzel text-white font-bold">Manutenção de Números</h2>
                            <p className="text-sm text-gray-400 mt-1">
                                Editar significados e informações dos números ({meanings.length} números disponíveis)
                            </p>
                        </div>
                    </div>
                    {numbersExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>

                {numbersExpanded && (
                    <div className="p-6 pt-0 grid gap-6">
                        {meanings.map((meaning) => (
                            <div key={meaning.id} className="bg-white/5 border border-white/10 p-6 rounded-lg">
                                {editingId === meaning.id ? (
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-4">
                                                {/* Image Preview */}
                                                <div className="w-16 h-24 bg-black/40 rounded-lg border border-white/10 overflow-hidden relative flex items-center justify-center">
                                                    <img
                                                        src={`/assets/tarot/${editingId}.png`}
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                            e.currentTarget.parentElement!.innerText = 'Sem Img';
                                                            e.currentTarget.parentElement!.classList.add('text-xs', 'text-gray-500');
                                                        }}
                                                        alt={`Preview ${editingId}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-cinzel text-white">Editar Número {editingId}</h2>
                                                    <p className="text-sm text-gray-400">
                                                        Imagem: <b>{editingId}.png</b>
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                                title="Fechar"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-400 ml-1">Título</label>
                                                    <input
                                                        className="w-full bg-black/50 p-2 border border-white/20 rounded text-white"
                                                        value={editForm.title || ''}
                                                        placeholder="Título"
                                                        title="Título"
                                                        onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-400 ml-1">Carta Tarot</label>
                                                    <input
                                                        className="w-full bg-black/50 p-2 border border-white/20 rounded text-white"
                                                        value={editForm.tarot_card || ''}
                                                        placeholder="Nome da Carta"
                                                        title="Nome da Carta"
                                                        onChange={e => setEditForm({ ...editForm, tarot_card: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 gap-2">
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-400 ml-1">Elemento</label>
                                                    <input className="w-full bg-black/50 p-2 border border-white/20 rounded text-white text-xs" title="Elemento" placeholder="Elemento" value={editForm.element || ''} onChange={e => setEditForm({ ...editForm, element: e.target.value })} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-400 ml-1">Planeta</label>
                                                    <input className="w-full bg-black/50 p-2 border border-white/20 rounded text-white text-xs" title="Planeta" placeholder="Planeta" value={editForm.planet || ''} onChange={e => setEditForm({ ...editForm, planet: e.target.value })} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-400 ml-1">Cor</label>
                                                    <input className="w-full bg-black/50 p-2 border border-white/20 rounded text-white text-xs" title="Cor" placeholder="Cor" value={editForm.color || ''} onChange={e => setEditForm({ ...editForm, color: e.target.value })} />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-gray-400 ml-1">Cristal</label>
                                                    <input className="w-full bg-black/50 p-2 border border-white/20 rounded text-white text-xs" title="Cristal" placeholder="Cristal" value={editForm.gemstone || ''} onChange={e => setEditForm({ ...editForm, gemstone: e.target.value })} />
                                                </div>
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-xs text-gray-400 ml-1">Descrição</label>
                                                <textarea
                                                    className="w-full bg-black/50 p-2 border border-white/20 rounded text-white h-24 resize-none"
                                                    value={editForm.description || ''}
                                                    placeholder="Descrição Detalhada"
                                                    title="Descrição"
                                                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-xs text-green-400 ml-1">Positivo</label>
                                                    <textarea
                                                        className="w-full bg-black/50 p-2 border border-white/20 rounded text-white h-20 resize-none"
                                                        value={editForm.positive || ''}
                                                        placeholder="Aspectos Positivos"
                                                        title="Positivo"
                                                        onChange={e => setEditForm({ ...editForm, positive: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-xs text-red-400 ml-1">Negativo</label>
                                                    <textarea
                                                        className="w-full bg-black/50 p-2 border border-white/20 rounded text-white h-20 resize-none"
                                                        value={editForm.negative || ''}
                                                        placeholder="Aspectos Negativos"
                                                        title="Negativo"
                                                        onChange={e => setEditForm({ ...editForm, negative: e.target.value })}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex gap-2 justify-end pt-4">
                                                <button onClick={() => setEditingId(null)} className="flex items-center gap-1 px-4 py-2 border border-white/10 rounded-lg text-sm hover:bg-white/5 text-gray-300">
                                                    Cancelar
                                                </button>
                                                <button onClick={handleSave} className="flex items-center gap-1 px-4 py-2 bg-primary hover:bg-primary-hover text-black font-bold rounded-lg text-sm shadow-lg shadow-primary/20">
                                                    <Save size={16} /> Salvar Alterações
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="inline-block px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-bold mb-1">
                                                    {meaning.category === 'master' ? 'Mestre' : 'Base'} #{meaning.number}
                                                </span>
                                                <h3 className="text-xl font-bold font-cinzel text-white">{meaning.title}</h3>
                                            </div>
                                            <button onClick={() => handleEdit(meaning)} className="text-gray-400 hover:text-white p-2" title="Editar">
                                                <Edit2 size={18} />
                                            </button>
                                        </div>
                                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{meaning.description}</p>
                                        {meaning.tarot_card && <div className="text-xs text-secondary-light font-medium">Tarot: {meaning.tarot_card}</div>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* CARD 2: Interactive Calculation Variables */}
            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <button
                    onClick={() => setCalculatorExpanded(!calculatorExpanded)}
                    className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/20 rounded-lg">
                            <Calculator className="text-green-400" size={24} />
                        </div>
                        <div className="text-left">
                            <h2 className="text-2xl font-cinzel text-white font-bold">Cálculo de Variáveis</h2>
                            <p className="text-sm text-gray-400 mt-1">
                                Documentação técnica e calculadora interativa ({calculationVariables.length} variáveis)
                            </p>
                        </div>
                    </div>
                    {calculatorExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </button>

                {calculatorExpanded && (
                    <div className="p-6 pt-0 space-y-6">
                        {/* Interactive Calculator */}
                        <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                                <Calculator size={20} />
                                Calculadora Interativa
                            </h3>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={testName}
                                        onChange={(e) => handleNameChange(e.target.value)}
                                        className="w-full bg-black/50 border border-white/20 p-2 rounded text-white"
                                        placeholder="Ex: Paulo Silva"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-1 block">Data de Nascimento</label>
                                    <input
                                        type="date"
                                        value={testDate}
                                        onChange={(e) => handleDateChange(e.target.value)}
                                        className="w-full bg-black/50 border border-white/20 p-2 rounded text-white"
                                    />
                                </div>
                            </div>

                            {calculatedProfile && (
                                <div className="mt-6 space-y-4">
                                    <h4 className="text-sm font-bold text-white border-b border-white/10 pb-2">Resultados Calculados:</h4>

                                    <div className="space-y-3">
                                        {/* Números Principais */}
                                        <div>
                                            <h5 className="text-xs font-bold text-gray-400 mb-2">🎯 Números Principais</h5>
                                            <div className="grid grid-cols-4 gap-2">
                                                <div className="bg-black/30 p-3 rounded border border-primary/20">
                                                    <div className="text-xs text-gray-400">Destino</div>
                                                    <div className="text-2xl font-cinzel text-primary font-bold">{calculatedProfile.core.destiny}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-purple-500/20">
                                                    <div className="text-xs text-gray-400">Alma</div>
                                                    <div className="text-2xl font-cinzel text-purple-400 font-bold">{calculatedProfile.core.motivation}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-blue-500/20">
                                                    <div className="text-xs text-gray-400">Personalidade</div>
                                                    <div className="text-2xl font-cinzel text-blue-400 font-bold">{calculatedProfile.core.impression}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-green-500/20">
                                                    <div className="text-xs text-gray-400">Expressão</div>
                                                    <div className="text-2xl font-cinzel text-green-400 font-bold">{calculatedProfile.core.expression}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-orange-500/20">
                                                    <div className="text-xs text-gray-400">Missão</div>
                                                    <div className="text-2xl font-cinzel text-orange-400 font-bold">{calculatedProfile.core.mission}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-cyan-500/20">
                                                    <div className="text-xs text-gray-400">Poder</div>
                                                    <div className="text-2xl font-cinzel text-cyan-400 font-bold">{calculatedProfile.core.powerNumber}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-red-500/20">
                                                    <div className="text-xs text-gray-400">Stress</div>
                                                    <div className="text-2xl font-cinzel text-red-400 font-bold">{calculatedProfile.core.stressNumber}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-yellow-500/20">
                                                    <div className="text-xs text-gray-400">Final</div>
                                                    <div className="text-2xl font-cinzel text-yellow-400 font-bold">{calculatedProfile.core.finalNumber}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Previsões */}
                                        <div>
                                            <h5 className="text-xs font-bold text-gray-400 mb-2">🔮 Previsões</h5>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div className="bg-black/30 p-3 rounded border border-pink-500/20">
                                                    <div className="text-xs text-gray-400">Ano Pessoal</div>
                                                    <div className="text-2xl font-cinzel text-pink-400 font-bold">{calculatedProfile.forecast.personalYear}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-indigo-500/20">
                                                    <div className="text-xs text-gray-400">Mês Pessoal</div>
                                                    <div className="text-2xl font-cinzel text-indigo-400 font-bold">{calculatedProfile.forecast.personalMonth}</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-teal-500/20">
                                                    <div className="text-xs text-gray-400">Dia Pessoal</div>
                                                    <div className="text-2xl font-cinzel text-teal-400 font-bold">{calculatedProfile.forecast.personalDay}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Ciclos */}
                                        <div>
                                            <h5 className="text-xs font-bold text-gray-400 mb-2">🔄 Ciclos & Objetivo</h5>
                                            <div className="grid grid-cols-4 gap-2">
                                                <div className="bg-black/30 p-3 rounded border border-emerald-500/20">
                                                    <div className="text-xs text-gray-400">Ciclo 1</div>
                                                    <div className="text-2xl font-cinzel text-emerald-400 font-bold">{calculatedProfile.cycles.cycle1.ruler}</div>
                                                    <div className="text-[10px] text-gray-500">até {calculatedProfile.cycles.cycle1.endAge} anos</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-lime-500/20">
                                                    <div className="text-xs text-gray-400">Ciclo 2</div>
                                                    <div className="text-2xl font-cinzel text-lime-400 font-bold">{calculatedProfile.cycles.cycle2.ruler}</div>
                                                    <div className="text-[10px] text-gray-500">até {calculatedProfile.cycles.cycle2.endAge} anos</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-amber-500/20">
                                                    <div className="text-xs text-gray-400">Ciclo 3</div>
                                                    <div className="text-2xl font-cinzel text-amber-400 font-bold">{calculatedProfile.cycles.cycle3.ruler}</div>
                                                    <div className="text-[10px] text-gray-500">{calculatedProfile.cycles.cycle3.startAge}+ anos</div>
                                                </div>
                                                <div className="bg-black/30 p-3 rounded border border-rose-500/20">
                                                    <div className="text-xs text-gray-400">Objetivo Kármico</div>
                                                    <div className="text-2xl font-cinzel text-rose-400 font-bold">{calculatedProfile.cycles.karmicObjective}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Pythagorean Table Reference */}
                        <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                            <h4 className="text-sm font-bold text-white mb-3">📊 Tabela Pitagórica</h4>
                            <div className="grid grid-cols-9 gap-2 text-center text-xs">
                                {Object.entries(pythagoreanTable).map(([num, letters]) => (
                                    <div key={num} className="bg-black/30 p-2 rounded border border-primary/20">
                                        <div className="font-bold text-primary">{num}</div>
                                        <div className="text-gray-400 text-[10px]">{letters.join(' ')}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Variable Documentation */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Documentação das Variáveis</h3>

                            {['core', 'forecast', 'cycles', 'analysis'].map(category => {
                                const categoryVars = calculationVariables.filter(v => v.category === category);
                                const categoryNames = {
                                    core: '🎯 Números Principais',
                                    forecast: '🔮 Previsões',
                                    cycles: '🔄 Ciclos de Vida',
                                    analysis: '🧬 Análise Profunda'
                                };

                                return (
                                    <div key={category} className="space-y-3">
                                        <h4 className="text-md font-bold text-primary">{categoryNames[category as keyof typeof categoryNames]}</h4>
                                        {categoryVars.map(variable => (
                                            <div key={variable.id} className="bg-white/5 border border-white/10 rounded-lg p-4">
                                                <h5 className="font-bold text-white mb-2">{variable.name}</h5>
                                                <p className="text-sm text-gray-300 mb-2">{variable.description}</p>
                                                <div className="bg-black/30 p-3 rounded border-l-4 border-primary">
                                                    <div className="text-xs text-gray-400 mb-1">Fórmula:</div>
                                                    <div className="text-sm text-white font-mono">{variable.formula}</div>
                                                </div>
                                                <div className="mt-2 bg-green-500/10 p-3 rounded border-l-4 border-green-500">
                                                    <div className="text-xs text-green-400 mb-1">Exemplo:</div>
                                                    <div className="text-sm text-gray-200">{variable.example}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
