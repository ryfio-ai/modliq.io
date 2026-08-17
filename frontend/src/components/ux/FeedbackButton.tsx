'use client';

import React, { useState } from 'react';
import { MessageSquarePlus, X, Send, CheckCircle2, ThumbsUp, AlertCircle, Sparkles } from 'lucide-react';
import { apiFetch } from '@/lib/apiFetch';

export default function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState<'helpful' | 'confusing' | 'bug' | 'suggestion'>('helpful');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    try {
      await apiFetch('/api/v1/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: `User Feedback [${category.toUpperCase()}]`,
          category: 'FEEDBACK',
          message: `Category: ${category}\nURL: ${typeof window !== 'undefined' ? window.location.pathname : ''}\nFeedback: ${message}`,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setMessage('');
        setOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Feedback submit failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1B2A4A] hover:bg-[#2B70AB] text-white text-xs font-semibold shadow-xl border border-slate-700 transition-all hover:scale-105 print:hidden"
        aria-label="Give Feedback"
      >
        <MessageSquarePlus size={16} className="text-cyan-400" />
        <span>Give Feedback</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 print:hidden animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 w-full max-w-md p-6 shadow-2xl space-y-5 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles size={18} className="text-[#2B70AB]" /> Share Your Feedback
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Help us make Modliq better for manufacturing &amp; engineering teams.
              </p>
            </div>

            {success ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 text-emerald-800">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm">Thank You for Your Feedback!</h4>
                <p className="text-xs text-emerald-700">Our engineering team has received your note.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">Feedback Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'helpful', label: '👍 Worked Well' },
                      { id: 'confusing', label: '🤔 Confusing' },
                      { id: 'bug', label: '🐞 Report Issue' },
                      { id: 'suggestion', label: '💡 Suggestion' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setCategory(item.id as any)}
                        className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                          category === item.id
                            ? 'border-[#2B70AB] bg-blue-50 text-[#2B70AB] font-bold'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Your Message</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what worked, what was confusing, or what you would like to see..."
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-blue-100 focus:border-[#2B70AB] outline-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2B70AB] hover:bg-[#205887] text-white font-semibold text-xs shadow-sm transition-all"
                  >
                    <Send size={14} />
                    <span>{submitting ? 'Submitting…' : 'Submit Feedback'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
