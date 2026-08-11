'use client';

import React, { useState, useEffect } from 'react';
import { User, Building2, Phone, MapPin, Factory, ShieldCheck, Key, Save, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { generateClientPublicId } from '@/lib/publicId';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [passkeyEnabled, setPasskeyEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobileNo: user?.mobileNo || '',
    organization: user?.organization || '',
    city: user?.city || '',
    industry: user?.industry || 'specialty-chemicals',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        mobileNo: user.mobileNo || '',
        organization: user.organization || '',
        city: user.city || '',
        industry: user.industry || 'specialty-chemicals',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSavedSuccess(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

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
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Save profile error:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <User className="text-[#2B70AB]" size={26} />
            User Account &amp; Organization Profile
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your personal profile, contact information, plant organization details, and security keys.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-mono text-xs font-bold self-start sm:self-auto">
          Role: {(user as any)?.role || 'USER'}
        </span>
      </div>

      {savedSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600" />
          <span>Your profile details have been saved and updated across the Modliq platform!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Editable Profile Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 size={18} className="text-[#2B70AB]" />
            <span>Profile &amp; Contact Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Phone size={14} className="text-slate-400" />
                <span>Mobile Number</span>
              </label>
              <input
                type="tel"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Building2 size={14} className="text-slate-400" />
                <span>Organization / Factory</span>
              </label>
              <input
                type="text"
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                placeholder="e.g. Qeltrava Manufacturing Plant"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin size={14} className="text-slate-400" />
                <span>Plant Location / City</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="e.g. Chennai, Tamil Nadu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Factory size={14} className="text-slate-400" />
                <span>Industry Sector</span>
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#2B70AB]"
              >
                <option value="specialty-chemicals">Specialty Chemicals</option>
                <option value="pharma">Pharma / Bio</option>
                <option value="food-processing">Food Processing</option>
                <option value="automotive">Automotive Components</option>
                <option value="packaging">Plastics / Packaging</option>
                <option value="textiles">Textiles</option>
                <option value="precision">Precision Engineering</option>
                <option value="other">Other Industry</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#2B70AB] hover:bg-[#1B2A4A] text-white font-bold rounded-xl text-xs transition shadow-md flex items-center gap-2"
            >
              <Save size={15} />
              <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Security & Passkeys */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-emerald-600" />
              <span>Platform Access</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-500 block text-[10px]">Assigned System Role</span>
                <span className="font-bold text-slate-900 uppercase">{(user as any)?.role || 'USER'}</span>
              </div>
              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200">
                <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">User Public ID</span>
                <span className="font-mono text-xs text-[#2B70AB] font-extrabold block mt-0.5">{user?.publicId || generateClientPublicId('USER', 1000)}</span>
                <span className="text-[9px] text-slate-400 block mt-1">Internal Ref: {user?.id || 'usr_demo'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Key size={18} className="text-blue-600" />
              <span>FIDO2 / Hardware Passkey</span>
            </h3>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div>
                <span className="font-bold text-slate-800 block text-xs">WebAuthn Security</span>
                <span className="text-[10px] text-slate-500">Touch ID / YubiKey Registered</span>
              </div>
              <button
                type="button"
                onClick={() => setPasskeyEnabled(!passkeyEnabled)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold ${
                  passkeyEnabled ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {passkeyEnabled ? 'ACTIVE' : 'ENABLE'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
