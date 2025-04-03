
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-6 flex justify-center">
          <div className="relative h-24 w-24 rounded-full bg-gradient-to-r from-mindbloom-400 to-mindbloom-600 animate-pulse-slow">
            <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
              <div className="h-5 w-5 bg-gradient-to-r from-mindbloom-500 to-mindbloom-700 rounded-full"></div>
            </div>
          </div>
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted, 
          or perhaps it never existed in the first place.
        </p>
        <Button asChild>
          <Link to="/" className="gap-2">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
