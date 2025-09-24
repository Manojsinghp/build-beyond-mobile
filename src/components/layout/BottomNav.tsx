import { Home, Shield, Bell, Grid3X3, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeRoute?: string;
  onRouteChange?: (route: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, route: "/" },
  { id: "monitoring", label: "Monitoring", icon: Shield, route: "/monitoring" },
  { id: "alerts", label: "Alerts", icon: Bell, route: "/alerts", badge: 3 },
  { id: "applications", label: "Apps", icon: Grid3X3, route: "/applications" },
  { id: "more", label: "More", icon: MoreHorizontal, route: "/more" },
];

export function BottomNav({ activeRoute = "/", onRouteChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.route;
          
          return (
            <button
              key={item.id}
              onClick={() => onRouteChange?.(item.route)}
              className={cn(
                "flex flex-col items-center justify-center space-y-1 relative",
                "text-muted-foreground hover:text-foreground transition-colors",
                isActive && "text-primary"
              )}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {item.badge && (
                  <Badge className="absolute -top-2 -right-2 h-4 w-4 p-0 text-xs bg-accent text-accent-foreground">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
              {isActive && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}