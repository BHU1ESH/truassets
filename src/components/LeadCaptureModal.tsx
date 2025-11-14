import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLeads } from '@/contexts/LeadContext';

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

const defaultFormState = {
  name: '',
  email: '',
  phone: '',
  investmentHorizon: '3-5 Years',
  investmentGoal: 'Wealth Growth',
  preferredDate: '',
  preferredTime: 'Morning',
  notes: '',
};

const LeadCaptureModal = ({ open, onOpenChange, source = 'schedule-call' }: LeadCaptureModalProps) => {
  const { addLead } = useLeads();
  const { toast } = useToast();
  const [formData, setFormData] = useState(defaultFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setFormData(defaultFormState);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: 'Missing information',
        description: 'Please provide your name, email, and phone number.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      addLead({
        ...formData,
        source,
      });

      toast({
        title: 'Call scheduled',
        description: 'Our advisory team will reach out shortly to confirm the details.',
      });

      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error('Error saving lead:', error);
      toast({
        title: 'Something went wrong',
        description: 'We could not schedule your call. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(value) => {
      onOpenChange(value);
      if (!value) {
        resetForm();
      }
    }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Schedule a Call</DialogTitle>
          <DialogDescription>
            Share a few details and our senior property advisor will get in touch within one business day.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lead-name">Full Name</Label>
              <Input
                id="lead-name"
                value={formData.name}
                onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Rahul Sharma"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-email">Email</Label>
              <Input
                id="lead-email"
                type="email"
                value={formData.email}
                onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-phone">Phone</Label>
              <Input
                id="lead-phone"
                value={formData.phone}
                onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                placeholder="+91 98765 43210"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-horizon">Investment Horizon</Label>
              <select
                id="lead-horizon"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.investmentHorizon}
                onChange={(event) => setFormData((prev) => ({ ...prev, investmentHorizon: event.target.value }))}
              >
                <option value="1-3 Years">1-3 Years</option>
                <option value="3-5 Years">3-5 Years</option>
                <option value="5+ Years">5+ Years</option>
                <option value="Undecided">Undecided</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-goal">Investment Goal</Label>
              <select
                id="lead-goal"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.investmentGoal}
                onChange={(event) => setFormData((prev) => ({ ...prev, investmentGoal: event.target.value }))}
              >
                <option value="Wealth Growth">Wealth Growth</option>
                <option value="Passive Income">Passive Income</option>
                <option value="Portfolio Diversification">Portfolio Diversification</option>
                <option value="Tax Planning">Tax Planning</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-date">Preferred Date</Label>
              <Input
                id="lead-date"
                type="date"
                value={formData.preferredDate}
                onChange={(event) => setFormData((prev) => ({ ...prev, preferredDate: event.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead-time">Preferred Time</Label>
              <select
                id="lead-time"
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={formData.preferredTime}
                onChange={(event) => setFormData((prev) => ({ ...prev, preferredTime: event.target.value }))}
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-notes">Tell us about your requirements</Label>
            <Textarea
              id="lead-notes"
              rows={4}
              value={formData.notes}
              onChange={(event) => setFormData((prev) => ({ ...prev, notes: event.target.value }))}
              placeholder="e.g. Looking for premium residential assets in Mumbai with 10%+ yield."
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Scheduling…' : 'Confirm Call'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureModal;


