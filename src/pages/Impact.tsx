
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Users, UtensilsCrossed, Leaf, TrendingUp, Calendar, Share2 } from "lucide-react";
import Navigation from "@/components/Navigation";

const Impact = () => {
  const impactStats = {
    totalMeals: 2847,
    peopleHelped: 1234,
    wasteReduced: 3456,
    co2Saved: 890,
    partnerOrgs: 45,
    volunteerHours: 678
  };

  const monthlyData = [
    { month: "Jan", meals: 180, waste: 245 },
    { month: "Feb", meals: 220, waste: 298 },
    { month: "Mar", meals: 280, waste: 356 },
    { month: "Apr", meals: 320, waste: 420 },
    { month: "May", meals: 380, waste: 485 },
    { month: "Jun", meals: 450, waste: 567 }
  ];

  const achievements = [
    {
      title: "First 1000 Meals",
      description: "Reached 1000 meals redistributed milestone",
      date: "March 2024",
      badge: "🏆"
    },
    {
      title: "Zero Waste Week",
      description: "Prevented all food waste for a full week",
      date: "April 2024",
      badge: "🌱"
    },
    {
      title: "Community Hero",
      description: "Helped 500+ families in need",
      date: "May 2024",
      badge: "❤️"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Impact Story
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            See how your contributions are making a real difference in fighting hunger and reducing food waste
          </p>
        </div>

        {/* Main Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="text-center border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <UtensilsCrossed className="h-8 w-8 mx-auto text-green-600 mb-2" />
              <CardTitle className="text-3xl font-bold text-green-600">
                {impactStats.totalMeals.toLocaleString()}
              </CardTitle>
              <CardDescription className="text-base">Meals Redistributed</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-8 w-8 mx-auto text-blue-600 mb-2" />
              <CardTitle className="text-3xl font-bold text-blue-600">
                {impactStats.peopleHelped.toLocaleString()}
              </CardTitle>
              <CardDescription className="text-base">People Helped</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center border-l-4 border-l-orange-500 hover:shadow-lg transition-shadow">
            <CardHeader>
              <Leaf className="h-8 w-8 mx-auto text-orange-600 mb-2" />
              <CardTitle className="text-3xl font-bold text-orange-600">
                {impactStats.wasteReduced.toLocaleString()}kg
              </CardTitle>
              <CardDescription className="text-base">Food Waste Prevented</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                {impactStats.co2Saved}kg
              </CardTitle>
              <CardDescription>CO2 Emissions Saved</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                {impactStats.partnerOrgs}
              </CardTitle>
              <CardDescription>Partner Organizations</CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">
                {impactStats.volunteerHours}h
              </CardTitle>
              <CardDescription>Volunteer Hours</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Monthly Progress Chart */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <TrendingUp className="mr-2 h-6 w-6 text-primary" />
              Monthly Progress
            </CardTitle>
            <CardDescription>Your impact growth over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-center">
              {monthlyData.map((data, index) => (
                <div key={index} className="p-4 bg-muted rounded-lg">
                  <div className="font-semibold text-lg text-primary">{data.month}</div>
                  <div className="text-sm text-muted-foreground mt-2">
                    <div>{data.meals} meals</div>
                    <div>{data.waste}kg saved</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <BarChart3 className="mr-2 h-6 w-6 text-primary" />
              Achievements
            </CardTitle>
            <CardDescription>Milestones you've unlocked on your impact journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="text-center p-6 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
                  <div className="text-4xl mb-3">{achievement.badge}</div>
                  <h3 className="font-semibold text-lg mb-2">{achievement.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {achievement.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Share Impact */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl">Share Your Impact</CardTitle>
            <CardDescription>
              Inspire others by sharing your contribution to fighting food waste
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-lg text-muted-foreground">
              "I've helped redistribute <strong>{impactStats.totalMeals}</strong> meals and prevented <strong>{impactStats.wasteReduced}kg</strong> of food waste through Food Bridge Impact!"
            </div>
            <div className="flex justify-center gap-4">
              <Button size="lg">
                <Share2 className="mr-2 h-5 w-5" />
                Share on Social Media
              </Button>
              <Button variant="outline" size="lg">
                <Calendar className="mr-2 h-5 w-5" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Impact;
