import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Leaf, Award, TrendingUp, Users, Sparkles, Recycle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-students.jpg";
import ecoMascot from "@/assets/eco-mascot.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={ecoMascot} alt="EcoVerse Mascot" className="w-10 h-10 animate-bounce-gentle" />
            <h1 className="text-xl font-bold text-primary">EcoVerse</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth">Login</Link>
            </Button>
            <Button variant="hero" size="lg" asChild>
              <Link to="/auth">Get Started <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-eco-mint/10 text-eco-mint px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                From Eco Actions to Career Milestones!
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-eco-mint via-eco-blue to-eco-violet bg-clip-text text-transparent">
                Turn Green Actions into Careers!
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join the green revolution! Complete eco-friendly tasks, earn GreenPoints, unlock rewards, and build your sustainable career path with real credentials.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/auth">
                    Start Your Journey <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="xl">
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-eco-mint/20 to-eco-blue/20 rounded-3xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="Students engaging in eco-friendly activities" 
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-eco-yellow p-3 rounded-full animate-float">
                <Leaf className="w-6 h-6 text-foreground" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-eco-peach p-3 rounded-full animate-float" style={{ animationDelay: '1s' }}>
                <Recycle className="w-6 h-6 text-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">How EcoVerse Works</h2>
            <p className="text-lg text-muted-foreground">Three simple steps to transform your eco-actions into career opportunities</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="relative overflow-hidden bg-gradient-to-br from-eco-mint/10 to-transparent border-eco-mint/20 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-eco-mint rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Complete Eco-Tasks</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Participate in tree planting, recycling drives, sustainable transport, and campus green initiatives
                </p>
                <div className="absolute top-4 right-4 w-8 h-8 bg-eco-mint/20 rounded-full flex items-center justify-center text-eco-mint font-bold">1</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-eco-blue/10 to-transparent border-eco-blue/20 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-eco-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Earn GreenPoints</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get rewarded with points for every sustainable action, build streaks, and unlock achievement badges
                </p>
                <div className="absolute top-4 right-4 w-8 h-8 bg-eco-blue/20 rounded-full flex items-center justify-center text-eco-blue font-bold">2</div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden bg-gradient-to-br from-eco-violet/10 to-transparent border-eco-violet/20 hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-eco-violet rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Redeem & Level Up</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Exchange points for rewards, earn certificates, and build your green career portfolio
                </p>
                <div className="absolute top-4 right-4 w-8 h-8 bg-eco-violet/20 rounded-full flex items-center justify-center text-eco-violet font-bold">3</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-scale-in">
              <div className="text-3xl font-bold text-eco-mint mb-2">10K+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl font-bold text-eco-blue mb-2">50K+</div>
              <div className="text-muted-foreground">Tasks Completed</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl font-bold text-eco-violet mb-2">500+</div>
              <div className="text-muted-foreground">Partner Outlets</div>
            </div>
            <div className="animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl font-bold text-eco-success mb-2">1M+</div>
              <div className="text-muted-foreground">Points Earned</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-eco-mint via-eco-blue to-eco-violet">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <div className="flex justify-center mb-6">
            <img src={ecoMascot} alt="EcoVerse Mascot" className="w-20 h-20 animate-bounce-gentle" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students building a sustainable future while advancing their careers</p>
          <Button variant="secondary" size="xl" asChild>
            <Link to="/auth">
              <Users className="w-5 h-5" />
              Join EcoVerse Today
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted/30 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={ecoMascot} alt="EcoVerse Mascot" className="w-8 h-8" />
                <h3 className="font-bold text-primary">EcoVerse</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Transforming environmental education through gamification and real-world rewards.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/tasks" className="hover:text-primary transition-colors">Eco-Tasks</Link></li>
                <li><Link to="/rewards" className="hover:text-primary transition-colors">Rewards</Link></li>
                <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/community" className="hover:text-primary transition-colors">Discussion</Link></li>
                <li><Link to="/leaderboard" className="hover:text-primary transition-colors">Leaderboard</Link></li>
                <li><Link to="/events" className="hover:text-primary transition-colors">Events</Link></li>
                <li><Link to="/mentors" className="hover:text-primary transition-colors">Mentors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 EcoVerse. Building a sustainable future, one action at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;