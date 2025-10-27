import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Shield, Activity, Settings, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockApplications = [
  { id: "1", name: "Production API", status: "active", type: "API", threats: 0, lastScan: "2 min ago" },
  { id: "2", name: "Customer Portal", status: "active", type: "Web App", threats: 2, lastScan: "5 min ago" },
  { id: "3", name: "Admin Dashboard", status: "warning", type: "Web App", threats: 1, lastScan: "10 min ago" },
  { id: "4", name: "Mobile API Gateway", status: "active", type: "API", threats: 0, lastScan: "1 min ago" },
  { id: "5", name: "Analytics Service", status: "inactive", type: "Service", threats: 0, lastScan: "2 hours ago" },
  { id: "6", name: "Payment Processor", status: "active", type: "API", threats: 0, lastScan: "3 min ago" },
];

export default function Applications() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newAppName, setNewAppName] = useState("");
  const [newAppType, setNewAppType] = useState("");

  const filteredApps = mockApplications.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "all" || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "default";
      case "warning": return "secondary";
      case "inactive": return "outline";
      default: return "outline";
    }
  };

  const handleAddApplication = () => {
    // Mock add functionality
    setIsAddDialogOpen(false);
    setNewAppName("");
    setNewAppType("");
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Applications</h1>
            <p className="text-muted-foreground">Manage and monitor your registered applications</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Application</DialogTitle>
                <DialogDescription>
                  Register a new application to start monitoring for security threats.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">Application Name</Label>
                  <Input
                    id="app-name"
                    placeholder="Enter application name"
                    value={newAppName}
                    onChange={(e) => setNewAppName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="app-type">Application Type</Label>
                  <Select value={newAppType} onValueChange={setNewAppType}>
                    <SelectTrigger id="app-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="webapp">Web Application</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="service">Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddApplication}>Add Application</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app) => (
            <Card key={app.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      {app.name}
                    </CardTitle>
                    <CardDescription>{app.type}</CardDescription>
                  </div>
                  <Badge variant={getStatusColor(app.status)}>
                    {app.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Threats</span>
                    <span className={`font-bold ${app.threats > 0 ? 'text-destructive' : 'text-success'}`}>
                      {app.threats}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Activity className="h-3 w-3" />
                      Last Scan
                    </span>
                    <span className="text-sm">{app.lastScan}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => navigate(`/applications/${app.id}`)}
                    >
                      <Settings className="h-4 w-4 mr-1" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredApps.length === 0 && (
          <div className="text-center py-12">
            <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No applications found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
