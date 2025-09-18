import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface UserProfile {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  level: number;
  total_points: number;
  current_streak: number;
  tasks_completed: number;
  badges_earned: number;
  campus_rank: number;
  created_at: string;
  updated_at: string;
}

export interface EcoTask {
  id: string;
  title: string;
  description: string;
  points: number;
  difficulty: string;
  time_estimate: string | null;
  category: string;
  task_type: string;
  icon_name: string | null;
  is_featured: boolean;
  event_date: string | null;
  max_participants: number | null;
  created_at: string;
  updated_at: string;
}

export interface TaskCompletion {
  id: string;
  user_id: string;
  task_id: string;
  completed_at: string;
  proof_image_url: string | null;
  reflection: string | null;
  points_earned: number;
  verified: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement_type: string;
  requirement_value: number;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  badge: Badge;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  points_required: number;
  original_price: string | null;
  vendor: string;
  category: string;
  stock: number;
  rating: number | null;
  reviews_count: number;
  image_emoji: string | null;
  validity_days: number;
  is_popular: boolean;
  created_at: string;
  updated_at: string;
}

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [tasks, setTasks] = useState<EcoTask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskCompletion[]>([]);
  const [userBadges, setUserBadges] = useState<UserBadge[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user profile
  const fetchProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch all eco tasks
  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('eco_tasks')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Fetch user's completed tasks
  const fetchCompletedTasks = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_task_completions')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      setCompletedTasks(data);
    } catch (error) {
      console.error('Error fetching completed tasks:', error);
    }
  };

  // Fetch user badges
  const fetchUserBadges = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_badges')
        .select(`
          *,
          badge:badges(*)
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      setUserBadges(data);
    } catch (error) {
      console.error('Error fetching user badges:', error);
    }
  };

  // Fetch rewards
  const fetchRewards = async () => {
    try {
      const { data, error } = await supabase
        .from('rewards')
        .select('*')
        .order('points_required', { ascending: true });
      
      if (error) throw error;
      setRewards(data);
    } catch (error) {
      console.error('Error fetching rewards:', error);
    }
  };

  // Complete a task
  const completeTask = async (taskId: string, reflection?: string, proofImageUrl?: string) => {
    if (!user) return { error: 'User not authenticated' };
    
    try {
      // Get task points
      const task = tasks.find(t => t.id === taskId);
      if (!task) return { error: 'Task not found' };
      
      // Insert task completion
      const { error: completionError } = await supabase
        .from('user_task_completions')
        .insert({
          user_id: user.id,
          task_id: taskId,
          points_earned: task.points,
          reflection,
          proof_image_url: proofImageUrl,
        });
      
      if (completionError) throw completionError;
      
      // Update user profile stats
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          total_points: (profile?.total_points || 0) + task.points,
          tasks_completed: (profile?.tasks_completed || 0) + 1,
          current_streak: (profile?.current_streak || 0) + 1,
        })
        .eq('user_id', user.id);
      
      if (profileError) throw profileError;
      
      // Refresh data
      await Promise.all([
        fetchProfile(),
        fetchCompletedTasks(),
      ]);
      
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  // Redeem reward
  const redeemReward = async (rewardId: string) => {
    if (!user || !profile) return { error: 'User not authenticated' };
    
    try {
      const reward = rewards.find(r => r.id === rewardId);
      if (!reward) return { error: 'Reward not found' };
      
      if (profile.total_points < reward.points_required) {
        return { error: 'Insufficient points' };
      }
      
      // Generate redemption code
      const redemptionCode = Math.random().toString(36).substring(2, 15).toUpperCase();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + reward.validity_days);
      
      // Insert redemption
      const { error: redemptionError } = await supabase
        .from('user_reward_redemptions')
        .insert({
          user_id: user.id,
          reward_id: rewardId,
          points_spent: reward.points_required,
          redemption_code: redemptionCode,
          expires_at: expiresAt.toISOString(),
        });
      
      if (redemptionError) throw redemptionError;
      
      // Update user points
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          total_points: profile.total_points - reward.points_required,
        })
        .eq('user_id', user.id);
      
      if (profileError) throw profileError;
      
      // Update reward stock
      const { error: stockError } = await supabase
        .from('rewards')
        .update({
          stock: Math.max(0, reward.stock - 1),
        })
        .eq('id', rewardId);
      
      if (stockError) throw stockError;
      
      // Refresh data
      await Promise.all([
        fetchProfile(),
        fetchRewards(),
      ]);
      
      return { error: null, redemptionCode };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([
        fetchTasks(),
        fetchRewards(),
      ]);
      
      if (user) {
        await Promise.all([
          fetchProfile(),
          fetchCompletedTasks(),
          fetchUserBadges(),
        ]);
      }
      
      setLoading(false);
    };
    
    loadData();
  }, [user]);

  return {
    profile,
    tasks,
    completedTasks,
    userBadges,
    rewards,
    loading,
    completeTask,
    redeemReward,
    refreshProfile: fetchProfile,
  };
};