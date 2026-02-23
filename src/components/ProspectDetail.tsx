import { X, ExternalLink, Building2, Globe, Target, TrendingUp, Activity } from 'lucide-react';

interface ProspectDetailProps {
  prospect: Prospect;
  onClose: () => void;
}

export function ProspectDetail({ prospect, onClose }: ProspectDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
              <Building2 size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{prospect.company}</h2>
              <p className="text-sm text-gray-400">{prospect.region}</p>
            </div>
          </div>import { Prospect } from '@/src/data/prospects';

          <button 
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  <Target size={14} /> Segmento
                </label>
                <p className="mt-1 text-white">{prospect.segment}</p>
              </div>
              
              <div>
                <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  <Activity size={14} /> ICP
                </label>
                <p className="mt-1 text-white">{prospect.icp}</p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                  <TrendingUp size={14} /> Señal de Compra
                </label>
                <p className="mt-1 text-white">{prospect.buyingSignal}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Puntaje</label>
                <div className="mt-2 flex items-center gap-3">
                  <div className="relative h-16 w-16">
                    <svg className="h-full w-full -rotate-90 transform">
                      <circle
                        className="text-gray-800"
                        strokeWidth="6"
                        stroke="currentColor"
                        fill="transparent"
                        r="28"
                        cx="32"
                        cy="32"
                      />
                      <circle
                        className={prospect.score >= 80 ? "text-emerald-500" : prospect.score >= 70 ? "text-amber-500" : "text-red-500"}
                        strokeWidth="6"
                        strokeDasharray={175.93}
                        strokeDashoffset={175.93 - (175.93 * prospect.score) / 100}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="28"
                        cx="32"
                        cy="32"
                      />
                    </svg>
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-white">
                      {prospect.score}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Próximo Paso</label>
                <div className="mt-1 rounded-lg bg-indigo-500/10 px-4 py-3 text-indigo-300 border border-indigo-500/20">
                  {prospect.nextStep}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-medium uppercase tracking-wider text-gray-500">Fuente</label>
                <p className="text-sm text-gray-300">{prospect.source}</p>
              </div>
              {prospect.sourceUrl && prospect.sourceUrl !== "No aplica (cliente semilla interno)" && (
                <a 
                  href={prospect.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <Globe size={16} />
                  Ver Fuente
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
