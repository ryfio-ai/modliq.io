'use client';

import React, { useState } from 'react';
import { Receipt, Upload, CheckCircle2, Search, ArrowLeft, DollarSign, Tag, Calendar, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SpendLensPage() {
  const pathname = usePathname();
  const userId = pathname.split('/')[1] || 'demo_user';

  const [filename, setFilename] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [extractedReceipt, setExtractedReceipt] = useState<any>(null);
  const [isValidated, setIsValidated] = useState(false);

  const [merchant, setMerchant] = useState('Industrial Supplier Tech Corp');
  const [amount, setAmount] = useState('4850.00');
  const [category, setCategory] = useState('Equipment & Calibration');

  const [chatQuery, setChatQuery] = useState('');
  const [chatAnswer, setChatAnswer] = useState<string | null>(null);

  const handleUploadReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!filename) return;
    setIsUploading(true);

    try {
      const res = await fetch('/api/v1/ai-labs/spendlens/receipts/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename }),
      });
      const data = await res.json();
      setExtractedReceipt(data.receipt);
    } catch {
      setExtractedReceipt({
        id: 'rec_demo_1001',
        filename,
        merchant: 'Industrial Supplier Tech Corp',
        totalAmount: 4850.00,
        currency: 'INR',
        category: 'Equipment & Calibration',
        validated: false,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsValidated(true);
    try {
      await fetch(`/api/v1/ai-labs/spendlens/receipts/${extractedReceipt?.id || 'rec_demo_1001'}/validate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchant, totalAmount: amount, category }),
      });
    } catch {}
  };

  const handleSpendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatQuery) return;

    try {
      const res = await fetch('/api/v1/ai-labs/spendlens/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: chatQuery }),
      });
      const data = await res.json();
      setChatAnswer(data.answer);
    } catch {
      setChatAnswer(`Based on your validated spend: Total verified expenditure is ₹${amount} under ${category} from ${merchant}.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 font-mono">
        <Link href={`/${userId}/modliq-console/ai-labs`} className="hover:text-[#2B70AB] flex items-center gap-1">
          <ArrowLeft size={12} />
          <span>AI Labs Hub</span>
        </Link>
        <span>/</span>
        <span className="text-slate-800">SpendLens SaaS</span>
        <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold">BETA</span>
      </div>

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-50 text-teal-700 rounded-xl border border-teal-100">
            <Receipt size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">SpendLens — AI Receipt Intelligence SaaS</h1>
            <p className="text-xs text-slate-500 mt-0.5">Upload receipts, validate extracted data, and chat with validated spend</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Col: Upload & Validate Form (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Upload size={16} className="text-teal-600" />
              <span>1. Upload Receipt Image / PDF</span>
            </h2>

            <form onSubmit={handleUploadReceipt} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Receipt File Name</label>
                <input
                  type="text"
                  placeholder="e.g. calibration_vendor_invoice.pdf"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                type="submit"
                disabled={isUploading || !filename}
                className="w-full py-2.5 bg-teal-700 text-white font-bold text-xs rounded-xl hover:bg-teal-800 transition-colors disabled:opacity-50"
              >
                {isUploading ? 'Extracting OCR & Fields...' : 'Extract Fields with AI'}
              </button>
            </form>

            {extractedReceipt && (
              <form onSubmit={handleValidate} className="pt-4 border-t border-slate-100 space-y-3">
                <h3 className="text-xs font-bold text-slate-800 uppercase font-mono tracking-wider">
                  2. User Field Verification (Mandatory Gate)
                </h3>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Merchant Name</label>
                  <input
                    type="text"
                    value={merchant}
                    onChange={(e) => setMerchant(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Total Amount (₹)</label>
                    <input
                      type="text"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 mb-1">Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-medium"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isValidated}
                  className="w-full py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 size={14} />
                  <span>{isValidated ? 'Spend Validated & Saved' : 'Confirm & Save Validated Spend'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Col: Spend Analytics & Chat (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Search size={16} className="text-teal-600" />
              <span>Chat with Validated Spend</span>
            </h2>

            <form onSubmit={handleSpendChat} className="space-y-3">
              <input
                type="text"
                placeholder="e.g. How much did I spend on Equipment & Calibration?"
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                disabled={!chatQuery}
                className="px-5 py-2 bg-[#1B2A4A] text-white font-bold text-xs rounded-xl hover:bg-[#2B70AB] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                <Sparkles size={14} />
                <span>Ask Spend Assistant</span>
              </button>
            </form>

            {chatAnswer && (
              <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-xs space-y-1 text-teal-950 font-medium">
                <p className="font-bold font-mono uppercase text-[10px] text-teal-800">Spend Assistant Answer:</p>
                <p className="leading-relaxed">{chatAnswer}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
