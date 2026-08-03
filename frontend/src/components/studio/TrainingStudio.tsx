"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Settings, Sparkles, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { TaskSelector } from "./TaskSelector";
import { ProgressBar } from "./ProgressBar";

interface TrainingStudioProps {
  datasetId: string;
  profile: any;
}

export function TrainingStudio({ datasetId, profile }: TrainingStudioProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [goal, setGoal] = useState("");
  const [taskType, setTaskType] = useState<string>("auto");
  const [targetColumn, setTargetColumn] = useState<string>("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [config, setConfig] = useState({
    testSize: 0.2,
    cvFolds: 5,
    nTrials: 50,
    maxTrainingTime: 30,
  });
  const [training, setTraining] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);

  const handleStartTraining = async () => {
    if (!goal.trim()) {
      toast({ title: "Goal required", description: "Please describe what you want to predict", variant: "destructive" });
      return;
    }

    setTraining(true);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          datasetId,
          goal,
          config: {
            taskType: taskType === 'auto' ? undefined : taskType,
            targetColumn: targetColumn || undefined,
            testSize: config.testSize,
            cvFolds: config.cvFolds,
            nTrials: config.nTrials,
            maxTrainingTimeMin: config.maxTrainingTime,
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to start training');

      const result = await response.json();
      setJobId(result.jobId);

      toast({
        title: "Training started",
        description: `Job ID: ${result.jobId}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start training",
        variant: "destructive",
      });
      setTraining(false);
    }
  };

  const handleTrainingComplete = () => {
    setTraining(false);
    router.push(`/results?jobId=${jobId}`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Define Your ML Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="goal">What do you want to predict or optimize?</Label>
            <Textarea
              id="goal"
              placeholder="e.g., Predict customer churn based on usage patterns and demographics"
              value={goal}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setGoal(e.target.value)}
              className="mt-2 min-h-[100px]"
            />
            <p className="text-sm text-gray-500 mt-1">
              Describe in plain English. Our NLP Goal Parser will auto-detect the task type.
            </p>
          </div>

          <TaskSelector
            columns={profile?.columns || []}
            taskType={taskType}
            onTaskTypeChange={setTaskType}
            targetColumn={targetColumn}
            onTargetColumnChange={setTargetColumn}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 cursor-pointer" onClick={() => setAdvancedOpen(!advancedOpen)}>
            <Settings className="w-5 h-5 text-primary" />
            Advanced Hyperparameter Configuration
            <span className="text-sm font-normal text-gray-500 ml-auto">
              {advancedOpen ? 'Hide' : 'Show'}
            </span>
          </CardTitle>
        </CardHeader>
        {advancedOpen && (
          <CardContent className="space-y-6">
            <div>
              <Label>Test Set Size: {(config.testSize * 100).toFixed(0)}%</Label>
              <Slider
                value={[config.testSize * 100]}
                onValueChange={([v]: number[]) => setConfig({ ...config, testSize: v / 100 })}
                min={10}
                max={50}
                step={5}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Cross-Validation Folds: {config.cvFolds}</Label>
              <Slider
                value={[config.cvFolds]}
                onValueChange={([v]: number[]) => setConfig({ ...config, cvFolds: v })}
                min={2}
                max={10}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Optuna Hyperparameter Trials: {config.nTrials}</Label>
              <Slider
                value={[config.nTrials]}
                onValueChange={([v]: number[]) => setConfig({ ...config, nTrials: v })}
                min={10}
                max={200}
                step={10}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Max Training Time: {config.maxTrainingTime} minutes</Label>
              <Slider
                value={[config.maxTrainingTime]}
                onValueChange={([v]: number[]) => setConfig({ ...config, maxTrainingTime: v })}
                min={5}
                max={120}
                step={5}
                className="mt-2"
              />
            </div>
          </CardContent>
        )}
      </Card>

      {jobId && training ? (
        <ProgressBar jobId={jobId} onComplete={handleTrainingComplete} />
      ) : (
        <Button
          size="lg"
          className="w-full"
          onClick={handleStartTraining}
          disabled={training || !goal.trim()}
        >
          <Sparkles className="w-5 h-5 mr-2" />
          Start AutoML Pipeline Training
        </Button>
      )}
    </div>
  );
}
