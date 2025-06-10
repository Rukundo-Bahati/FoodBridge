
import Hero from "@/components/Hero";
import ImpactDashboard from "@/components/ImpactDashboard";
import FoodListings from "@/components/FoodListings";
import StudentHub from "@/components/StudentHub";
import Footer from "@/components/Footer";
import LandingPageNavbar from "@/components/LandingPageNavbar";

const Index = () => {
  return (
    <div className="">
      <LandingPageNavbar />
      <Hero />
      <ImpactDashboard />
      <FoodListings />
      <StudentHub />
      <Footer />
    </div>
  );
};

export default Index;
