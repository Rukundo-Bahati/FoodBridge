
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, BellRing, Check, UtensilsCrossed, Users, Calendar, AlertTriangle, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import NotificationSettingsModal from "@/components/NotificationSettingsModal";
import { useToast } from "@/hooks/use-toast";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "match",
      title: "New Food Match Available",
      message: "Green Valley Market has fresh vegetables available for pickup today",
      time: "5 minutes ago",
      unread: true,
      urgent: false,
      icon: UtensilsCrossed
    },
    {
      id: 2,
      type: "pickup",
      title: "Pickup Reminder",
      message: "Don't forget your scheduled pickup at Sunset Bakery at 6:30 PM today",
      time: "1 hour ago",
      unread: true,
      urgent: true,
      icon: Calendar
    },
    {
      id: 3,
      type: "system",
      title: "Profile Update Required",
      message: "Please update your contact information to continue receiving notifications",
      time: "2 hours ago",
      unread: false,
      urgent: false,
      icon: Users
    },
    {
      id: 4,
      type: "donation",
      title: "Donation Confirmed",
      message: "Your food donation request has been confirmed by City Restaurant",
      time: "Yesterday",
      unread: false,
      urgent: false,
      icon: Check
    },
    {
      id: 5,
      type: "urgent",
      title: "Urgent: Food Expiring Soon",
      message: "Farm Fresh Co. has dairy products that need immediate pickup",
      time: "Yesterday",
      unread: false,
      urgent: true,
      icon: AlertTriangle
    }
  ]);

  const [showingOlder, setShowingOlder] = useState(false);
  const { toast } = useToast();

  const olderNotifications = [
    {
      id: 6,
      type: "match",
      title: "Weekly Impact Report",
      message: "You've helped distribute 45kg of food this week, preventing waste and feeding 150 people",
      time: "3 days ago",
      unread: false,
      urgent: false,
      icon: UtensilsCrossed
    },
    {
      id: 7,
      type: "system",
      title: "New Feature: Calendar Integration",
      message: "You can now sync your pickup schedule with your personal calendar",
      time: "1 week ago",
      unread: false,
      urgent: false,
      icon: Calendar
    }
  ];

  const markAsRead = (notificationId: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === notificationId ? { ...notif, unread: false } : notif
    ));
    toast({
      title: "Marked as Read",
      description: "Notification has been marked as read.",
    });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, unread: false })));
    toast({
      title: "All Notifications Read",
      description: "All notifications have been marked as read.",
    });
  };

  const loadOlderNotifications = () => {
    setShowingOlder(true);
    toast({
      title: "Older Notifications Loaded",
      description: "Showing additional notifications from the past week.",
    });
  };

  const getNotificationColor = (type: string, urgent: boolean) => {
    if (urgent) return "border-l-red-500";
    switch (type) {
      case "match":
        return "border-l-green-500";
      case "pickup":
        return "border-l-blue-500";
      case "donation":
        return "border-l-primary";
      case "system":
        return "border-l-yellow-500";
      default:
        return "border-l-gray-300";
    }
  };

  const allNotifications = showingOlder ? [...notifications, ...olderNotifications] : notifications;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Notifications
            </h1>
            <p className="text-muted-foreground text-lg">
              Stay updated with your food bridge activities
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
            <NotificationSettingsModal
              trigger={
                <Button variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              }
            />
          </div>
        </div>

        {/* Notification Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unread</CardTitle>
              <BellRing className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {notifications.filter(n => n.unread).length}
              </div>
              <p className="text-xs text-muted-foreground">
                New notifications
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {notifications.filter(n => n.time.includes("hour") || n.time.includes("minute")).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Notifications today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {notifications.filter(n => n.urgent).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Require attention
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {allNotifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <Card 
                key={notification.id} 
                className={`transition-all duration-200 hover:shadow-md border-l-4 ${getNotificationColor(notification.type, notification.urgent)} ${
                  notification.unread ? 'bg-muted/20' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-full ${notification.urgent ? 'bg-red-100' : 'bg-primary/10'}`}>
                      <IconComponent className={`h-5 w-5 ${notification.urgent ? 'text-red-600' : 'text-primary'}`} />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground flex items-center gap-2">
                            {notification.title}
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                            {notification.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                          </h3>
                          <p className="text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {notification.time}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {notification.unread && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          {!showingOlder ? (
            <Button variant="outline" onClick={loadOlderNotifications}>
              <ChevronDown className="mr-2 h-4 w-4" />
              Load Older Notifications
            </Button>
          ) : (
            <p className="text-muted-foreground text-sm">
              All notifications loaded
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
