import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../lib/auth-context";
import { useTheme } from "../lib/theme-provider";
import { useLanguage } from "../lib/language-provider";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Moon, Sun, Globe, LogOut } from "lucide-react";

export function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const isPublicRoute = !user;
  const isDonor = user?.role === "donor";
  const isRecipient = user?.role === "recipient";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="text-xl font-bold"
            onClick={() => navigate("/")}
          >
            {t("app.name")}
          </Button>
        </div>

        <div className="flex-1" />

        {isPublicRoute ? (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/login")}>
              {t("nav.login")}
            </Button>
            <Button onClick={() => navigate("/signup")}>
              {t("nav.signup")}
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            {isDonor && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/donor/dashboard")}
                >
                  {t("nav.dashboard")}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/donor/log-food")}
                >
                  {t("nav.logFood")}
                </Button>
              </>
            )}
            {isRecipient && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/recipient/dashboard")}
                >
                  {t("nav.dashboard")}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => navigate("/recipient/search")}
                >
                  {t("nav.search")}
                </Button>
              </>
            )}
          </div>
        )}

        <div className="flex items-center space-x-4 ml-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Globe className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage("en")}>
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("es")}>
                      Español
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("fr")}>
                      Français
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change Language</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      {theme === "dark" ? (
                        <Moon className="h-5 w-5" />
                      ) : (
                        <Sun className="h-5 w-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {!isPublicRoute && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleLogout}>
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Logout</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
    </nav>
  );
}
