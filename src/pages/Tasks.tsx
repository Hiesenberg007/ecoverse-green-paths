import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  Upload,
  Target
} from "lucide-react";
import { useUserData } from "@/hooks/useUserData";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const Tasks = () => {
  const { user } = useAuth();
  const { profile, tasks, completedTasks, loading, completeTask } = useUserData();
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

  const completedTaskIds = new Set(completedTasks.map(ct => ct.task_id));
  
  const dailyTasks = tasks.filter(task => task.task_type === 'daily');
  const weeklyTasks = tasks.filter(task => task.task_type === 'weekly');  
  const specialEvents = tasks.filter(task => task.task_type === 'event');

  function getIconComponent(iconName: string | null) {
    const iconMap: { [key: string]: any } = {
      Droplets: Droplets,
      MapPin: MapPin,
      Recycle: Recycle,
      Leaf: Leaf,
      Users: Users,
      Bike: Bike,
      TreePine: TreePine,
      Sun: Sun,
    };
    return iconMap[iconName || 'Target'] || Target;
  }

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

  const TaskCard = ({ task, showDate = false }) => {
    const IconComponent = getIconComponent(task.icon_name);
    const isCompleted = completedTaskIds.has(task.id);
    
    return (
      <Card className="hover:shadow-[var(--shadow-card)] transition-all hover:scale-[1.02] group">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                task.is_featured ? 'bg-gradient-to-br from-eco-yellow to-eco-peach' : 
                isCompleted ? 'bg-eco-success/20' : 'bg-eco-mint/20'
              }`}>
                <IconComponent className={`w-6 h-6 ${
                  task.is_featured ? 'text-white' : 
                  isCompleted ? 'text-eco-success' : 'text-eco-mint'
                }`} />
              </div>
              <div className="flex-1">
                <CardTitle className={`text-lg transition-colors ${
                  isCompleted ? 'line-through text-muted-foreground' : 'group-hover:text-eco-mint'
                }`}>
                  {task.title}
                  {task.is_featured && <Star className="inline w-4 h-4 ml-2 text-eco-yellow" />}
                </CardTitle>
                {showDate && task.event_date && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(task.event_date).toLocaleDateString()}
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
            {task.time_estimate && (
              <Badge variant="outline" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {task.time_estimate}
              </Badge>
            )}
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
              {completedTasks.filter(ct => ct.task_id === task.id).length} completed
            </div>
            <div className="flex gap-2">
              {isCompleted ? (
                <Badge variant="secondary" className="bg-eco-success/20 text-eco-success">
                  Completed
                </Badge>
              ) : (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="eco" 
                      size="sm" 
                      className="group-hover:scale-105 transition-transform"
                      onClick={() => setSelectedTask(task)}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Join Task
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 text-eco-mint" />
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
          </div>
        </CardContent>
      </Card>
    );
  };

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
              <div className="text-2xl font-bold text-eco-mint">{profile?.tasks_completed || 0}</div>
              <div className="text-sm text-muted-foreground">Tasks Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-eco-blue/10 to-eco-blue/5 border-eco-blue/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-eco-blue">{profile?.current_streak || 0}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-eco-violet/10 to-eco-violet/5 border-eco-violet/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-eco-violet">{profile?.total_points?.toLocaleString() || 0}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-eco-yellow/10 to-eco-yellow/5 border-eco-yellow/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-eco-yellow">#{profile?.campus_rank || 0}</div>
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