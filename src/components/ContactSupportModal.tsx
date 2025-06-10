
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactSupportModalProps {
  trigger: React.ReactNode;
}

const ContactSupportModal = ({ trigger }: ContactSupportModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [supportType, setSupportType] = useState("");
  const [priority, setPriority] = useState("normal");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const supportOptions = [
    { value: "technical", label: "Technical Issue", icon: AlertCircle },
    { value: "account", label: "Account Help", icon: HelpCircle },
    { value: "donation", label: "Donation Support", icon: MessageSquare },
    { value: "pickup", label: "Pickup/Delivery Issue", icon: Clock },
    { value: "other", label: "Other", icon: Mail }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate support ticket submission
    setTimeout(() => {
      toast({
        title: "Support Request Submitted",
        description: `Your ${supportType} request has been received. Ticket #FB${Date.now().toString().slice(-6)} created. We'll respond within 2-4 hours.`,
      });
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span>Contact Support</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Help Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="hover:shadow-md transition-all cursor-pointer border-primary/20 hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Emergency Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  Call: +1 (555) 123-HELP
                  <br />Available 24/7
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all cursor-pointer border-primary/20 hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Live Chat</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  Chat with our team
                  <br />Mon-Fri 9AM-6PM
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all cursor-pointer border-primary/20 hover:border-primary/40">
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <CardTitle className="text-sm">Help Center</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs">
                  Browse FAQs & guides
                  <br />Self-service options
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Support Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Support Category</Label>
                <Select value={supportType} onValueChange={setSupportType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Priority Level</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - General question</SelectItem>
                    <SelectItem value="normal">Normal - Standard issue</SelectItem>
                    <SelectItem value="high">High - Urgent problem</SelectItem>
                    <SelectItem value="critical">Critical - Service down</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief description of your issue"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Detailed Description</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please provide as much detail as possible about your issue, including any error messages, steps to reproduce, etc."
                rows={5}
                required
              />
            </div>

            {/* Response Time Info */}
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <div className="flex items-center space-x-2 text-blue-900 dark:text-blue-100 text-sm">
                <Clock className="h-4 w-4" />
                <span className="font-medium">Expected Response Time:</span>
              </div>
              <div className="text-blue-700 dark:text-blue-300 text-sm mt-1">
                {priority === "critical" && "Within 1 hour"}
                {priority === "high" && "Within 2-4 hours"}
                {priority === "normal" && "Within 4-8 hours"}
                {priority === "low" && "Within 24 hours"}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-primary">
                <Mail className="h-4 w-4 mr-2" />
                Submit Support Request
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactSupportModal;
