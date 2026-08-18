'use client';

import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Send,
  CheckCircle2,
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Layers,
  HelpCircle,
  FileText,
} from 'lucide-react';

interface QuoteDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultInterest?: string;
}

export default function QuoteDemoModal({
  isOpen,
  onClose,
  defaultInterest = 'Quote & Live Demo',
}: QuoteDemoModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    industry: 'Specialty Chemicals',
    role: 'Process Engineer',
    city: '',
    interest: defaultInterest,
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadRefId, setLeadRefId] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name and work email.');
      return;
    }

    try {
      setSubmitting(true);
      setErrorMsg(null);

      const res = await fetch('/api/v1/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        setLeadRefId(data.id || `DEMO_${Date.now().toString().slice(-6)}`);
      } else {
        setErrorMsg(data.error || 'Failed to submit quote demo request. Please try again.');
      }
    } catch {
      setErrorMsg('Error connecting to server. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-sm animate-fadeIn font-sans">
      <div className="relative w-full max-w-2xl bg-white border border-[#D0E2F0] rounded-3xl shadow-2xl overflow-hidden my-8 text-[#1B2A4A]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1B2A4A] via-[#1B2A4A] to-[#2B70AB] p-6 text-white flex items-center justify-between relative">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-xs font-bold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Modliq Platform Launch — August 20</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Request Platform Quote & Book Demo
            </h2>
            <p className="text-xs text-blue-100 font-medium">
              Explore no-code manufacturing ML, quality passports, and plant optimization with a tailored demonstration.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition shrink-0 ml-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-[#1B2A4A]">Quote Demo Request Received!</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-[#1B2A4A]">{formData.name}</span>. Our technical application team will contact you at <span className="font-bold text-[#2B70AB]">{formData.email}</span> within 24 hours.
                </p>
              </div>

              <div className="p-4 bg-[#F0F6FA] border border-[#D0E2F0] rounded-2xl max-w-md mx-auto text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#D0E2F0] pb-2">
                  <span className="text-slate-500 font-medium">Reference ID:</span>
                  <span className="font-mono font-bold text-[#1B2A4A]">{leadRefId}</span>
                </div>
                <div className="flex justify-between border-b border-[#D0E2F0] pb-2">
                  <span className="text-slate-500 font-medium">Target Industry:</span>
                  <span className="font-bold text-[#1B2A4A]">{formData.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Status:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">SCHEDULED IN QUEUE</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-8 py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold text-sm rounded-xl transition shadow-md"
                >
                  Done & Back to Platform
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#2B70AB]" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Rajesh Kumar"
                    className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#2B70AB]" /> Work / Academic Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. rajesh@company.com"
                    className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#2B70AB]" /> Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                  />
                </div>

                {/* Company / Institution */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#2B70AB]" /> Organization / Plant / College
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. ChemTech Corp / IIT Madras"
                    className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#2B70AB]" /> Industry Sector
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                  >
                    <option value="Specialty Chemicals">Specialty Chemicals</option>
                    <option value="Automotive Components">Automotive Components</option>
                    <option value="Food Processing">Food Processing</option>
                    <option value="Pharma / Nutraceuticals">Pharma / Nutraceuticals</option>
                    <option value="Packaging / Plastics">Packaging / Plastics</option>
                    <option value="Textiles & Apparel">Textiles & Apparel</option>
                    <option value="Education & Academic Research">Education & Academic Research</option>
                    <option value="Other Industry">Other Industry</option>
                  </select>
                </div>

                {/* Role */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#2B70AB]" /> Your Role
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                  >
                    <option value="Plant Manager">Plant Manager / Director</option>
                    <option value="Process Engineer">Process / QC Engineer</option>
                    <option value="Quality Head">Quality Head / Manager</option>
                    <option value="Operations Lead">Operations / Lean Lead</option>
                    <option value="Professor / Researcher">Professor / Researcher</option>
                    <option value="Student">Student / Scholar</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#2B70AB]" /> City / Location
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Chennai, Coimbatore, Hosur"
                    className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                  />
                </div>

                {/* Primary Interest */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#2B70AB]" /> Primary Request
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                  >
                    <option value="Quote & Live Demo">Quote & Live Demo</option>
                    <option value="Free Plant Pilot Application">Free Plant Pilot Application</option>
                    <option value="Academic Lab & Research License">Academic Lab & Research License</option>
                    <option value="Enterprise On-Premise Deployment">Enterprise On-Premise Deployment</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#2B70AB]" /> Process / Research Details or Objectives
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your production lines, key target variables, yield objectives, or research dataset..."
                  className="w-full px-3.5 py-2.5 bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl text-xs font-medium text-[#1B2A4A] focus:outline-none focus:border-[#2B70AB] focus:bg-white transition"
                />
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#D0E2F0]">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#F0F6FA] hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold text-xs rounded-xl flex items-center gap-2 transition shadow-md shadow-blue-500/10 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Submitting Quote Request...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-blue-200" />
                      <span>Submit Quote Demo Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
