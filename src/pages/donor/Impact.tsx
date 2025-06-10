import { BarChart, Users, Utensils, Calendar, Award, Leaf, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export default function DonorImpact() {
  const impactStats = {
    totalDonations: 156,
    peopleFed: 2340,
    foodWastePrevented: 1250, // kg
    carbonFootprintReduced: 3200, // kg CO2
    weeklyGoal: 200,
    progressPercentage: 78
  };

  const monthlyImpact = [
    { month: "Jan", donations: 45, peopleFed: 675 },
    { month: "Feb", donations: 52, peopleFed: 780 },
    { month: "Mar", donations: 48, peopleFed: 720 },
    { month: "Apr", donations: 56, peopleFed: 840 },
  ];

  const achievements = [
    {
      title: "First Donation",
      description: "Completed your first food donation",
      date: "January 15, 2024",
      icon: "🎉",
    },
    {
      title: "Community Hero",
      description: "Donated over 1,000 kg of food",
      date: "February 28, 2024",
      icon: "🌟",
    },
    {
      title: "Consistent Donor",
      description: "Donated for 30 consecutive days",
      date: "March 20, 2024",
      icon: "🏆",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Impact</h1>
        <Button>
          <BarChart className="mr-2 h-4 w-4" />
          Share Impact
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.totalDonations}</div>
            <p className="text-xs text-muted-foreground">
              Since joining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">People Fed</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.peopleFed}</div>
            <p className="text-xs text-muted-foreground">
              Through your donations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food Waste Prevented</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.foodWastePrevented} kg</div>
            <p className="text-xs text-muted-foreground">
              Food saved from waste
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Footprint</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.carbonFootprintReduced} kg</div>
            <p className="text-xs text-muted-foreground">
              CO2 emissions reduced
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Impact</CardTitle>
            <CardDescription>Your contribution over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyImpact.map((month) => (
                <div key={month.month} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{month.month}</span>
                    <span className="text-sm text-muted-foreground">
                      {month.donations} donations
                    </span>
                  </div>
                  <Progress value={(month.peopleFed / impactStats.peopleFed) * 100} />
                  <p className="text-xs text-muted-foreground">
                    {month.peopleFed} people fed
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Goal Progress</CardTitle>
            <CardDescription>Track your weekly donation target</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Progress</span>
                <span className="text-sm text-muted-foreground">
                  {impactStats.progressPercentage}%
                </span>
              </div>
              <Progress value={impactStats.progressPercentage} />
              <p className="text-xs text-muted-foreground">
                {impactStats.weeklyGoal} meals target
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.title}
                className="flex items-start space-x-4 rounded-lg border p-4"
              >
                <div className="text-2xl">{achievement.icon}</div>
                <div className="space-y-1">
                  <p className="font-medium">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {achievement.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-green-500" />
                <span className="font-medium">Carbon Saved</span>
              </div>
              <p className="text-2xl font-bold">1,245 kg CO₂</p>
              <p className="text-sm text-muted-foreground">
                Equivalent to planting 56 trees
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Water Saved</span>
              </div>
              <p className="text-2xl font-bold">12,450 L</p>
              <p className="text-sm text-muted-foreground">
                Equivalent to 124 showers
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-orange-500" />
                <span className="font-medium">Land Saved</span>
              </div>
              <p className="text-2xl font-bold">245 m²</p>
              <p className="text-sm text-muted-foreground">
                Equivalent to 2 tennis courts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 