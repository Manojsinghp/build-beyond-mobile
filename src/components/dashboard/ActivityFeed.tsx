import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, Shield, Activity, Clock, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  severity: "low" | "medium" | "high" | "critical";
  type: "threat" | "anomaly" | "system" | "user";
  application?: string;
}

interface ActivityFeedProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
  maxItems?: number;
}

export function ActivityFeed({ 
  autoRefresh = true, 
  refreshInterval = 30000, 
  maxItems = 10 
}: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Mock data - replace with real API calls
  const mockActivities: ActivityItem[] = [
    {
      id: "1",
      title: "Suspicious Login Attempt",
      description: "Multiple failed login attempts from IP 192.168.1.100",
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      severity: "high",
      type: "threat",
      application: "E-commerce Portal",
    },
    {
      id: "2",
      title: "Unusual API Usage Pattern",
      description: "API calls exceeded normal threshold by 300%",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      severity: "medium",
      type: "anomaly",
      application: "Mobile App Backend",
    },
    {
      id: "3",
      title: "System Health Check",
      description: "All monitoring services operational",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      severity: "low",
      type: "system",
    },
    {
      id: "4",
      title: "Failed Authentication Spike",
      description: "15 failed authentication attempts in last 5 minutes",
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      severity: "medium",
      type: "threat",
      application: "Admin Dashboard",
    },
    {
      id: "5",
      title: "New User Registration",
      description: "User john.doe@example.com registered successfully",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      severity: "low",
      type: "user",
      application: "User Portal",
    },
  ];

  const loadActivities = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    setActivities(mockActivities.slice(0, maxItems));
    setLoading(false);
  };

  useEffect(() => {
    loadActivities();
    
    if (autoRefresh) {
      const interval = setInterval(loadActivities, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval, maxItems]);

  const getSeverityIcon = (severity: ActivityItem["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "medium":
        return <Shield className="h-4 w-4 text-accent" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: ActivityItem["severity"]) => {
    switch (severity) {
      case "critical":
        return "destructive";
      case "high":
        return "destructive";
      case "medium":
        return "default";
      default:
        return "secondary";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Activity className="h-5 w-5" />
          <span>Real-time Activity Feed</span>
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={loadActivities}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={cn(
                  "flex items-start space-x-3 p-3 rounded-lg border",
                  index === 0 && "bg-muted/50"
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  {getSeverityIcon(activity.severity)}
                </div>
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getSeverityColor(activity.severity)} className="text-xs">
                        {activity.severity}
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{formatTimeAgo(activity.timestamp)}</span>
                    {activity.application && (
                      <>
                        <span>•</span>
                        <span>{activity.application}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}