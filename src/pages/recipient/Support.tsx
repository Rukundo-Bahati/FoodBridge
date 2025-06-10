import { Phone, Mail, MessageSquare, HelpCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RecipientSupport() {
  const faqs = [
    {
      question: "How do I schedule a pickup?",
      answer:
        "You can schedule a pickup by going to the Search page, finding available donations, and clicking the 'Request Pickup' button. Follow the prompts to select a convenient time.",
    },
    {
      question: "What happens if I need to cancel a pickup?",
      answer:
        "You can cancel a pickup up to 2 hours before the scheduled time. Go to the Schedule page, find the pickup, and click the 'Cancel' button. Please provide a reason for cancellation.",
    },
    {
      question: "How do I report an issue with a donation?",
      answer:
        "If you encounter any issues with a donation, please contact our support team immediately. You can use the contact form on this page or call our support line.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Support</h1>
        <Button>
          <Phone className="mr-2 h-4 w-4" />
          Emergency Contact
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Issue Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup Issue</SelectItem>
                    <SelectItem value="donation">Donation Quality</SelectItem>
                    <SelectItem value="account">Account Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="Brief description of your issue" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="Please provide details about your issue..."
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">
                    support@foodbridge.org
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">
                    Available 24/7
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question} className="space-y-2">
                <div className="flex items-start space-x-2">
                  <HelpCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">{faq.question}</p>
                    <p className="text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Support</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <div>
              <p className="font-medium">Need Immediate Assistance?</p>
              <p className="text-sm text-muted-foreground">
                For urgent matters that require immediate attention, please call
                our emergency support line at +1 (555) 999-8888. Our team is
                available 24/7 to assist you.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 