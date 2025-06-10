import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UtensilsCrossed, Users, MapPin, Clock, Search, Filter, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import RequestFoodModal from "@/components/RequestFoodModal";
import FoodDetailsModal from "@/components/FoodDetailsModal";
import SearchFiltersModal from "@/components/SearchFiltersModal";
import ContactDonorModal from "@/components/ContactDonorModal";
import MarkCompletedModal from "@/components/MarkCompletedModal";
import { useQuery } from "@tanstack/react-query";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useDebounce } from "@/hooks/use-debounce";

interface FoodMatch {
  id: number;
  donor: string;
  food: string;
  quantity: string;
  distance: string;
  available: string;
  type: string;
  urgent: boolean;
  donorContact: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
}

const fetchMatches = async (searchQuery: string = ""): Promise<FoodMatch[]> => {
  // TODO: Replace with actual API call
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockMatches: FoodMatch[] = [
    {
      id: 1,
      donor: "Green Valley Market",
      food: "Fresh Vegetables & Fruits",
      quantity: "25kg",
      distance: "1.2 km",
      available: "Today, 2:00 PM",
      type: "Fresh Produce",
      urgent: true,
      donorContact: {
        name: "Green Valley Market",
        phone: "+1 (555) 123-4567",
        email: "donations@greenvalley.com",
        address: "123 Green Valley Market St, Downtown"
      }
    },
    {
      id: 2,
      donor: "Sunset Bakery",
      food: "Bread & Pastries",
      quantity: "15 loaves",
      distance: "0.8 km",
      available: "Today, 6:00 PM",
      type: "Baked Goods",
      urgent: false,
      donorContact: {
        name: "Sunset Bakery",
        phone: "+1 (555) 234-5678",
        email: "donations@sunsetbakery.com",
        address: "456 Sunset Ave, Riverside"
      }
    },
    {
      id: 3,
      donor: "City Restaurant",
      food: "Prepared Meals",
      quantity: "30 portions",
      distance: "2.1 km",
      available: "Tomorrow, 12:00 PM",
      type: "Cooked Food",
      urgent: false,
      donorContact: {
        name: "City Restaurant",
        phone: "+1 (555) 345-6789",
        email: "donations@cityrestaurant.com",
        address: "789 City Center Blvd"
      }
    },
    {
      id: 4,
      donor: "Farm Fresh Co.",
      food: "Dairy Products",
      quantity: "20L milk, cheese",
      distance: "3.5 km",
      available: "Today, 4:00 PM",
      type: "Dairy",
      urgent: true,
      donorContact: {
        name: "Farm Fresh Co.",
        phone: "+1 (555) 456-7890",
        email: "donations@farmfresh.com",
        address: "321 Farm Road, Countryside"
      }
    }
  ];

  if (!searchQuery) return mockMatches;

  const query = searchQuery.toLowerCase();
  return mockMatches.filter(match => 
    match.food.toLowerCase().includes(query) ||
    match.donor.toLowerCase().includes(query) ||
    match.type.toLowerCase().includes(query)
  );
};

const Matches = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: matches, isLoading, error } = useQuery({
    queryKey: ["matches", debouncedSearch],
    queryFn: () => fetchMatches(debouncedSearch)
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Food Matches
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover available food donations in your area
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by food type, donor name..."
              className="pl-10 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <SearchFiltersModal 
            trigger={
              <Button variant="outline" className="h-12 px-6">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            } 
          />
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load food matches. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        {/* Matches Grid */}
        {!isLoading && !error && matches && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {matches.map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg font-semibold text-foreground">{match.food}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Users className="h-4 w-4 mr-1" />
                          {match.donor}
                        </CardDescription>
                      </div>
                      {match.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <UtensilsCrossed className="h-4 w-4 mr-2 text-primary" />
                        <span className="font-medium">{match.quantity}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{match.distance} away</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{match.available}</span>
                      </div>
                    </div>
                    
                    <Badge variant="secondary" className="text-xs">
                      {match.type}
                    </Badge>
                    
                    <div className="flex flex-col gap-2 pt-2">
                      <div className="flex gap-2">
                        <RequestFoodModal 
                          trigger={
                            <Button className="flex-1 text-sm">
                              Request Food
                            </Button>
                          }
                          foodItem={match}
                        />
                        <FoodDetailsModal 
                          trigger={
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          }
                          foodItem={match}
                        />
                      </div>
                      <div className="flex gap-2">
                        <ContactDonorModal 
                          trigger={
                            <Button variant="outline" size="sm" className="flex-1">
                              Contact Donor
                            </Button>
                          }
                          donor={match.donorContact}
                        />
                        <MarkCompletedModal 
                          trigger={
                            <Button variant="outline" size="sm" className="flex-1">
                              Mark Completed
                            </Button>
                          }
                          foodItem={match}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {matches.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No food matches found</p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}

            {/* Load More */}
            {matches.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Matches
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Matches;
