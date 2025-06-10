import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, MessageCircle } from "lucide-react";

export default function Matches() {
  const matches = [
    {
      id: 1,
      recipient: "Community Food Bank",
      distance: "2.5 km",
      foodType: "Fresh Produce",
      quantity: "25 kg",
      urgency: "high",
      timeWindow: "Today, 2:00 PM - 4:00 PM",
      status: "pending"
    },
    {
      id: 2,
      recipient: "Homeless Shelter",
      distance: "4.1 km",
      foodType: "Bakery Items",
      quantity: "15 kg",
      urgency: "medium",
      timeWindow: "Tomorrow, 10:00 AM - 12:00 PM",
      status: "pending"
    },
    {
      id: 3,
      recipient: "Youth Center",
      distance: "3.2 km",
      foodType: "Canned Goods",
      quantity: "50 units",
      urgency: "low",
      timeWindow: "Tomorrow, 3:00 PM - 5:00 PM",
      status: "pending"
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Matches</h1>
        <p className="text-muted-foreground">
          Find recipients for your food donations
        </p>
      </div>

      <div className="grid gap-4">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{match.recipient}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-4 w-4" />
                      <span>{match.distance} away</span>
                    </div>
                  </CardDescription>
                </div>
                <Badge className={getUrgencyColor(match.urgency)}>
                  {match.urgency} urgency
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Food Type</p>
                    <p className="text-sm text-muted-foreground">{match.foodType}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Quantity</p>
                    <p className="text-sm text-muted-foreground">{match.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{match.timeWindow}</span>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                  <Button size="sm">
                    Accept Match
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 