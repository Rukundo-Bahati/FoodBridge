import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, UtensilsCrossed, Home, Users, Calendar, Bell, BarChart3, MessageSquare, Settings, LogOut, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const isLandingPage = location.pathname === "/";

  const authenticatedNavigationItems = [
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Log Food", path: "/log-food", icon: UtensilsCrossed },
    { name: "Matches", path: "/matches", icon: Users },
    { name: "Schedule", path: "/schedule", icon: Calendar },
    { name: "Notifications", path: "/notifications", icon: Bell },
    { name: "Impact", path: "/impact", icon: BarChart3 },
    { name: "Community", path: "/community", icon: MessageSquare },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`${isLandingPage ? 'bg-background/95 backdrop-blur-md border-b border-border/50' : 'bg-background border-b border-border'} sticky top-0 z-50`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl">
            <UtensilsCrossed className={`${isLandingPage ? 'h-8 w-8' : 'h-6 w-6'} text-primary`} />
            <span className={isLandingPage ? 'text-gradient' : ''}>Food Bridge</span>
          </Link>

        {/* Desktop Navigation */}
<div className="hidden md:flex items-center space-x-4">
  {!isLandingPage && isAuthenticated && (
    <>
      {authenticatedNavigationItems.map((item) => {
        const Icon = item.icon;
        return (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </>
  )}

  {!isLandingPage && isAuthenticated ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={`https://avatar.vercel.sh/${user?.email}`} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" asChild className={isLandingPage ? "text-blue-950 hover:text-green-600 hover:bg-white/10" : ""}>
        <Link to="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Log in
        </Link>
      </Button>
      <Button asChild className={isLandingPage ? "bg-white text-primary hover:bg-white/90" : ""}>
        <Link to="/signup">
          <UserPlus className="mr-2 h-4 w-4" />
          Sign up
        </Link>
      </Button>
    </div>
  )}
</div>


          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className={isLandingPage ? "text-white" : ""}>
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-2 mt-8">
                {isAuthenticated && !isLandingPage && (
                  <>
                    {authenticatedNavigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.name}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                            location.pathname === item.path
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </>
                )}
                {isAuthenticated ? (
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Log out</span>
                  </Button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      <LogIn className="h-5 w-5" />
                      <span>Log in</span>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span>Sign up</span>
                    </Link>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
