
import { Link } from "react-router-dom";
import { Github, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-10">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-mindbloom-400 to-mindbloom-600">
                <div className="absolute inset-1 rounded-full bg-white dark:bg-gray-900 flex items-center justify-center">
                  <div className="h-2 w-2 bg-gradient-to-r from-mindbloom-500 to-mindbloom-700 rounded-full"></div>
                </div>
              </div>
              <span className="font-semibold text-lg">
                <span className="font-normal">Mind</span>
                <span className="text-mindbloom-600 dark:text-mindbloom-400">Bloom</span>
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              MindBloom helps you understand and improve your mental wellbeing through evidence-based
              psychological assessments and personalized guidance.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="mailto:info@mindbloom.example"
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary">
                  Assessment
                </Link>
              </li>
              <li>
                <Link to="/chat" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary">
                  Chat Support
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary hover:dark:text-primary">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1">
            Made with <Heart className="h-3 w-3 text-red-500" /> by MindBloom
            <span className="mx-2">•</span>
            © {new Date().getFullYear()} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
