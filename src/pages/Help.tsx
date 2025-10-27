import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, HelpCircle, Book, Video, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const faqData = [
  {
    question: "How does SmartDetect's anomaly detection work?",
    answer: "SmartDetect uses advanced machine learning algorithms to establish baseline behavior patterns for your applications. It continuously monitors traffic and activities, comparing them against these baselines to identify anomalies that may indicate security threats. The system adapts over time, learning from new patterns and reducing false positives."
  },
  {
    question: "What types of threats can SmartDetect identify?",
    answer: "SmartDetect can identify a wide range of security threats including SQL injection attempts, cross-site scripting (XSS), DDoS attacks, brute force login attempts, unusual data access patterns, privilege escalation attempts, and zero-day exploits through behavioral analysis."
  },
  {
    question: "How do I integrate SmartDetect with my application?",
    answer: "Integration is simple: 1) Add your application in the Applications page, 2) Install our SDK or configure your application to send logs to our API endpoint, 3) Configure detection parameters based on your needs, 4) Start monitoring. Detailed integration guides are available for popular frameworks."
  },
  {
    question: "Can I customize the threat detection sensitivity?",
    answer: "Yes! Each application can have its own detection parameters. You can adjust sensitivity thresholds, configure which types of anomalies to monitor, set up custom rules, and define automatic response actions. Navigate to your application's configuration page to customize these settings."
  },
  {
    question: "What should I do when a threat is detected?",
    answer: "When a threat is detected, SmartDetect will alert you based on your notification preferences. Review the threat details in the Alerts page, which includes the threat type, severity, affected resources, and AI-powered analysis. You can then take actions such as blocking the threat, escalating to your team, or marking as false positive."
  },
  {
    question: "How long is security data retained?",
    answer: "By default, security event data is retained for 90 days. You can customize this in Settings > Data & Privacy, with options ranging from 30 days to 1 year. Historical data can be exported at any time for compliance or analysis purposes."
  },
];

export default function Help() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [supportMessage, setSupportMessage] = useState("");

  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Support request submitted",
      description: "Our team will get back to you within 24 hours.",
    });
    setSupportMessage("");
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Help & Documentation</h1>
          <p className="text-muted-foreground">Find answers and get support for SmartDetect</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5 text-primary" />
                Documentation
              </CardTitle>
              <CardDescription>Comprehensive guides and API reference</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Browse Docs
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Video Tutorials
              </CardTitle>
              <CardDescription>Step-by-step video guides</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Watch Tutorials
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Community
              </CardTitle>
              <CardDescription>Join our community forum</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Visit Forum
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredFAQs.length > 0 ? (
              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No FAQs match your search. Try different keywords or contact support.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Can't find what you're looking for? Send us a message</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitSupport} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="support-email">Your Email</Label>
                <Input id="support-email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-subject">Subject</Label>
                <Input id="support-subject" placeholder="How can we help?" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="support-message">Message</Label>
                <Textarea
                  id="support-message"
                  placeholder="Describe your issue or question..."
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  rows={6}
                  required
                />
              </div>

              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
