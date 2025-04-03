
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative h-9 w-9 rounded-full bg-gradient-to-r from-mindbloom-400 to-mindbloom-600 animate-pulse-slow">
            <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className="h-3 w-3 bg-gradient-to-r from-mindbloom-500 to-mindbloom-700 rounded-full"></div>
            </div>
          </div>
          <span className="hidden sm:inline-block font-semibold text-xl">
            <span className="font-normal">Mind</span>
            <span className="text-mindbloom-600 dark:text-mindbloom-400">Bloom</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={cn(
              "text-sm font-medium transition-colors",
              location.pathname === "/"
                ? "text-mindbloom-600 dark:text-mindbloom-400"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to="/assessment"
            className={cn(
              "text-sm font-medium transition-colors",
              location.pathname === "/assessment"
                ? "text-mindbloom-600 dark:text-mindbloom-400"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Assessment
          </Link>
          <Link
            to="/chat"
            className={cn(
              "text-sm font-medium transition-colors",
              location.pathname === "/chat"
                ? "text-mindbloom-600 dark:text-mindbloom-400"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Chat Support
          </Link>
          <Link
            to="/resources"
            className={cn(
              "text-sm font-medium transition-colors",
              location.pathname === "/resources"
                ? "text-mindbloom-600 dark:text-mindbloom-400"
                : "text-foreground/70 hover:text-foreground"
            )}
          >
            Resources
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "rounded-full"
            )}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <Link
            to="/assessment"
            className={cn(
              buttonVariants(),
              "hidden sm:flex rounded-full"
            )}
          >
            Take Assessment
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden rounded-full"
            )}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-lg animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <Link
              to="/"
              className={cn(
                "py-2 text-sm font-medium transition-colors",
                location.pathname === "/"
                  ? "text-mindbloom-600 dark:text-mindbloom-400"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Home
            </Link>
            <Link
              to="/assessment"
              className={cn(
                "py-2 text-sm font-medium transition-colors",
                location.pathname === "/assessment"
                  ? "text-mindbloom-600 dark:text-mindbloom-400"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Assessment
            </Link>
            <Link
              to="/chat"
              className={cn(
                "py-2 text-sm font-medium transition-colors",
                location.pathname === "/chat"
                  ? "text-mindbloom-600 dark:text-mindbloom-400"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Chat Support
            </Link>
            <Link
              to="/resources"
              className={cn(
                "py-2 text-sm font-medium transition-colors",
                location.pathname === "/resources"
                  ? "text-mindbloom-600 dark:text-mindbloom-400"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Resources
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
