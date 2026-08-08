import React from 'react';

interface AdminMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  onClick?: () => void;
  accentColor?: 'blue' | 'emerald' | 'amber' | 'rose' | 'indigo';
}

export default function AdminMetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  onClick,
  accentColor = 'blue',
}: AdminMetricCardProps) {
  const accentBorderMap = {
    blue: 'hover:border-[#2B70AB]',
    emerald: 'hover:border-emerald-500',
    amber: 'hover:border-amber-500',
    rose: 'hover:border-rose-500',
    indigo: 'hover:border-indigo-500',
  };

  return (
    <div
      onClick={onClick}
      className={`p-5 bg-white border border-[#D0E2F0] rounded-2xl shadow-xs transition-all duration-200 ${
        accentBorderMap[accentColor]
      } ${onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</span>
        {icon && <div className="p-2 bg-[#F0F6FA] rounded-xl text-[#2B70AB]">{icon}</div>}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-3xl font-extrabold text-[#1B2A4A] tracking-tight">{value}</span>
        {trend && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              trend.isPositive !== false ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>

      {subtitle && <p className="text-xs text-slate-500 font-medium mt-1">{subtitle}</p>}
    </div>
  );
}
