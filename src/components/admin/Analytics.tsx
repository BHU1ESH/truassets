import { useProperties } from '@/contexts/PropertyContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Building2, DollarSign } from 'lucide-react';

interface PropertyTypeAggregate {
  type: string;
  count: number;
  profit: number;
  revenue: number;
}

interface StatusAggregate {
  status: string;
  count: number;
}

const Analytics = () => {
  const { properties } = useProperties();

  // Property Type Distribution
  const propertyTypeData = properties.reduce<PropertyTypeAggregate[]>((acc, prop) => {
    const existing = acc.find((item) => item.type === prop.type);
    if (existing) {
      existing.count += 1;
      existing.profit += prop.raisedAmount * 0.15;
      existing.revenue += prop.raisedAmount;
    } else {
      acc.push({
        type: prop.type,
        count: 1,
        profit: prop.raisedAmount * 0.15,
        revenue: prop.raisedAmount,
      });
    }
    return acc;
  }, []);

  // Status Distribution
  const statusData = properties.reduce<StatusAggregate[]>((acc, prop) => {
    const existing = acc.find((item) => item.status === prop.status);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ status: prop.status, count: 1 });
    }
    return acc;
  }, []);

  // Investment Trend (mock data based on properties)
  const trendData = properties.slice(0, 6).map((prop, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index] || `Month ${index + 1}`,
    investment: prop.raisedAmount / 100000,
    target: prop.targetAmount / 100000,
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const totalInvestment = properties.reduce((sum, prop) => sum + prop.raisedAmount, 0);
  const totalProfit = properties.reduce((sum, prop) => sum + (prop.raisedAmount * 0.15), 0);
  const avgOccupancy = properties.length > 0 
    ? (properties.reduce((sum, prop) => sum + (prop.raisedAmount / prop.targetAmount), 0) / properties.length * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Visual insights and performance trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(totalInvestment / 10000000).toFixed(2)} Cr</div>
            <p className="text-xs text-muted-foreground">Across {properties.length} properties</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{(totalProfit / 10000000).toFixed(2)} Cr</div>
            <p className="text-xs text-muted-foreground">15% profit margin</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Occupancy Rate</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgOccupancy}%</div>
            <p className="text-xs text-muted-foreground">Target vs Raised</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Property Type Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Properties by Type</CardTitle>
            <CardDescription>Distribution of property types</CardDescription>
          </CardHeader>
          <CardContent>
            {propertyTypeData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={propertyTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" name="Count" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Profit Distribution Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Profit Distribution by Type</CardTitle>
            <CardDescription>Profit contribution per property type</CardDescription>
          </CardHeader>
          <CardContent>
            {propertyTypeData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={propertyTypeData}
                    dataKey="profit"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={(entry) => `${entry.type}: ₹${(entry.profit / 100000).toFixed(1)}L`}
                  >
                    {propertyTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number | string) =>
                      typeof value === 'number' ? `₹${(value / 100000).toFixed(2)}L` : value
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Property Status</CardTitle>
            <CardDescription>Current status of all properties</CardDescription>
          </CardHeader>
          <CardContent>
            {statusData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Investment Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Investment Trend</CardTitle>
            <CardDescription>Investment vs Target over time</CardDescription>
          </CardHeader>
          <CardContent>
            {trendData.length === 0 ? (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value: number | string) =>
                      typeof value === 'number' ? `₹${value.toFixed(2)}L` : value
                    }
                  />
                  <Legend />
                  <Line type="monotone" dataKey="investment" stroke="#8884d8" name="Investment (L)" />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" name="Target (L)" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Revenue by Type Table */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Breakdown</CardTitle>
          <CardDescription>Detailed revenue analysis by property type</CardDescription>
        </CardHeader>
        <CardContent>
          {propertyTypeData.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No properties available for analysis
            </div>
          ) : (
            <div className="space-y-4">
              {propertyTypeData.map((item, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <p className="font-medium capitalize">{item.type}</p>
                      <p className="text-sm text-muted-foreground">{item.count} properties</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{(item.revenue / 100000).toFixed(2)}L</p>
                    <p className="text-sm text-green-600">+₹{(item.profit / 100000).toFixed(2)}L profit</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
