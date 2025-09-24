import { Home, Shield, Bell, Grid3X3, BarChart3, Settings, HelpCircle, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SideMenuProps {
  activeRoute?: string;
  onRouteChange?: (route: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const mainNavItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, route: "/" },
  { id: "monitoring", label: "Monitoring", icon: Shield, route: "/monitoring" },
  { id: "alerts", label: "Alerts", icon: Bell, route: "/alerts", badge: 3 },
  { id: "applications", label: "Applications", icon: Grid3X3, route: "/applications" },
];

const secondaryNavItems = [
  { id: "reports", label: "Reports & Analytics", icon: BarChart3, route: "/reports" },
  { id: "settings", label: "Settings", icon: Settings, route: "/settings" },
  { id: "profile", label: "Profile", icon: User, route: "/profile" },
  { id: "help", label: "Help & Documentation", icon: HelpCircle, route: "/help" },
];

export function SideMenu({ activeRoute = "/", onRouteChange, isOpen, onClose }: SideMenuProps) {
  const handleRouteClick = (route: string) => {
    onRouteChange?.(route);
    onClose?.();
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Side menu */}
      <aside
        className={cn(
          "fixed left-0 top-16 bottom-0 w-64 bg-background border-r z-50 transform transition-transform duration-200 ease-in-out md:relative md:top-0 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* Main Navigation */}
          <div className="space-y-2">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Main
            </h3>
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.route;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleRouteClick(item.route)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                  {item.badge && (
                    <Badge className="ml-auto h-5 w-5 p-0 text-xs bg-accent text-accent-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Secondary Navigation */}
          <div className="mt-8 space-y-2">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              More
            </h3>
            {secondaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeRoute === item.route;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => handleRouteClick(item.route)}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-auto pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center">
              SmartDetect v1.0
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}