import { useState, useCallback, useRef } from 'react';
import api from '@/utils/api';
import { API_ENDPOINTS } from '@/utils/constants';
import { ChatResponse, ChatContext } from '@/types';

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  context?: ChatContext;
  suggestions?: string[];
}

interface UseChatbotReturn {
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  sessionId: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearChat: () => void;
  suggestions: string[];
}

export const useChatbot = (): UseChatbotReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const sessionIdRef = useRef<string | null>(null);

  // Generate or retrieve session ID
  const getSessionId = useCallback((): string => {
    if (sessionIdRef.current) {
      return sessionIdRef.current;
    }
    
    // Check localStorage first
    const savedSessionId = localStorage.getItem('chat_session_id');
    if (savedSessionId) {
      sessionIdRef.current = savedSessionId;
      return savedSessionId;
    }
    
    // Generate new session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionIdRef.current = newSessionId;
    localStorage.setItem('chat_session_id', newSessionId);
    return newSessionId;
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;
    
    setLoading(true);
    setError(null);
    setSuggestions([]); // Clear previous suggestions
    
    // Add user message immediately
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      const sessionId = getSessionId();
      const response = await api.post<ChatResponse>(API_ENDPOINTS.CHAT_SEND, {
        session_id: sessionId,
        message: message.trim(),
      });
      
      // Add bot response
      const botMessage: ChatMessage = {
        id: `bot_${Date.now()}`,
        content: response.data.response,
        isUser: false,
        timestamp: new Date(response.data.timestamp),
        context: response.data.context,
        suggestions: response.data.suggestions,
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Update suggestions if provided
      if (response.data.suggestions && response.data.suggestions.length > 0) {
        setSuggestions(response.data.suggestions);
      }
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to send message. Please try again.';
      setError(errorMessage);
      
      // Add error message from bot
      const errorBotMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        content: 'Sorry, I encountered an error. Please try again or contact support.',
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorBotMessage]);
    } finally {
      setLoading(false);
    }
  }, [getSessionId]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSuggestions([]);
    sessionIdRef.current = null;
    localStorage.removeItem('chat_session_id');
  }, []);

  return {
    messages,
    loading,
    error,
    sessionId: sessionIdRef.current,
    sendMessage,
    clearChat,
    suggestions,
  };
};