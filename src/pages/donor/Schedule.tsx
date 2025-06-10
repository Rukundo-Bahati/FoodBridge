import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users } from "lucide-react";

export default function Schedule() {
  const upcomingPickups = [
    {
      id: 1,
      date: "2024-02-20",
      time: "10:00 AM",
      location: "Community Food Bank",
      recipient: "Food Bank",
      status: "scheduled",
      items: ["Fresh Produce", "Bakery Items"]
    },
    {
      id: 2,
      date: "2024-02-21",
      time: "2:30 PM",
      location: "Homeless Shelter",
      recipient: "Shelter",
      status: "pending",
      items: ["Canned Goods", "Dry Food"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-500";
      case "pending":
        return "bg-yellow-500";
      case "completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Schedule</h1>
        <p className="text-muted-foreground">
          Manage your donation pickups and deliveries
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Pickups</CardTitle>
              <CardDescription>Your scheduled pickups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPickups.map((pickup) => (
                  <div
                    key={pickup.id}
                    className="flex flex-col space-y-2 p-4 border rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{pickup.time}</span>
                      </div>
                      <Badge className={getStatusColor(pickup.status)}>
                        {pickup.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{pickup.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>{pickup.recipient}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pickup.items.map((item, index) => (
                        <Badge key={index} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel
                      </Button>
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