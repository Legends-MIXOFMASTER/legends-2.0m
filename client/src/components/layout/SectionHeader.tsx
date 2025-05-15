interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-neutral-600 dark:text-neutral-400">{subtitle}</p>
      )}
    </div>
  );
}
