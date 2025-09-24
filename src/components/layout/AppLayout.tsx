import { useState } from "react";
import { TopNav } from "./TopNav";
import { BottomNav } from "./BottomNav";
import { SideMenu } from "./SideMenu";
import { useLocation, useNavigate } from "react-router-dom";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleRouteChange = (route: string) => {
    navigate(route);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav 
        onMobileMenuToggle={handleMobileMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      
      <div className="flex">
        <SideMenu
          activeRoute={location.pathname}
          onRouteChange={handleRouteChange}
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
        
        <main className="flex-1 md:ml-0">
          <div className="p-4 pb-20 md:pb-4">
            {children}
          </div>
        </main>
      </div>

      <BottomNav
        activeRoute={location.pathname}
        onRouteChange={handleRouteChange}
      />
    </div>
  );
}