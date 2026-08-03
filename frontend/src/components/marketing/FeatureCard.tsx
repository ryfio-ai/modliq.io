import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  color?: string;
}

export default function FeatureCard({ icon, title, description, features, color = "#2B70AB" }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${color}15`, color }}>
        {icon}
      </div>
      <h3 className="text-base font-bold text-[#1B2A4A] mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{description}</p>
      <ul className="space-y-1.5">
        {features.map((f) => (
          <li key={f} className="text-xs text-slate-600 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: color }} />
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
