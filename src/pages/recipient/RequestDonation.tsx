import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Calendar, Clock, MapPin, Phone, Info, Utensils, Scale, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

export default function RequestDonation() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pickupDate, setPickupDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");

  // In a real application, this would be fetched from an API
  const donation = {
    id: "1",
    title: "Fresh Produce Donation",
    donor: "Green Grocers Market",
    foodType: "Fresh Produce",
    quantity: "25 kg",
    distance: "2.5 km",
    expiryDate: "2024-02-25",
    description: "Assorted fresh vegetables and fruits",
    address: "123 Market St, Downtown",
    contact: "+1 (555) 123-4567",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the request to your backend
    console.log({
      donationId: id,
      pickupDate,
      pickupTime,
      notes,
    });
    navigate("/recipient/schedule");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Request Donation</h1>
        <Button variant="outline" onClick={() => navigate("/recipient/search")}>
          Back to Search
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Donation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{donation.title}</h3>
                <Badge className="mt-2">{donation.foodType}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {donation.donor} • {donation.distance}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="mr-2 h-4 w-4" />
                    {donation.contact}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Scale className="mr-2 h-4 w-4" />
                    {donation.quantity}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Expires: {new Date(donation.expiryDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {donation.description}
              </p>

              <div className="flex items-start text-sm text-muted-foreground">
                <Info className="mr-2 h-4 w-4 mt-0.5" />
                <p>
                  Pickup address: {donation.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Pickup</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Pickup Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {pickupDate ? format(pickupDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pickup Time</label>
                <Select value={pickupTime} onValueChange={setPickupTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="13:00">1:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                    <SelectItem value="17:00">5:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  placeholder="Add any special instructions or requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/recipient/search")}
                >
                  Cancel
                </Button>
                <Button type="submit">Request Pickup</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 