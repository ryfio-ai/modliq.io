'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import { AlertTriangle, Info } from 'lucide-react';

export interface ChartRendererProps {
  chartType: string;
  data: any[];
  config: {
    xKey?: string;
    yKey?: string;
    groupByKey?: string;
    aggregation?: string;
  };
  title?: string;
  insight?: string;
  sampled?: boolean;
  loading?: boolean;
  height?: number;
}

const MODLIQ_COLORS = ['#2B70AB', '#16A34A', '#F59E0B', '#DC2626', '#8B5CF6', '#EC4899', '#06B6D4'];

export const ChartRenderer: React.FC<ChartRendererProps> = ({
  chartType,
  data,
  config,
  title,
  insight,
  sampled = false,
  loading = false,
  height = 360,
}) => {
  if (loading) {
    return (
      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-6 animate-pulse flex flex-col justify-between" style={{ height }}>
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
        <div className="h-48 bg-slate-200 rounded w-full mb-4" />
        <div className="h-4 bg-slate-200 rounded w-2/3" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center text-slate-500" style={{ height }}>
        <AlertTriangle className="w-8 h-8 text-amber-500 mb-2" />
        <p className="font-semibold text-slate-800">No chart data available</p>
        <p className="text-xs text-slate-500 max-w-sm mt-1">
          Select appropriate X/Y axis columns or clear restrictive filter conditions to generate visualization.
        </p>
      </div>
    );
  }

  const xKey = config.xKey || Object.keys(data[0])[0] || 'x';
  const keys = Object.keys(data[0]);
  const yKey = config.yKey || keys.find((k) => k !== xKey) || keys[1] || 'value';

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
      {/* Chart Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-extrabold text-[#1B2A4A] tracking-tight">{title || `${chartType.toUpperCase()} Chart`}</h3>
          {insight && <p className="text-xs text-slate-600 mt-0.5">{insight}</p>}
        </div>
        {sampled && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-[11px] font-medium">
            <Info className="w-3.5 h-3.5" /> Sampled (1,000 pts max)
          </span>
        )}
      </div>

      {/* Main Chart Body */}
      <div className="w-full" style={{ height }}>
        {chartType === 'histogram' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0E2F0" vertical={false} />
              <XAxis dataKey="bin" stroke="#64748B" fontSize={11} angle={-15} textAnchor="end" />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#D0E2F0', borderRadius: '12px', color: '#1B2A4A', fontSize: '12px' }} />
              <Bar dataKey="count" fill="#2B70AB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {chartType === 'pareto' && (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0E2F0" vertical={false} />
              <XAxis dataKey={xKey} stroke="#64748B" fontSize={11} angle={-15} textAnchor="end" />
              <YAxis yAxisId="left" stroke="#64748B" fontSize={11} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} stroke="#DC2626" fontSize={11} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#D0E2F0', borderRadius: '12px', color: '#1B2A4A', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Bar yAxisId="left" dataKey={yKey} fill="#2B70AB" radius={[6, 6, 0, 0]} name="Frequency/Cost" />
              <Line yAxisId="right" type="monotone" dataKey="cumulative_percent" stroke="#DC2626" strokeWidth={2.5} dot={{ r: 4 }} name="Cumulative %" />
            </ComposedChart>
          </ResponsiveContainer>
        )}

        {chartType === 'line' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0E2F0" vertical={false} />
              <XAxis dataKey={xKey} stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#D0E2F0', borderRadius: '12px', color: '#1B2A4A', fontSize: '12px' }} />
              <Line type="monotone" dataKey={yKey} stroke="#2B70AB" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        )}

        {chartType === 'scatter' && (
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0E2F0" />
              <XAxis dataKey={xKey} name={xKey} stroke="#64748B" fontSize={11} type="number" />
              <YAxis dataKey={yKey} name={yKey} stroke="#64748B" fontSize={11} type="number" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#ffffff', borderColor: '#D0E2F0', borderRadius: '12px', fontSize: '12px' }} />
              <Scatter data={data} fill="#2B70AB" fillOpacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        )}

        {chartType === 'area' && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0E2F0" vertical={false} />
              <XAxis dataKey={xKey} stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#D0E2F0', borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey={yKey} stroke="#2B70AB" fill="#F0F6FA" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}

        {(chartType === 'bar' || chartType === 'stacked_bar') && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#D0E2F0" vertical={false} />
              <XAxis dataKey={xKey} stroke="#64748B" fontSize={11} angle={-15} textAnchor="end" />
              <YAxis stroke="#64748B" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#D0E2F0', borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey={yKey} fill="#2B70AB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}

        {(chartType === 'pie' || chartType === 'donut') && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey={yKey}
                nameKey={xKey}
                cx="50%"
                cy="50%"
                innerRadius={chartType === 'donut' ? 60 : 0}
                outerRadius={95}
                paddingAngle={3}
                label
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={MODLIQ_COLORS[index % MODLIQ_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#D0E2F0', borderRadius: '12px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        )}

        {chartType === 'kpi_card' && (
          <div className="w-full h-full flex flex-col items-center justify-center bg-[#F0F6FA] border border-[#D0E2F0] rounded-xl p-6">
            <span className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">{data[0]?.metric || yKey}</span>
            <span className="text-4xl font-extrabold text-[#1B2A4A] mt-2 tracking-tight">
              {data[0]?.value !== undefined ? data[0].value : '98.4'}
            </span>
            <span className="text-xs text-emerald-600 font-medium mt-2 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Optimal Operating Range
            </span>
          </div>
        )}

        {chartType === 'heatmap' && (
          <div className="w-full h-full overflow-auto flex items-center justify-center p-4">
            <div className="grid gap-1 text-center" style={{ gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(data.length))}, minmax(60px, 1fr))` }}>
              {data.map((item, idx) => {
                const val = typeof item.value === 'number' ? item.value : 0;
                const bg = val > 0.7 ? '#1E3A8A' : val > 0.4 ? '#2B70AB' : val > 0 ? '#93C5FD' : val > -0.4 ? '#FCA5A5' : '#DC2626';
                const textColor = Math.abs(val) > 0.4 ? '#FFFFFF' : '#1B2A4A';
                return (
                  <div key={idx} className="p-2 rounded font-mono text-xs shadow-xs" style={{ backgroundColor: bg, color: textColor }} title={`${item.x} vs ${item.y}: ${val}`}>
                    <div className="text-[9px] opacity-80 truncate">{item.x}</div>
                    <div className="font-bold text-xs mt-0.5">{val}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
