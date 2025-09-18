import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Target, 
  Leaf, 
  Recycle, 
  Award, 
  TrendingUp, 
  Users, 
  Calendar,
  Zap,
  Star,
  Gift,
  MapPin
} from "lucide-react";
import ecoMascot from "@/assets/eco-mascot.png";

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const userStats = {
    name: "Alex Green",
    points: 2450,
    level: 5,
    streak: 12,
    nextLevelPoints: 3000,
    tasksCompleted: 24,
    badgesEarned: 8,
    rank: 15
  };

  const todaysTasks = [
    { id: 1, title: "Bring Your Own Water Bottle", points: 50, icon: Recycle, completed: false },
    { id: 2, title: "Use Public Transport", points: 75, icon: MapPin, completed: true },
    { id: 3, title: "Plant Care Check-in", points: 30, icon: Leaf, completed: false },
    { id: 4, title: "Waste Sorting Challenge", points: 100, icon: Target, completed: false },
  ];

  const recentBadges = [
    { name: "Tree Hugger", icon: "🌳", description: "Planted 10 trees" },
    { name: "Recycle Champion", icon: "♻️", description: "Sorted 50kg waste" },
    { name: "Green Streak", icon: "🔥", description: "10-day streak" },
  ];

  const leaderboard = [
    { name: "Sarah Chen", points: 3200, avatar: "👩‍🎓" },
    { name: "Mike Johnson", points: 2950, avatar: "👨‍🎓" },
    { name: "You", points: 2450, avatar: "🌟" },
    { name: "Emma Davis", points: 2300, avatar: "👩‍🎓" },
  ];

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={ecoMascot} alt="EcoVerse Mascot" className="w-12 h-12 animate-bounce-gentle" />
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {userStats.name}! 🌱</h1>
              <p className="text-muted-foreground">Ready to make a difference today?</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary" className="px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              {userStats.streak} Day Streak
            </Badge>
            <Badge className="px-4 py-2 bg-eco-mint text-white">
              Level {userStats.level}
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-eco-mint/10 to-transparent border-eco-mint/20 hover:shadow-[var(--shadow-card)] transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">GreenPoints</p>
                  <p className="text-2xl font-bold text-eco-mint">{userStats.points.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-eco-mint/20 rounded-full flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-eco-mint" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-eco-blue/10 to-transparent border-eco-blue/20 hover:shadow-[var(--shadow-card)] transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tasks Completed</p>
                  <p className="text-2xl font-bold text-eco-blue">{userStats.tasksCompleted}</p>
                </div>
                <div className="w-12 h-12 bg-eco-blue/20 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-eco-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-eco-violet/10 to-transparent border-eco-violet/20 hover:shadow-[var(--shadow-card)] transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Badges Earned</p>
                  <p className="text-2xl font-bold text-eco-violet">{userStats.badgesEarned}</p>
                </div>
                <div className="w-12 h-12 bg-eco-violet/20 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-eco-violet" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-eco-yellow/10 to-transparent border-eco-yellow/20 hover:shadow-[var(--shadow-card)] transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Campus Rank</p>
                  <p className="text-2xl font-bold text-eco-yellow">#{userStats.rank}</p>
                </div>
                <div className="w-12 h-12 bg-eco-yellow/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-eco-yellow" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <Card className="hover:shadow-[var(--shadow-card)] transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Star className="w-5 h-5 text-eco-mint" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Level {userStats.level}</span>
                <span>{userStats.points} / {userStats.nextLevelPoints} points</span>
              </div>
              <Progress 
                value={(userStats.points / userStats.nextLevelPoints) * 100} 
                className="h-3"
              />
              <p className="text-sm text-muted-foreground">
                {userStats.nextLevelPoints - userStats.points} more points to reach Level {userStats.level + 1}!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Tasks */}
          <div className="lg:col-span-2">
            <Card className="hover:shadow-[var(--shadow-card)] transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-eco-blue" />
                  Today's Eco-Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {todaysTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        task.completed ? 'bg-eco-success/20' : 'bg-muted'
                      }`}>
                        <task.icon className={`w-5 h-5 ${
                          task.completed ? 'text-eco-success' : 'text-muted-foreground'
                        }`} />
                      </div>
                      <div>
                        <p className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{task.points} points</p>
                      </div>
                    </div>
                    {task.completed ? (
                      <Badge variant="secondary" className="bg-eco-success/20 text-eco-success">
                        Completed
                      </Badge>
                    ) : (
                      <Button variant="eco" size="sm">
                        Start
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4">
                  <Target className="w-4 h-4 mr-2" />
                  View All Tasks
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements */}
            <Card className="hover:shadow-[var(--shadow-card)] transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-eco-violet" />
                  Recent Badges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground">{badge.description}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <Gift className="w-4 h-4 mr-2" />
                  View All Badges
                </Button>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="hover:shadow-[var(--shadow-card)] transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-eco-yellow" />
                  Campus Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {leaderboard.map((user, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      user.name === 'You' ? 'bg-eco-mint/10 border border-eco-mint/20' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{user.avatar}</span>
                      <div>
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.points} points</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;