"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";

interface JobStatus {
  jobId: string;
  status: string;
  progressPct: number;
  currentStep: string;
  message: string;
  results?: any;
  error?: string;
}

interface ProgressBarProps {
  jobId: string;
  onComplete: () => void;
}

const STEP_ORDER = ['queued', 'preprocessing', 'training', 'tuning', 'evaluating', 'completed'];

export function ProgressBar({ jobId, onComplete }: ProgressBarProps) {
  const [status, setStatus] = useState<JobStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(`/api/jobs/${jobId}/stream`);

    eventSource.onmessage = (event) => {
      const data: JobStatus = JSON.parse(event.data);
      setStatus(data);

      if (['completed', 'failed', 'cancelled'].includes(data.status)) {
        eventSource.close();
        if (data.status === 'completed') {
          setTimeout(onComplete, 1500);
        }
        if (data.error) {
          setError(data.error);
        }
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setError('Connection lost. Please check job status manually.');
    };

    return () => {
      eventSource.close();
    };
  }, [jobId, onComplete]);

  if (!status) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-3 text-lg font-medium">Connecting to training job execution...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentStepIndex = STEP_ORDER.indexOf(status.currentStep);
  const isComplete = status.status === 'completed';
  const isFailed = status.status === 'failed';

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg">
              {isComplete ? 'Training Complete!' : isFailed ? 'Training Failed' : 'Training in Progress'}
            </h3>
            <p className="text-sm text-gray-500">{status.message}</p>
          </div>
          {isComplete && <CheckCircle className="w-8 h-8 text-green-500" />}
          {isFailed && <XCircle className="w-8 h-8 text-red-500" />}
        </div>

        <Progress value={status.progressPct} className="w-full h-3" />

        <div className="flex justify-between text-sm pt-2">
          {STEP_ORDER.map((step, idx) => (
            <div
              key={step}
              className={`flex flex-col items-center ${
                idx <= currentStepIndex ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <div
                className={`w-3 h-3 rounded-full mb-1 ${
                  idx < currentStepIndex
                    ? 'bg-primary'
                    : idx === currentStepIndex
                    ? 'bg-primary animate-pulse'
                    : 'bg-gray-300'
                }`}
              />
              <span className="capitalize text-xs font-medium">{step}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
