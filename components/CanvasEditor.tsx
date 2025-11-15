import React, { useState, useEffect } from 'react';
import { Canvas, Block, BlockType } from '../types';
import { fetchCanvas, saveCanvas } from '../services/api';
import BlockEditor from './BlockEditor';

const CanvasEditor: React.FC = () => {
    const [canvas, setCanvas] = useState<Canvas | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadCanvas = async () => {
            setIsLoading(true);
            // FIX: Provided both userId and canvasId to fetchCanvas as required by its definition.
            const data = await fetchCanvas('mock-user-123', 'default-canvas');
            setCanvas(data);
            setIsLoading(false);
        };
        loadCanvas();
    }, []);
    
    const updateBlock = (blockId: string, updates: Partial<Omit<Block, 'id' | 'type'>>) => {
        if (!canvas) return;
        const updatedBlocks = canvas.blocks.map(b => 
            b.id === blockId ? { ...b, ...updates } : b
        );
        setCanvas({ ...canvas, blocks: updatedBlocks });
    };

    const addBlock = (type: BlockType) => {
        if (!canvas) return;
        const newBlock: Block = {
            id: `block-${Date.now()}`,
            type,
            content: '',
            checked: type === 'checklist' ? false : undefined,
        };
        setCanvas({ ...canvas, blocks: [...canvas.blocks, newBlock] });
    };

    const deleteBlock = (blockId: string) => {
        if (!canvas) return;
        const filteredBlocks = canvas.blocks.filter(b => b.id !== blockId);
        setCanvas({ ...canvas, blocks: filteredBlocks });
    };

    if (isLoading) {
        return <div className="p-8 text-center text-[#D4A574]">Loading Canvas...</div>;
    }

    if (!canvas) {
        return <div className="p-8 text-center text-red-400">Failed to load canvas.</div>;
    }

    return (
        <div className="p-4 sm:p-8 md:p-12 text-[#FEE9B2] bg-grid-[#6A4C32]/10">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <input
                        type="text"
                        value={canvas.name}
                        onChange={(e) => setCanvas({ ...canvas, name: e.target.value })}
                        className="text-4xl font-black bg-transparent border-none focus:outline-none focus:ring-0 text-[#FEE9B2]"
                    />
                    <div className="flex space-x-2">
                        {/* FIX: Provided all required arguments (userId, canvasId, payload) to saveCanvas. */}
                        <button onClick={() => saveCanvas('mock-user-123', canvas.id, canvas)} className="px-4 py-2 bg-[#FFCC66] text-[#1C1C1C] font-bold rounded-lg hover:bg-[#FFB74D] transition-all shadow-[0_0_10px_#FFCC66]/50">Save</button>
                        <button className="px-4 py-2 bg-transparent border border-[#6A4C32] font-bold rounded-lg hover:bg-[#6A4C32]/50 transition-all">Export</button>
                    </div>
                </div>

                <div className="space-y-4">
                    {canvas.blocks.map(block => (
                        <BlockEditor key={block.id} block={block} onUpdate={updateBlock} onDelete={deleteBlock} />
                    ))}
                </div>
                
                <div className="mt-8 flex space-x-2">
                    <button onClick={() => addBlock('heading')} className="px-3 py-1 bg-[#2A2A2A] border border-[#6A4C32] rounded-md text-sm hover:bg-[#6A4C32]/50 transition-all">+ Heading</button>
                    <button onClick={() => addBlock('note')} className="px-3 py-1 bg-[#2A2A2A] border border-[#6A4C32] rounded-md text-sm hover:bg-[#6A4C32]/50 transition-all">+ Note</button>
                    <button onClick={() => addBlock('code')} className="px-3 py-1 bg-[#2A2A2A] border border-[#6A4C32] rounded-md text-sm hover:bg-[#6A4C32]/50 transition-all">+ Code</button>
                    <button onClick={() => addBlock('checklist')} className="px-3 py-1 bg-[#2A2A2A] border border-[#6A4C32] rounded-md text-sm hover:bg-[#6A4C32]/50 transition-all">+ Checklist</button>
                </div>
            </div>
        </div>
    );
};

export default CanvasEditor;