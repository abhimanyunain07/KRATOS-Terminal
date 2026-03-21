type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  rightSlot?: React.ReactNode;
};

export function PageHeader({ eyebrow, title, description, rightSlot }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-black/40 px-5 py-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.45em] text-cyan-300">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      </div>
      {rightSlot}
    </div>
  );
}

