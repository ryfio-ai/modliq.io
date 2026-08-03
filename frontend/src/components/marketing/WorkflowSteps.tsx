import { ReactNode } from "react";

interface WorkflowStep {
  number: number;
  title: string;
  description: string;
  icon: ReactNode;
}

interface WorkflowStepsProps {
  steps: WorkflowStep[];
}

export default function WorkflowSteps({ steps }: WorkflowStepsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {steps.map((step, i) => (
        <div key={step.number} className="relative bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#2B70AB] opacity-30" />
          )}
          <div className="w-8 h-8 rounded-full bg-[#2B70AB] text-white flex items-center justify-center font-bold text-sm mb-3">
            {step.number}
          </div>
          <div className="text-blue-600 mb-2">{step.icon}</div>
          <h4 className="text-sm font-bold text-[#1B2A4A] mb-1">{step.title}</h4>
          <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
        </div>
      ))}
    </div>
  );
}
