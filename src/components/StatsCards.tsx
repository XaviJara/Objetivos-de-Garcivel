import { Prospect } from '@/src/data/prospects';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface StatsCardsProps {
  data: Prospect[];
}

export function StatsCards({ data }: StatsCardsProps) {
  const totalProspects = data.length;
  const avgScore = Math.round(data.reduce((acc, curr) => acc + curr.score, 0) / totalProspects);
  
  // Calculate distribution by region
  const regionCounts = data.reduce((acc, curr) => {
    acc[curr.region] = (acc[curr.region] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topRegions = Object.entries(regionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, value]) => ({ name, value }));

  const highValueProspects = data.filter(p => p.score >= 80).length;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h3 className="text-sm font-medium text-gray-400">Total de Prospectos</h3>
        <p className="mt-2 text-3xl font-bold text-white">{totalProspects}</p>
      </div>
      
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h3 className="text-sm font-medium text-gray-400">Puntaje Promedio</h3>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-3xl font-bold text-white">{avgScore}</p>
          <span className="text-sm text-gray-400">/ 100</span>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h3 className="text-sm font-medium text-gray-400">Alto Valor (80+)</h3>
        <p className="mt-2 text-3xl font-bold text-emerald-400">{highValueProspects}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h3 className="text-sm font-medium text-gray-400">Región Principal</h3>
        <p className="mt-2 text-3xl font-bold text-white truncate">{topRegions[0]?.name}</p>
      </div>

      <div className="col-span-full rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
        <h3 className="mb-4 text-sm font-medium text-gray-400">Prospectos por Región</h3>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topRegions}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <YAxis 
                stroke="#9ca3af" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ fill: '#ffffff10' }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {topRegions.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="#6366f1" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
