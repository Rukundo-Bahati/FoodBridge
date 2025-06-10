
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { UtensilsCrossed, Users, Calendar, Bell, Plus, MapPin, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import CalendarModal from "@/components/CalendarModal";
import ScheduleNewPickupModal from "@/components/ScheduleNewPickupModal";
import { useToast } from "@/hooks/use-toast";

type UserType = "donor" | "recipient" | "volunteer";

const Dashboard = () => {
  // Mock user data - in real app this would come from context/API
  let userType: UserType = "donor" as UserType;
  const userName = "Green Valley Market";
  const [quickActionLoading, setQuickActionLoading] = useState<string | null>(null);
  const { toast } = useToast();

  const todaysStats = {
    donations: userType === "donor" ? 3 : 0,
    pickups: userType === "recipient" ? 2 : 0,
    mealsProvided: userType === "donor" ? 85 : 127,
    weeklyGoal: 200,
    progressPercentage: 42.5
  };

  const recentActivity = [
    { 
      id: 1, 
      type: "donation", 
      description: "15kg vegetables donated to Community Shelter", 
      time: "2 hours ago",
      status: "completed"
    },
    { 
      id: 2, 
      type: "pickup", 
      description: "Bread pickup scheduled for 3:00 PM", 
      time: "4 hours ago",
      status: "pending"
    },
    { 
      id: 3, 
      type: "match", 
      description: "New match found: Riverside Food Bank", 
      time: "6 hours ago",
      status: "new"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Bread & Pastries Pickup",
      time: "Today, 3:00 PM",
      location: "Community Center",
      priority: "high"
    },
    {
      id: 2,
      title: "Fresh Vegetables Delivery",
      time: "Today, 5:30 PM",
      location: "Riverside Shelter",
      priority: "medium"
    }
  ];

  const isDonor = userType === "donor";
  const isRecipient = userType === "recipient";

  const handleQuickAction = async (action: string) => {
    setQuickActionLoading(action);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Action Completed",
      description: `${action} completed successfully!`,
    });
    
    setQuickActionLoading(null);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "donation":
        return <UtensilsCrossed className="h-4 w-4 text-green-600" />;
      case "pickup":
        return <Calendar className="h-4 w-4 text-blue-600" />;
      case "match":
        return <Users className="h-4 w-4 text-purple-600" />;
      default:
        return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "new":
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h1>
          <p className="text-muted-foreground">
            {isDonor
              ? "Track your food donations and impact on the community"
              : "Find available food donations and manage your requests"
            }
          </p>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isDonor ? "Today's Donations" : "Today's Pickups"}
              </CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{isDonor ? todaysStats.donations : todaysStats.pickups}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                {isDonor ? "+2 from yesterday" : "+1 from yesterday"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isDonor ? "People Fed" : "Meals Received"}
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysStats.mealsProvided}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingEvents.length}</div>
              <p className="text-xs text-muted-foreground">
                {isDonor ? "Scheduled pickups" : "Planned visits"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todaysStats.progressPercentage}%</div>
              <Progress value={todaysStats.progressPercentage} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {todaysStats.mealsProvided} of {todaysStats.weeklyGoal} meals
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Enhanced Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                {isDonor
                  ? "Log new food donations or view matches"
                  : "Find available food or request pickup"
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isDonor ? (
                <>
                  <Link to="/log-food">
                    <Button 
                      className="w-full justify-start" 
                      disabled={quickActionLoading === "log-food"}
                      onClick={() => handleQuickAction("Log Surplus Food")}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      {quickActionLoading === "log-food" ? "Logging..." : "Log Surplus Food"}
                    </Button>
                  </Link>
                  <Link to="/matches">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      View Matches
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/matches">
                    <Button className="w-full justify-start">
                      <UtensilsCrossed className="mr-2 h-4 w-4" />
                      Find Available Food
                    </Button>
                  </Link>
                  <ScheduleNewPickupModal
                    trigger={
                      <Button variant="outline" className="w-full justify-start">
                        <Calendar className="mr-2 h-4 w-4" />
                        Schedule Pickup
                      </Button>
                    }
                  />
                </>
              )}
              <Link to="/notifications">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  View Notifications
                  {/* Show notification count if there are unread notifications */}
                  <Badge variant="destructive" className="ml-auto text-xs">
                    2
                  </Badge>
                </Button>
              </Link>
              <CalendarModal
                trigger={
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2 h-4 w-4" />
                    View Full Calendar
                  </Button>
                }
              />
            </CardContent>
          </Card>

          {/* Enhanced Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest donations and pickups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg border">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.description}</p>
                        {getStatusBadge(activity.status)}
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Upcoming pickups and deliveries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className={`flex items-center justify-between p-4 bg-muted/30 rounded-lg border-l-4 ${getPriorityColor(event.priority)}`}>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {event.location} • {event.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={event.priority === "high" ? "destructive" : "outline"}>
                      {event.priority} priority
                    </Badge>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
              
              {upcomingEvents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No events scheduled for today</p>
                  <ScheduleNewPickupModal
                    trigger={
                      <Button variant="outline" size="sm" className="mt-2">
                        Schedule Your First Pickup
                      </Button>
                    }
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Impact Summary Card */}
        <Card className="mt-8 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">Weekly Impact Summary</CardTitle>
            <CardDescription>Your contribution to reducing food waste</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">45kg</div>
                <p className="text-sm text-muted-foreground">Food Rescued</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">150</div>
                <p className="text-sm text-muted-foreground">People Fed</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">12</div>
                <p className="text-sm text-muted-foreground">Partners Helped</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
