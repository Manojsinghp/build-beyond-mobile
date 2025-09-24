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
  RefreshCw,
  Settings
} from "lucide-react";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-heading font-bold">Security Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time overview of your application security status
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Quick Actions
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Active Threats"
            value="3"
            change={{ value: "2", type: "increase" }}
            icon={AlertTriangle}
            iconColor="text-destructive"
          />
          <MetricCard
            title="Monitored Apps"
            value="12"
            change={{ value: "All operational", type: "neutral" }}
            icon={Server}
            iconColor="text-primary"
          />
          <MetricCard
            title="System Health"
            value="98.9%"
            change={{ value: "0.1%", type: "increase" }}
            icon={Activity}
            iconColor="text-success"
          />
          <MetricCard
            title="Detection Rate"
            value="94.2%"
            change={{ value: "1.2%", type: "increase" }}
            icon={TrendingUp}
            iconColor="text-success"
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
            type="pie"
            title="Threat Distribution"
            data={[]}
            height={300}
          />
        </div>

        {/* Activity Feed and Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ActivityFeed autoRefresh={true} refreshInterval={30000} maxItems={6} />
          </div>
          
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common security management tasks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" />
                  Add New Application
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Activity className="mr-2 h-4 w-4" />
                  Run Security Scan
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>
                  Current monitoring system health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Detection Engine</span>
                  <Badge className="bg-success text-success-foreground">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">AI Analysis</span>
                  <Badge className="bg-success text-success-foreground">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Alert System</span>
                  <Badge className="bg-success text-success-foreground">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Pipeline</span>
                  <Badge className="bg-warning text-warning-foreground">Maintenance</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}