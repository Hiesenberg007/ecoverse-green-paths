-- Create user profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  level integer DEFAULT 1,
  total_points integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  tasks_completed integer DEFAULT 0,
  badges_earned integer DEFAULT 0,
  campus_rank integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create eco_tasks table
CREATE TABLE public.eco_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  points integer NOT NULL,
  difficulty text CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  time_estimate text,
  category text NOT NULL,
  task_type text CHECK (task_type IN ('daily', 'weekly', 'event')),
  icon_name text,
  is_featured boolean DEFAULT false,
  event_date timestamp with time zone,
  max_participants integer,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create user_task_completions table
CREATE TABLE public.user_task_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id uuid NOT NULL REFERENCES public.eco_tasks(id) ON DELETE CASCADE,
  completed_at timestamp with time zone DEFAULT now(),
  proof_image_url text,
  reflection text,
  points_earned integer NOT NULL,
  verified boolean DEFAULT false,
  UNIQUE(user_id, task_id)
);

-- Create badges table
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text NOT NULL,
  icon text NOT NULL,
  requirement_type text NOT NULL,
  requirement_value integer NOT NULL,
  created_at timestamp with time zone DEFAULT now()
);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_id uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create rewards table
CREATE TABLE public.rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  points_required integer NOT NULL,
  original_price text,
  vendor text NOT NULL,
  category text NOT NULL,
  stock integer DEFAULT 0,
  rating decimal(2,1),
  reviews_count integer DEFAULT 0,
  image_emoji text,
  validity_days integer DEFAULT 30,
  is_popular boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create user_reward_redemptions table
CREATE TABLE public.user_reward_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reward_id uuid NOT NULL REFERENCES public.rewards(id) ON DELETE CASCADE,
  points_spent integer NOT NULL,
  redemption_code text NOT NULL,
  redeemed_at timestamp with time zone DEFAULT now(),
  expires_at timestamp with time zone NOT NULL,
  is_used boolean DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eco_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reward_redemptions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for eco_tasks
CREATE POLICY "Anyone can view eco_tasks" ON public.eco_tasks FOR SELECT USING (true);

-- Create RLS policies for user_task_completions
CREATE POLICY "Users can view their own completions" ON public.user_task_completions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own completions" ON public.user_task_completions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own completions" ON public.user_task_completions FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for badges
CREATE POLICY "Anyone can view badges" ON public.badges FOR SELECT USING (true);

-- Create RLS policies for user_badges
CREATE POLICY "Users can view their own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for rewards
CREATE POLICY "Anyone can view rewards" ON public.rewards FOR SELECT USING (true);

-- Create RLS policies for user_reward_redemptions
CREATE POLICY "Users can view their own redemptions" ON public.user_reward_redemptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own redemptions" ON public.user_reward_redemptions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_eco_tasks_updated_at BEFORE UPDATE ON public.eco_tasks FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_rewards_updated_at BEFORE UPDATE ON public.rewards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample eco tasks
INSERT INTO public.eco_tasks (title, description, points, difficulty, time_estimate, category, task_type, icon_name) VALUES
('Bring Your Own Water Bottle', 'Skip single-use plastic and bring a reusable water bottle to campus', 50, 'Easy', 'All day', 'Daily Habits', 'daily', 'Droplets'),
('Use Public Transport', 'Take the bus, train, or carpool to reduce carbon emissions', 75, 'Easy', '30 min', 'Transportation', 'daily', 'MapPin'),
('Digital Receipt Only', 'Choose digital receipts instead of paper when shopping', 25, 'Easy', '2 min', 'Digital', 'daily', 'Recycle'),
('Plant Care Check-in', 'Water and care for your plants or campus greenery', 30, 'Easy', '15 min', 'Gardening', 'daily', 'Leaf'),
('Campus Clean-up Drive', 'Join the weekly campus clean-up and make our environment better', 200, 'Medium', '2 hours', 'Community', 'weekly', 'Users'),
('Bike to Campus Week', 'Cycle to campus for 5 days this week', 300, 'Medium', 'Week long', 'Transportation', 'weekly', 'Bike'),
('Zero Waste Challenge', 'Produce zero waste for an entire day', 250, 'Hard', '24 hours', 'Challenge', 'weekly', 'Recycle'),
('Earth Day Tree Planting', 'Join us for a massive tree planting event in the city park', 500, 'Medium', '4 hours', 'Event', 'event', 'TreePine'),
('Solar Panel Workshop', 'Learn about renewable energy and help install solar panels', 400, 'Hard', '6 hours', 'Learning', 'event', 'Sun');

-- Insert sample badges
INSERT INTO public.badges (name, description, icon, requirement_type, requirement_value) VALUES
('Tree Hugger', 'Planted 10 trees', '🌳', 'trees_planted', 10),
('Recycle Champion', 'Sorted 50kg waste', '♻️', 'waste_sorted', 50),
('Green Streak', '10-day streak', '🔥', 'streak_days', 10),
('Eco Warrior', 'Completed 50 tasks', '⚡', 'tasks_completed', 50),
('Earth Defender', 'Earned 5000 points', '🌍', 'total_points', 5000);

-- Insert sample rewards
INSERT INTO public.rewards (title, description, points_required, original_price, vendor, category, stock, rating, reviews_count, image_emoji, validity_days, is_popular) VALUES
('Free Coffee & Pastry', 'Enjoy a free coffee and pastry at Campus Café', 150, '$8', 'Campus Café', 'food', 45, 4.8, 156, '☕', 30, true),
('Eco-Friendly Notebook Set', 'Set of 3 recycled paper notebooks with plantable covers', 200, '$15', 'Green Supplies Co.', 'stationery', 23, 4.9, 89, '📓', 60, false),
('Sustainable T-Shirt', '100% organic cotton t-shirt with environmental message', 400, '$25', 'EcoWear', 'apparel', 12, 4.7, 234, '👕', 90, true),
('Campus Lunch Voucher', 'Free lunch at any participating campus restaurant', 300, '$12', 'Campus Dining', 'food', 67, 4.6, 445, '🍽️', 14, true),
('Movie Theater Tickets', 'Two tickets to any movie at Metro Cinema', 500, '$24', 'Metro Cinema', 'experiences', 8, 4.8, 167, '🎬', 45, false),
('Reusable Water Bottle', 'Insulated stainless steel bottle with EcoVerse branding', 180, '$20', 'EcoVerse Store', 'stationery', 34, 4.9, 78, '🍶', 120, false);