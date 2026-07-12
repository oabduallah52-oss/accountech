import { ReactNode } from "react";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export default function PageHeader({
  badge,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8 rounded-3xl border border-slate-800 bg-[#0D1728] p-8">

      <div className="flex items-start justify-between">

        <div>

          {badge && (
            <span className="mb-4 inline-flex rounded-full bg-cyan-500/10 px-4 py-1 text-sm font-semibold text-cyan-400">
              {badge}
            </span>
          )}

          <h1 className="text-5xl font-bold tracking-tight text-white">
            {title}
          </h1>

          {description && (
            <p className="mt-3 text-lg text-slate-400">
              {description}
            </p>
          )}

        </div>

        <div className="flex gap-3">
          {children}
        </div>

      </div>

    </div>
  );
}
