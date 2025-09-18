import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Gift, 
  Coffee, 
  Book, 
  Shirt, 
  Utensils, 
  Ticket, 
  Wallet, 
  Star,
  ShoppingBag,
  Users,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { useState } from "react";

const Rewards = () => {
  const [userPoints] = useState(2450);
  const [selectedReward, setSelectedReward] = useState(null);

  const categories = [
    { id: 'all', name: 'All Rewards', icon: Gift },
    { id: 'food', name: 'Food & Drinks', icon: Coffee },
    { id: 'stationery', name: 'Stationery', icon: Book },
    { id: 'apparel', name: 'Apparel', icon: Shirt },
    { id: 'experiences', name: 'Experiences', icon: Ticket },
  ];

  const rewards = [
    {
      id: 1,
      title: "Free Coffee & Pastry",
      description: "Enjoy a free coffee and pastry at Campus Café",
      points: 150,
      originalPrice: "$8",
      icon: Coffee,
      category: 'food',
      vendor: "Campus Café",
      stock: 45,
      rating: 4.8,
      reviews: 156,
      image: "☕",
      validityDays: 30,
      popular: true
    },
    {
      id: 2,
      title: "Eco-Friendly Notebook Set",
      description: "Set of 3 recycled paper notebooks with plantable covers",
      points: 200,
      originalPrice: "$15",
      icon: Book,
      category: 'stationery',
      vendor: "Green Supplies Co.",
      stock: 23,
      rating: 4.9,
      reviews: 89,
      image: "📓",
      validityDays: 60,
      popular: false
    },
    {
      id: 3,
      title: "Sustainable T-Shirt",
      description: "100% organic cotton t-shirt with environmental message",
      points: 400,
      originalPrice: "$25",
      icon: Shirt,
      category: 'apparel',
      vendor: "EcoWear",
      stock: 12,
      rating: 4.7,
      reviews: 234,
      image: "👕",
      validityDays: 90,
      popular: true
    },
    {
      id: 4,
      title: "Campus Lunch Voucher",
      description: "Free lunch at any participating campus restaurant",
      points: 300,
      originalPrice: "$12",
      icon: Utensils,
      category: 'food',
      vendor: "Campus Dining",
      stock: 67,
      rating: 4.6,
      reviews: 445,
      image: "🍽️",
      validityDays: 14,
      popular: true
    },
    {
      id: 5,
      title: "Movie Theater Tickets",
      description: "Two tickets to any movie at Metro Cinema",
      points: 500,
      originalPrice: "$24",
      icon: Ticket,
      category: 'experiences',
      vendor: "Metro Cinema",
      stock: 8,
      rating: 4.8,
      reviews: 167,
      image: "🎬",
      validityDays: 45,
      popular: false
    },
    {
      id: 6,
      title: "Reusable Water Bottle",
      description: "Insulated stainless steel bottle with EcoVerse branding",
      points: 180,
      originalPrice: "$20",
      icon: Coffee,
      category: 'stationery',
      vendor: "EcoVerse Store",
      stock: 34,
      rating: 4.9,
      reviews: 78,
      image: "🍶",
      validityDays: 120,
      popular: false
    }
  ];

  const recentRedemptions = [
    { title: "Free Coffee & Pastry", date: "2 days ago", points: 150 },
    { title: "Eco Notebook Set", date: "1 week ago", points: 200 },
    { title: "Campus Lunch", date: "2 weeks ago", points: 300 },
  ];

  const RewardCard = ({ reward }) => {
    const canAfford = userPoints >= reward.points;
    
    return (
      <Card className={`hover:shadow-[var(--shadow-card)] transition-all hover:scale-[1.02] group relative ${
        !canAfford ? 'opacity-60' : ''
      }`}>
        {reward.popular && (
          <div className="absolute -top-2 -right-2 z-10">
            <Badge className="bg-eco-yellow text-foreground px-3 py-1 rounded-full shadow-md">
              <Star className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          </div>
        )}
        
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="text-4xl">{reward.image}</div>
              <div className="flex-1">
                <CardTitle className="text-lg group-hover:text-eco-mint transition-colors">
                  {reward.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{reward.vendor}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-eco-yellow" />
                    <span className="text-sm font-medium">{reward.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">({reward.reviews})</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">{reward.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-eco-mint/20 text-eco-mint font-semibold">
                  {reward.points} pts
                </Badge>
                <span className="text-sm text-muted-foreground line-through">
                  {reward.originalPrice}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <ShoppingBag className="w-3 h-3" />
                  {reward.stock} left
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {reward.validityDays} days
                </div>
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant={canAfford ? "reward" : "outline"} 
                  size="sm"
                  disabled={!canAfford}
                  onClick={() => setSelectedReward(reward)}
                  className="group-hover:scale-105 transition-transform"
                >
                  <Gift className="w-4 h-4 mr-2" />
                  {canAfford ? 'Redeem' : 'Need More'}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <span className="text-3xl">{reward.image}</span>
                    Redeem Reward
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-muted/50 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{reward.title}</h3>
                    <p className="text-muted-foreground mb-4">{reward.description}</p>
                    <div className="flex items-center justify-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Wallet className="w-4 h-4 text-eco-mint" />
                        <span className="font-semibold">{reward.points} points</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>Valid {reward.validityDays} days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Your Points:</span>
                      <span className="font-semibold">{userPoints}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost:</span>
                      <span className="font-semibold text-eco-mint">{reward.points}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Remaining:</span>
                      <span className={userPoints - reward.points >= 0 ? 'text-eco-success' : 'text-destructive'}>
                        {userPoints - reward.points}
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="success" 
                    className="w-full" 
                    disabled={!canAfford}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Confirm Redemption
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
          <h1 className="text-4xl font-bold bg-gradient-to-r from-eco-yellow to-eco-peach bg-clip-text text-transparent">
            Rewards Store
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Exchange your GreenPoints for amazing rewards from local partners and eco-friendly brands!
          </p>
        </div>

        {/* Points Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-eco-mint/10 to-transparent border-eco-mint/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-eco-mint rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-eco-mint mb-2">{userPoints.toLocaleString()}</div>
              <div className="text-muted-foreground">Available Points</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-eco-blue/10 to-transparent border-eco-blue/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-eco-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-eco-blue mb-2">12</div>
              <div className="text-muted-foreground">Rewards Redeemed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-eco-violet/10 to-transparent border-eco-violet/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-eco-violet rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-eco-violet mb-2">500+</div>
              <div className="text-muted-foreground">Partner Outlets</div>
            </CardContent>
          </Card>
        </div>

        {/* How it Works */}
        <Card className="bg-gradient-to-r from-eco-yellow/10 to-eco-peach/10 border-eco-yellow/20">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-eco-yellow" />
              How Rewards Work
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-eco-yellow rounded-full flex items-center justify-center text-white font-bold">1</div>
                <span>Choose your reward and click redeem</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-eco-peach rounded-full flex items-center justify-center text-white font-bold">2</div>
                <span>Receive digital voucher or QR code</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-eco-mint rounded-full flex items-center justify-center text-white font-bold">3</div>
                <span>Show at partner outlet to claim</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Rewards Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {rewards.map(reward => (
                <RewardCard key={reward.id} reward={reward} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map(category => (
                  <Button 
                    key={category.id} 
                    variant="ghost" 
                    className="w-full justify-start"
                  >
                    <category.icon className="w-4 h-4 mr-3" />
                    {category.name}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Redemptions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-3">
                  <Clock className="w-5 h-5 text-eco-blue" />
                  Recent Redemptions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentRedemptions.map((redemption, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div>
                      <p className="font-medium text-sm">{redemption.title}</p>
                      <p className="text-xs text-muted-foreground">{redemption.date}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      -{redemption.points} pts
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-eco-mint via-eco-blue to-eco-violet text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Need More Points?</h3>
            <p className="text-lg mb-6 opacity-90">
              Complete more eco-tasks to earn points and unlock amazing rewards!
            </p>
            <Button variant="secondary" size="lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Explore Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;