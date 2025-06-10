
import Hero from "@/components/Hero";
import ImpactDashboard from "@/components/ImpactDashboard";
import FoodListings from "@/components/FoodListings";
import StudentHub from "@/components/StudentHub";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ImpactDashboard />
      <FoodListings />
      <StudentHub />
      <Footer />
    </div>
  );
};

export default Index;
