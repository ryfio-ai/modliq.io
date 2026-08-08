'use client';

import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F6FA] text-[#1B2A4A] font-sans flex flex-col">
      <AdminHeader />
      <div className="flex-1 flex overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto bg-[#F0F6FA] p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
