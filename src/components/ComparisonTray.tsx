import { useState } from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import { useProperties } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import PropertyComparisonModal from '@/components/PropertyComparisonModal';

const ComparisonTray = () => {
  const { selectedIds, removeProperty, clearAll } = useComparison();
  const { properties } = useProperties();
  const [open, setOpen] = useState(false);

  const selectedProperties = selectedIds
    .map((id) => properties.find((property) => property.id === id))
    .filter(Boolean);

  if (selectedProperties.length === 0) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 px-4">
        <div className="flex flex-col gap-3 rounded-xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                {selectedProperties.length} property{selectedProperties.length > 1 ? 'ies' : ''} selected for comparison
              </h4>
              <p className="text-xs text-muted-foreground">
                Add up to four properties to benchmark yields, unit economics, and amenities side-by-side.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProperties.map((property) => (
                <span
                  key={property.id}
                  className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {property.title}
                  <button
                    type="button"
                    className="text-primary/70 transition-colors hover:text-primary"
                    onClick={() => removeProperty(property.id)}
                    aria-label={`Remove ${property.title} from comparison`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-end">
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
            <Button size="sm" onClick={() => setOpen(true)} disabled={selectedProperties.length < 2}>
              Compare Now
            </Button>
          </div>
        </div>
      </div>

      <PropertyComparisonModal open={open} onOpenChange={setOpen} />
    </>
  );
};

export default ComparisonTray;


