import { AppLayout } from "@/components/layout/AppLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { SecurityChart } from "@/components/dashboard/SecurityChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  AlertTriangle, 
  Activity, 
  Server, 
  TrendingUp, 
  Eye,
  Plus,
  Search,
  Settings,
  RefreshCw
} from "lucide-react";

export default function Monitoring() {
  const applications = [
    {
      id: 1,
      name: "E-commerce Portal",
      status: "healthy",
      health: 98,
      threats: 5,
      lastChecked: "2 minutes ago",
      url: "https://shop.example.com",
    },
    {
      id: 2,
      name: "Mobile App Backend",
      status: "warning",
      health: 85,
      threats: 12,
      lastChecked: "1 minute ago",
      url: "https://api.mobile.example.com",
    },
    {
      id: 3,
      name: "Admin Dashboard",
      status: "healthy",
      health: 95,
      threats: 3,
      lastChecked: "3 minutes ago",
      url: "https://admin.example.com",
    },
    {
      id: 4,
      name: "User Portal",
      status: "critical",
      health: 65,
      threats: 25,
      lastChecked: "30 seconds ago",
      url: "https://portal.example.com",
    },
    {
      id: 5,
      name: "Analytics Service",
      status: "healthy",
      health: 99,
      threats: 1,
      lastChecked: "5 minutes ago",
      url: "https://analytics.example.com",
    },
    {
      id: 6,
      name: "Payment Gateway",
      status: "healthy",
      health: 97,
      threats: 2,
      lastChecked: "1 minute ago",
      url: "https://payments.example.com",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-success";
      case "warning":
        return "bg-warning";
      case "critical":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "healthy":
        return "default";
      case "warning":
        return "destructive";
      case "critical":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-heading font-bold">Real-time Monitoring</h1>
            <p className="text-muted-foreground">
              Live security monitoring and application health overview
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Application
            </Button>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="System Health"
            value="94.2%"
            change={{ value: "2.1%", type: "increase" }}
            icon={Activity}
            iconColor="text-success"
          />
          <MetricCard
            title="Active Monitoring"
            value="6"
            change={{ value: "1", type: "increase" }}
            icon={Server}
            iconColor="text-primary"
          />
          <MetricCard
            title="Threat Detection"
            value="48"
            change={{ value: "15", type: "increase" }}
            icon={AlertTriangle}
            iconColor="text-destructive"
          />
          <MetricCard
            title="Response Time"
            value="145ms"
            change={{ value: "12ms", type: "decrease" }}
            icon={TrendingUp}
            iconColor="text-accent"
          />
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <SecurityChart
            type="area"
            title="Security Events Over Time"
            data={[]}
            height={300}
          />
          <SecurityChart
            type="line"
            title="Threat Detection Trends"
            data={[]}
            height={300}
          />
        </div>

        {/* Application Health Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Application Health Overview</span>
                </CardTitle>
                <CardDescription>
                  Real-time status and security metrics for monitored applications
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <Card key={app.id} className="relative">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div 
                          className={`w-3 h-3 rounded-full ${getStatusColor(app.status)}`}
                        />
                        <CardTitle className="text-sm">{app.name}</CardTitle>
                      </div>
                      <Badge variant={getStatusBadge(app.status)} className="text-xs">
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Health</span>
                      <span className="font-medium">{app.health}%</span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          app.health >= 95 
                            ? "bg-success" 
                            : app.health >= 80 
                            ? "bg-warning" 
                            : "bg-destructive"
                        }`}
                        style={{ width: `${app.health}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Active Threats</span>
                      <Badge 
                        variant={app.threats > 10 ? "destructive" : "secondary"}
                        className="text-xs"
                      >
                        {app.threats}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Last checked: {app.lastChecked}</span>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Settings className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Real-time Activity Feed */}
        <ActivityFeed autoRefresh={true} refreshInterval={10000} maxItems={8} />
      </div>
    </AppLayout>
  );
}