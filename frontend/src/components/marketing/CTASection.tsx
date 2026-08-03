import Link from "next/link";

interface CTASectionProps {
  title: string;
  description: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta?: string;
  secondaryHref?: string;
}

export default function CTASection({ title, description, primaryCta, primaryHref, secondaryCta, secondaryHref }: CTASectionProps) {
  return (
    <section className="bg-[#1B2A4A] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">{title}</h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mb-8">{description}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryHref} className="w-full sm:w-auto px-7 py-3.5 bg-[#2B70AB] hover:bg-blue-600 text-white font-bold rounded-xl transition shadow-lg shadow-blue-600/30 text-sm">
            {primaryCta}
          </Link>
          {secondaryCta && secondaryHref && (
            <Link href={secondaryHref} className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition text-sm">
              {secondaryCta}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
