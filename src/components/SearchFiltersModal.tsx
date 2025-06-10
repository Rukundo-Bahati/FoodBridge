
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";

interface SearchFiltersModalProps {
  trigger: React.ReactNode;
}

const SearchFiltersModal = ({ trigger }: SearchFiltersModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchQuery: "",
    foodTypes: [] as string[],
    donorTypes: [] as string[],
    distance: [10],
    urgencyOnly: false,
    availableToday: false,
    sortBy: "distance",
  });

  const foodTypes = [
    "Fresh Produce", "Baked Goods", "Dairy", "Cooked Food", 
    "Canned Goods", "Frozen Items", "Beverages", "Pantry Items"
  ];

  const donorTypes = [
    "Restaurant", "Grocery Store", "Bakery", "Farm", 
    "Catering Company", "Food Bank", "Community Kitchen", "Market"
  ];

  const handleFoodTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFilters({...filters, foodTypes: [...filters.foodTypes, type]});
    } else {
      setFilters({...filters, foodTypes: filters.foodTypes.filter(t => t !== type)});
    }
  };

  const handleDonorTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFilters({...filters, donorTypes: [...filters.donorTypes, type]});
    } else {
      setFilters({...filters, donorTypes: filters.donorTypes.filter(t => t !== type)});
    }
  };

  const clearAllFilters = () => {
    setFilters({
      searchQuery: "",
      foodTypes: [],
      donorTypes: [],
      distance: [10],
      urgencyOnly: false,
      availableToday: false,
      sortBy: "distance",
    });
  };

  const applyFilters = () => {
    // Apply filters logic here
    console.log("Applying filters:", filters);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-primary" />
              <span>Search & Filter Options</span>
            </div>
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Search Query */}
          <div className="space-y-2">
            <Label htmlFor="searchQuery">Search Keywords</Label>
            <Input
              id="searchQuery"
              value={filters.searchQuery}
              onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
              placeholder="Search by food type, donor name, location..."
            />
          </div>

          {/* Distance Filter */}
          <div className="space-y-3">
            <Label>Maximum Distance: {filters.distance[0]} km</Label>
            <Slider
              value={filters.distance}
              onValueChange={(value) => setFilters({...filters, distance: value})}
              max={50}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 km</span>
              <span>50 km</span>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="space-y-3">
            <Label>Quick Filters</Label>
            <div className="flex flex-wrap gap-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.urgencyOnly}
                  onCheckedChange={(checked) => 
                    setFilters({...filters, urgencyOnly: checked as boolean})
                  }
                />
                <span className="text-sm">Urgent only</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <Checkbox
                  checked={filters.availableToday}
                  onCheckedChange={(checked) => 
                    setFilters({...filters, availableToday: checked as boolean})
                  }
                />
                <span className="text-sm">Available today</span>
              </label>
            </div>
          </div>

          {/* Food Types */}
          <div className="space-y-3">
            <Label>Food Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {foodTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.foodTypes.includes(type)}
                    onCheckedChange={(checked) => handleFoodTypeChange(type, checked as boolean)}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
            {filters.foodTypes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.foodTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => handleFoodTypeChange(type, false)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Donor Types */}
          <div className="space-y-3">
            <Label>Donor Types</Label>
            <div className="grid grid-cols-2 gap-2">
              {donorTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <Checkbox
                    checked={filters.donorTypes.includes(type)}
                    onCheckedChange={(checked) => handleDonorTypeChange(type, checked as boolean)}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
            {filters.donorTypes.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {filters.donorTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => handleDonorTypeChange(type, false)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <Label>Sort Results By</Label>
            <Select value={filters.sortBy} onValueChange={(value) => setFilters({...filters, sortBy: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="distance">Distance (Nearest First)</SelectItem>
                <SelectItem value="time">Available Time (Soonest First)</SelectItem>
                <SelectItem value="quantity">Quantity (Most Food First)</SelectItem>
                <SelectItem value="urgent">Urgency Level</SelectItem>
                <SelectItem value="newest">Recently Posted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={applyFilters} className="btn-primary">
              Apply Filters ({filters.foodTypes.length + filters.donorTypes.length + (filters.urgencyOnly ? 1 : 0) + (filters.availableToday ? 1 : 0)})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchFiltersModal;
