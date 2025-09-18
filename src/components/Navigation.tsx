import { Button } from "@/components/ui/button";
import { 
  Home, 
  Target, 
  Gift, 
  GraduationCap, 
  Users, 
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ecoMascot from "@/assets/eco-mascot.png";

const Navigation = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/tasks", label: "Eco-Tasks", icon: Target },
    { href: "/rewards", label: "Rewards", icon: Gift },
    { href: "/careers", label: "Careers", icon: GraduationCap },
    { href: "/community", label: "Community", icon: Users },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src={ecoMascot} alt="EcoVerse Mascot" className="w-10 h-10 animate-bounce-gentle" />
          <h1 className="text-xl font-bold text-primary">EcoVerse</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={isActive(item.href) ? "default" : "ghost"}
              asChild
              className={`${isActive(item.href) ? 'bg-eco-mint text-white' : ''}`}
            >
              <Link to={item.href} className="flex items-center gap-2">
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="ml-2 text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={isActive(item.href) ? "default" : "ghost"}
                asChild
                className={`w-full justify-start ${isActive(item.href) ? 'bg-eco-mint text-white' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to={item.href} className="flex items-center gap-3">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
            <Button
              variant="ghost"
              className="w-full justify-start text-destructive"
              onClick={() => {
                setIsMobileMenuOpen(false);
                signOut();
              }}
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;