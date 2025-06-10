
import { Button } from "@/components/ui/button";
import { UserPlus, UtensilsCrossed, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 flex items-center">
              <UtensilsCrossed className="mr-2 h-6 w-6" />
              Food Bridge
            </h3>
            <p className="text-background/80 mb-6 max-w-md">
              Empowering students to create sustainable solutions for food waste while 
              feeding communities in need. Every meal redistributed is a step toward 
              a more equitable future.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-background/20 text-background hover:bg-background hover:text-foreground">
                <UserPlus className="mr-2 h-4 w-4" />
                Join as Recipient
              </Button>
              <Button variant="outline" size="sm" className="border-background/20 text-black ">
                <MapPin className="mr-2 h-4 w-4 text-black" />
                Become a Donor
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">For Students</h4>
            <ul className="space-y-2 text-background/80 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">Learning Hub</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Volunteer Portal</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Achievements</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Workshops</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-background/80 text-sm">
              <li><a href="#" className="hover:text-background transition-colors">Find Food</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Donate Food</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Impact Stories</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-8 text-center text-background/60 text-sm">
          <p>&copy; 2025 Food Bridge Impact. Built by students, for communities. Together, we bridge the gap between surplus and need.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
