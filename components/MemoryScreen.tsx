
import React, { useState, useEffect } from 'react';
import { fetchMemory, addMemory } from '../services/api';
import { MemoryEntry } from '../types';

const AddMemoryModal: React.FC<{ onClose: () => void; onAdd: (newMemory: MemoryEntry) => void }> = ({ onClose, onAdd }) => {
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSave = async () => {
        if (!content.trim()) return;
        const newMemory = await addMemory('mock-user-123', {
            content,
            tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        });
        onAdd(newMemory);
        onClose();
    };
    
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-[#0B0C0D] border border-[#6A4C32] rounded-xl p-8 w-full max-w-2xl shadow-2xl">
                <h2 className="text-2xl font-bold text-[#FFCC66] mb-6">Add New Memory Entry</h2>
                <div className="space-y-4">
                    <textarea 
                        placeholder="Enter content for JARRY to remember..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={8}
                        className="w-full px-4 py-3 bg-[#0F1113] border border-[#6A4C32] rounded-lg text-[#FEE9B2] placeholder-[#6A4C32] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]"
                    />
                    <input
                        type="text"
                        placeholder="Tags (comma-separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full px-4 py-3 bg-[#0F1113] border border-[#6A4C32] rounded-lg text-[#FEE9B2] placeholder-[#6A4C32] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]"
                    />
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                    <button onClick={onClose} className="px-5 py-2 bg-transparent border border-[#6A4C32] font-bold rounded-lg hover:bg-[#6A4C32]/50 transition-all">Cancel</button>
                    <button onClick={handleSave} className="px-5 py-2 bg-[#FFCC66] text-[#1C1C1C] font-bold rounded-lg hover:bg-[#FFB74D] transition-all">Save</button>
                </div>
            </div>
        </div>
    );
};


const MemoryScreen: React.FC = () => {
    const [memories, setMemories] = useState<MemoryEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const loadMemories = async () => {
            setIsLoading(true);
            const data = await fetchMemory('mock-user-123');
            setMemories(data);
            setIsLoading(false);
        };
        loadMemories();
    }, []);
    
    const handleAddMemory = (newMemory: MemoryEntry) => {
        setMemories(prev => [newMemory, ...prev]);
    };

    return (
        <div className="p-8">
            {isModalOpen && <AddMemoryModal onClose={() => setIsModalOpen(false)} onAdd={handleAddMemory} />}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-black text-[#FEE9B2]">Vector Memory</h1>
                 <label className="flex items-center space-x-3 cursor-pointer">
                    <span className="text-lg font-semibold text-[#D4A574]">Adaptive Memory</span>
                    <div className="relative">
                        <input type="checkbox" className="sr-only peer" defaultChecked/>
                        <div className="w-14 h-8 bg-[#2A2A2A] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#4FC3F7]"></div>
                    </div>
                </label>
            </div>

            <div className="mb-8 flex space-x-4">
                <input
                    type="search"
                    placeholder="Search memory..."
                    className="flex-grow px-4 py-3 bg-[#0B0C0D] border border-[#6A4C32] rounded-lg text-[#FEE9B2] placeholder-[#6A4C32] focus:outline-none focus:ring-2 focus:ring-[#FFCC66]"
                />
                <button onClick={() => setIsModalOpen(true)} className="px-5 py-2 bg-[#FFCC66] text-[#1C1C1C] font-bold rounded-lg hover:bg-[#FFB74D] transition-all shadow-[0_0_10px_#FFCC66]/50">
                    Add Memory
                </button>
            </div>
            
            <div className="bg-[#0B0C0D]/40 border border-[#6A4C32]/50 rounded-xl">
                <ul className="divide-y divide-[#6A4C32]/50">
                    {isLoading ? (
                        <li className="p-6 text-center text-[#D4A574]">Loading memories...</li>
                    ) : (
                        memories.map(mem => (
                            <li key={mem.id} className="p-6 flex justify-between items-center hover:bg-[#6A4C32]/20 transition-colors">
                                <div>
                                    <p className="text-[#FEE9B2]">{mem.preview}</p>
                                    <div className="flex space-x-2 mt-2">
                                        {mem.tags.map(tag => (
                                            <span key={tag} className="px-2 py-0.5 text-xs bg-[#4FC3F7]/20 text-[#4FC3F7] rounded-full">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <button className="text-red-400 hover:text-red-300">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default MemoryScreen;