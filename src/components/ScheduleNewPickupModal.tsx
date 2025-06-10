
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, MapPin, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScheduleNewPickupModalProps {
  trigger: React.ReactNode;
}

const ScheduleNewPickupModal = ({ trigger }: ScheduleNewPickupModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [donor, setDonor] = useState("");
  const [foodType, setFoodType] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [address, setAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [urgentPickup, setUrgentPickup] = useState(false);
  const { toast } = useToast();

  const handleSchedule = () => {
    if (!donor || !foodType || !pickupDate || !pickupTime || !address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate scheduling
    setTimeout(() => {
      toast({
        title: "Pickup Scheduled Successfully",
        description: `New pickup scheduled with ${donor} for ${new Date(pickupDate).toLocaleDateString()} at ${pickupTime}`,
      });
      setIsOpen(false);
      // Reset form
      setDonor("");
      setFoodType("");
      setPickupDate("");
      setPickupTime("");
      setAddress("");
      setContactPhone("");
      setSpecialInstructions("");
      setRecurring(false);
      setUrgentPickup(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Plus className="h-5 w-5 text-primary" />
            <span>Schedule New Pickup</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="donor">Donor/Business Name *</Label>
              <Select value={donor} onValueChange={setDonor}>
                <SelectTrigger>
                  <SelectValue placeholder="Select or add new donor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="green-valley">Green Valley Market</SelectItem>
                  <SelectItem value="sunset-bakery">Sunset Bakery</SelectItem>
                  <SelectItem value="city-restaurant">City Restaurant</SelectItem>
                  <SelectItem value="farm-fresh">Farm Fresh Co.</SelectItem>
                  <SelectItem value="new-donor">+ Add New Donor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="foodType">Food Type *</Label>
              <Select value={foodType} onValueChange={setFoodType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select food type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
                  <SelectItem value="baked-goods">Baked Goods</SelectItem>
                  <SelectItem value="prepared-meals">Prepared Meals</SelectItem>
                  <SelectItem value="dairy-products">Dairy Products</SelectItem>
                  <SelectItem value="canned-goods">Canned Goods</SelectItem>
                  <SelectItem value="mixed">Mixed Items</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pickupDate">Pickup Date *</Label>
              <Input
                id="pickupDate"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pickupTime">Pickup Time *</Label>
              <Input
                id="pickupTime"
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Pickup Address *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="address"
                placeholder="Enter full pickup address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="contactPhone"
                placeholder="Contact phone number"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <Textarea
              id="specialInstructions"
              placeholder="Any special pickup instructions, access codes, or notes..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="recurring"
                checked={recurring}
                onCheckedChange={(checked) => setRecurring(checked as boolean)}
              />
              <Label htmlFor="recurring" className="text-sm cursor-pointer">
                Set up recurring pickup (weekly)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="urgentPickup"
                checked={urgentPickup}
                onCheckedChange={(checked) => setUrgentPickup(checked as boolean)}
              />
              <Label htmlFor="urgentPickup" className="text-sm cursor-pointer">
                Urgent pickup (expires within 24 hours)
              </Label>
              {urgentPickup && (
                <Badge variant="destructive" className="text-xs ml-2">
                  Priority
                </Badge>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSchedule} className="btn-primary">
              <Clock className="h-4 w-4 mr-2" />
              Schedule Pickup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleNewPickupModal;
