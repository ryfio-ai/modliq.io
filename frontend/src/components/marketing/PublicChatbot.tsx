'use client';

import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';

interface PublicChatbotProps {
  enabled?: boolean;
  welcomeMessage?: string;
  suggestedQuestions?: string[];
  position?: string;
}

export default function PublicChatbot({
  enabled = true,
  welcomeMessage = "Hi! I'm the Modliq Assistant. Ask me about features, pricing, Quality Passports, or how our free pilot works.",
  suggestedQuestions = [
    'What is Modliq?',
    'How does the free pilot work?',
    'What data formats can I upload?',
    'What is a Quality Passport?',
    'Do I need data science expertise?',
  ],
  position = 'bottom-right',
}: PublicChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'bot' | 'user'; content: string }>>([
    { role: 'bot', content: welcomeMessage },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!enabled) return null;

  const handleSend = async (questionText?: string) => {
    const textToSend = questionText || input.trim();
    if (!textToSend) return;

    setMessages((prev) => [...prev, { role: 'user', content: textToSend }]);
    if (!questionText) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/v1/public/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();
      if (data.success && data.answer) {
        setMessages((prev) => [...prev, { role: 'bot', content: data.answer }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: 'bot',
            content:
              'Modliq is an enterprise manufacturing intelligence platform for process optimization and Quality Passports. Contact support@modliq.io for assistance.',
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            'Modliq optimizes factory yield and generates buyer-ready Quality Passports. Apply for our 30-day free pilot on our contact page!',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const posClasses = position === 'bottom-left' ? 'bottom-6 left-6' : 'bottom-6 right-6';

  return (
    <div className={`fixed ${posClasses} z-50 font-sans`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 group hover:scale-105"
        >
          <Bot className="w-6 h-6 animate-pulse" />
          <span className="text-xs font-bold pr-1 hidden sm:inline">Ask Modliq AI</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-white border border-[#D0E2F0] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[480px] animate-in slide-in-from-bottom duration-200">
          {/* Header */}
          <div className="p-4 bg-[#1B2A4A] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#2B70AB] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold tracking-tight">Modliq Marketing Assistant</h3>
                <span className="text-[10px] text-blue-200 font-medium">Always online</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#F0F6FA] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-[#2B70AB] text-white font-medium rounded-br-xs'
                      : 'bg-white text-[#1B2A4A] border border-[#D0E2F0] font-normal shadow-2xs rounded-bl-xs'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="p-3 bg-white border border-[#D0E2F0] text-slate-400 rounded-2xl text-xs font-medium animate-pulse">
                  Modliq Assistant is typing...
                </div>
              </div>
            )}
          </div>

          {/* Suggested Questions */}
          {suggestedQuestions && suggestedQuestions.length > 0 && messages.length <= 2 && (
            <div className="p-2 bg-white border-t border-[#D0E2F0] overflow-x-auto flex gap-1.5 no-scrollbar">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  className="px-2.5 py-1 bg-[#F0F6FA] hover:bg-blue-100 text-[#2B70AB] text-[10px] font-bold rounded-lg whitespace-nowrap transition"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 bg-white border-t border-[#D0E2F0] flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 px-3 py-2 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB]"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim()}
              className="p-2 bg-[#2B70AB] hover:bg-[#1B2A4A] disabled:opacity-40 text-white rounded-xl transition"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
