import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Users, Plus, Phone } from "lucide-react";
import Navigation from "@/components/Navigation";
import CalendarModal from "@/components/CalendarModal";
import SetAvailabilityModal from "@/components/SetAvailabilityModal";
import ContactSupportModal from "@/components/ContactSupportModal";
import MarkCompletedModal from "@/components/MarkCompletedModal";
import RescheduleModal from "@/components/RescheduleModal";
import ContactDonorModal from "@/components/ContactDonorModal";
import FoodDetailsModal from "@/components/FoodDetailsModal";
import ScheduleNewPickupModal from "@/components/ScheduleNewPickupModal";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";

interface Pickup {
  id: number;
  title: string;
  donor: string;
  time: string;
  address: string;
  status: "confirmed" | "pending" | "cancelled";
  contact: string;
  notes: string;
  foodType: string;
  quantity: string;
  expiryDate: string;
}

const STATUS_COLORS = {
  confirmed: "bg-green-100 text-green-800 border-green-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  default: "bg-gray-100 text-gray-800 border-gray-200"
} as const;

const fetchPickups = async (): Promise<Pickup[]> => {
  // TODO: Replace with actual API call
  // For now, return mock data
  return [
    {
      id: 1,
      title: "Fresh Vegetables Pickup",
      donor: "Green Valley Market",
      time: "Today, 3:00 PM",
      address: "123 Main St, Downtown",
      status: "confirmed",
      contact: "+1 234-567-8900",
      notes: "Use back entrance, ask for Sarah",
      foodType: "Fresh Produce",
      quantity: "15kg mixed vegetables",
      expiryDate: "Tomorrow"
    },
    {
      id: 2,
      title: "Bread & Pastries",
      donor: "Sunset Bakery",
      time: "Today, 6:30 PM",
      address: "456 Oak Ave, Riverside",
      status: "pending",
      contact: "+1 234-567-8901",
      notes: "Call 30 minutes before arrival",
      foodType: "Baked Goods",
      quantity: "50+ assorted items",
      expiryDate: "End of day"
    },
    {
      id: 3,
      title: "Prepared Meals",
      donor: "City Restaurant",
      time: "Tomorrow, 12:00 PM",
      address: "789 Pine St, Uptown",
      status: "confirmed",
      contact: "+1 234-567-8902",
      notes: "Meals will be packed and ready",
      foodType: "Prepared Meals",
      quantity: "25 meals",
      expiryDate: "Same day"
    }
  ];
};

const Schedule = () => {
  const { data: upcomingPickups, isLoading, error } = useQuery({
    queryKey: ["pickups"],
    queryFn: fetchPickups
  });

  const getStatusColor = (status: Pickup["status"]) => {
    return STATUS_COLORS[status] || STATUS_COLORS.default;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load pickup schedule. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Pickup Schedule
            </h1>
            <p className="text-muted-foreground text-lg">
              Manage your food pickup appointments
            </p>
          </div>
          <ScheduleNewPickupModal
            trigger={
              <Button size="lg" className="shadow-lg">
                <Plus className="mr-2 h-5 w-5" />
                Schedule New Pickup
              </Button>
            }
          />
        </div>

        {/* Today's Pickups */}
        <Card className="mb-8 border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Calendar className="mr-2 h-5 w-5 text-primary" />
              Today's Pickups
            </CardTitle>
            <CardDescription>
              {upcomingPickups?.filter(p => p.time.includes("Today")).length} scheduled for today
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Pickup List */}
        <div className="space-y-6">
          {upcomingPickups?.map((pickup) => (
            <Card key={pickup.id} className="hover:shadow-lg transition-all duration-200">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">{pickup.title}</CardTitle>
                    <CardDescription className="flex items-center mt-1 text-base">
                      <Users className="h-4 w-4 mr-2" />
                      {pickup.donor}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`capitalize ${getStatusColor(pickup.status)}`}
                  >
                    {pickup.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-3 text-primary" />
                      <span className="font-medium">{pickup.time}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-3 text-primary" />
                      <span>{pickup.address}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Phone className="h-4 w-4 mr-3 text-primary" />
                      <span>{pickup.contact}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Notes:</p>
                      <p className="text-sm bg-muted p-3 rounded-md">{pickup.notes}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t flex-wrap">
                  <FoodDetailsModal
                    foodItem={pickup}
                    trigger={
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    }
                  />
                  <ContactDonorModal
                    donor={{ name: pickup.donor, phone: pickup.contact }}
                    trigger={
                      <Button variant="outline" size="sm">
                        Contact Donor
                      </Button>
                    }
                  />
                  <RescheduleModal
                    trigger={
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    }
                  />
                  {pickup.status === "confirmed" && (
                    <MarkCompletedModal
                      foodItem={pickup}
                      trigger={
                        <Button size="sm" className="ml-auto">
                          Mark as Completed
                        </Button>
                      }
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common scheduling tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CalendarModal
              trigger={
                <Button variant="outline" className="h-12">
                  <Calendar className="mr-2 h-4 w-4" />
                  View Calendar
                </Button>
              }
            />
            <SetAvailabilityModal
              trigger={
                <Button variant="outline" className="h-12">
                  <Clock className="mr-2 h-4 w-4" />
                  Set Availability
                </Button>
              }
            />
            <ContactSupportModal
              trigger={
                <Button variant="outline" className="h-12">
                  <Users className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              }
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Schedule;
