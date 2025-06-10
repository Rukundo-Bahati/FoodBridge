
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, MapPin, Users } from "lucide-react";

interface CalendarModalProps {
  trigger: React.ReactNode;
}

const CalendarModal = ({ trigger }: CalendarModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const mockEvents = [
    {
      id: 1,
      title: "Pickup: Fresh Vegetables",
      time: "2:00 PM",
      location: "Green Valley Market",
      type: "pickup",
      status: "confirmed"
    },
    {
      id: 2,
      title: "Delivery: Baked Goods",
      time: "6:00 PM",
      location: "Community Center",
      type: "delivery",
      status: "pending"
    }
  ];

  const getEventsForDate = (date: Date) => {
    // Mock logic - in real app, filter by actual date
    return mockEvents;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <span>Food Bridge Calendar</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Calendar */}
          <div className="space-y-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            
            <div className="space-y-2">
              <h4 className="font-medium">Legend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Pickup</Badge>
                <Badge variant="secondary">Delivery</Badge>
                <Badge variant="outline">Available</Badge>
              </div>
            </div>
          </div>

          {/* Events for Selected Date */}
          <div className="space-y-4">
            <h3 className="font-semibold">
              Events for {selectedDate?.toLocaleDateString() || "Today"}
            </h3>
            
            <div className="space-y-3">
              {getEventsForDate(selectedDate || new Date()).map((event) => (
                <Card key={event.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant={event.type === "pickup" ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {event.type}
                      </Badge>
                      <Badge 
                        variant={event.status === "confirmed" ? "default" : "outline"}
                        className="text-xs"
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {getEventsForDate(selectedDate || new Date()).length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No events scheduled for this date</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalendarModal;
