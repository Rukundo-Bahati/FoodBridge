import { useNavigate } from "react-router-dom";
import { useLanguage } from "../lib/language-provider";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import Hero from "@/components/Hero";
import ImpactDashboard from "@/components/ImpactDashboard";
import FoodListings from "@/components/FoodListings";
import StudentHub from "@/components/StudentHub";
import Footer from "@/components/Footer";
import LandingPageNavbar from "@/components/LandingPageNavbar";

import {
  UtensilsCrossed,
  Users,
  Heart,
  ArrowRight,
  Leaf,
  Clock,
  MapPin,
} from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <LandingPageNavbar />
       <Hero />
      <ImpactDashboard />
      <FoodListings />
      <StudentHub />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/signup?role=donor")}
                className="text-lg"
              >
                {t("cta.donor")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/signup?role=recipient")}
                className="text-lg"
              >
                {t("cta.recipient")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("features.title")}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <UtensilsCrossed className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("features.donor.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("features.donor.description")}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    {t("features.recipient.title")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("features.recipient.description")}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reduce Food Waste</h3>
              <p className="text-muted-foreground">
                Help reduce food waste by connecting surplus food with those who need it
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Environmental Impact</h3>
              <p className="text-muted-foreground">
                Make a positive impact on the environment by reducing food waste
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-muted-foreground">
                Get instant notifications about available food donations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t("cta.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate("/signup?role=donor")}
                className="text-lg"
              >
                {t("cta.donor")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/signup?role=recipient")}
                className="text-lg"
              >
                {t("cta.recipient")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
} 




