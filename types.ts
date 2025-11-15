
export type Page = 'chat' | 'canvas' | 'projects' | 'memory' | 'tools' | 'settings' | 'profile' | 'about';

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'jarry';
    timestamp: string;
    sources?: GroundingSource[];
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export type BlockType = 'heading' | 'note' | 'code' | 'checklist';

export interface Block {
    id: string;
    type: BlockType;
    content: string;
    checked?: boolean; // for checklist
}

export interface Canvas {
    id: string;
    name: string;
    blocks: Block[];
}

export interface Project {
    id: string;
    name: string;
    status: 'Active' | 'Draft' | 'Archived';
    files: string[];
    notes: string;
    tasks: { id: string, text: string, completed: boolean }[];
    metadata: Record<string, string>;
}
