'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { User, Phone, Building2, MapPin, Factory, CheckCircle, X } from 'lucide-react';

export default function UserProfileModal() {
  const { user, updateProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    mobileNo: '',
    organization: '',
    city: '',
    industry: 'specialty-chemicals',
  });

  useEffect(() => {
    if (user && user.id) {
      const savedProfile = localStorage.getItem(`modliq_user_profile_${user.id}`);
      let isComplete = user.profileComplete || false;

      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.mobileNo && parsed.organization) {
            isComplete = true;
          }
          setFormData((prev) => ({
            ...prev,
            name: user.name || parsed.name || '',
            mobileNo: parsed.mobileNo || '',
            organization: parsed.organization || '',
            city: parsed.city || '',
            industry: parsed.industry || 'specialty-chemicals',
          }));
        } catch {
          // ignore error
        }
      } else {
        setFormData((prev) => ({
          ...prev,
          name: user.name || '',
          mobileNo: user.mobileNo || '',
          organization: user.organization || '',
          city: user.city || '',
          industry: user.industry || 'specialty-chemicals',
        }));
      }

      // If key profile fields (mobileNo or organization) are missing, open popup modal once after login
      if (!isComplete && !user.mobileNo && !user.organization) {
        setIsOpen(true);
      }
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (updateProfile) {
        await updateProfile({
          name: formData.name,
          mobileNo: formData.mobileNo,
          organization: formData.organization,
          city: formData.city,
          industry: formData.industry,
          profileComplete: true,
        });
      }

      localStorage.setItem(
        `modliq_user_profile_${user.id}`,
        JSON.stringify({
          ...formData,
          profileComplete: true,
          updatedAt: new Date().toISOString(),
        })
      );

      setIsOpen(false);
    } catch (err) {
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
          title="Close Modal"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#2B70AB]">
            <User size={22} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Welcome to Modliq Platform!</h2>
            <p className="text-xs text-slate-500 font-medium">
              Please complete your organization profile details for Quality Passport certificate generation.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
              <User size={14} className="text-[#2B70AB]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Sathish Pandiyan"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Phone size={14} className="text-[#2B70AB]" />
                <span>Mobile Number</span> <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.mobileNo}
                onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Building2 size={14} className="text-[#2B70AB]" />
                <span>Organization / Factory</span> <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                placeholder="e.g. Qeltrava Chemicals Ltd"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <MapPin size={14} className="text-[#2B70AB]" />
                <span>Plant City / Location</span>
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Chennai, Tamil Nadu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                <Factory size={14} className="text-[#2B70AB]" />
                <span>Industry Sector</span>
              </label>
              <select
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              >
                <option value="specialty-chemicals">Specialty Chemicals</option>
                <option value="pharma">Pharma / Bio</option>
                <option value="food-processing">Food Processing</option>
                <option value="automotive">Automotive Components</option>
                <option value="packaging">Plastics / Packaging</option>
                <option value="precision">Precision Engineering</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold rounded-xl text-sm transition shadow-md flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} />
              <span>{loading ? 'Saving Profile...' : 'Save Profile & Continue to Console'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
