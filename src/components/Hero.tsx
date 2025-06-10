
import { Button } from "@/components/ui/button";
import { ArrowDown, UtensilsCrossed, UserPlus } from "lucide-react";
import LandingNavigation from "./LandingNavigation";

const Hero = () => {
  return (
    <>
      <LandingNavigation />
      <section className="min-h-screen gradient-bg flex items-center justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Bridge the Gap Between
            <span className="block bg-white text-primary px-4 py-2 rounded-lg mt-4 inline-block">
              Surplus & Need
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Student-led platform connecting restaurants, markets & farms with shelters and families in need. 
            <strong className="block mt-2">Together, we can reduce food waste by 20% and feed 500+ people annually.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4">
              <UtensilsCrossed className="mr-2 h-5 w-5" />
              Donate Food
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4">
              <UserPlus className="mr-2 h-5 w-5" />
              Find Food
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">People Fed Annually</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">20%</div>
              <div className="text-lg opacity-90">Food Waste Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-lg opacity-90">Student-Led Impact</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-8 w-8 text-white opacity-70" />
        </div>
      </section>
    </>
  );
};

export default Hero;
