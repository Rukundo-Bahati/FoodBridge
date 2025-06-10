import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Globe, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";

const RecipientSettings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || ""
  });
  const [notifications, setNotifications] = useState({
    email: true,
    pickup: true
  });
  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    locationSharing: true
  });

  const handleProfileUpdate = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      toast({
        title: "Notification Settings Updated",
        description: `${key === 'email' ? 'Email' : 'Pickup'} notifications have been ${newState[key] ? 'enabled' : 'disabled'}.`
      });
      return newState;
    });
  };

  const handlePrivacyChange = (key: keyof typeof privacy) => {
    setPrivacy(prev => {
      const newState = { ...prev, [key]: !prev[key] };
      toast({
        title: "Privacy Settings Updated",
        description: `${key === 'publicProfile' ? 'Public profile' : 'Location sharing'} has been ${newState[key] ? 'enabled' : 'disabled'}.`
      });
      return newState;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and notifications
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Update your organization information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input 
                id="name" 
                placeholder="Your organization name"
                value={profileData.name}
                onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="Your email"
                value={profileData.email}
                onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="Your phone number"
                value={profileData.phone}
                onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <Button onClick={handleProfileUpdate} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive updates about available donations
                </p>
              </div>
              <Switch 
                checked={notifications.email}
                onCheckedChange={() => handleNotificationChange('email')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Pickup Reminders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified about upcoming pickups
                </p>
              </div>
              <Switch 
                checked={notifications.pickup}
                onCheckedChange={() => handleNotificationChange('pickup')}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy</CardTitle>
            <CardDescription>Manage your privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Public Profile</Label>
                <p className="text-sm text-muted-foreground">
                  Show your organization profile to donors
                </p>
              </div>
              <Switch 
                checked={privacy.publicProfile}
                onCheckedChange={() => handlePrivacyChange('publicProfile')}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Location Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Share your location for better matches
                </p>
              </div>
              <Switch 
                checked={privacy.locationSharing}
                onCheckedChange={() => handlePrivacyChange('locationSharing')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipientSettings; 