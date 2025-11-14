import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { useRoi } from '@/contexts/RoiContext';
import { cn } from '@/lib/utils';

interface RoiInputs {
  investment: number;
  rentalYield: number;
  appreciation: number;
  holdingPeriod: number;
  rentGrowth: number;
  expenseRatio: number;
  exitCosts: number;
}

const percentFormatter = new Intl.NumberFormat('en-IN', {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

const smallCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
});

const RoiCalculator = () => {
  const { settings, scenarios } = useRoi();
  const [inputs, setInputs] = useState<RoiInputs>({
    investment: settings.defaultInvestment,
    rentalYield: settings.rentalYield,
    appreciation: settings.appreciation,
    holdingPeriod: settings.holdingPeriod,
    rentGrowth: settings.rentGrowth,
    expenseRatio: settings.expenseRatio,
    exitCosts: settings.exitCosts,
  });

  const applyScenario = (scenarioId: string) => {
    const scenario = scenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;
    setInputs((prev) => ({
      ...prev,
      rentalYield: roundTo(prev.rentalYield + scenario.rentalYieldDelta),
      appreciation: roundTo(prev.appreciation + scenario.appreciationDelta),
      holdingPeriod: Math.max(1, Math.round(prev.holdingPeriod + scenario.holdingPeriodDelta)),
    }));
  };

  const results = useMemo(() => calculateRoi(inputs), [inputs]);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px,1fr]">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment Inputs</CardTitle>
            <CardDescription>Adjust the levers to evaluate return potential.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="roi-investment">Investment Amount (₹)</Label>
              <Input
                id="roi-investment"
                type="number"
                value={Math.round(inputs.investment)}
                min={100000}
                step={100000}
                onChange={(event) =>
                  setInputs((prev) => ({ ...prev, investment: Number(event.target.value) }))
                }
              />
            </div>

            <SliderWithLabel
              label="Starting Rental Yield"
              description="Annual rental income as a percentage of investment"
              value={inputs.rentalYield}
              min={0.04}
              max={0.15}
              step={0.001}
              onChange={(value) => setInputs((prev) => ({ ...prev, rentalYield: value }))}
            />

            <SliderWithLabel
              label="Annual Appreciation"
              description="Expected capital appreciation per year"
              value={inputs.appreciation}
              min={0.0}
              max={0.15}
              step={0.001}
              onChange={(value) => setInputs((prev) => ({ ...prev, appreciation: value }))}
            />

            <SliderWithLabel
              label="Holding Period (Years)"
              description="Planned investment horizon"
              value={inputs.holdingPeriod}
              min={1}
              max={10}
              step={1}
              onChange={(value) => setInputs((prev) => ({ ...prev, holdingPeriod: value }))}
              renderValue={(value) => `${value.toFixed(0)} yrs`}
            />

            <SliderWithLabel
              label="Annual Rent Growth"
              description="Contractual escalation built into leases"
              value={inputs.rentGrowth}
              min={0}
              max={0.08}
              step={0.001}
              onChange={(value) => setInputs((prev) => ({ ...prev, rentGrowth: value }))}
            />

            <SliderWithLabel
              label="Operating Expenses"
              description="Reserve for maintenance, property management, and downtime"
              value={inputs.expenseRatio}
              min={0.05}
              max={0.30}
              step={0.005}
              onChange={(value) => setInputs((prev) => ({ ...prev, expenseRatio: value }))}
            />

            <SliderWithLabel
              label="Exit Costs"
              description="Brokerage, taxes, and transfer charges on sale"
              value={inputs.exitCosts}
              min={0}
              max={0.05}
              step={0.001}
              onChange={(value) => setInputs((prev) => ({ ...prev, exitCosts: value }))}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scenarios</CardTitle>
            <CardDescription>Apply pre-built advisory scenarios to stress test outcomes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                onClick={() => applyScenario(scenario.id)}
                className="w-full rounded-lg border-2 border-primary/30 bg-card p-4 cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
              >
                <div className="w-full">
                  <div className="font-medium text-sm text-primary mb-1">{scenario.name}</div>
                  {scenario.notes && (
                    <div className="text-xs text-muted-foreground leading-relaxed">{scenario.notes}</div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Projected Returns</CardTitle>
            <CardDescription>
              Cash yield + capital appreciation net of expenses and exit charges.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <ResultTile label="Net Profit" value={currencyFormatter.format(results.netProfit)} trend="positive" />
              <ResultTile label="Total ROI" value={percentFormatter.format(results.roi)} trend="positive" />
              <ResultTile label="Annualised CAGR" value={percentFormatter.format(results.cagr)} trend="positive" />
              <ResultTile label="Payback" value={`${results.paybackYears ? `${results.paybackYears} yrs` : '≥ horizon'}`} trend="neutral" />
              <ResultTile label="Net Rental Income" value={currencyFormatter.format(results.netRentalIncome)} trend="neutral" />
              <ResultTile label="Sale Proceeds" value={currencyFormatter.format(results.saleProceeds)} trend="neutral" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Yearly Cash Flows</CardTitle>
            <CardDescription>Includes escalation, expenses, and exit value in terminal year.</CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Year</th>
                  <th className="py-2 pr-4 font-medium">Gross Rent</th>
                  <th className="py-2 pr-4 font-medium">Net Rent</th>
                  <th className="py-2 pr-4 font-medium">Cumulative Cash Flow</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t text-muted-foreground">
                  <td className="py-2 pr-4">0</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">{smallCurrencyFormatter.format(-inputs.investment)}</td>
                </tr>
                {results.yearlyBreakdown.map((year) => (
                  <tr key={year.year} className="border-t">
                    <td className="py-2 pr-4">Year {year.year}</td>
                    <td className="py-2 pr-4">{smallCurrencyFormatter.format(year.grossRent)}</td>
                    <td className="py-2 pr-4">{smallCurrencyFormatter.format(year.netRent)}</td>
                    <td className="py-2 pr-4">{smallCurrencyFormatter.format(year.cumulative)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const roundTo = (value: number, decimals = 3) => {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
};

const SliderWithLabel = ({
  label,
  description,
  value,
  min,
  max,
  step,
  onChange,
  renderValue,
}: {
  label: string;
  description: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  renderValue?: (value: number) => string;
}) => {
  const formattedValue = renderValue
    ? renderValue(value)
    : percentFormatter.format(value);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div>
          <div className="font-medium text-foreground">{label}</div>
          <div className="text-muted-foreground text-xs">{description}</div>
        </div>
        <div className="font-semibold text-primary">{formattedValue}</div>
      </div>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => onChange(vals[0])}
      />
    </div>
  );
};

const ResultTile = ({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: 'positive' | 'neutral' | 'negative';
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-border p-4 shadow-sm transition-shadow hover:shadow-md',
        trend === 'positive' && 'bg-emerald-500/5',
        trend === 'negative' && 'bg-destructive/10',
      )}
    >
      <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-foreground">{value}</div>
    </div>
  );
};

const calculateRoi = (inputs: RoiInputs) => {
  let grossRent = inputs.investment * inputs.rentalYield;
  let netRentalIncome = 0;
  let cumulative = -inputs.investment;
  let paybackYears: number | null = null;

  const yearlyBreakdown: {
    year: number;
    grossRent: number;
    netRent: number;
    cumulative: number;
  }[] = [];

  for (let year = 1; year <= inputs.holdingPeriod; year += 1) {
    const netRent = grossRent * (1 - inputs.expenseRatio);
    netRentalIncome += netRent;
    cumulative += netRent;
    if (paybackYears === null && cumulative >= 0) {
      paybackYears = year;
    }

    yearlyBreakdown.push({
      year,
      grossRent,
      netRent,
      cumulative,
    });

    grossRent *= 1 + inputs.rentGrowth;
  }

  const endingValue = inputs.investment * Math.pow(1 + inputs.appreciation, inputs.holdingPeriod);
  const exitCharges = endingValue * inputs.exitCosts;
  const saleProceeds = endingValue - exitCharges;
  const totalReturn = saleProceeds + netRentalIncome;
  const netProfit = totalReturn - inputs.investment;
  const roi = netProfit / inputs.investment;
  const cagr = totalReturn > 0 ? Math.pow(totalReturn / inputs.investment, 1 / inputs.holdingPeriod) - 1 : 0;

  cumulative += saleProceeds;
  yearlyBreakdown[yearlyBreakdown.length - 1].cumulative = cumulative;

  return {
    netProfit,
    roi,
    cagr,
    netRentalIncome,
    saleProceeds,
    paybackYears,
    yearlyBreakdown,
  };
};

export default RoiCalculator;


