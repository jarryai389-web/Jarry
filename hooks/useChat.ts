
import { useState, useCallback } from 'react';
import { Message } from '../types';
import { sendMessage } from '../services/api';

export const useChat = () => {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: 'Hey! JARRY here. What chaos can we cook up today?', sender: 'jarry', timestamp: new Date().toISOString() }
    ]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addUserMessage = useCallback((text: string) => {
        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            sender: 'user',
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, userMessage]);
        return userMessage;
    }, []);

    const streamJarryResponse = useCallback(async (text: string) => {
        const jarryMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: '',
            sender: 'jarry',
            timestamp: new Date().toISOString(),
            sources: []
        };
        
        setMessages(prev => [...prev, jarryMessage]);

        // Simulate streaming
        const fullResponse = await sendMessage(text);
        const words = fullResponse.text.split(' ');
        
        let streamedText = '';
        for (let i = 0; i < words.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            streamedText += (i > 0 ? ' ' : '') + words[i];
            setMessages(prev => prev.map(m => m.id === jarryMessage.id ? { ...m, text: streamedText } : m));
        }
        
        // Final update with sources
        setMessages(prev => prev.map(m => m.id === jarryMessage.id ? { ...m, text: fullResponse.text, sources: fullResponse.sources } : m));

    }, []);

    const handleSendMessage = useCallback(async (text: string) => {
        if (!text.trim() || isLoading) return;
        
        setIsLoading(true);
        addUserMessage(text);
        
        // Simulate thinking time
        await new Promise(resolve => setTimeout(resolve, 300));
        
        await streamJarryResponse(text);

        setIsLoading(false);
    }, [isLoading, addUserMessage, streamJarryResponse]);

    return { messages, isLoading, handleSendMessage };
};
