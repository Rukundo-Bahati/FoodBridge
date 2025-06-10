import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, MapPin, Clock, Scale, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export default function RecipientSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFoodType, setSelectedFoodType] = useState("");
  const [maxDistance, setMaxDistance] = useState([10]);

  const availableDonations = [
    {
      id: "1",
      title: "Fresh Produce Donation",
      donor: "Green Grocers Market",
      foodType: "Fresh Produce",
      quantity: "25 kg",
      distance: "2.5 km",
      expiryDate: "2024-02-25",
      pickupTime: "2024-02-20T10:00:00",
      description: "Assorted fresh vegetables and fruits",
    },
    {
      id: "2",
      title: "Bakery Items Collection",
      donor: "Sunrise Bakery",
      foodType: "Bakery Items",
      quantity: "15 kg",
      distance: "4.8 km",
      expiryDate: "2024-02-22",
      pickupTime: "2024-02-21T14:30:00",
      description: "Bread, pastries, and cakes",
    },
    {
      id: "3",
      title: "Canned Goods Donation",
      donor: "City Supermarket",
      foodType: "Canned Goods",
      quantity: "50 units",
      distance: "3.2 km",
      expiryDate: "2024-12-31",
      pickupTime: "2024-02-22T09:00:00",
      description: "Various canned vegetables and fruits",
    },
  ];

  const handleRequestPickup = (donationId: string) => {
    navigate(`/recipient/request/${donationId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Find Donations</h1>
        <Button variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search donations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div>
          <Select value={selectedFoodType} onValueChange={setSelectedFoodType}>
            <SelectTrigger>
              <SelectValue placeholder="Food Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="fresh-produce">Fresh Produce</SelectItem>
              <SelectItem value="canned-goods">Canned Goods</SelectItem>
              <SelectItem value="dry-goods">Dry Goods</SelectItem>
              <SelectItem value="bakery">Bakery Items</SelectItem>
              <SelectItem value="dairy">Dairy Products</SelectItem>
              <SelectItem value="frozen">Frozen Foods</SelectItem>
              <SelectItem value="prepared">Prepared Foods</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Max Distance: {maxDistance} km</label>
          <Slider
            value={maxDistance}
            onValueChange={setMaxDistance}
            max={50}
            step={1}
          />
        </div>
      </div>

      <div className="grid gap-4">
        {availableDonations.map((donation) => (
          <Card key={donation.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{donation.title}</CardTitle>
                <Badge>{donation.foodType}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {donation.donor} • {donation.distance}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      {new Date(donation.pickupTime).toLocaleString()}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Scale className="mr-2 h-4 w-4" />
                      {donation.quantity}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      Expires: {new Date(donation.expiryDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {donation.description}
                </p>

                <div className="flex justify-end">
                  <Button
                    onClick={() => handleRequestPickup(donation.id)}
                  >
                    Request Pickup
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