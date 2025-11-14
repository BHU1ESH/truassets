import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useComparison } from '@/contexts/ComparisonContext';
import { useProperties } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PropertyComparisonModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const percentFormatter = new Intl.NumberFormat('en-IN', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const PropertyComparisonModal = ({ open, onOpenChange }: PropertyComparisonModalProps) => {
  const { selectedIds, clearAll } = useComparison();
  const { properties } = useProperties();

  const selectedProperties = selectedIds
    .map((id) => properties.find((property) => property.id === id))
    .filter(Boolean);

  const bestReturn = selectedProperties.length
    ? Math.max(...selectedProperties.map((property) => property.expectedReturn))
    : 0;
  const lowestPrice = selectedProperties.length
    ? Math.min(...selectedProperties.map((property) => property.price))
    : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Property Comparison</DialogTitle>
          <DialogDescription>
            Evaluate pricing, yield profile, amenities, and fund-raise velocity side-by-side. Highlighted cells
            represent the strongest performer for each metric.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear Selection
          </Button>
        </div>

        <ScrollArea className="mt-4 max-h-[70vh] pr-4">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                <th className="sticky left-0 top-0 z-10 bg-background py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Metric
                </th>
                {selectedProperties.map((property) => (
                  <th key={property.id} className="top-0 bg-background py-3 px-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {property.title}
                    <div className="text-[10px] text-muted-foreground">{property.location}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <ComparisonRow
                label="Starting Ticket"
                values={selectedProperties.map((property) => property.price)}
                format={(value) => currencyFormatter.format(value)}
                highlight={(value) => value === lowestPrice}
              />
              <ComparisonRow
                label="Target Raise"
                values={selectedProperties.map((property) => property.targetAmount)}
                format={(value) => currencyFormatter.format(value)}
              />
              <ComparisonRow
                label="Current Commitments"
                values={selectedProperties.map((property) => property.raisedAmount)}
                format={(value) => currencyFormatter.format(value)}
              />
              <ComparisonRow
                label="Expected IRR"
                values={selectedProperties.map((property) => property.expectedReturn / 100)}
                format={(value) => percentFormatter.format(value)}
                highlight={(value) => value * 100 === bestReturn}
              />
              <ComparisonRow
                label="Tenure"
                values={selectedProperties.map((property) => property.tenure)}
              />
              <ComparisonRow
                label="Investors Committed"
                values={selectedProperties.map((property) => property.investors)}
              />
              <ComparisonRow
                label="Remaining Units"
                values={selectedProperties.map((property) =>
                  Math.max(0, Math.floor(property.targetAmount / property.price) - property.investors),
                )}
              />
              <ComparisonRow
                label="Status"
                values={selectedProperties.map((property) => property.status)}
                capitalize
              />
              <ComparisonRow
                label="Property Type"
                values={selectedProperties.map((property) => property.type)}
                capitalize
              />
              <ComparisonRow
                label="Key Amenities"
                values={selectedProperties.map((property) => property.amenities.join(', '))}
              />
              <ComparisonRow
                label="Created"
                values={selectedProperties.map((property) => new Date(property.createdAt).toLocaleDateString())}
              />
            </tbody>
          </table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const ComparisonRow = <T extends string | number>({
  label,
  values,
  format,
  highlight,
  capitalize,
}: {
  label: string;
  values: T[];
  format?: (value: T) => string;
  highlight?: (value: T) => boolean;
  capitalize?: boolean;
}) => {
  return (
    <tr className="border-t border-border/60">
      <th className="sticky left-0 bg-background py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </th>
      {values.map((value, index) => (
        <td
          key={index}
          className={cn(
            'py-3 px-4 text-sm text-foreground',
            highlight?.(value) && 'bg-primary/10 font-semibold text-primary',
            capitalize && 'capitalize',
          )}
        >
          {format ? format(value) : (value ?? '—')}
        </td>
      ))}
    </tr>
  );
};

export default PropertyComparisonModal;


