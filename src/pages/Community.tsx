import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MessageSquare, Users, Heart, ThumbsUp, Send, Search, Plus } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";

const Community = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [newPost, setNewPost] = useState("");
  const [stories, setStories] = useState([
    {
      id: 1,
      author: "Sarah M.",
      role: "Volunteer",
      title: "Helped 50 families this month!",
      content: "Amazing experience distributing fresh produce from Green Valley Market to families in need. The smiles on children's faces made it all worth it! 🌟",
      time: "2 hours ago",
      likes: 24,
      comments: 8,
      image: "🥬",
      liked: false,
      supported: false
    },
    {
      id: 2,
      author: "Mike's Bakery",
      role: "Food Donor",
      title: "Daily bread donations making a difference",
      content: "We've been donating our day-old bread and pastries for 6 months now. It feels great knowing nothing goes to waste and families get fresh baked goods!",
      time: "1 day ago",
      likes: 45,
      comments: 12,
      image: "🍞",
      liked: false,
      supported: false
    },
    {
      id: 3,
      author: "Community Center",
      role: "Recipient",
      title: "Grateful for the consistent support",
      content: "Food Bridge has been incredible for our shelter. Regular donations help us provide nutritious meals to 100+ people daily. Thank you to all donors and volunteers!",
      time: "2 days ago",
      likes: 67,
      comments: 15,
      image: "🏠",
      liked: false,
      supported: false
    }
  ]);

  const tips = [
    {
      title: "Best Practices for Food Safety",
      description: "Learn proper handling and storage techniques",
      category: "Safety"
    },
    {
      title: "Maximizing Your Impact",
      description: "Tips for donors to reduce waste effectively",
      category: "Donors"
    },
    {
      title: "Volunteer Success Stories",
      description: "Inspiring tales from our community heroes",
      category: "Volunteers"
    }
  ];

  const handleCreatePost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post",
        variant: "destructive"
      });
      return;
    }

    const newStory = {
      id: stories.length + 1,
      author: user?.name || "Anonymous",
      role: user?.role || "Member",
      title: newPost.split(" ").slice(0, 5).join(" ") + "...",
      content: newPost,
      time: "Just now",
      likes: 0,
      comments: 0,
      image: "🌟",
      liked: false,
      supported: false
    };

    setStories([newStory, ...stories]);
    setNewPost("");
    toast({
      title: "Success",
      description: "Your story has been shared with the community!"
    });
  };

  const handleLike = (storyId: number) => {
    setStories(stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          likes: story.liked ? story.likes - 1 : story.likes + 1,
          liked: !story.liked
        };
      }
      return story;
    }));
  };

  const handleSupport = (storyId: number) => {
    setStories(stories.map(story => {
      if (story.id === storyId) {
        return {
          ...story,
          supported: !story.supported
        };
      }
      return story;
    }));
  };

  const handleLoadMore = () => {
    // Simulate loading more stories
    toast({
      title: "Loading more stories...",
      description: "Please wait while we fetch more content"
    });
  };

  const handleStartDiscussion = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to start a discussion",
        variant: "destructive"
      });
      return;
    }
    // Implement discussion creation logic
    toast({
      title: "Coming Soon",
      description: "Discussion feature will be available soon!"
    });
  };

  const handleFindGroups = () => {
    toast({
      title: "Coming Soon",
      description: "Group finder feature will be available soon!"
    });
  };

  const handleJoinEvent = () => {
    toast({
      title: "Coming Soon",
      description: "Event joining feature will be available soon!"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Community Hub
          </h1>
          <p className="text-muted-foreground text-lg">
            Connect, share stories, and celebrate our collective impact
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                  Share Your Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="What impact did you make today?" 
                  className="text-base"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">📸 Photo</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">🎯 Achievement</Badge>
                    <Badge variant="outline" className="cursor-pointer hover:bg-muted">💡 Tip</Badge>
                  </div>
                  <Button onClick={handleCreatePost}>
                    <Send className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stories Feed */}
            <div className="space-y-6">
              {stories.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-2xl">
                          {story.image}
                        </div>
                        <div>
                          <h3 className="font-semibold">{story.author}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {story.role}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{story.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-lg mb-2">{story.title}</h4>
                      <p className="text-muted-foreground">{story.content}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`text-muted-foreground hover:text-red-600 ${story.liked ? 'text-red-600' : ''}`}
                          onClick={() => handleLike(story.id)}
                        >
                          <Heart className="mr-1 h-4 w-4" />
                          {story.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          {story.comments}
                        </Button>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className={story.supported ? 'text-green-600' : ''}
                        onClick={() => handleSupport(story.id)}
                      >
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg" onClick={handleLoadMore}>
                Load More Stories
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="mr-2 h-5 w-5 text-primary" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">89</div>
                  <div className="text-sm text-muted-foreground">Stories This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">456</div>
                  <div className="text-sm text-muted-foreground">Lives Impacted</div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Featured Tips</CardTitle>
                <CardDescription>Community knowledge sharing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors cursor-pointer">
                    <h4 className="font-medium text-sm mb-1">{tip.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{tip.description}</p>
                    <Badge variant="outline" className="text-xs">
                      {tip.category}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Tips
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={handleStartDiscussion}>
                  <Plus className="mr-2 h-4 w-4" />
                  Start Discussion
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleFindGroups}>
                  <Search className="mr-2 h-4 w-4" />
                  Find Local Groups
                </Button>
                <Button variant="outline" className="w-full justify-start" onClick={handleJoinEvent}>
                  <Users className="mr-2 h-4 w-4" />
                  Join Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
