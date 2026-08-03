import type { Metadata } from 'next';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import { Mail, MapPin, ExternalLink, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Modliq — A Manufacturing Intelligence Product by Qeltrava AI',
  description:
    'Contact Qeltrava AI team for Modliq demos, free pilot applications, quality passport requests, and data integration discussions. Built in Tamil Nadu, India.',
  openGraph: {
    title: 'Contact Modliq — A Manufacturing Intelligence Product by Qeltrava AI',
    description: 'Tell us about your manufacturing data problem. Apply for a free pilot with the Qeltrava AI team behind Modliq.',
    type: 'website',
    url: 'https://modliq.io/contact',
  },
};

export default function ContactPage() {
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
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B2A4A]">Contact Qeltrava AI Team</h1>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Modliq is built by Qeltrava AI from Tamil Nadu, India. For partnerships, free launch pilots, or manufacturing AI enquiries, contact our engineering team below.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
            <form
              action="/api/v1/public/contact"
              method="POST"
              className="bg-white rounded-2xl border border-[#D0E2F0] p-6 sm:p-8 shadow-card space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input id="name" name="name" type="text" required className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]" />
                </div>
                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-slate-700 mb-1">Company</label>
                  <input id="company" name="company" type="text" className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1">Email <span className="text-red-500">*</span></label>
                  <input id="email" name="email" type="email" required className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-slate-700 mb-1">Phone</label>
                  <input id="phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-xs font-medium text-slate-700 mb-1">City</label>
                  <input id="city" name="city" type="text" className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]" />
                </div>
                <div>
                  <label htmlFor="industry" className="block text-xs font-medium text-slate-700 mb-1">Industry</label>
                  <select id="industry" name="industry" className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]">
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
                  {["Free Pilot (10 slots)", "Paid pilot", "Quality Passport", "Data integration"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input type="checkbox" name="interest" value={opt.toLowerCase().replace(/[^a-z0-9]/g, "-")} className="accent-[#2B70AB]" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1">Message</label>
                <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 border border-[#D0E2F0] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]" />
              </div>

              <button type="submit" className="w-full sm:w-auto px-7 py-3.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold rounded-xl transition text-sm shadow-md">
                Send Message to Qeltrava AI Team
              </button>
            </form>

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