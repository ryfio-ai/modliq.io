'use client';

import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';

export default function SampleDataDownload() {
  const handleDownloadSample = () => {
    const csvContent = [
      'batch_id,date,supplier,material_lot,line,machine,shift,temperature,pressure,flow_rate,yield,defect_count,good_count,reject_count,total_count,downtime_minutes,downtime_reason,scrap_rate',
      'BATCH-1001,2026-08-01,Apex Chemical,LOT-901,Line 1,Reactor A,Day,84.2,4.2,120.5,96.4,2,482,2,484,0,None,0.41',
      'BATCH-1002,2026-08-01,Apex Chemical,LOT-901,Line 1,Reactor A,Day,88.5,4.8,118.2,94.1,6,470,6,476,15,Minor Jam,1.26',
      'BATCH-1003,2026-08-01,PolyTech Ltd,LOT-902,Line 2,Reactor B,Night,91.2,5.1,110.0,91.8,12,459,12,471,45,Temperature Spike,2.54',
      'BATCH-1004,2026-08-02,PolyTech Ltd,LOT-902,Line 2,Reactor B,Night,89.0,4.5,122.1,95.3,4,476,4,480,5,Sensor Check,0.83',
      'BATCH-1005,2026-08-02,Apex Chemical,LOT-903,Line 1,Reactor A,Day,83.8,4.1,124.0,97.2,1,486,1,487,0,None,0.20',
      'BATCH-1006,2026-08-02,Global Polymers,LOT-904,Line 3,Extruder C,Evening,86.4,4.4,119.8,95.8,3,479,3,482,10,Cleaning,0.62',
      'BATCH-1007,2026-08-03,Global Polymers,LOT-904,Line 3,Extruder C,Evening,92.5,5.4,108.5,89.5,18,447,18,465,60,Pressure Drop,3.87',
      'BATCH-1008,2026-08-03,Apex Chemical,LOT-905,Line 1,Reactor A,Day,85.1,4.3,121.0,96.8,2,484,2,486,0,None,0.41',
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'modliq_sample_manufacturing_yield.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <FileSpreadsheet size={18} className="text-[#2B70AB]" />
          <h4 className="text-xs font-bold text-slate-900">Need a Sample Dataset?</h4>
        </div>
        <button
          onClick={handleDownloadSample}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#2B70AB] text-[#2B70AB] text-xs font-semibold shadow-2xs transition-all"
        >
          <Download size={13} />
          <span>Download Sample CSV</span>
        </button>
      </div>

      <p className="text-[11px] text-slate-500 font-sans">
        Your dataset should include header columns like: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px] text-slate-700">batch_id</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px] text-slate-700">yield</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px] text-slate-700">temperature</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px] text-slate-700">pressure</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px] text-slate-700">defect_count</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px] text-slate-700">supplier</code>, <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200 font-mono text-[10px] text-slate-700">shift</code>.
      </p>
    </div>
  );
}
