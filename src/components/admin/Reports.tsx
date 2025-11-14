import { useState } from 'react';
import { useProperties } from '@/contexts/PropertyContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, FileText, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Reports = () => {
  const { properties } = useProperties();
  const { toast } = useToast();
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProperties = properties.filter((prop) => {
    const matchesType = typeFilter === 'all' || prop.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || prop.status === statusFilter;
    return matchesType && matchesStatus;
  });

  const totalProfit = filteredProperties.reduce((sum, prop) => {
    const profit = prop.raisedAmount * 0.15; // 15% profit margin
    return sum + profit;
  }, 0);

  const totalRevenue = filteredProperties.reduce((sum, prop) => sum + prop.raisedAmount, 0);

  const exportToCSV = () => {
    if (filteredProperties.length === 0) {
      toast({
        title: 'No Data',
        description: 'No properties to export.',
        variant: 'destructive',
      });
      return;
    }

    const headers = ['Property Name', 'Type', 'Status', 'Target Amount', 'Raised Amount', 'Profit', 'ROI %'];
    const rows = filteredProperties.map(prop => {
      const profit = prop.raisedAmount * 0.15;
      const roi = ((profit / prop.targetAmount) * 100).toFixed(2);
      return [
        prop.title,
        prop.type,
        prop.status,
        prop.targetAmount.toFixed(2),
        prop.raisedAmount.toFixed(2),
        profit.toFixed(2),
        roi
      ];
    });
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `property-reports-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    
    toast({
      title: 'Export Successful',
      description: 'Report has been downloaded as CSV.',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Active</Badge>;
      case 'funded':
        return <Badge className="bg-blue-500">Funded</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">Upcoming</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Property Reports</h2>
          <p className="text-muted-foreground">Detailed property performance and analytics</p>
        </div>
        <Button onClick={exportToCSV} disabled={filteredProperties.length === 0}>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProperties.length}</div>
            <p className="text-xs text-muted-foreground">
              {properties.length} total in system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalRevenue / 10000000).toFixed(2)} Cr</div>
            <p className="text-xs text-muted-foreground">
              Raised from investments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{(totalProfit / 10000000).toFixed(2)} Cr
            </div>
            <p className="text-xs text-muted-foreground">
              15% profit margin
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Properties</CardTitle>
          <CardDescription>Refine your report view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Property Type</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="funded">Funded</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>Complete list of properties with performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProperties.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No properties found matching your filters.</p>
            </div>
          ) : (
            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Target Amount</TableHead>
                    <TableHead className="text-right">Raised Amount</TableHead>
                    <TableHead className="text-right">Profit</TableHead>
                    <TableHead className="text-right">ROI %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((prop) => {
                    const profit = prop.raisedAmount * 0.15;
                    const roi = ((profit / prop.targetAmount) * 100).toFixed(2);
                    return (
                      <TableRow key={prop.id}>
                        <TableCell className="font-medium">{prop.title}</TableCell>
                        <TableCell className="capitalize">{prop.type}</TableCell>
                        <TableCell>{getStatusBadge(prop.status)}</TableCell>
                        <TableCell className="text-right">
                          ₹{(prop.targetAmount / 100000).toFixed(2)}L
                        </TableCell>
                        <TableCell className="text-right">
                          ₹{(prop.raisedAmount / 100000).toFixed(2)}L
                        </TableCell>
                        <TableCell className="text-right text-green-600 font-semibold">
                          ₹{(profit / 100000).toFixed(2)}L
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          {roi}%
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
