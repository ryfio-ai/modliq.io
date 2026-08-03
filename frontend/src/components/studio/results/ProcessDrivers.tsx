"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap } from "lucide-react";

interface Driver {
  name: string;
  contribution: number;
  description: string;
}

export default function ProcessDrivers({ drivers }: { drivers: Driver[] }) {
  if (!drivers || drivers.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="w-5 h-5 text-amber-500" />
          Key Process Drivers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {drivers.map((driver, idx) => (
          <div key={idx} className="p-3 border rounded-lg bg-gray-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">{driver.name}</span>
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {driver.contribution}% impact
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, driver.contribution)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">{driver.description}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
