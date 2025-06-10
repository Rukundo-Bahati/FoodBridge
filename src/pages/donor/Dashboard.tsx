import { useState } from "react";
import { BarChart, Users, Utensils, Calendar, Plus, TrendingUp, CheckCircle, MapPin, Clock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function DonorDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quickActionLoading, setQuickActionLoading] = useState<string | null>(null);

  const todaysStats = {
    donations: 3,
    peopleFed: 85,
    upcomingPickups: 3,
    weeklyGoal: 200,
    progressPercentage: 42.5
  };

  const recentDonations = [
    {
      id: "1",
      foodType: "Fresh Produce",
      quantity: "25 kg",
      status: "scheduled",
      recipient: "Community Food Bank",
      pickupTime: "2024-02-20T10:00:00",
    },
    {
      id: "2",
      foodType: "Bakery Items",
      quantity: "15 kg",
      status: "completed",
      recipient: "Homeless Shelter",
      pickupTime: "2024-02-19T14:30:00",
    },
    {
      id: "3",
      foodType: "Canned Goods",
      quantity: "50 units",
      status: "scheduled",
      recipient: "Youth Center",
      pickupTime: "2024-02-21T09:00:00",
    },
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
            Track your food donations and impact on the community
          </p>
        </div>
        <Button onClick={() => navigate("/donor/log-food")}>
          <Plus className="mr-2 h-4 w-4" />
          Log New Donation
        </Button>
      </div>

      {/* Enhanced Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Donations</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysStats.donations}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People Fed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysStats.peopleFed}</div>
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
              {todaysStats.peopleFed} of {todaysStats.weeklyGoal} meals
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Donations</CardTitle>
            <CardDescription>Your latest food donations and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDonations.map((donation) => (
                <div
                  key={donation.id}
                  className="flex items-center justify-between space-x-4"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {donation.foodType}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {donation.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(donation.status)}>
                      {donation.status}
                    </Badge>
                    <div className="text-sm text-muted-foreground">
                      {new Date(donation.pickupTime).toLocaleString()}
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
              <CardDescription>Log new food donations or view matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/donor/log-food")}
                disabled={quickActionLoading === "log-food"}
              >
                <Plus className="mr-2 h-4 w-4" />
                {quickActionLoading === "log-food" ? "Logging..." : "Log New Donation"}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/donor/matches")}
              >
                <Users className="mr-2 h-4 w-4" />
                View Matches
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/donor/schedule")}
              >
                <Calendar className="mr-2 h-4 w-4" />
                View Schedule
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => navigate("/donor/impact")}
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
                onClick={() => navigate("/donor/settings")}
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