import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  MapPin,
  Clock,
  Upload,
  Camera
} from "lucide-react";
import ecoMascot from "@/assets/eco-mascot.png";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const { profile, tasks, completedTasks, userBadges, loading, completeTask } = useUserData();
  const { toast } = useToast();
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskReflection, setTaskReflection] = useState('');

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-mint"></div>
      </div>
    );
  }

  const userStats = {
    name: profile?.display_name || user?.email?.split('@')[0] || 'Eco Warrior',
    points: profile?.total_points || 0,
    level: profile?.level || 1,
    streak: profile?.current_streak || 0,
    nextLevelPoints: (profile?.level || 1) * 1000,
    tasksCompleted: profile?.tasks_completed || 0,
    badgesEarned: profile?.badges_earned || 0,
    rank: profile?.campus_rank || 0
  };

  // Get today's tasks that aren't completed
  const completedTaskIds = new Set(completedTasks.map(ct => ct.task_id));
  const dailyTasks = tasks
    .filter(task => task.task_type === 'daily')
    .slice(0, 4)
    .map(task => ({
      id: task.id,
      title: task.title,
      points: task.points,
      icon: getIconComponent(task.icon_name),
      completed: completedTaskIds.has(task.id),
      description: task.description,
      difficulty: task.difficulty,
      category: task.category,
    }));

  const recentBadges = userBadges.slice(0, 3).map(ub => ({
    name: ub.badge.name,
    icon: ub.badge.icon,
    description: ub.badge.description,
  }));

  // Mock leaderboard data (you could fetch this from a view/function in the future)
  const leaderboard = [
    { name: "Sarah Chen", points: 3200, avatar: "👩‍🎓" },
    { name: "Mike Johnson", points: 2950, avatar: "👨‍🎓" },
    { name: userStats.name, points: userStats.points, avatar: "🌟" },
    { name: "Emma Davis", points: 2300, avatar: "👩‍🎓" },
  ].sort((a, b) => b.points - a.points);

  const handleCompleteTask = async (task: any) => {
    const { error } = await completeTask(task.id, taskReflection);
    
    if (error) {
      toast({
        title: "Error completing task",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Task completed! 🎉",
        description: `You earned ${task.points} GreenPoints!`,
      });
      setSelectedTask(null);
      setTaskReflection('');
    }
  };

  function getIconComponent(iconName: string | null) {
    const iconMap: { [key: string]: any } = {
      Droplets: Recycle,
      MapPin: MapPin,
      Recycle: Recycle,
      Leaf: Leaf,
      Users: Users,
      Bike: Target,
      TreePine: Leaf,
      Sun: Star,
    };
    return iconMap[iconName || 'Target'] || Target;
  }

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
                {dailyTasks.map((task) => (
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
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="eco" 
                            size="sm"
                            onClick={() => setSelectedTask(task)}
                          >
                            Start
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <task.icon className="w-5 h-5 text-eco-mint" />
                              Complete Task
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="text-center p-4 bg-muted/50 rounded-lg">
                              <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                              <p className="text-muted-foreground mb-4 text-sm">{task.description}</p>
                              <div className="flex items-center justify-center gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <Trophy className="w-4 h-4 text-eco-mint" />
                                  <span className="font-semibold">{task.points} points</span>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {task.difficulty}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <label className="text-sm font-medium">
                                Add a reflection (optional):
                              </label>
                              <textarea
                                className="w-full p-3 rounded-lg border border-border bg-background resize-none"
                                rows={3}
                                placeholder="How did this task make you feel? What did you learn?"
                                value={taskReflection}
                                onChange={(e) => setTaskReflection(e.target.value)}
                              />
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => {
                                  setSelectedTask(null);
                                  setTaskReflection('');
                                }}
                              >
                                Cancel
                              </Button>
                              <Button 
                                variant="success" 
                                className="flex-1" 
                                onClick={() => handleCompleteTask(task)}
                              >
                                Complete Task
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                ))}
                
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/tasks">
                    <Target className="w-4 h-4 mr-2" />
                    View All Tasks
                  </Link>
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