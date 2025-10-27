import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Shield, Activity, Settings, AlertTriangle, CheckCircle2, Save } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockActivityData = [
  { time: "00:00", requests: 120, threats: 0 },
  { time: "04:00", requests: 89, threats: 0 },
  { time: "08:00", requests: 245, threats: 1 },
  { time: "12:00", requests: 389, threats: 2 },
  { time: "16:00", requests: 412, threats: 0 },
  { time: "20:00", requests: 301, threats: 1 },
];

const mockRecentEvents = [
  { id: 1, type: "success", message: "Security scan completed", time: "2 min ago" },
  { id: 2, type: "warning", message: "Unusual traffic pattern detected", time: "15 min ago" },
  { id: 3, type: "info", message: "Configuration updated", time: "1 hour ago" },
  { id: 4, type: "success", message: "Integration test passed", time: "2 hours ago" },
];

export default function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [threatThreshold, setThreatThreshold] = useState([75]);
  const [autoBlock, setAutoBlock] = useState(true);
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/applications")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              Production API
            </h1>
            <p className="text-muted-foreground">Application ID: {id}</p>
          </div>
          <Badge variant="default">Active</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Requests (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,556</div>
              <p className="text-sm text-success flex items-center gap-1 mt-1">
                <CheckCircle2 className="h-4 w-4" />
                +12% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Threats Detected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <AlertTriangle className="h-4 w-4" />
                2 resolved, 2 active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">94%</div>
              <p className="text-sm text-muted-foreground mt-1">Excellent security posture</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Trends</CardTitle>
                <CardDescription>Request volume and threat detection over the last 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={mockActivityData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip />
                    <Line type="monotone" dataKey="requests" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="threats" stroke="hsl(var(--destructive))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Latest security events and system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <Activity className={`h-5 w-5 mt-0.5 ${
                        event.type === 'success' ? 'text-success' :
                        event.type === 'warning' ? 'text-warning' :
                        'text-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{event.message}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detection Parameters</CardTitle>
                <CardDescription>Configure anomaly detection thresholds and behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="realtime">Real-time Monitoring</Label>
                      <p className="text-sm text-muted-foreground">Enable continuous threat detection</p>
                    </div>
                    <Switch id="realtime" checked={realTimeMonitoring} onCheckedChange={setRealTimeMonitoring} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoblock">Auto-block Threats</Label>
                      <p className="text-sm text-muted-foreground">Automatically block detected threats</p>
                    </div>
                    <Switch id="autoblock" checked={autoBlock} onCheckedChange={setAutoBlock} />
                  </div>

                  <div className="space-y-2">
                    <Label>Threat Sensitivity: {threatThreshold[0]}%</Label>
                    <p className="text-sm text-muted-foreground">Adjust detection sensitivity threshold</p>
                    <Slider
                      value={threatThreshold}
                      onValueChange={setThreatThreshold}
                      max={100}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="api-key">API Key</Label>
                    <Input id="api-key" type="password" value="sk_live_***************" readOnly />
                  </div>
                </div>

                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Configuration
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Integrations</CardTitle>
                <CardDescription>Manage third-party security tool integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Splunk SIEM</p>
                        <p className="text-sm text-muted-foreground">Connected</p>
                      </div>
                    </div>
                    <Badge variant="default">Active</Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Settings className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">Slack Notifications</p>
                        <p className="text-sm text-muted-foreground">Not configured</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Activity Log</CardTitle>
                <CardDescription>Complete history of all application events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockRecentEvents.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 border-b last:border-0">
                      <Activity className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm">{event.message}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
