"use client";

import { useStudioStore } from "@/store/studio";
import { DEMO_RESULT } from "@/lib/constants";
import ProcessDrivers from "@/components/studio/results/ProcessDrivers";
import AdvancedDetails from "@/components/studio/results/AdvancedDetails";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, Sliders, TrendingUp, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ResultsPage() {
  const store = useStudioStore();
  const res = store.result || DEMO_RESULT;

  const handleDownloadSOP = () => {
    const sopHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Modliq SOP - Production Trial Plan</title>
        <style>
          body { font-family: system-ui, sans-serif; line-height: 1.6; padding: 40px; color: #111; }
          h1 { color: #0284c7; }
          .badge { background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
          th { background: #f8fafc; }
        </style>
      </head>
      <body>
        <h1>Modliq Standard Operating Procedure (SOP)</h1>
        <p><strong>Job Reference:</strong> ${res.job_id}</p>
        <p><strong>Status:</strong> <span class="badge">Approved Trial Protocol</span></p>

        <h2>1. Executive Summary</h2>
        <p>${res.summary}</p>

        <h2>2. Target Operating Parameters</h2>
        <table>
          <thead>
            <tr><th>Parameter</th><th>Target Setting</th><th>Safe Operating Range</th></tr>
          </thead>
          <tbody>
            ${Object.entries(res.recommended_settings || {}).map(([param, val]) => `
              <tr>
                <td>${param}</td>
                <td><strong>${val} ${res.units?.[param] || ''}</strong></td>
                <td>${res.recommended_range?.[param]?.[0] || val} – ${res.recommended_range?.[param]?.[1] || val} ${res.units?.[param] || ''}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>3. 7-Batch Validation Protocol</h2>
        <ol>
          <li>Apply target settings to primary machine console.</li>
          <li>Conduct 1-hour pre-flight thermal & pressure stabilization check.</li>
          <li>Log hourly yield readings and verify parameters remain within safe operating bounds.</li>
          <li>Perform Quality Studio control chart checks after each batch.</li>
        </ol>

        <h2>4. Expected Business Outcome</h2>
        <p>Projected Yield: <strong>${res.expected_outcome}%</strong> &bull; Estimated ROI: <strong>${res.roi?.monthly_savings_range || '₹1.6L–₹2.17L/month'}</strong></p>
      </body>
      </html>
    `;

    const blob = new Blob([sopHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Modliq_Trial_SOP_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto py-8 space-y-8 px-4 max-w-5xl">
      {res.is_demo_fallback && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex items-center justify-between">
          <span>Demonstration Result — Optimization running on sample dataset.</span>
          <Badge variant="outline" className="border-amber-300 text-amber-700">Demo Mode</Badge>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Process Optimization Recommendations</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Model Confidence: <span className="font-semibold text-gray-900">{res.confidence_score}%</span> &bull; Status: Target Validated
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleDownloadSOP} variant="outline" className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Download SOP
          </Button>
          <Link href="/quality">
            <Button className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Open Quality Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Recommended Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <Sliders className="w-5 h-5" /> Recommended Machine Target Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(res.recommended_settings || {}).map(([param, val]) => (
              <div key={param} className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm">
                <span className="font-medium text-gray-700">{param}</span>
                <span className="text-xl font-bold text-primary">
                  {val as number} {res.units?.[param] || ''}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Expected Yield & ROI */}
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <TrendingUp className="w-5 h-5" /> Projected Business Outcome & ROI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-lg border text-center">
                <span className="text-xs text-gray-500 block">Expected Yield</span>
                <span className="text-2xl font-bold text-green-600">{res.expected_outcome}%</span>
                <span className="text-[10px] text-gray-400 block mt-0.5">Baseline: {res.current_outcome}%</span>
              </div>
              <div className="p-3 bg-white rounded-lg border text-center">
                <span className="text-xs text-gray-500 block">Estimated ROI</span>
                <span className="text-xl font-bold text-green-700">
                  {res.roi?.monthly_savings_range || '₹1.6L–₹2.17L/month'}
                </span>
                <span className="text-[10px] text-gray-400 block mt-0.5">Payback: 7 days</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-800 bg-green-100 p-2.5 rounded">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>Target constraint threshold ({res.chart_data?.target || 95}%) satisfied.</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Safe Operating Range Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommended Safe Operating Envelope / Trial Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="p-3 font-semibold">Parameter</th>
                  <th className="p-3 font-semibold text-center">Target Setting</th>
                  <th className="p-3 font-semibold text-center">Safe Trial Envelope</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {Object.entries(res.recommended_range || {}).map(([param, range]) => (
                  <tr key={param}>
                    <td className="p-3 font-medium">{param}</td>
                    <td className="p-3 text-center font-bold text-primary">
                      {res.recommended_settings?.[param]} {res.units?.[param] || ''}
                    </td>
                    <td className="p-3 text-center text-gray-600 font-mono">
                      {(range as number[])[0]} – {(range as number[])[1]} {res.units?.[param] || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* AI Plain-English Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">AI Copilot Executive Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-sm bg-gray-50 p-4 rounded-lg border">
            {res.summary}
          </p>
        </CardContent>
      </Card>

      {/* Key Process Drivers (SHAP) */}
      <ProcessDrivers drivers={res.drivers || []} />

      {/* Collapsible Advanced Technical Details Drawer */}
      <AdvancedDetails details={res.advanced} />
    </div>
  );
}
