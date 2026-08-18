'use client';

import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Square, ArrowLeft, MessageSquare, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function VoiceCoachPage() {
  const pathname = usePathname();
  const userId = pathname.split('/')[1] || 'demo_user';

  const [mode, setMode] = useState('INTERVIEW');
  const [sessionActive, setSessionActive] = useState(false);
  const [isInterrupted, setIsInterrupted] = useState(false);
  const [useTextMode, setUseTextMode] = useState(false);

  const [transcripts, setTranscripts] = useState([
    { sender: 'AI_COACH', text: 'Welcome to your Voice AI Coach session. Mode: Technical Quality Audit Practice. Please state your approach to Cpk capability math.' },
  ]);
  const [textInput, setTextInput] = useState('');

  const handleStartSession = async () => {
    setSessionActive(true);
    setIsInterrupted(false);
    try {
      await fetch('/api/v1/ai-labs/voice/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode }),
      });
    } catch {}
  };

  const handleInterrupt = () => {
    setIsInterrupted(true);
    setTranscripts((prev) => [
      ...prev,
      { sender: 'AI_COACH', text: '[AI Voice Output Interrupted Mid-Sentence by User Signal]' },
    ]);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput) return;
    const userMsg = textInput;
    setTextInput('');
    setTranscripts((prev) => [
      ...prev,
      { sender: 'USER', text: userMsg },
      { sender: 'AI_COACH', text: `Excellent explanation. Cpk measures how close process output is to specification limits relative to process variation. What sample size do you recommend for AQL Level II?` },
    ]);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 font-mono">
        <Link href={`/${userId}/modliq-console/ai-labs`} className="hover:text-[#2B70AB] flex items-center gap-1">
          <ArrowLeft size={12} />
          <span>AI Labs Hub</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800">Voice AI Coach</span>
        <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 text-[10px] font-bold">BETA</span>
      </div>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 text-purple-700 rounded-xl border border-purple-100">
            <Mic size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Voice AI Coach — Real-Time Interview Practice</h1>
            <p className="text-xs text-slate-500 mt-0.5">Real-time voice coaching with mid-sentence interruption &amp; text fallback</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseTextMode(!useTextMode)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            {useTextMode ? 'Switch to Voice Mode' : 'Enable Text Fallback'}
          </button>
        </div>
      </div>

      {/* Mode Selector & Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: 'INTERVIEW', label: 'Technical Interview Practice' },
            { id: 'VIVA', label: 'Research / Student Viva' },
            { id: 'QUALITY_AUDIT', label: 'ISO / Quality Audit Practice' },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                mode === m.id
                  ? 'bg-purple-50 border-purple-300 text-purple-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 pt-2">
          {!sessionActive ? (
            <button
              onClick={handleStartSession}
              className="px-6 py-2.5 bg-purple-700 text-white font-bold text-xs rounded-xl hover:bg-purple-800 transition-colors shadow-xs flex items-center gap-2"
            >
              <Mic size={16} />
              <span>Start Voice Session</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setSessionActive(false)}
                className="px-4 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition flex items-center gap-1.5"
              >
                <Square size={14} />
                <span>End Session</span>
              </button>

              <button
                onClick={handleInterrupt}
                className="px-4 py-2.5 bg-amber-500 text-white font-bold text-xs rounded-xl hover:bg-amber-600 transition flex items-center gap-1.5"
              >
                <Volume2 size={14} />
                <span>Interrupt AI Mid-Sentence</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Live Audio Visualizer / Transcript Area */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider flex items-center gap-2">
          <MessageSquare size={16} className="text-purple-600" />
          <span>Live Conversation Transcript &amp; Feedback</span>
        </h2>

        <div className="space-y-3 max-h-80 overflow-y-auto p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          {transcripts.map((t, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-xl ${
                t.sender === 'AI_COACH'
                  ? 'bg-purple-100/70 border border-purple-200 text-purple-900 self-start'
                  : 'bg-blue-600 text-white ml-auto font-medium'
              }`}
            >
              <p className="font-bold text-[10px] font-mono opacity-75 uppercase mb-1">
                {t.sender === 'AI_COACH' ? 'Voice AI Coach' : 'You'}
              </p>
              <p className="leading-relaxed">{t.text}</p>
            </div>
          ))}
        </div>

        {/* Text Fallback Input */}
        {useTextMode && (
          <form onSubmit={handleSendText} className="flex gap-2">
            <input
              type="text"
              placeholder="Type your response (Text Fallback Mode)..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="flex-1 px-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-700 text-white text-xs font-bold rounded-xl hover:bg-purple-800 transition"
            >
              Send Response
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
