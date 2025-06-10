
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  UtensilsCrossed, 
  Users, 
  MapPin, 
  Clock, 
  Phone, 
  Mail,
  Calendar,
  Truck,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface FoodDetailsModalProps {
  trigger: React.ReactNode;
  foodItem: {
    id: number;
    donor: string;
    food: string;
    quantity: string;
    distance: string;
    available: string;
    type: string;
    urgent?: boolean;
  };
}

const FoodDetailsModal = ({ trigger, foodItem }: FoodDetailsModalProps) => {
  const mockDetails = {
    description: "Fresh organic vegetables including carrots, lettuce, tomatoes, and seasonal produce. All items are within 1-2 days of best-by date but perfectly safe for consumption.",
    donorType: "Grocery Store",
    contactPhone: "+1 (555) 123-4567",
    contactEmail: "donations@greenvalley.com",
    address: "123 Green Valley Market St, Downtown",
    storageRequirements: "Refrigerated storage recommended",
    pickupInstructions: "Please use the rear entrance near the loading dock. Ask for Manager Sarah.",
    expiryDate: "December 12, 2024",
    estimatedValue: "$85",
    allergens: ["None"],
    dietaryInfo: ["Vegetarian", "Vegan", "Gluten-Free Options"],
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-xl">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <span>Food Donation Details</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Info */}
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-2xl font-semibold">{foodItem.food}</h3>
              {foodItem.urgent && (
                <Badge variant="destructive" className="flex items-center space-x-1">
                  <AlertTriangle className="h-3 w-3" />
                  <span>Urgent</span>
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{mockDetails.description}</p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <UtensilsCrossed className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{foodItem.quantity}</div>
              <div className="text-xs text-muted-foreground">Quantity</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <MapPin className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{foodItem.distance}</div>
              <div className="text-xs text-muted-foreground">Distance</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{foodItem.available}</div>
              <div className="text-xs text-muted-foreground">Available</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <CheckCircle className="h-5 w-5 mx-auto mb-1 text-primary" />
              <div className="text-sm font-medium">{mockDetails.estimatedValue}</div>
              <div className="text-xs text-muted-foreground">Est. Value</div>
            </div>
          </div>

          <Separator />

          {/* Donor Information */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <span>Donor Information</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Organization</div>
                <div className="text-muted-foreground">{foodItem.donor}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Type</div>
                <div className="text-muted-foreground">{mockDetails.donorType}</div>
              </div>
              <div>
                <div className="text-sm font-medium flex items-center space-x-1">
                  <Phone className="h-4 w-4" />
                  <span>Phone</span>
                </div>
                <div className="text-muted-foreground">{mockDetails.contactPhone}</div>
              </div>
              <div>
                <div className="text-sm font-medium flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </div>
                <div className="text-muted-foreground">{mockDetails.contactEmail}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pickup Information */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Pickup Information</span>
            </h4>
            <div className="space-y-2">
              <div>
                <div className="text-sm font-medium">Address</div>
                <div className="text-muted-foreground">{mockDetails.address}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Instructions</div>
                <div className="text-muted-foreground">{mockDetails.pickupInstructions}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Storage Requirements</div>
                <div className="text-muted-foreground">{mockDetails.storageRequirements}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Food Details */}
          <div className="space-y-3">
            <h4 className="text-lg font-semibold flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Food Details</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Best By Date</div>
                <div className="text-muted-foreground">{mockDetails.expiryDate}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Food Type</div>
                <Badge variant="secondary">{foodItem.type}</Badge>
              </div>
              <div>
                <div className="text-sm font-medium">Dietary Information</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {mockDetails.dietaryInfo.map((diet) => (
                    <Badge key={diet} variant="outline" className="text-xs">
                      {diet}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Allergens</div>
                <div className="text-muted-foreground">
                  {mockDetails.allergens.join(", ")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FoodDetailsModal;
