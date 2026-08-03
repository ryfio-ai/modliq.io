"use client";

import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  sparklineData?: number[];
  unit?: string;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  trendLabel = "vs last month",
  sparklineData = [40, 55, 60, 58, 72, 85, 91],
  unit = "",
  className = "",
}) => {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  // Simple SVG sparkline generation
  const maxVal = Math.max(...sparklineData, 1);
  const minVal = Math.min(...sparklineData, 0);
  const range = maxVal - minVal || 1;
  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * 120;
      const y = 30 - ((val - minVal) / range) * 24;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          {label}
        </span>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
              isPositive
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
                : isNegative
                ? "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : isNegative ? (
              <TrendingDown className="h-3 w-3" />
            ) : (
              <Minus className="h-3 w-3" />
            )}
            <span>
              {isPositive ? "+" : ""}
              {trend}%
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-bold tracking-tight text-slate-950 dark:text-slate-50">
          {value}
        </span>
        {unit && <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{unit}</span>}
      </div>

      {trendLabel && trend !== undefined && (
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{trendLabel}</p>
      )}

      {/* Sparkline chart SVG */}
      <div className="mt-4 h-8 w-full">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 120 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`sparkline-grad-${label}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polygon
            points={`0,30 ${points} 120,30`}
            fill={`url(#sparkline-grad-${label})`}
          />
          <polyline
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />
        </svg>
      </div>
    </div>
  );
};
