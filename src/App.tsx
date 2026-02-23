/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { prospects, Prospect } from '@/src/data/prospects';
import { ProspectTable } from '@/src/components/ProspectTable';
import { StatsCards } from '@/src/components/StatsCards';
import { ProspectDetail } from '@/src/components/ProspectDetail';
import { Search, Filter } from 'lucide-react';

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [segmentFilter, setSegmentFilter] = useState<string>('All');

  const regions = useMemo(() => ['All', ...new Set(prospects.map(p => p.region))], []);
  const segments = useMemo(() => ['All', ...new Set(prospects.map(p => p.segment))], []);

  const filteredData = useMemo(() => {
    return prospects.filter(p => {
      const matchesSearch = p.company.toLowerCase().includes(search.toLowerCase()) || 
                          p.icp.toLowerCase().includes(search.toLowerCase());
      const matchesRegion = regionFilter === 'All' || p.region === regionFilter;
      const matchesSegment = segmentFilter === 'All' || p.segment === segmentFilter;
      return matchesSearch && matchesRegion && matchesSegment;
    });
  }, [search, regionFilter, segmentFilter]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Inteligencia GARCIVEL</h1>
            <p className="mt-2 text-gray-400">Cuentas objetivo para Proteínas y Aceites Marinos Premium (Harina de Pescado, Aceite de Pescado, Harina de Camarón)</p>
          </div>
          <div className="hidden md:block">
            <div className="rounded-lg bg-white/5 px-4 py-2 text-sm text-gray-400 border border-white/10">
              <span className="text-indigo-400 font-medium">Enfoque:</span> Fabricantes de Alimento Acuícola y Animal
            </div>
          </div>
        </header>

        <div className="space-y-8">
          <StatsCards data={filteredData} />

          <div className="space-y-4">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Buscar empresas, ICPs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
                <div className="relative">
                  <select
                    value={regionFilter}
                    onChange={(e) => setRegionFilter(e.target.value)}
                    className="appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {regions.map(r => <option key={r} value={r}>{r === 'All' ? 'Todas las Regiones' : r}</option>)}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>

                <div className="relative">
                  <select
                    value={segmentFilter}
                    onChange={(e) => setSegmentFilter(e.target.value)}
                    className="appearance-none rounded-xl border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {segments.map(s => <option key={s} value={s}>{s === 'All' ? 'Todos los Segmentos' : s}</option>)}
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            <ProspectTable data={filteredData} onSelect={setSelectedProspect} />
          </div>
        </div>
      </div>

      {selectedProspect && (
        <ProspectDetail 
          prospect={selectedProspect} 
          onClose={() => setSelectedProspect(null)} 
        />
      )}
    </div>
  );
}

