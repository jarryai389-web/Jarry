
// This file contains mock API functions to simulate backend interactions.
// In a real application, these would make HTTP requests to your backend.

import { Canvas, Block } from '../types';

export const sendMessage = async (text: string) => {
    console.log(`Sending message to backend: ${text}`);
    await new Promise(res => setTimeout(res, 1000));
    // Mock response with potential search grounding
    const isSearchQuery = text.toLowerCase().includes('latest') || text.toLowerCase().includes('news');
    return {
        text: `This is a simulated response to your message: "${text}". JARRY thinks this is a great starting point for some productive chaos! Let's build something amazing.`,
        sources: isSearchQuery ? [
            { uri: 'https://google.com/search?q=latest+tech+news', title: 'Latest Tech News - Google Search' },
            { uri: 'https://news.ycombinator.com', title: 'Hacker News' }
        ] : []
    };
};

export const startWebSocket = (userId: string) => {
    console.log(`Starting WebSocket connection for user: ${userId}`);
    // Mock WebSocket logic
    return {
        onMessage: (callback: (data: any) => void) => {
            setInterval(() => {
                callback({ type: 'status_update', message: 'JARRY is online.' });
            }, 5000);
        },
        close: () => console.log('WebSocket closed.')
    };
};

export const fetchCanvas = async (canvasId: string): Promise<Canvas> => {
    console.log(`Fetching canvas: ${canvasId}`);
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

export const saveCanvas = async (canvas: Canvas): Promise<boolean> => {
    console.log('Saving canvas:', canvas);
    await new Promise(res => setTimeout(res, 800));
    return true;
};

export const fetchTools = async () => {
    console.log('Fetching tools');
    await new Promise(res => setTimeout(res, 300));
    return [
        { name: 'get_time', description: 'Returns the current time.', params: [] },
        { name: 'reverse_text', description: 'Reverses a given string.', params: ['text'] },
        { name: 'add_numbers', description: 'Adds two numbers together.', params: ['a', 'b'] }
    ];
};

export const runTool = async (toolName: string, params: any) => {
    console.log(`Running tool "${toolName}" with params:`, params);
    await new Promise(res => setTimeout(res, 1200));
    switch (toolName) {
        case 'get_time': return new Date().toLocaleTimeString();
        case 'reverse_text': return params.text.split('').reverse().join('');
        case 'add_numbers': return parseFloat(params.a) + parseFloat(params.b);
        default: return 'Tool execution failed.';
    }
};

export const fetchVectorMemory = async () => {
    console.log('Fetching vector memory');
    await new Promise(res => setTimeout(res, 600));
    return [
        { id: 'mem1', preview: 'React best practices for state management...', tags: ['react', 'frontend'] },
        { id: 'mem2', preview: 'Python decorators explained with examples...', tags: ['python', 'backend'] },
        { id: 'mem3', preview: 'Glassmorphism UI design principles...', tags: ['ui', 'design'] },
    ];
};

export const saveVectorMemory = async (entry: { content: string; tags: string[] }) => {
    console.log('Saving new vector memory entry:', entry);
    await new Promise(res => setTimeout(res, 700));
    return { id: `mem${Date.now()}`, preview: `${entry.content.substring(0, 40)}...`, tags: entry.tags };
};
