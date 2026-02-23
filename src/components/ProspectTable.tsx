import { Prospect } from '@/src/data/prospects';
import { cn } from '@/src/lib/utils';

interface ProspectTableProps {
  data: Prospect[];
  onSelect: (prospect: Prospect) => void;
}

export function ProspectTable({ data, onSelect }: ProspectTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 bg-white/5">
              <th className="px-6 py-4 font-medium text-gray-300">Empresa</th>
              <th className="px-6 py-4 font-medium text-gray-300">Región</th>
              <th className="px-6 py-4 font-medium text-gray-300">Segmento</th>
              <th className="px-6 py-4 font-medium text-gray-300">ICP</th>
              <th className="px-6 py-4 font-medium text-gray-300">Puntaje</th>
              <th className="px-6 py-4 font-medium text-gray-300">Próximo Paso</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.map((prospect) => (
              <tr 
                key={prospect.id} 
                onClick={() => onSelect(prospect)}
                className="cursor-pointer transition-colors hover:bg-white/5"
              >
                <td className="px-6 py-4 font-medium text-white">{prospect.company}</td>
                <td className="px-6 py-4 text-gray-400">{prospect.region}</td>
                <td className="px-6 py-4 text-gray-400">
                  <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white">
                    {prospect.segment}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-400 max-w-[200px] truncate" title={prospect.icp}>
                  {prospect.icp}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                      <div 
                        className={cn(
                          "h-full rounded-full",
                          prospect.score >= 80 ? "bg-emerald-500" :
                          prospect.score >= 70 ? "bg-amber-500" : "bg-red-500"
                        )}
                        style={{ width: `${prospect.score}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-300">{prospect.score}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 max-w-[200px] truncate" title={prospect.nextStep}>
                  {prospect.nextStep}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
