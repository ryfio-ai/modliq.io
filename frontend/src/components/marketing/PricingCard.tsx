import Link from "next/link";
import { ReactNode } from "react";

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlight?: boolean;
}

export default function PricingCard({ name, price, period, description, features, cta, href, highlight = false }: PricingCardProps) {
  return (
    <div className={`rounded-xl border p-6 flex flex-col ${highlight ? "border-[#2B70AB] bg-blue-50/50 shadow-lg shadow-blue-600/10" : "border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow"}`}>
      <h3 className="text-lg font-bold text-[#1B2A4A] mb-1">{name}</h3>
      <div className="flex items-baseline gap-1 mb-2">
        <span className={`text-3xl font-extrabold ${highlight ? "text-[#2B70AB]" : "text-[#1B2A4A]"}`}>{price}</span>
        <span className="text-sm text-slate-500">{period}</span>
      </div>
      <p className="text-xs text-slate-500 mb-4">{description}</p>
      <ul className="space-y-2 mb-6 flex-1">
        {features.map((f) => (
          <li key={f} className="text-xs text-slate-600 flex items-start gap-2">
            <span className="text-[#2B70AB] mt-0.5">&#10003;</span>
            {f}
          </li>
        ))}
      </ul>
      <Link href={href} className={`block text-center font-bold text-sm py-3 rounded-lg transition ${highlight ? "bg-[#2B70AB] text-white hover:bg-blue-700" : "bg-slate-100 text-[#1B2A4A] hover:bg-slate-200"}`}>
        {cta}
      </Link>
    </div>
  );
}
