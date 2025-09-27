import type { ReactNode } from "react";

interface MetricCardProps{
  title: string;
  value: ReactNode;
  icon: ReactNode;
}


export function MetricCard({title, value, icon}: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md items-start gap-4">
      <div className="bg-brand-primary/10 text-brand-primary dark:bg-brand-primary/20 p-3 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-sm text-brand-gray">{title}</p>
        <p className="text-2xl font-bold text-brand-dark dark:text-white">{value}</p>
      </div>
    </div>
  );
}

