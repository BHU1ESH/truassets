import { useState } from 'react';
import { useRoi, RoiScenario, RoiSettings } from '@/contexts/RoiContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Plus, Save, Trash2 } from 'lucide-react';

const RoiSettingsPanel = () => {
  const { settings, updateSettings, scenarios, updateScenario, addScenario, deleteScenario } = useRoi();
  const { toast } = useToast();
  const [formState, setFormState] = useState<RoiSettings>({ ...settings });
  const [newScenario, setNewScenario] = useState({
    name: '',
    rentalYieldDelta: 0,
    appreciationDelta: 0,
    holdingPeriodDelta: 0,
    notes: '',
  });

  const handleSaveSettings = () => {
    updateSettings(formState);
    toast({ title: 'ROI defaults updated', description: 'The calculator now reflects your assumptions.' });
  };

  const handleScenarioChange = (scenario: RoiScenario, key: keyof RoiScenario, value: string | number) => {
    updateScenario(scenario.id, {
      ...scenario,
      [key]: typeof value === 'string' ? value : Number(value),
    } as RoiScenario);
  };

  const handleAddScenario = () => {
    if (!newScenario.name.trim()) {
      toast({ title: 'Scenario name required', variant: 'destructive' });
      return;
    }
    addScenario({
      ...newScenario,
      name: newScenario.name.trim(),
      notes: newScenario.notes.trim(),
    });
    setNewScenario({
      name: '',
      rentalYieldDelta: 0,
      appreciationDelta: 0,
      holdingPeriodDelta: 0,
      notes: '',
    });
    toast({ title: 'Scenario added', description: 'You can now apply it in the ROI calculator.' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Baseline Assumptions</CardTitle>
          <CardDescription>These defaults prefill the investor-facing ROI calculator.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <NumberField
            label="Default Investment Amount"
            suffix="₹"
            value={formState.defaultInvestment}
            onChange={(value) => setFormState((prev) => ({ ...prev, defaultInvestment: value }))}
            min={100000}
            step={50000}
          />
          <PercentField
            label="Starting Rental Yield"
            value={formState.rentalYield}
            onChange={(value) => setFormState((prev) => ({ ...prev, rentalYield: value }))}
            step={0.005}
          />
          <PercentField
            label="Annual Appreciation"
            value={formState.appreciation}
            onChange={(value) => setFormState((prev) => ({ ...prev, appreciation: value }))}
            step={0.005}
          />
          <NumberField
            label="Holding Period (years)"
            value={formState.holdingPeriod}
            onChange={(value) => setFormState((prev) => ({ ...prev, holdingPeriod: value }))}
            min={1}
            max={15}
            step={1}
          />
          <PercentField
            label="Annual Rent Escalation"
            value={formState.rentGrowth}
            onChange={(value) => setFormState((prev) => ({ ...prev, rentGrowth: value }))}
            step={0.005}
          />
          <PercentField
            label="Operating Expense Ratio"
            value={formState.expenseRatio}
            onChange={(value) => setFormState((prev) => ({ ...prev, expenseRatio: value }))}
            step={0.005}
          />
          <PercentField
            label="Exit Costs"
            value={formState.exitCosts}
            onChange={(value) => setFormState((prev) => ({ ...prev, exitCosts: value }))}
            step={0.0025}
          />
        </CardContent>
        <div className="flex justify-end px-6 pb-6">
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="h-4 w-4" /> Save Defaults
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scenario Builder</CardTitle>
          <CardDescription>Create quick presets to test different market environments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Yield Δ</TableHead>
                  <TableHead>Appreciation Δ</TableHead>
                  <TableHead>Holding Δ (yrs)</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scenarios.map((scenario) => (
                  <TableRow key={scenario.id}>
                    <TableCell className="font-medium">
                      <Input
                        value={scenario.name}
                        onChange={(event) => handleScenarioChange(scenario, 'name', event.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.001"
                        value={scenario.rentalYieldDelta}
                        onChange={(event) => handleScenarioChange(scenario, 'rentalYieldDelta', Number(event.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.001"
                        value={scenario.appreciationDelta}
                        onChange={(event) => handleScenarioChange(scenario, 'appreciationDelta', Number(event.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="1"
                        value={scenario.holdingPeriodDelta}
                        onChange={(event) => handleScenarioChange(scenario, 'holdingPeriodDelta', Number(event.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={scenario.notes ?? ''}
                        onChange={(event) => handleScenarioChange(scenario, 'notes', event.target.value)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => deleteScenario(scenario.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="rounded-lg border border-dashed p-4">
            <h4 className="font-semibold mb-2">Add Scenario</h4>
            <div className="grid gap-3 md:grid-cols-5">
              <Input
                placeholder="Scenario name"
                value={newScenario.name}
                onChange={(event) => setNewScenario((prev) => ({ ...prev, name: event.target.value }))}
              />
              <Input
                type="number"
                step="0.001"
                placeholder="Yield Δ"
                value={newScenario.rentalYieldDelta}
                onChange={(event) => setNewScenario((prev) => ({ ...prev, rentalYieldDelta: Number(event.target.value) }))}
              />
              <Input
                type="number"
                step="0.001"
                placeholder="Appreciation Δ"
                value={newScenario.appreciationDelta}
                onChange={(event) => setNewScenario((prev) => ({ ...prev, appreciationDelta: Number(event.target.value) }))}
              />
              <Input
                type="number"
                step="1"
                placeholder="Holding Δ"
                value={newScenario.holdingPeriodDelta}
                onChange={(event) => setNewScenario((prev) => ({ ...prev, holdingPeriodDelta: Number(event.target.value) }))}
              />
              <Input
                placeholder="Notes"
                value={newScenario.notes}
                onChange={(event) => setNewScenario((prev) => ({ ...prev, notes: event.target.value }))}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button variant="outline" className="gap-2" onClick={handleAddScenario}>
                <Plus className="h-4 w-4" /> Add Scenario
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PercentField = ({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      <Input
        type="number"
        step={step ?? 0.001}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <span className="text-sm text-muted-foreground">%</span>
    </div>
  </div>
);

const NumberField = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
}) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="flex items-center gap-2">
      {suffix === '₹' && <span className="text-sm text-muted-foreground">₹</span>}
      <Input
        type="number"
        min={min}
        max={max}
        step={step ?? 1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      {suffix && suffix !== '₹' && <span className="text-sm text-muted-foreground">{suffix}</span>}
    </div>
  </div>
);

export default RoiSettingsPanel;


