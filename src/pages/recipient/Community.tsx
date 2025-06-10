import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Heart } from "lucide-react";

export default function RecipientCommunity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Community</h1>
        <p className="text-muted-foreground">
          Connect with donors and other recipients in your area
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Donors</CardTitle>
            <CardDescription>People helping the community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>234 donors</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Events</CardTitle>
            <CardDescription>Upcoming gatherings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Food Distribution</span>
                <Button variant="outline" size="sm">Join</Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Volunteer Meetup</span>
                <Button variant="outline" size="sm">Join</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Success Stories</CardTitle>
            <CardDescription>Making an impact</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>500+ meals received this week</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4 text-blue-500" />
                <span>25+ active partnerships</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 