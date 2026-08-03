export default function SystemArchitectureDiagram() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <h3 className="text-lg font-bold text-[#1B2A4A] mb-6">System Architecture</h3>

      <div className="space-y-4 font-mono text-xs">
        {/* User Browser */}
        <div className="bg-[#F0F6FA] rounded-lg p-3 border border-blue-100 text-center">
          <span className="text-[#2B70AB] font-bold">User Browser</span>
          <span className="text-slate-400 ml-2">→</span>
          <span className="text-slate-600 ml-2">Next.js Frontend (React)</span>
        </div>

        {/* Arrow */}
        <div className="text-center text-[#2B70AB] text-lg">↓</div>

        {/* API Gateway */}
        <div className="bg-white rounded-lg p-3 border-2 border-[#2B70AB] text-center shadow-sm">
          <span className="font-bold text-[#1B2A4A]">Express API Gateway</span>
          <span className="text-slate-400 ml-2">(Node.js / TypeScript)</span>
        </div>

        {/* Arrows to backends */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="text-[#2B70AB] text-lg">↓</div>
          <div className="text-[#2B70AB] text-lg">↓</div>
          <div className="text-[#2B70AB] text-lg">↓</div>
        </div>

        {/* Backend services */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#F0F6FA] rounded-lg p-3 border border-blue-100 text-center">
            <span className="font-bold text-[#1B2A4A] text-xs">MongoDB Atlas</span>
            <span className="block text-slate-400 text-[10px]">Prisma ORM</span>
          </div>
          <div className="bg-[#F0F6FA] rounded-lg p-3 border border-blue-100 text-center">
            <span className="font-bold text-[#1B2A4A] text-xs">Redis + BullMQ</span>
            <span className="block text-slate-400 text-[10px]">Job Queue</span>
          </div>
          <div className="bg-[#F0F6FA] rounded-lg p-3 border border-blue-100 text-center">
            <span className="font-bold text-[#1B2A4A] text-xs">FastAPI ML Engine</span>
            <span className="block text-slate-400 text-[10px]">Python / scikit-learn</span>
          </div>
        </div>

        {/* AI Providers */}
        <div className="text-center text-[#2B70AB] text-lg">↓</div>
        <div className="bg-[#F0F6FA] rounded-lg p-3 border border-blue-100 text-center">
          <span className="font-bold text-[#1B2A4A] text-xs">AI Gateway</span>
          <span className="block text-slate-400 text-[10px]">Groq · Gemini · NVIDIA · OpenRouter · Cohere · Cloudflare</span>
        </div>

        {/* Security note */}
        <div className="mt-4 bg-amber-50 rounded-lg p-3 border border-amber-200 text-xs text-amber-800">
          <strong>Security:</strong> Frontend never talks directly to ML or AI providers. API keys remain server-side. Connector credentials are encrypted. ML compute endpoints are protected by service key authentication. Project data is scoped by user and organization.
        </div>
      </div>
    </div>
  );
}
