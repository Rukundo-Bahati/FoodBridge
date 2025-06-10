import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Package, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export default function LogFood() {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>();
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [storageInstructions, setStorageInstructions] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the donation details to your backend
    console.log({
      date,
      foodType,
      quantity,
      description,
      storageInstructions,
    });
    navigate("/donor/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Log New Donation</h1>
        <Button variant="outline" onClick={() => navigate("/donor/dashboard")}>
          Back to Dashboard
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Donation Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Food Type</label>
                <Select value={foodType} onValueChange={setFoodType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select food type" />
                  </SelectTrigger>
                  <SelectContent>
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
                <label className="text-sm font-medium">Quantity</label>
                <Input
                  placeholder="Enter quantity (e.g., 25 kg, 50 units)"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Describe the food items..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expiry Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Storage Instructions</label>
                <Textarea
                  placeholder="Add any special storage requirements..."
                  value={storageInstructions}
                  onChange={(e) => setStorageInstructions(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/donor/dashboard")}
                >
                  Cancel
                </Button>
                <Button type="submit">Log Donation</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tips for Donating</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-4">
              <Package className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Food Safety</p>
                <p className="text-sm text-muted-foreground">
                  Ensure all food items are safe for consumption and properly
                  stored. Check expiry dates and food quality before donating.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Accurate Measurements</p>
                <p className="text-sm text-muted-foreground">
                  Provide accurate quantities and measurements to help recipients
                  plan their food distribution effectively.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Calendar className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Storage Requirements</p>
                <p className="text-sm text-muted-foreground">
                  Include any specific storage instructions or temperature
                  requirements to ensure food safety during pickup and transport.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 