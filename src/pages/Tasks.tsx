import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Leaf, 
  Recycle, 
  Bike, 
  Droplets, 
  Sun, 
  TreePine, 
  Users, 
  Calendar,
  Clock,
  Trophy,
  Star,
  MapPin,
  Camera,
  Upload
} from "lucide-react";

const Tasks = () => {
  const dailyTasks = [
    {
      id: 1,
      title: "Bring Your Own Water Bottle",
      description: "Skip single-use plastic and bring a reusable water bottle to campus",
      points: 50,
      icon: Droplets,
      difficulty: "Easy",
      timeEstimate: "All day",
      category: "Daily Habits",
      participants: 234
    },
    {
      id: 2,
      title: "Use Public Transport",
      description: "Take the bus, train, or carpool to reduce carbon emissions",
      points: 75,
      icon: MapPin,
      difficulty: "Easy",
      timeEstimate: "30 min",
      category: "Transportation",
      participants: 189
    },
    {
      id: 3,
      title: "Digital Receipt Only",
      description: "Choose digital receipts instead of paper when shopping",
      points: 25,
      icon: Recycle,
      difficulty: "Easy",
      timeEstimate: "2 min",
      category: "Digital",
      participants: 156
    },
    {
      id: 4,
      title: "Plant Care Check-in",
      description: "Water and care for your plants or campus greenery",
      points: 30,
      icon: Leaf,
      difficulty: "Easy",
      timeEstimate: "15 min",
      category: "Gardening",
      participants: 98
    }
  ];

  const weeklyTasks = [
    {
      id: 5,
      title: "Campus Clean-up Drive",
      description: "Join the weekly campus clean-up and make our environment better",
      points: 200,
      icon: Users,
      difficulty: "Medium",
      timeEstimate: "2 hours",
      category: "Community",
      participants: 67,
      date: "Saturday 2 PM"
    },
    {
      id: 6,
      title: "Bike to Campus Week",
      description: "Cycle to campus for 5 days this week",
      points: 300,
      icon: Bike,
      difficulty: "Medium",
      timeEstimate: "Week long",
      category: "Transportation",
      participants: 43
    },
    {
      id: 7,
      title: "Zero Waste Challenge",
      description: "Produce zero waste for an entire day",
      points: 250,
      icon: Recycle,
      difficulty: "Hard",
      timeEstimate: "24 hours",
      category: "Challenge",
      participants: 28
    }
  ];

  const specialEvents = [
    {
      id: 8,
      title: "Earth Day Tree Planting",
      description: "Join us for a massive tree planting event in the city park",
      points: 500,
      icon: TreePine,
      difficulty: "Medium",
      timeEstimate: "4 hours",
      category: "Event",
      participants: 156,
      date: "April 22, 9 AM",
      featured: true
    },
    {
      id: 9,
      title: "Solar Panel Workshop",
      description: "Learn about renewable energy and help install solar panels",
      points: 400,
      icon: Sun,
      difficulty: "Hard",
      timeEstimate: "6 hours",
      category: "Learning",
      participants: 24,
      date: "March 15, 10 AM"
    }
  ];

  const TaskCard = ({ task, showDate = false }) => (
    <Card className="hover:shadow-[var(--shadow-card)] transition-all hover:scale-[1.02] group">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              task.featured ? 'bg-gradient-to-br from-eco-yellow to-eco-peach' : 
              'bg-eco-mint/20'
            }`}>
              <task.icon className={`w-6 h-6 ${
                task.featured ? 'text-white' : 'text-eco-mint'
              }`} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg group-hover:text-eco-mint transition-colors">
                {task.title}
                {task.featured && <Star className="inline w-4 h-4 ml-2 text-eco-yellow" />}
              </CardTitle>
              {showDate && task.date && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <Calendar className="w-4 h-4" />
                  {task.date}
                </div>
              )}
            </div>
          </div>
          <Badge variant="secondary" className="bg-eco-mint/20 text-eco-mint">
            {task.points} pts
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{task.description}</p>
        
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            {task.timeEstimate}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {task.difficulty}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {task.category}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            {task.participants} joined
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Camera className="w-4 h-4" />
            </Button>
            <Button variant="eco" size="sm" className="group-hover:scale-105 transition-transform">
              <Upload className="w-4 h-4 mr-2" />
              Join Task
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-eco-mint to-eco-blue bg-clip-text text-transparent">
            Eco-Tasks & Challenges
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take action for the environment and earn GreenPoints! Every small step counts towards a sustainable future.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-eco-mint/10 to-eco-mint/5 border-eco-mint/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-eco-mint">24</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-eco-blue/10 to-eco-blue/5 border-eco-blue/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-eco-blue">12</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-eco-violet/10 to-eco-violet/5 border-eco-violet/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-eco-violet">2,450</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-eco-yellow/10 to-eco-yellow/5 border-eco-yellow/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-eco-yellow">#15</div>
              <div className="text-sm text-muted-foreground">Campus Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Tasks Tabs */}
        <Tabs defaultValue="daily" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-96 mx-auto">
            <TabsTrigger value="daily" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Weekly
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="daily" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Clock className="w-6 h-6 text-eco-mint" />
                Daily Eco-Actions
              </h2>
              <p className="text-muted-foreground mb-6">
                Simple daily habits that make a big difference. Complete these tasks throughout your day!
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {dailyTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-eco-blue" />
                Weekly Challenges
              </h2>
              <p className="text-muted-foreground mb-6">
                Bigger challenges for bigger impact! These tasks require more commitment but offer greater rewards.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weeklyTasks.map(task => (
                  <TaskCard key={task.id} task={task} showDate />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-eco-violet" />
                Special Events
              </h2>
              <p className="text-muted-foreground mb-6">
                Join community events and make a massive impact together! These are special occasions with bonus rewards.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {specialEvents.map(task => (
                  <TaskCard key={task.id} task={task} showDate />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Section */}
        <Card className="bg-gradient-to-r from-eco-mint via-eco-blue to-eco-violet text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Make a Difference?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of students taking action for our planet. Every task completed brings us closer to a sustainable future!
            </p>
            <Button variant="secondary" size="lg">
              <Trophy className="w-5 h-5 mr-2" />
              View My Progress
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Tasks;