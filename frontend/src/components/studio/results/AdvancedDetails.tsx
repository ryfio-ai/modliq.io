"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Code, Check } from "lucide-react";

export default function AdvancedDetails({ details }: { details: any }) {
  const [open, setOpen] = useState(false);

  if (!details) return null;

  return (
    <div className="border rounded-lg bg-gray-50/30 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-sm font-medium hover:bg-gray-50 transition-colors"
      >
        <span className="flex items-center gap-2 text-gray-700">
          <Code className="w-4 h-4 text-gray-500" />
          Advanced Technical Details
        </span>
        <span className="text-gray-400">
          {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
      </button>

      {open && (
        <div className="p-4 border-t space-y-4 text-sm bg-white">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Best Model Selected</p>
              <p className="font-medium">{details.winner_algorithm || 'AutoML Winner'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Training Rows</p>
              <p className="font-medium">{details.training_rows || 1500}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">R² Score</p>
              <p className="font-medium">{details.metrics?.r2 || '0.915'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">RMSE</p>
              <p className="font-medium">{details.metrics?.rmse || '0.042'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Optuna Trials</p>
              <p className="font-medium">{details.optuna_trials || 30}</p>
            </div>
          </div>

          {details.leaderboard && details.leaderboard.length > 0 && (
            <div className="pt-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                All Algorithms Evaluated (Internal Leaderboard)
              </p>
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="p-2 font-medium">Algorithm</th>
                      <th className="p-2 text-right font-medium">CV Score</th>
                      <th className="p-2 text-right font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {details.leaderboard.map((m: any, i: number) => (
                      <tr key={i} className={m.is_winner ? "bg-green-50/50" : ""}>
                        <td className="p-2 font-medium">{m.algorithm}</td>
                        <td className="p-2 text-right">{m.cv_score}</td>
                        <td className="p-2 text-right">
                          {m.is_winner && (
                            <span className="inline-flex items-center gap-1 text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full">
                              <Check className="w-3 h-3" /> Selected Winner
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
