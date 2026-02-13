import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { GlassCard } from '@/components/react/ui/GlassCard';
import { FilterBar } from '@/components/react/ui/FilterBar';
import { BasePanel } from './BasePanel';

export interface ContentItem {
  id: string;
  title: string;
  category: string;
  image?: string;
  href: string;
  description?: string;
}

interface ContentPanelProps {
  items: ContentItem[];
  categories?: string[];
}

export function ContentPanel({ items, categories }: ContentPanelProps) {
  const derivedCategories = useMemo(() => {
    if (categories && categories.length > 0) return categories;
    return [...new Set(items.map((item) => item.category))];
  }, [categories, items]);

  // Read initial category from URL search params
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    () => {
      if (typeof window === 'undefined') return undefined;
      const params = new URLSearchParams(window.location.search);
      return params.get('category') ?? undefined;
    },
  );

  const filteredItems = useMemo(() => {
    if (!activeCategory) return items;
    return items.filter((item) => item.category === activeCategory);
  }, [items, activeCategory]);

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category ?? undefined);

    // Sync to URL search params
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (category) {
        url.searchParams.set('category', category);
      } else {
        url.searchParams.delete('category');
      }
      window.history.replaceState({}, '', url.toString());
    }
  };

  return (
    <BasePanel>
      <div className="mb-5">
        <FilterBar
          categories={derivedCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="group block transition-transform duration-200 hover:-translate-y-0.5"
          >
            <GlassCard className="h-full p-0 overflow-hidden">
              {item.image && (
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-4">
                <span
                  className={cn(
                    'mb-2 inline-block rounded-full border border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent',
                  )}
                >
                  {item.category}
                </span>
                <h4 className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted">
                    {item.description}
                  </p>
                )}
              </div>
            </GlassCard>
          </a>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <p className="py-8 text-center text-sm text-muted">
          No items found in this category.
        </p>
      )}
    </BasePanel>
  );
}
