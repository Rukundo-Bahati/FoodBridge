
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin } from "lucide-react";

const StudentHub = () => {
  const workshops = [
    {
      title: "Food Safety & Handling",
      date: "June 15, 2025",
      time: "2:00 PM - 4:00 PM",
      location: "Community Center",
      instructor: "Chef Maria Rodriguez",
      spots: 8,
      level: "Beginner"
    },
    {
      title: "React Mobile Development",
      date: "June 18, 2025", 
      time: "6:00 PM - 8:00 PM",
      location: "Tech Hub Downtown",
      instructor: "Sarah Chen",
      spots: 5,
      level: "Intermediate"
    },
    {
      title: "Logistics & Supply Chain",
      date: "June 22, 2025",
      time: "1:00 PM - 3:00 PM", 
      location: "Business School",
      instructor: "Dr. James Wilson",
      spots: 12,
      level: "Beginner"
    }
  ];

  const achievements = [
    { name: "Food Safety Certified", completed: true },
    { name: "10 Successful Deliveries", completed: true },
    { name: "Community Leader", completed: false },
    { name: "Tech Mentor", completed: false }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Student Learning Hub</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn coding, logistics, and food safety while making a real impact in your community
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workshops */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6">Upcoming Workshops</h3>
            <div className="space-y-4">
              {workshops.map((workshop, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{workshop.title}</CardTitle>
                        <CardDescription>with {workshop.instructor}</CardDescription>
                      </div>
                      <Badge variant="outline">{workshop.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <strong>{workshop.date}</strong> • {workshop.time}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{workshop.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{workshop.spots} spots available</span>
                        </div>
                        <Button size="sm">Register</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Student Progress */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Your Progress</h3>
            
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Impact Score</CardTitle>
                <CardDescription>Your contribution this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="impact-number">89</div>
                  <p className="text-sm text-muted-foreground">People helped</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Skills and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        achievement.completed ? 'bg-primary' : 'bg-muted'
                      }`}></div>
                      <span className={achievement.completed ? 'text-foreground' : 'text-muted-foreground'}>
                        {achievement.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudentHub;
