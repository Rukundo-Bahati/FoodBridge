
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UtensilsCrossed, Upload, Calendar, Info } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

const LogFood = () => {
  const { toast } = useToast();
  const [foodData, setFoodData] = useState({
    foodType: "",
    quantity: "",
    unit: "",
    condition: "",
    expiryDate: "",
    pickupWindow: "",
    location: "",
    description: "",
    image: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Food Logged Successfully!",
      description: "Your donation has been added to the system and potential matches are being found.",
    });
    
    // Reset form
    setFoodData({
      foodType: "",
      quantity: "",
      unit: "",
      condition: "",
      expiryDate: "",
      pickupWindow: "",
      location: "",
      description: "",
      image: null
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoodData({ ...foodData, image: file });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Log Surplus Food</h1>
            <p className="text-muted-foreground">
              Add details about your available food to connect with those in need
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UtensilsCrossed className="h-5 w-5" />
                <span>Food Details</span>
              </CardTitle>
              <CardDescription>
                Please provide accurate information to ensure food safety and proper matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="foodType">Food Type</Label>
                    <Select value={foodData.foodType} onValueChange={(value) => setFoodData({ ...foodData, foodType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select food category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fruits">Fresh Fruits</SelectItem>
                        <SelectItem value="vegetables">Fresh Vegetables</SelectItem>
                        <SelectItem value="baked">Baked Goods</SelectItem>
                        <SelectItem value="prepared">Prepared Meals</SelectItem>
                        <SelectItem value="dairy">Dairy Products</SelectItem>
                        <SelectItem value="meat">Meat & Protein</SelectItem>
                        <SelectItem value="grains">Grains & Cereals</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={foodData.condition} onValueChange={(value) => setFoodData({ ...foodData, condition: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Food condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair (use soon)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Amount available"
                      value={foodData.quantity}
                      onChange={(e) => setFoodData({ ...foodData, quantity: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Select value={foodData.unit} onValueChange={(value) => setFoodData({ ...foodData, unit: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Unit of measure" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">Kilograms (kg)</SelectItem>
                        <SelectItem value="lbs">Pounds (lbs)</SelectItem>
                        <SelectItem value="pieces">Pieces/Items</SelectItem>
                        <SelectItem value="servings">Servings</SelectItem>
                        <SelectItem value="boxes">Boxes</SelectItem>
                        <SelectItem value="bags">Bags</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Safe Use-By Date</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={foodData.expiryDate}
                      onChange={(e) => setFoodData({ ...foodData, expiryDate: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="pickupWindow">Preferred Pickup Time</Label>
                    <Select value={foodData.pickupWindow} onValueChange={(value) => setFoodData({ ...foodData, pickupWindow: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="When can it be picked up?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Pickup Location</Label>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Address or GPS coordinates"
                    value={foodData.location}
                    onChange={(e) => setFoodData({ ...foodData, location: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Additional Notes</Label>
                  <Textarea
                    id="description"
                    placeholder="Any special handling instructions or additional details..."
                    value={foodData.description}
                    onChange={(e) => setFoodData({ ...foodData, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Food Photo (Optional)</Label>
                  <div className="mt-2">
                    <label htmlFor="image" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:border-muted-foreground/50 transition-colors">
                      <div className="text-center">
                        <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          {foodData.image ? foodData.image.name : "Click to upload photo"}
                        </p>
                      </div>
                      <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Food Safety Tips</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Keep food at proper temperature until pickup</li>
                          <li>• Ensure containers are clean and sealed</li>
                          <li>• Provide accurate expiry information</li>
                          <li>• Include any allergen information in notes</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button type="submit" className="w-full" size="lg">
                  <UtensilsCrossed className="mr-2 h-5 w-5" />
                  Log Food Donation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogFood;
