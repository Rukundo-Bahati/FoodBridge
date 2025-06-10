
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, Clock, Users, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RequestFoodModalProps {
  trigger: React.ReactNode;
  foodItem: {
    id: number;
    donor: string;
    food: string;
    quantity: string;
    distance: string;
    available: string;
    type: string;
  };
}

const RequestFoodModal = ({ trigger, foodItem }: RequestFoodModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: "",
    contactPerson: "",
    phone: "",
    email: "",
    numberOfPeople: "",
    urgency: "",
    specialRequirements: "",
    pickupTime: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Request Submitted Successfully!",
        description: `Your request for ${foodItem.food} from ${foodItem.donor} has been sent. You'll receive a confirmation within 30 minutes.`,
      });
      setIsOpen(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <span>Request Food Donation</span>
          </DialogTitle>
        </DialogHeader>

        {/* Food Item Summary */}
        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <h3 className="font-semibold">{foodItem.food}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{foodItem.donor}</span>
            </div>
            <div className="flex items-center space-x-1">
              <UtensilsCrossed className="h-4 w-4" />
              <span>{foodItem.quantity}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{foodItem.distance} away</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{foodItem.available}</span>
            </div>
          </div>
          <Badge variant="secondary">{foodItem.type}</Badge>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization/Family Name *</Label>
              <Input
                id="organizationName"
                required
                value={formData.organizationName}
                onChange={(e) => setFormData({...formData, organizationName: e.target.value})}
                placeholder="Community Kitchen, Shelter Name, etc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person *</Label>
              <Input
                id="contactPerson"
                required
                value={formData.contactPerson}
                onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                placeholder="Your full name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="contact@organization.org"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="numberOfPeople">Number of People to Feed</Label>
              <Input
                id="numberOfPeople"
                type="number"
                value={formData.numberOfPeople}
                onChange={(e) => setFormData({...formData, numberOfPeople: e.target.value})}
                placeholder="25"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select value={formData.urgency} onValueChange={(value) => setFormData({...formData, urgency: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select urgency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Within 24 hours</SelectItem>
                  <SelectItem value="medium">Medium - Within 12 hours</SelectItem>
                  <SelectItem value="high">High - Within 6 hours</SelectItem>
                  <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickupTime">Preferred Pickup Time</Label>
            <Input
              id="pickupTime"
              type="datetime-local"
              value={formData.pickupTime}
              onChange={(e) => setFormData({...formData, pickupTime: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequirements">Special Requirements or Notes</Label>
            <Textarea
              id="specialRequirements"
              value={formData.specialRequirements}
              onChange={(e) => setFormData({...formData, specialRequirements: e.target.value})}
              placeholder="Any dietary restrictions, storage capabilities, transportation needs, etc."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="btn-primary">
              Submit Request
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestFoodModal;
