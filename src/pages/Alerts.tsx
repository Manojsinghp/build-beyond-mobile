import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  AlertTriangle, 
  Clock, 
  Filter, 
  Search, 
  Eye,
  Check,
  X,
  AlertCircle,
  Shield,
  Calendar,
  ChevronDown,
  MoreHorizontal
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  title: string;
  description: string;
  severity: "low" | "medium" | "high" | "critical";
  status: "new" | "investigating" | "resolved" | "false_positive";
  application: string;
  timestamp: Date;
  category: "authentication" | "injection" | "ddos" | "malware" | "anomaly";
  ip?: string;
  userAgent?: string;
  details: {
    riskScore: number;
    affectedUsers: number;
    blockedRequests: number;
  };
}

export default function Alerts() {
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Mock alerts data
  const alerts: Alert[] = [
    {
      id: "1",
      title: "SQL Injection Attempt Detected",
      description: "Malicious SQL injection detected in login form",
      severity: "critical",
      status: "new",
      application: "E-commerce Portal",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      category: "injection",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      details: {
        riskScore: 95,
        affectedUsers: 1,
        blockedRequests: 15,
      },
    },
    {
      id: "2",
      title: "Brute Force Attack",
      description: "Multiple failed login attempts from single IP",
      severity: "high",
      status: "investigating",
      application: "Admin Dashboard",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      category: "authentication",
      ip: "203.0.113.42",
      userAgent: "Python-requests/2.25.1",
      details: {
        riskScore: 85,
        affectedUsers: 3,
        blockedRequests: 45,
      },
    },
    {
      id: "3",
      title: "Unusual API Usage Pattern",
      description: "API calls exceeded normal threshold by 300%",
      severity: "medium",
      status: "new",
      application: "Mobile App Backend",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      category: "anomaly",
      ip: "198.51.100.25",
      details: {
        riskScore: 65,
        affectedUsers: 12,
        blockedRequests: 0,
      },
    },
    {
      id: "4",
      title: "Malware Signature Detected",
      description: "Suspicious file upload contains known malware",
      severity: "critical",
      status: "resolved",
      application: "File Upload Service",
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      category: "malware",
      ip: "172.16.0.10",
      details: {
        riskScore: 98,
        affectedUsers: 1,
        blockedRequests: 1,
      },
    },
    {
      id: "5",
      title: "DDoS Attack Mitigated",
      description: "Large volume of requests from multiple IPs blocked",
      severity: "high",
      status: "resolved",
      application: "Web Frontend",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      category: "ddos",
      details: {
        riskScore: 90,
        affectedUsers: 0,
        blockedRequests: 2500,
      },
    },
  ];

  const getSeverityIcon = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "high":
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case "medium":
        return <Shield className="h-4 w-4 text-accent" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: Alert["severity"]) => {
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

  const getStatusColor = (status: Alert["status"]) => {
    switch (status) {
      case "new":
        return "destructive";
      case "investigating":
        return "default";
      case "resolved":
        return "secondary";
      case "false_positive":
        return "outline";
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

  const filteredAlerts = alerts.filter((alert) => {
    const matchesSeverity = filterSeverity === "all" || alert.severity === filterSeverity;
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus;
    const matchesSearch = searchQuery === "" || 
      alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.application.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSeverity && matchesStatus && matchesSearch;
  });

  const handleSelectAll = (checked: boolean) => {
    setSelectedAlerts(checked ? filteredAlerts.map(alert => alert.id) : []);
  };

  const handleSelectAlert = (alertId: string, checked: boolean) => {
    setSelectedAlerts(prev => 
      checked 
        ? [...prev, alertId]
        : prev.filter(id => id !== alertId)
    );
  };

  const handleBulkAction = (action: string) => {
    console.log(`Bulk action: ${action} on alerts:`, selectedAlerts);
    setSelectedAlerts([]);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-heading font-bold">Security Alerts</h1>
            <p className="text-muted-foreground">
              Manage and investigate security incidents across your applications
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown className={cn("h-4 w-4 ml-2 transition-transform", showFilters && "rotate-180")} />
            </Button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filter Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Severity</label>
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Severities</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="false_positive">False Positive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Search</label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search alerts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Alert Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">
                    {alerts.filter(a => a.status === "new").length}
                  </p>
                  <p className="text-sm text-muted-foreground">New Alerts</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warning" />
                <div>
                  <p className="text-2xl font-bold">
                    {alerts.filter(a => a.status === "investigating").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Investigating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-success" />
                <div>
                  <p className="text-2xl font-bold">
                    {alerts.filter(a => a.status === "resolved").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="text-2xl font-bold">
                    {alerts.filter(a => a.severity === "critical").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Critical</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Security Alerts ({filteredAlerts.length})</CardTitle>
              {selectedAlerts.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {selectedAlerts.length} selected
                  </span>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("resolve")}>
                    Resolve Selected
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleBulkAction("investigate")}>
                    Mark as Investigating
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {/* Header */}
              <div className="flex items-center space-x-4 p-2 border-b">
                <Checkbox
                  checked={selectedAlerts.length === filteredAlerts.length && filteredAlerts.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <div className="flex-1 grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground">
                  <div className="col-span-4">Alert</div>
                  <div className="col-span-2">Application</div>
                  <div className="col-span-2">Severity</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1">Time</div>
                  <div className="col-span-1">Actions</div>
                </div>
              </div>

              {/* Alert Rows */}
              <ScrollArea className="h-96">
                {filteredAlerts.map((alert) => (
                  <div 
                    key={alert.id}
                    className="flex items-center space-x-4 p-2 hover:bg-muted/50 rounded-lg cursor-pointer"
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <Checkbox
                      checked={selectedAlerts.includes(alert.id)}
                      onCheckedChange={(checked) => handleSelectAlert(alert.id, checked as boolean)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1 grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 flex items-center space-x-2">
                        {getSeverityIcon(alert.severity)}
                        <div>
                          <p className="font-medium text-sm">{alert.title}</p>
                          <p className="text-xs text-muted-foreground">{alert.description}</p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge variant="outline" className="text-xs">
                          {alert.application}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="col-span-2">
                        <Badge variant={getStatusColor(alert.status)} className="text-xs">
                          {alert.status.replace("_", " ")}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-xs text-muted-foreground">
                        {formatTimeAgo(alert.timestamp)}
                      </div>
                      <div className="col-span-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 w-8 p-0"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAlert(alert);
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </CardContent>
        </Card>

        {/* Alert Detail Modal */}
        <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            {selectedAlert && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    {getSeverityIcon(selectedAlert.severity)}
                    <span>{selectedAlert.title}</span>
                  </DialogTitle>
                  <DialogDescription>
                    {selectedAlert.description}
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Alert Details */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="font-medium">Alert Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Severity:</span>
                          <Badge variant={getSeverityColor(selectedAlert.severity)}>
                            {selectedAlert.severity}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant={getStatusColor(selectedAlert.status)}>
                            {selectedAlert.status.replace("_", " ")}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Category:</span>
                          <span>{selectedAlert.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Application:</span>
                          <span>{selectedAlert.application}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Technical Details</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Risk Score:</span>
                          <span className="font-medium">{selectedAlert.details.riskScore}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Affected Users:</span>
                          <span>{selectedAlert.details.affectedUsers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Blocked Requests:</span>
                          <span>{selectedAlert.details.blockedRequests}</span>
                        </div>
                        {selectedAlert.ip && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Source IP:</span>
                            <code className="text-xs bg-muted px-1 rounded">{selectedAlert.ip}</code>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Event Timeline</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-destructive rounded-full" />
                        <span className="text-muted-foreground">
                          {formatTimeAgo(selectedAlert.timestamp)}
                        </span>
                        <span>Alert detected and created</span>
                      </div>
                      {selectedAlert.status === "investigating" && (
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-warning rounded-full" />
                          <span className="text-muted-foreground">2 minutes ago</span>
                          <span>Investigation started</span>
                        </div>
                      )}
                      {selectedAlert.status === "resolved" && (
                        <div className="flex items-center space-x-2 text-sm">
                          <div className="w-2 h-2 bg-success rounded-full" />
                          <span className="text-muted-foreground">5 minutes ago</span>
                          <span>Alert resolved</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      Resolve
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Investigate
                    </Button>
                    <Button variant="outline" size="sm">
                      <X className="h-4 w-4 mr-2" />
                      False Positive
                    </Button>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}