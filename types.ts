
export type Page = 'chat' | 'canvas' | 'projects' | 'memory' | 'tools' | 'settings' | 'profile' | 'about';

export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
}

export interface GroundingSource {
    uri: string;
    title: string;
}

export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'jarry';
    timestamp: string;
    sources?: GroundingSource[];
}

export type BlockType = 'heading' | 'note' | 'code' | 'checklist';

export interface Block {
    id: string;
    type: BlockType;
    content: string;
    checked?: boolean;
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
    files: { id: string, name: string, type: string }[];
    notes: string;
    tasks: { id: string, text: string, completed: boolean }[];
    metadata: Record<string, string>;
}

export interface MemoryEntry {
    id: string;
    preview: string;
    content: string;
    tags: string[];
    createdAt: string;
}

export interface ToolDefinition {
    name: string;
    description: string;
    params: { name: string; type: string; description: string }[];
}