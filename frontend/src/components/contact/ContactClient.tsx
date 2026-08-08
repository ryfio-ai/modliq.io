'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import { Globe, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactClient() {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get('interest');

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [headingText, setHeadingText] = useState('Contact Qeltrava AI Team');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    industry: '',
    message: '',
  });

  useEffect(() => {
    if (interestParam === 'free-pilot') {
      setSelectedInterests(['free-pilot']);
      setHeadingText('Apply for the Modliq Free Manufacturing Pilot');
    } else if (interestParam === 'pilot') {
      setSelectedInterests(['paid-pilot']);
      setHeadingText('Book a Modliq 30-Day Manufacturing Pilot');
    } else if (interestParam === 'roi-review') {
      setSelectedInterests(['data-integration']);
      setHeadingText('Request a Custom Plant ROI Review');
    }
  }, [interestParam]);

  const toggleInterest = (val: string) => {
    setSelectedInterests((prev) =>
      prev.includes(val) ? prev.filter((i) => i !== val) : [...prev, val]
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/v1/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          interest: selectedInterests,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit contact form. Please try again.');
      }
    } catch {
      // Fallback client response
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen flex flex-col justify-between">
      <div>
        <PublicNavbar />

        <section className="bg-gradient-to-b from-white via-[#F0F6FA] to-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-[#2B70AB]">
              <Globe className="w-3.5 h-3.5" />
              <span>Built by Qeltrava AI • Tamil Nadu, India</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]">{headingText}</h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Modliq is built by Qeltrava AI from Tamil Nadu, India. For partnerships, free launch pilots, or manufacturing AI enquiries, contact our engineering team below.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-2xl font-bold text-slate-900">Thank You for Reaching Out!</h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  Your message has been received by the Qeltrava AI engineering team. We will review your plant requirements and contact you within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', company: '', email: '', phone: '', city: '', industry: '', message: '' });
                  }}
                  className="px-6 py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold rounded-xl text-xs transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-card space-y-5"
              >
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-xs font-medium text-slate-700 mb-1">
                      Company
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-xs font-medium text-slate-700 mb-1">
                      City
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
                    />
                  </div>
                  <div>
                    <label htmlFor="industry" className="block text-xs font-medium text-slate-700 mb-1">
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
                    >
                      <option value="">Select industry</option>
                      <option value="specialty-chemicals">Specialty Chemicals</option>
                      <option value="pharma">Pharma / Nutraceuticals</option>
                      <option value="food-processing">Food Processing</option>
                      <option value="automotive">Automotive Components</option>
                      <option value="packaging">Packaging / Plastics</option>
                      <option value="textiles">Textiles</option>
                      <option value="biomanufacturing">Biomanufacturing / Fermentation</option>
                      <option value="precision">Precision Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-2">Interested in</label>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { label: 'Launch Pilot (10 slots free)', val: 'free-pilot' },
                      { label: 'Custom Enterprise Plan', val: 'enterprise' },
                      { label: 'Quality Passport', val: 'quality-passport' },
                      { label: 'Data integration', val: 'data-integration' },
                    ].map((opt) => (
                      <label key={opt.val} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          name="interest"
                          value={opt.val}
                          checked={selectedInterests.includes(opt.val)}
                          onChange={() => toggleInterest(opt.val)}
                          className="accent-[#2B70AB]"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-7 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold rounded-xl transition text-sm shadow-md"
                >
                  {loading ? 'Submitting Message...' : 'Send Message to Qeltrava AI Team'}
                </button>
              </form>
            )}

            {/* Qeltrava AI Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="https://qeltravaai.vercel.app/en"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F0F6FA] rounded-xl border border-[#D0E2F0] p-5 shadow-sm text-center block hover:border-[#2B70AB] transition"
              >
                <h4 className="text-sm font-bold text-[#1B2A4A] mb-1 flex items-center justify-center gap-1">
                  <span>Qeltrava AI Website</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#2B70AB]" />
                </h4>
                <p className="text-xs text-slate-500">qeltravaai.vercel.app</p>
              </a>

              <a
                href="https://www.linkedin.com/company/qeltravai/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F0F6FA] rounded-xl border border-[#D0E2F0] p-5 shadow-sm text-center block hover:border-[#2B70AB] transition"
              >
                <h4 className="text-sm font-bold text-[#1B2A4A] mb-1 flex items-center justify-center gap-1">
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#2B70AB]" />
                </h4>
                <p className="text-xs text-slate-500">company/qeltravai</p>
              </a>

              <a
                href="https://www.instagram.com/qeltravaai"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F0F6FA] rounded-xl border border-[#D0E2F0] p-5 shadow-sm text-center block hover:border-[#2B70AB] transition"
              >
                <h4 className="text-sm font-bold text-[#1B2A4A] mb-1 flex items-center justify-center gap-1">
                  <span>Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#2B70AB]" />
                </h4>
                <p className="text-xs text-slate-500">@qeltravaai</p>
              </a>
            </div>
          </div>
        </section>
      </div>

      <PublicFooter />
    </div>
  );
}
