
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Phone, Mail, MessageSquare, Clock, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ContactDonorModalProps {
  trigger: React.ReactNode;
  donor: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

const ContactDonorModal = ({ trigger, donor }: ContactDonorModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contactMethod, setContactMethod] = useState("email");
  const [message, setMessage] = useState("");
  const [urgency, setUrgency] = useState("normal");
  const [subject, setSubject] = useState("");
  const { toast } = useToast();

  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending message
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: `Your ${contactMethod} has been sent to ${donor.name}. They typically respond within 2-4 hours.`,
      });
      setIsOpen(false);
      setMessage("");
      setSubject("");
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            <span>Contact Donor</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Donor Info */}
          <div className="bg-muted/50 p-4 rounded-lg space-y-3">
            <h3 className="font-semibold">{donor.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{donor.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{donor.email}</span>
              </div>
              <div className="flex items-center space-x-2 md:col-span-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{donor.address}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Method */}
          <div className="space-y-3">
            <Label>Contact Method</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={contactMethod === "email" ? "default" : "outline"}
                size="sm"
                onClick={() => setContactMethod("email")}
                className="flex items-center space-x-1"
              >
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </Button>
              <Button
                variant={contactMethod === "phone" ? "default" : "outline"}
                size="sm"
                onClick={() => setContactMethod("phone")}
                className="flex items-center space-x-1"
              >
                <Phone className="h-4 w-4" />
                <span>Phone</span>
              </Button>
              <Button
                variant={contactMethod === "message" ? "default" : "outline"}
                size="sm"
                onClick={() => setContactMethod("message")}
                className="flex items-center space-x-1"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Message</span>
              </Button>
            </div>
          </div>

          {/* Urgency Level */}
          <div className="space-y-2">
            <Label>Urgency Level</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General inquiry</SelectItem>
                <SelectItem value="normal">Normal - Standard request</SelectItem>
                <SelectItem value="high">High - Urgent need</SelectItem>
                <SelectItem value="emergency">Emergency - Immediate assistance needed</SelectItem>
              </SelectContent>
            </Select>
            {urgency === "emergency" && (
              <div className="flex items-center space-x-2 text-sm text-destructive">
                <Clock className="h-4 w-4" />
                <span>Emergency contacts receive immediate notification</span>
              </div>
            )}
          </div>

          {/* Subject (for email) */}
          {contactMethod === "email" && (
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Food donation inquiry - [Your Organization Name]"
              />
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">
              {contactMethod === "phone" ? "Call Notes/Agenda" : "Message"}
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                contactMethod === "phone" 
                  ? "Notes about what you'd like to discuss during the call..."
                  : "Hello, I'm reaching out regarding your food donation listing. We're interested in..."
              }
              rows={6}
            />
            <div className="text-xs text-muted-foreground">
              {contactMethod === "phone" 
                ? "These notes will be sent to the donor before your call is scheduled."
                : "Be clear about your organization, needs, and pickup capabilities."
              }
            </div>
          </div>

          {/* Quick Message Templates */}
          <div className="space-y-2">
            <Label>Quick Templates</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("Hello, I'm interested in your food donation. Could we arrange a pickup time?")}
              >
                Basic Inquiry
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("Hi, we're a local shelter and would like to arrange pickup of your food donation. We can pick up today if convenient.")}
              >
                Shelter Request
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setMessage("Hello, our community kitchen serves 50+ people daily. We're very interested in your donation and can provide pickup within 2 hours.")}
              >
                Community Kitchen
              </Button>
            </div>
          </div>

          {/* Contact Info Display */}
          {contactMethod === "phone" && (
            <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
              <div className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Call: {donor.phone}
              </div>
              <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                Best calling hours: 9 AM - 6 PM weekdays
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendMessage} className="btn-primary">
              {contactMethod === "phone" ? "Schedule Call" : "Send Message"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDonorModal;
