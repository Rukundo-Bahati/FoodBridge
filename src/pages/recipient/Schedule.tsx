import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Clock, MapPin, Truck, Package, X, CheckCircle2 } from "lucide-react";

const RecipientSchedule = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [pickups, setPickups] = useState([
    {
      id: 1,
      date: "2024-03-20",
      time: "10:00 AM",
      location: "123 Main St, City",
      donor: "Green Valley Market",
      status: "scheduled",
      items: ["Fresh Produce", "Bakery Items"]
    },
    {
      id: 2,
      date: "2024-03-21",
      time: "2:30 PM",
      location: "456 Oak Ave, City",
      donor: "Local Bakery",
      status: "pending",
      items: ["Bread", "Pastries"]
    },
    {
      id: 3,
      date: "2024-03-19",
      time: "9:00 AM",
      location: "789 Pine Rd, City",
      donor: "Community Grocery",
      status: "completed",
      items: ["Canned Goods", "Dry Food"]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleReschedule = (pickupId: number) => {
    toast({
      title: "Reschedule Pickup",
      description: "Rescheduling feature coming soon!"
    });
  };

  const handleCancel = (pickupId: number) => {
    setPickups(pickups.filter(pickup => pickup.id !== pickupId));
    toast({
      title: "Pickup Cancelled",
      description: "The pickup has been cancelled successfully."
    });
  };

  const handleComplete = (pickupId: number) => {
    setPickups(pickups.map(pickup => 
      pickup.id === pickupId 
        ? { ...pickup, status: "completed" }
        : pickup
    ));
    toast({
      title: "Pickup Completed",
      description: "The pickup has been marked as completed."
    });
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
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Pickups</CardTitle>
            <CardDescription>Your scheduled pickups</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pickups.map((pickup) => (
              <div key={pickup.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{pickup.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{pickup.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{pickup.donor}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(pickup.status)}>
                    {pickup.status.charAt(0).toUpperCase() + pickup.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {pickup.items.map((item, index) => (
                    <Badge key={index} variant="secondary">
                      <Package className="mr-1 h-3 w-3" />
                      {item}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  {pickup.status === "scheduled" && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReschedule(pickup.id)}
                      >
                        Reschedule
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancel(pickup.id)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Cancel
                      </Button>
                    </>
                  )}
                  {pickup.status === "pending" && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleComplete(pickup.id)}
                    >
                      <CheckCircle2 className="mr-1 h-4 w-4" />
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecipientSchedule; 