import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="bg-[#1B2A4A] text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="/comparison" className="hover:text-white transition">Comparison</Link></li>
              <li><Link href="/workflow" className="hover:text-white transition">Workflow</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/roi" className="hover:text-white transition">ROI Calculator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/system-architecture" className="hover:text-white transition">Architecture</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>Made in Tamil Nadu, India. Built for manufacturers.</p>
          <p>&copy; {new Date().getFullYear()} Modliq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
