import { useMemo, useState } from 'react';
import { useLeads } from '@/contexts/LeadContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneIncoming, CheckCircle2, Archive, Trash2, MoreVertical, Search, Clock } from 'lucide-react';

const statusLabels: Record<string, string> = {
  new: 'New',
  'in-progress': 'In Progress',
  contacted: 'Contacted',
  converted: 'Converted',
  archived: 'Archived',
};

const statusBadge = (status: string) => {
  switch (status) {
    case 'new':
      return <Badge className="bg-blue-500">New</Badge>;
    case 'in-progress':
      return <Badge className="bg-amber-500">In Progress</Badge>;
    case 'contacted':
      return <Badge className="bg-green-500">Contacted</Badge>;
    case 'converted':
      return <Badge className="bg-emerald-600">Converted</Badge>;
    case 'archived':
      return <Badge variant="secondary">Archived</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

const Leads = () => {
  const { leads, setLeadStatus, deleteLead, getLeadStats } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [leadToDelete, setLeadToDelete] = useState<string | null>(null);

  const stats = getLeadStats();

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Leads Pipeline</h2>
        <p className="text-muted-foreground">Track investor enquiries and follow-ups in one place.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <PhoneIncoming className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-semibold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">All sources</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-indigo-500" />
            <div>
              <div className="text-2xl font-semibold">{stats.new}</div>
              <p className="text-xs text-muted-foreground">Awaiting contact</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contacted</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div>
              <div className="text-2xl font-semibold">{stats.contacted}</div>
              <p className="text-xs text-muted-foreground">Calls completed</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Converted</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            <div>
              <div className="text-2xl font-semibold">{stats.converted}</div>
              <p className="text-xs text-muted-foreground">Investors on-boarded</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone"
              className="pl-9"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lead</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Investment Profile</TableHead>
              <TableHead>Preferred Slot</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  No leads match the current filters.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div className="font-medium">{lead.name}</div>
                    <div className="text-xs text-muted-foreground">Source · {lead.source}</div>
                    <div className="text-xs text-muted-foreground">Created · {new Date(lead.createdAt).toLocaleString()}</div>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>{lead.email}</div>
                    <div className="text-xs text-muted-foreground">{lead.phone}</div>
                  </TableCell>
                  <TableCell className="text-sm">
                    <div>{lead.investmentGoal}</div>
                    <div className="text-xs text-muted-foreground">Horizon: {lead.investmentHorizon}</div>
                    {lead.notes && (
                      <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{lead.notes}</div>
                    )}
                  </TableCell>
                  <TableCell className="text-sm">
                    {lead.preferredDate ? new Date(lead.preferredDate).toLocaleDateString() : 'Date TBD'}
                    <div className="text-xs text-muted-foreground">{lead.preferredTime || 'Time TBD'}</div>
                  </TableCell>
                  <TableCell>{statusBadge(lead.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {lead.status !== 'contacted' && (
                          <DropdownMenuItem onClick={() => setLeadStatus(lead.id, 'contacted')}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Contacted
                          </DropdownMenuItem>
                        )}
                        {lead.status !== 'converted' && (
                          <DropdownMenuItem onClick={() => setLeadStatus(lead.id, 'converted')}>
                            <CheckCircle2 className="mr-2 h-4 w-4" />
                            Mark as Converted
                          </DropdownMenuItem>
                        )}
                        {lead.status !== 'archived' && (
                          <DropdownMenuItem onClick={() => setLeadStatus(lead.id, 'archived')}>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive Lead
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => setLeadToDelete(lead.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!leadToDelete} onOpenChange={(open) => !open && setLeadToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete lead?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The lead record will be permanently removed from your pipeline.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => {
                if (leadToDelete) {
                  deleteLead(leadToDelete);
                  setLeadToDelete(null);
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Leads;


