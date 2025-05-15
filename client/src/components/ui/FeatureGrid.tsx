interface Feature {
  title: string;
  description: string;
  image: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeatureGrid({ features, columns = 3 }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4'
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
      {features.map((feature, index) => (
        <div key={index} className="group">
          <div className="relative h-48 mb-6 overflow-hidden rounded-lg">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
          <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
