import React from 'react';
import { Block } from '../types';

interface BlockEditorProps {
    block: Block;
    onUpdate: (blockId: string, updates: Partial<Omit<Block, 'id' | 'type'>>) => void;
    onDelete: (blockId: string) => void;
}

const BlockEditor: React.FC<BlockEditorProps> = ({ block, onUpdate, onDelete }) => {
    
    const renderBlock = () => {
        switch (block.type) {
            case 'heading':
                return <input
                    type="text"
                    value={block.content}
                    onChange={(e) => onUpdate(block.id, { content: e.target.value })}
                    className="w-full text-2xl font-bold bg-transparent focus:outline-none text-[#FFCC66]"
                    placeholder="Heading"
                />;
            case 'note':
                return <textarea
                    value={block.content}
                    onChange={(e) => onUpdate(block.id, { content: e.target.value })}
                    className="w-full bg-transparent focus:outline-none resize-none text-[#FEE9B2]"
                    placeholder="Type your note here..."
                    rows={3}
                />;
            case 'code':
                return <textarea
                    value={block.content}
                    onChange={(e) => onUpdate(block.id, { content: e.target.value })}
                    className="w-full bg-[#1C1C1C]/50 p-4 rounded-lg font-mono text-sm text-[#4DEEEA] focus:outline-none focus:ring-1 focus:ring-[#4DEEEA] resize-y"
                    placeholder="// Your code here"
                    rows={5}
                />;
            case 'checklist':
                return (
                    <div className="flex items-center">
                        <input 
                            type="checkbox" 
                            checked={!!block.checked} 
                            onChange={(e) => onUpdate(block.id, { checked: e.target.checked })}
                            className="w-5 h-5 mr-3 bg-transparent text-[#FFCC66] focus:ring-[#FFCC66] border-[#6A4C32] rounded" 
                        />
                        <input
                            type="text"
                            value={block.content}
                            onChange={(e) => onUpdate(block.id, { content: e.target.value })}
                            className={`w-full bg-transparent focus:outline-none ${block.checked ? 'line-through text-[#6A4C32]' : ''}`}
                            placeholder="To-do item"
                        />
                    </div>
                );
            default:
                return null;
        }
    }
    
    return (
        <div className="group relative p-2 hover:bg-[#6A4C32]/20 rounded-lg transition-colors flex items-center">
            <div className="flex-grow">
                {renderBlock()}
            </div>
            <button
                onClick={() => onDelete(block.id)}
                className="absolute top-1/2 -right-4 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 rounded-full bg-red-500/80 text-white hover:bg-red-500 transition-opacity"
                title="Delete Block"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
    );
};

export default BlockEditor;