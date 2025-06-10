
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, UtensilsCrossed } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FoodListings = () => {
  const { toast } = useToast();
  const [listings] = useState([
    {
      id: 1,
      title: "Fresh Vegetables & Fruits",
      donor: "Green Valley Market",
      location: "Downtown Community Center",
      distance: "0.3 miles",
      servings: 25,
      category: "Fresh Produce",
      urgency: "high",
      timeLeft: "2 hours",
      description: "Assorted fresh vegetables and seasonal fruits, perfect for families"
    },
    {
      id: 2,
      title: "Prepared Meals - Pasta & Salad",
      donor: "Mario's Italian Restaurant",
      location: "Riverside Shelter",
      distance: "0.8 miles",
      servings: 40,
      category: "Prepared Food",
      urgency: "medium",
      timeLeft: "4 hours",
      description: "Hearty pasta dishes with garden salads, ready to serve"
    },
    {
      id: 3,
      title: "Bread & Baked Goods",
      donor: "Sunrise Bakery",
      location: "Community Kitchen",
      distance: "1.2 miles",
      servings: 60,
      category: "Baked Goods",
      urgency: "low",
      timeLeft: "8 hours",
      description: "Fresh bread, pastries, and baked goods from this morning"
    }
  ]);

  const handleClaim = (listingId: number, title: string) => {
    toast({
      title: "Food Claimed Successfully!",
      description: `You've claimed "${title}". Check your notifications for pickup details.`,
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-accent text-accent-foreground";
      case "low": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Available Food Now</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real-time listings from local restaurants, markets, and farms ready for pickup
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="card-hover animate-fade-in">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg">{listing.title}</CardTitle>
                  <Badge className={getUrgencyColor(listing.urgency)}>
                    {listing.timeLeft} left
                  </Badge>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {listing.donor}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{listing.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{listing.servings} servings</span>
                  </div>
                  <Badge variant="outline">{listing.category}</Badge>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{listing.location} • {listing.distance}</span>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => handleClaim(listing.id, listing.title)}
                >
                  <UtensilsCrossed className="mr-2 h-4 w-4" />
                  Claim Food
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FoodListings;
