
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed, UserPlus, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center">
      <div className="container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <UtensilsCrossed className="h-20 w-20 mx-auto mb-6 text-white" />
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              Food Bridge Impact
            </h1>
            <p className="text-2xl mb-6 opacity-90">
              Fight Hunger, Reduce Waste
            </p>
            <p className="text-lg max-w-2xl mx-auto mb-8 opacity-80">
              Connect surplus food from markets, farms, and restaurants to communities in need. 
              Join our student-led mission to create a sustainable future inspired by the Zayed Sustainability Prize.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
                <UserPlus className="mr-2 h-5 w-5" />
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
                <Users className="mr-2 h-5 w-5" />
                Log In
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UtensilsCrossed className="h-5 w-5" />
                  <span>For Donors</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  Restaurants, markets, and farms can easily log surplus food and connect with local recipients.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>For Recipients</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  Shelters, community kitchens, and families can access fresh food donations in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Learn More</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90">
                  Discover our mission, inspired by the Zayed Sustainability Prize, to create lasting impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
