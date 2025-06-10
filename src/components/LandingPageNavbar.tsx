import { Link } from "react-router-dom";
import { UtensilsCrossed, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPageNavbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <UtensilsCrossed className="h-8 w-8 text-primary" />
            <span className="text-gradient">Food Bridge</span>
          </Link>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" asChild className="text-black hover:text-green-600 hover:bg-white/10">
              <Link to="/login" className="flex items-center space-x-1">
                <LogIn className="h-4 w-4" />
                <span>Log in</span>
              </Link>
            </Button>
            <Button asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/signup" className="flex items-center space-x-1">
                <UserPlus className="h-4 w-4" />
                <span>Sign up</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
