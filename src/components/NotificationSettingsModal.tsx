
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Bell, Mail, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NotificationSettingsModalProps {
  trigger: React.ReactNode;
}

const NotificationSettingsModal = ({ trigger }: NotificationSettingsModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [matchNotifications, setMatchNotifications] = useState(true);
  const [pickupReminders, setPickupReminders] = useState(true);
  const [systemUpdates, setSystemUpdates] = useState(true);
  const [urgentAlerts, setUrgentAlerts] = useState(true);
  const [reminderTiming, setReminderTiming] = useState("1hour");
  const [dailyDigest, setDailyDigest] = useState(true);
  const [quietHours, setQuietHours] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Settings Saved",
        description: "Your notification preferences have been updated successfully.",
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
            <Settings className="h-5 w-5 text-primary" />
            <span>Notification Settings</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Notification Channels */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Channels</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <Label>Email Notifications</Label>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4 text-primary" />
                  <Label>Push Notifications</Label>
                </div>
                <Switch
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <Label>SMS Notifications</Label>
                </div>
                <Switch
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Food Match Notifications</Label>
                  <p className="text-xs text-muted-foreground">When new food matches are found</p>
                </div>
                <Switch
                  checked={matchNotifications}
                  onCheckedChange={setMatchNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Pickup Reminders</Label>
                  <p className="text-xs text-muted-foreground">Reminders before scheduled pickups</p>
                </div>
                <Switch
                  checked={pickupReminders}
                  onCheckedChange={setPickupReminders}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>System Updates</Label>
                  <p className="text-xs text-muted-foreground">Platform updates and announcements</p>
                </div>
                <Switch
                  checked={systemUpdates}
                  onCheckedChange={setSystemUpdates}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Urgent Alerts</Label>
                  <p className="text-xs text-muted-foreground">Time-sensitive food expiring soon</p>
                </div>
                <Switch
                  checked={urgentAlerts}
                  onCheckedChange={setUrgentAlerts}
                />
              </div>
            </CardContent>
          </Card>

          {/* Timing Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timing Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Pickup Reminder Timing</Label>
                <Select value={reminderTiming} onValueChange={setReminderTiming}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15min">15 minutes before</SelectItem>
                    <SelectItem value="30min">30 minutes before</SelectItem>
                    <SelectItem value="1hour">1 hour before</SelectItem>
                    <SelectItem value="2hours">2 hours before</SelectItem>
                    <SelectItem value="1day">1 day before</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Daily Digest</Label>
                  <p className="text-xs text-muted-foreground">Summary email at end of day</p>
                </div>
                <Switch
                  checked={dailyDigest}
                  onCheckedChange={setDailyDigest}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Quiet Hours (10 PM - 8 AM)</Label>
                  <p className="text-xs text-muted-foreground">Reduce notifications during these hours</p>
                </div>
                <Switch
                  checked={quietHours}
                  onCheckedChange={setQuietHours}
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="btn-primary">
              <Settings className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationSettingsModal;
