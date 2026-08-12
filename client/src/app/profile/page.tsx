'use client';

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User as UserIcon, Mail, Save, ShieldCheck, Check } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateUserProfile, role } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
          {user?.name ? user.name[0] : 'U'}
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-slate-900">{user?.name}</h1>
          <p className="text-xs text-slate-500">{user?.email}</p>
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase rounded-lg border border-indigo-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Active Role: {role}
            </span>
          </div>
        </div>
      </div>

      {/* Save Success Alert */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" /> Profile details saved successfully!
        </div>
      )}

      {/* Profile Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Personal Info Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <UserIcon className="w-4 h-4 text-indigo-600" /> User Information (Prisma User Model)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
                <UserIcon className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-indigo-500"
                />
                <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" /> Save Profile Changes
          </button>
        </div>

      </form>
    </div>
  );
}
