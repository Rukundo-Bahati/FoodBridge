import { useState } from "react";
import { BarChart, Users, Utensils, Calendar, Award, Leaf, TrendingUp, Package, Trophy, Star, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const RecipientImpact = () => {
  const { toast } = useToast();
  const [impactStats] = useState({
    totalPickups: 156,
    peopleFed: 2340,
    foodReceived: "12,450 lbs",
    carbonFootprint: "8.2 tons",
    weeklyGoal: 500,
    progress: 75
  });

  const [monthlyImpact] = useState([
    { month: "Jan", value: 1200 },
    { month: "Feb", value: 1500 },
    { month: "Mar", value: 1800 },
    { month: "Apr", value: 2100 },
    { month: "May", value: 2400 },
    { month: "Jun", value: 2700 }
  ]);

  const [achievements] = useState([
    {
      title: "Consistent Contributor",
      description: "Maintained weekly pickups for 3 months",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />
    },
    {
      title: "Community Champion",
      description: "Fed over 2,000 people",
      icon: <Star className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Environmental Hero",
      description: "Prevented 5 tons of food waste",
      icon: <Leaf className="h-6 w-6 text-green-500" />
    }
  ]);

  const handleShareAchievement = (achievement: string) => {
    toast({
      title: "Share Achievement",
      description: `Sharing your ${achievement} achievement with the community!`
    });
  };

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
            <CardTitle className="text-sm font-medium">Total Pickups</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.totalPickups}</div>
            <p className="text-xs text-muted-foreground">
              Successful pickups completed
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
              Individuals supported
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Food Received</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.foodReceived}</div>
            <p className="text-xs text-muted-foreground">
              Total food received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Reduced</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impactStats.carbonFootprint}</div>
            <p className="text-xs text-muted-foreground">
              CO2 emissions prevented
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Impact</CardTitle>
            <CardDescription>Food received per month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2">
              {monthlyImpact.map((item) => (
                <div key={item.month} className="flex flex-col items-center gap-2">
                  <div 
                    className="w-12 bg-primary/20 rounded-t-lg transition-all hover:bg-primary/30"
                    style={{ height: `${(item.value / 3000) * 100}%` }}
                  />
                  <span className="text-sm text-muted-foreground">{item.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Goal Progress</CardTitle>
            <CardDescription>Current week's target: {impactStats.weeklyGoal} lbs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">{impactStats.progress}%</span>
            </div>
            <Progress value={impactStats.progress} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>0 lbs</span>
              <span>{impactStats.weeklyGoal} lbs</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Your organization's milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="p-4 border rounded-lg space-y-3 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3">
                  {achievement.icon}
                  <div>
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                </div>
                <Badge 
                  variant="outline" 
                  className="cursor-pointer hover:bg-muted"
                  onClick={() => handleShareAchievement(achievement.title)}
                >
                  Share Achievement
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Environmental Impact</CardTitle>
          <CardDescription>Your contribution to sustainability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg text-center">
              <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600">8.2 tons</div>
              <p className="text-sm text-muted-foreground">CO2 Emissions Prevented</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Package className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">12,450 lbs</div>
              <p className="text-sm text-muted-foreground">Food Waste Diverted</p>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-600">2,340</div>
              <p className="text-sm text-muted-foreground">Lives Impacted</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecipientImpact; 