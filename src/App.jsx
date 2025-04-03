
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import Assessment from "@/pages/Assessment";
import Results from "@/pages/Results";
import Chat from "@/pages/Chat";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/NotFound";

// Create a new query client
const queryClient = new QueryClient();

// Make sure App is defined as a regular function component, not an arrow function
function App() {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="light" storageKey="mindbloom-theme">
          <TooltipProvider>
            {/* Use the Toaster component from sonner directly */}
            <Toaster position="top-right" richColors />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/assessment" element={<Assessment />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </React.Fragment>
  );
}

export default App;
