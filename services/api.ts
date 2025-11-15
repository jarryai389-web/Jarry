
// This file contains mock API functions to simulate backend interactions.
// In a real application, these would make HTTP requests to your backend.

import { Canvas, ToolDefinition, MemoryEntry } from '../types';

// In a real app, this would come from environment variables
const API_BASE = '/api/v1'; 

interface SendMessageParams {
    userId: string;
    text: string;
    sessionId: string;
    options?: Record<string, any>;
}

export const sendMessage = async (params: SendMessageParams) => {
    console.log(`Sending message to backend: ${API_BASE}/chat/send`, params);
    await new Promise(res => setTimeout(res, 1000));
    
    const isSearchQuery = params.text.toLowerCase().includes('latest') || params.text.toLowerCase().includes('news');
    return {
        text: `This is a simulated response to your message: "${params.text}". JARRY thinks this is a great starting point for some productive chaos! Let's build something amazing.`,
        sources: isSearchQuery ? [
            { uri: 'https://google.com/search?q=latest+tech+news', title: 'Latest Tech News - Google Search' },
            { uri: 'https://news.ycombinator.com', title: 'Hacker News' }
        ] : []
    };
};

export const startWebSocket = (userId: string, onMessage: (data: any) => void, onEvent: (data: any) => void) => {
    console.log(`Starting WebSocket connection for user: ${userId}`);
    // Mock WebSocket logic
    const interval = setInterval(() => {
        onMessage({ type: 'typing_status', status: 'JARRY is thinking...' });
    }, 5000);
    return {
        close: () => {
            console.log('WebSocket closed.');
            clearInterval(interval);
        }
    };
};

export const fetchCanvas = async (userId: string, canvasId: string): Promise<Canvas> => {
    console.log(`Fetching canvas ${canvasId} for user ${userId} from ${API_BASE}/canvas/${canvasId}`);
    await new Promise(res => setTimeout(res, 500));
    return {
        id: canvasId,
        name: 'My Chaotic Canvas',
        blocks: [
            { id: '1', type: 'heading', content: 'Project Brainstorm' },
            { id: '2', type: 'note', content: 'This is a note block for jotting down brilliant, chaotic ideas.' },
            { id: '3', type: 'code', content: `console.log('Hello from JARRY!');` },
            { id: '4', type: 'checklist', content: 'Create an awesome UI', checked: true },
            { id: '5', type: 'checklist', content: 'Integrate with backend', checked: false },
        ]
    };
};

export const saveCanvas = async (userId: string, canvasId: string, payload: Canvas): Promise<boolean> => {
    console.log(`Saving canvas ${canvasId} for user ${userId} to ${API_BASE}/canvas/${canvasId}`, payload);
    await new Promise(res => setTimeout(res, 800));
    return true;
};

export const listTools = async (): Promise<ToolDefinition[]> => {
    console.log(`Fetching tools from ${API_BASE}/tools`);
    await new Promise(res => setTimeout(res, 300));
    return [
        { name: 'get_time', description: 'Returns the current time.', params: [] },
        { name: 'reverse_text', description: 'Reverses a given string.', params: [{name: 'text', type: 'string', description: 'The text to reverse'}] },
        { name: 'add_numbers', description: 'Adds two numbers together.', params: [{name: 'a', type: 'number', description: 'First number'}, {name: 'b', type: 'number', description: 'Second number'}] }
    ];
};

export const callTool = async (toolName: string, params: any) => {
    console.log(`Running tool "${toolName}" with params at ${API_BASE}/tools/call:`, params);
    await new Promise(res => setTimeout(res, 1200));
    switch (toolName) {
        case 'get_time': return new Date().toLocaleTimeString();
        case 'reverse_text': return params.text.split('').reverse().join('');
        case 'add_numbers': return parseFloat(params.a) + parseFloat(params.b);
        default: return 'Tool execution failed.';
    }
};

export const fetchMemory = async (userId: string): Promise<MemoryEntry[]> => {
    console.log(`Fetching vector memory for user ${userId} from ${API_BASE}/memory`);
    await new Promise(res => setTimeout(res, 600));
    return [
        { id: 'mem1', preview: 'React best practices for state management...', content: 'Full text about React state management...', tags: ['react', 'frontend'], createdAt: new Date().toISOString() },
        { id: 'mem2', preview: 'Python decorators explained with examples...', content: 'Full text about Python decorators...', tags: ['python', 'backend'], createdAt: new Date().toISOString() },
        { id: 'mem3', preview: 'Glassmorphism UI design principles...', content: 'Full text about Glassmorphism...', tags: ['ui', 'design'], createdAt: new Date().toISOString() },
    ];
};

export const addMemory = async (userId: string, item: { content: string; tags: string[] }) => {
    console.log(`Saving new vector memory entry for user ${userId} to ${API_BASE}/memory:`, item);
    await new Promise(res => setTimeout(res, 700));
    const newId = `mem${Date.now()}`;
    return { 
        id: newId, 
        preview: `${item.content.substring(0, 40)}...`, 
        content: item.content,
        tags: item.tags,
        createdAt: new Date().toISOString()
    };
};
