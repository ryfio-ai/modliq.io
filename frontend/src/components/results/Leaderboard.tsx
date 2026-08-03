"use client";

import { useState } from "react";
import { Trophy, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ModelResult {
  modelId: string;
  name: string;
  algorithm: string;
  taskType: string;
  metrics: {
    accuracy?: number;
    f1Score?: number;
    r2?: number;
    rmse?: number;
    mae?: number;
    silhouette?: number;
    trainingTimeSec: number;
    inferenceTimeMs: number;
    cvMean: number;
    cvStd: number;
  };
  isDeployed: boolean;
}

interface LeaderboardProps {
  models: ModelResult[];
  onDeploy: (modelId: string) => void;
  onSelect: (modelId: string) => void;
}

export function Leaderboard({ models, onDeploy, onSelect }: LeaderboardProps) {
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  const getPrimaryMetric = (model: ModelResult) => {
    if (model.metrics.accuracy !== undefined) return { label: 'Accuracy', value: model.metrics.accuracy };
    if (model.metrics.r2 !== undefined) return { label: 'R²', value: model.metrics.r2 };
    if (model.metrics.silhouette !== undefined) return { label: 'Silhouette', value: model.metrics.silhouette };
    return { label: 'CV Score', value: model.metrics.cvMean };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          Model Leaderboard & Deployment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {models.map((model, index) => {
            const primary = getPrimaryMetric(model);
            const isExpanded = expandedModel === model.modelId;
            const isBest = index === 0;

            return (
              <div
                key={model.modelId}
                className={`border rounded-lg p-4 transition-all cursor-pointer ${
                  isBest ? 'border-yellow-400 bg-yellow-50/50' :
                  model.isDeployed ? 'border-green-400 bg-green-50/50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSelect(model.modelId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? "bg-yellow-100 text-yellow-700" :
                      index === 1 ? "bg-gray-100 text-gray-700" :
                      index === 2 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{model.name}</span>
                        {isBest && <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Best</Badge>}
                        {model.isDeployed && <Badge variant="secondary" className="bg-green-100 text-green-700">Deployed</Badge>}
                      </div>
                      <span className="text-sm text-gray-500">{model.algorithm}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {primary.value !== undefined ? primary.value.toFixed(4) : 'N/A'}
                      </div>
                      <div className="text-xs text-gray-500">{primary.label}</div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeploy(model.modelId);
                      }}
                      disabled={model.isDeployed}
                    >
                      {model.isDeployed ? 'Deployed' : 'Deploy'}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedModel(isExpanded ? null : model.modelId);
                      }}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t grid grid-cols-4 gap-4 text-sm bg-white/60 p-3 rounded">
                    <div>
                      <span className="text-gray-500 block text-xs">Training Time</span>
                      <p className="font-medium">{model.metrics.trainingTimeSec?.toFixed(2)}s</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">Inference Time</span>
                      <p className="font-medium">{model.metrics.inferenceTimeMs?.toFixed(2)}ms</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">CV Mean</span>
                      <p className="font-medium">{model.metrics.cvMean?.toFixed(4)}</p>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-xs">CV Std</span>
                      <p className="font-medium">{model.metrics.cvStd?.toFixed(4)}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
