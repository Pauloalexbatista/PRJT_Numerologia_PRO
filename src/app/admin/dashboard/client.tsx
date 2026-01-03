"use client";

import { useState } from "react";
import { Meaning } from "@/app/actions";
import { updateMeaning } from "@/app/admin-actions";
import { Edit2, Save, X } from "lucide-react";

export function DashboardClient({ initialMeanings }: { initialMeanings: Meaning[] }) {
    const [meanings, setMeanings] = useState(initialMeanings);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState<Partial<Meaning>>({});

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

    return (
        <div className="grid gap-6">
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
    );
}
