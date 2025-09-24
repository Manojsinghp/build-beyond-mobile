import { Shield, Lock, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="font-heading font-bold text-2xl text-primary">SmartDetect</span>
          </div>
          <div className="space-x-2">
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-heading font-bold">
              Real-time Security Monitoring for{" "}
              <span className="text-primary">Modern Applications</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced anomaly-based security monitoring using AI to detect threats, 
              unauthorized access, and data breaches before they impact your business.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-primary mb-2" />
              <CardTitle>AI-Powered Detection</CardTitle>
              <CardDescription>
                Machine learning algorithms that adapt to your application's behavior patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detect anomalies and threats in real-time without relying on signature-based methods.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Activity className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Real-time Monitoring</CardTitle>
              <CardDescription>
                Continuous surveillance of your web and mobile applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Monitor user behavior, API calls, and system activities 24/7 with instant alerts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-10 w-10 text-primary mb-2" />
              <CardTitle>Intelligent Analytics</CardTitle>
              <CardDescription>
                Comprehensive reporting and threat intelligence insights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Get detailed reports, trend analysis, and actionable security recommendations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center space-y-8 bg-muted/50 rounded-lg p-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-heading font-bold">
              Ready to Secure Your Applications?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of security professionals who trust SmartDetect to protect their applications
            </p>
          </div>
          <Link to="/register">
            <Button size="lg" className="text-lg px-8">
              Start Monitoring Now
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-24 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 SmartDetect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
