
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, Store, Trash } from "lucide-react";

const ImpactDashboard = () => {
  const stats = [
    {
      title: "People Fed This Month",
      value: 127,
      target: 500,
      icon: Users,
      color: "text-primary"
    },
    {
      title: "Active Donors",
      value: 23,
      target: 50,
      icon: Store,
      color: "text-accent"
    },
    {
      title: "Food Waste Prevented (lbs)",
      value: 850,
      target: 1000,
      icon: Trash,
      color: "text-destructive"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Real-Time Impact</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track our community's progress in reducing food waste and feeding families in need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const percentage = (stat.value / stat.target) * 100;
            const Icon = stat.icon;
            
            return (
              <Card key={index} className="card-hover animate-scale-in">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">
                    {stat.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Goal: {stat.target.toLocaleString()}
                  </div>
                  <Progress value={percentage} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {percentage.toFixed(1)}% complete
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-none">
          <CardHeader>
            <CardTitle className="text-2xl">This Week's Achievements</CardTitle>
            <CardDescription>
              Amazing progress made by our student volunteers and community partners
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>15 new families connected to food sources</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>3 restaurants joined as regular donors</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>Students completed food safety training</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Zero food waste achieved at 5 locations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span>2 coding workshops held this week</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span>Mobile app downloaded 50+ times</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ImpactDashboard;
