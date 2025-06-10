import { useState } from "react";
import { BarChart, Users, Utensils, Calendar, Plus, TrendingUp, CheckCircle, MapPin, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function RecipientDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quickActionLoading, setQuickActionLoading] = useState<string | null>(null);

  const todaysStats = {
    pickups: 2,
    mealsReceived: 127,
    upcomingPickups: 3,
    weeklyGoal: 500,
    progressPercentage: 25.4
  };

  const recentRequests = [
    {
      id: "1",
      foodType: "Fresh Produce",
      quantity: "25 kg",
      status: "scheduled",
      donor: "Green Valley Market",
      pickupTime: "2024-02-20T10:00:00",
    },
    {
      id: "2",
      foodType: "Bakery Items",
      quantity: "15 kg",
      status: "completed",
      donor: "Local Bakery",
      pickupTime: "2024-02-19T14:30:00",
    },
    {
      id: "3",
      foodType: "Canned Goods",
      quantity: "50 units",
      status: "scheduled",
      donor: "City Grocers",
      pickupTime: "2024-02-21T09:00:00",
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Fresh Produce Pickup",
      time: "Today, 3:00 PM",
      location: "Green Valley Market",
      priority: "high"
    },
    {
      id: 2,
      title: "Bakery Items Collection",
      time: "Today, 5:30 PM",
      location: "Local Bakery",
      priority: "medium"
    }
  ];

  const handleQuickAction = async (action: string) => {
    setQuickActionLoading(action);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Action Completed",
        description: `${action} completed successfully!`,
      });
    } finally {
      setQuickActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">
            Find available food donations and manage your requests
          </p>
        </div>
        <Button onClick={() => navigate("/recipient/search")}>
          <Plus className="mr-2 h-4 w-4" />
          Find Donations
        </Button>
      </div>

      {/* Enhanced Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Pickups</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysStats.pickups}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +1 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meals Received</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysStats.mealsReceived}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Pickups</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysStats.upcomingPickups}</div>
            <p className="text-xs text-muted-foreground">Scheduled pickups</p>
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
              {todaysStats.mealsReceived} of {todaysStats.weeklyGoal} meals
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Requests</CardTitle>
            <CardDescription>Your latest food requests and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {request.foodType}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {request.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(request.status)}>
                      {request.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {new Date(request.pickupTime).toLocaleString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Find available food or manage pickups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/recipient/search")}
                disabled={quickActionLoading === "search"}
              >
                <Utensils className="mr-2 h-4 w-4" />
                {quickActionLoading === "search" ? "Searching..." : "Find Donations"}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/recipient/schedule")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/recipient/impact")}
              >
                <BarChart className="mr-2 h-4 w-4" />
                View Impact
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/community")}
              >
                <Users className="mr-2 h-4 w-4" />
                Community
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/recipient/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Pickups</CardTitle>
              <CardDescription>Your scheduled food pickups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className={`flex items-center justify-between p-4 border-l-4 ${getPriorityColor(event.priority)}`}
                  >
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                        <MapPin className="h-4 w-4 ml-2" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 