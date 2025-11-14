import { useEffect, useState } from 'react';
import AddPropertyForm from '@/components/AddPropertyForm';
import ManageUsers from '@/components/admin/ManageUsers';
import Reports from '@/components/admin/Reports';
import Analytics from '@/components/admin/Analytics';
import Leads from '@/components/admin/Leads';
import MarketInsightsAdmin from '@/components/admin/MarketInsightsAdmin';
import RoiSettingsPanel from '@/components/admin/RoiSettings';
import { useProperties } from '@/contexts/PropertyContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLeads } from '@/contexts/LeadContext';
import { useBlog } from '@/contexts/BlogContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building2, 
  Users as UsersIcon, 
  DollarSign, 
  TrendingUp, 
  LogOut,
  Home,
  FileText,
  BarChart3,
  PhoneIncoming,
  BookOpen,
  Calculator
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const [showAddProperty, setShowAddProperty] = useState(false);
  const { getStatistics } = useProperties();
  const { getLeadStats } = useLeads();
  const { posts, publishedPosts } = useBlog();
  const statistics = getStatistics();
  const leadStats = getLeadStats();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin/login');
    }
  }, [isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Real-time statistics from properties
  const stats = [
    {
      title: 'Total Properties',
      value: statistics.totalProperties.toString(),
      icon: Building2,
      change: statistics.totalProperties > 0 ? `${statistics.totalProperties} active` : 'No properties yet',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Active Investors',
      value: statistics.activeInvestors.toLocaleString(),
      icon: UsersIcon,
      change: statistics.activeInvestors > 0 ? 'Across all properties' : 'No investors yet',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Investment',
      value: `₹${(statistics.totalInvestment / 10000000).toFixed(1)} Cr`,
      icon: DollarSign,
      change: statistics.totalInvestment > 0 ? 'Total raised amount' : 'No investments yet',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Avg. Returns',
      value: `${statistics.avgReturns.toFixed(1)}%`,
      icon: TrendingUp,
      change: statistics.avgReturns > 0 ? 'Expected annual return' : 'No data yet',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'New Leads',
      value: leadStats.new.toString(),
      icon: PhoneIncoming,
      change: `${leadStats.total} total leads`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Published Insights',
      value: publishedPosts.length.toString(),
      icon: BookOpen,
      change: `${posts.length} total drafts & live articles`,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-100',
    },
  ];

  const [activeTab, setActiveTab] = useState('overview');

  const quickActions = [
    {
      title: 'Add Property',
      icon: Building2,
      action: () => setShowAddProperty(true),
    },
    {
      title: 'Manage Users',
      icon: UsersIcon,
      action: () => setActiveTab('users'),
    },
    {
      title: 'View Reports',
      icon: FileText,
      action: () => setActiveTab('reports'),
    },
    {
      title: 'Analytics',
      icon: BarChart3,
      action: () => setActiveTab('analytics'),
    },
    {
      title: 'View Leads',
      icon: PhoneIncoming,
      action: () => setActiveTab('leads'),
    },
    {
      title: 'Market Insights',
      icon: BookOpen,
      action: () => setActiveTab('insights'),
    },
    {
      title: 'ROI Settings',
      icon: Calculator,
      action: () => setActiveTab('roi'),
    },
  ];

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-bold text-primary">
                Tru<span className="text-accent-green">Assets</span>
              </div>
              <span className="text-sm text-muted-foreground">Admin Portal</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your platform today.
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-[1020px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Manage Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
            <TabsTrigger value="roi">ROI Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <div className={`p-2 rounded-full ${stat.bgColor}`}>
                        <Icon className={`h-4 w-4 ${stat.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {stat.change}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Manage your platform efficiently
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        className="h-24 flex flex-col items-center justify-center space-y-2"
                        onClick={action.action}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-sm">{action.title}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Platform health overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Server Status</span>
                    <span className="text-sm text-green-600 font-medium">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Database</span>
                    <span className="text-sm text-green-600 font-medium">Healthy</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Payment Gateway</span>
                    <span className="text-sm text-green-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Response Time</span>
                    <span className="text-sm text-green-600 font-medium">45ms</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Users Tab */}
          <TabsContent value="users">
            <ManageUsers />
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <Reports />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Analytics />
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads">
            <Leads />
          </TabsContent>

          {/* Market Insights Tab */}
          <TabsContent value="insights">
            <MarketInsightsAdmin />
          </TabsContent>

          {/* ROI Settings */}
          <TabsContent value="roi">
            <RoiSettingsPanel />
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Property Modal */}
      {showAddProperty && (
        <AddPropertyForm onClose={() => setShowAddProperty(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;
