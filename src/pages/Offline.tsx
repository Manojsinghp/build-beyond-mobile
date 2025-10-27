import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { WifiOff, RefreshCw, Activity, AlertCircle } from "lucide-react";

export default function Offline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = () => {
    if (navigator.onLine) {
      window.location.reload();
    }
  };

  // Mock cached data
  const cachedAlerts = [
    { id: 1, severity: "high", message: "Unusual login pattern detected", time: "10 min ago" },
    { id: 2, severity: "medium", message: "Rate limit exceeded", time: "25 min ago" },
  ];

  const cachedMetrics = {
    activeThreats: 3,
    monitoredApps: 6,
    systemHealth: 94,
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 mb-4">
            <WifiOff className="h-10 w-10 text-destructive" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">You're Offline</h1>
          <p className="text-lg text-muted-foreground">
            No internet connection detected. Some features are limited.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant={isOnline ? "default" : "destructive"}>
              {isOnline ? "Connection restored" : "Offline mode"}
            </Badge>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button onClick={handleRetry} disabled={!isOnline}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry Connection
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Cached Data
            </CardTitle>
            <CardDescription>
              Last updated: {lastUpdate.toLocaleTimeString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Active Threats</p>
                <p className="text-2xl font-bold">{cachedMetrics.activeThreats}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Monitored Apps</p>
                <p className="text-2xl font-bold">{cachedMetrics.monitoredApps}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">System Health</p>
                <p className="text-2xl font-bold">{cachedMetrics.systemHealth}%</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Recent Alerts (Cached)
              </h3>
              {cachedAlerts.map((alert) => (
                <div key={alert.id} className="p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant={alert.severity === "high" ? "destructive" : "secondary"}>
                        {alert.severity}
                      </Badge>
                      <p className="mt-2 text-sm">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-warning">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium">Limited Functionality</p>
                <p className="text-sm text-muted-foreground">
                  While offline, you can view cached data but cannot:
                </p>
                <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                  <li>Receive real-time alerts</li>
                  <li>Update configurations</li>
                  <li>Generate new reports</li>
                  <li>Sync with external integrations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
