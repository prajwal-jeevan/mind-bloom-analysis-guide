
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, RefreshCw, AlertCircle, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Function to get response from Gemini API
const getGeminiResponse = async (messageHistory) => {
  try {
    const API_KEY = "AIzaSyDfre4670HNfsJcpQe039hdZ43roymvbag";
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    
    // Format the message history for the API
    const formattedMessages = messageHistory.map(msg => ({
      role: msg.isUser ? "user" : "model",
      parts: [{ text: msg.content }]
    }));
    
    // Add system prompt at the beginning
    formattedMessages.unshift({
      role: "user",
      parts: [{ 
        text: `You are MindBloom AI, a supportive mental health assistant. Your purpose is to provide empathetic guidance, evidence-based strategies, and educational information about mental wellness.

        Guidelines:
        - Be warm, compassionate and supportive in your responses
        - Provide practical, evidence-based strategies when appropriate
        - Highlight important points with **bold text**
        - Format your responses with clear structure using simple markdown (headings, bullet points)
        - If someone appears to be in crisis, gently encourage them to seek professional help
        - When relevant, suggest specific self-care practices, mindfulness techniques, or cognitive strategies
        - Focus on mental wellness topics like stress, anxiety, mood, focus, sleep, and resilience
        - Keep responses concise and well-structured
        - Acknowledge that you're not a replacement for professional mental health care

        Important: If someone seems to be in immediate danger to themselves or others, always prioritize their safety by directing them to emergency services, crisis hotlines, or advising them to speak with a mental health professional immediately.` 
      }]
    });
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: formattedMessages,
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 1024,
        },
      }),
    });
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    return "I'm sorry, I'm having trouble responding right now. Please try again in a moment.";
  }
};

// Function to format markdown-like text to JSX
const formatMessage = (text) => {
  if (!text) return "";
  
  // Split by new lines and process each line
  return text.split("\n").map((line, i) => {
    // Headings
    if (line.startsWith("# ")) {
      return <h2 key={i} className="text-xl font-bold mt-4 mb-2">{line.substring(2)}</h2>;
    }
    if (line.startsWith("## ")) {
      return <h3 key={i} className="text-lg font-semibold mt-3 mb-2">{line.substring(3)}</h3>;
    }
    
    // Bullet points
    if (line.startsWith("* ") || line.startsWith("- ")) {
      return <li key={i} className="ml-5 list-disc my-1">{line.substring(2)}</li>;
    }
    
    // Numbered lists
    if (/^\d+\.\s/.test(line)) {
      return <li key={i} className="ml-5 list-decimal my-1">{line.substring(line.indexOf(".") + 2)}</li>;
    }
    
    // Bold text
    let processedLine = line;
    if (line.includes("**")) {
      // Need to do this via regex to handle multiple bold sections in one line
      processedLine = processedLine.replace(
        /\*\*(.*?)\*\*/g, 
        (_, p1) => `<strong class="text-primary font-semibold">${p1}</strong>`
      );
    }
    
    // If line is empty, return a spacer
    if (line.trim() === "") {
      return <div key={i} className="h-2"></div>;
    }
    
    // Regular paragraph
    return <p key={i} className="my-1" dangerouslySetInnerHTML={{ __html: processedLine }}></p>;
  });
};

const suggestedPrompts = [
  "What are some quick ways to reduce anxiety?",
  "How can I improve my focus throughout the day?",
  "What are signs I should talk to a professional?",
  "Can you suggest a 5-minute mindfulness exercise?",
  "How can I improve my sleep quality?",
  "What are good strategies for managing stress?",
];

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      content: "Hello! I'm your mental wellness assistant. How can I support you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);
  const { toast } = useToast();
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      content: input.trim(),
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsProcessing(true);
    
    try {
      // Get message history for context (limit to last 10 messages)
      const messageHistory = [...messages.slice(-10), userMessage];
      
      // Get AI response
      const aiResponse = await getGeminiResponse(messageHistory);
      
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          content: aiResponse,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleReset = () => {
    setMessages([
      {
        id: 1,
        content: "Hello! I'm your mental wellness assistant. How can I support you today?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  };
  
  const handleSuggestedPrompt = (prompt) => {
    setInput(prompt);
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Chat Support</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Chat with our AI assistant for mental wellness guidance and support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <Card className="border-gray-200 dark:border-gray-700 h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                    <AvatarFallback className="bg-primary text-primary-foreground">MB</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">MindBloom Assistant</CardTitle>
                    <CardDescription>AI-powered mental wellness support</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-hidden p-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pt-1 pb-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex w-full",
                          message.isUser ? "justify-end" : "justify-start"
                        )}
                      >
                        <div
                          className={cn(
                            "flex max-w-[80%] rounded-lg px-4 py-3",
                            message.isUser
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <div className="flex gap-3">
                            {!message.isUser && (
                              <Avatar className="h-6 w-6 mt-1">
                                <AvatarFallback className="bg-primary/20 text-primary">
                                  <Bot className="h-3 w-3" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <div className={message.isUser ? "text-white" : ""}>
                              {message.isUser ? message.content : formatMessage(message.content)}
                            </div>
                            {message.isUser && (
                              <Avatar className="h-6 w-6 mt-1">
                                <AvatarFallback className="bg-white text-primary">
                                  <User className="h-3 w-3" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isProcessing && (
                      <div className="flex justify-start">
                        <div className="flex max-w-[80%] rounded-lg px-4 py-3 bg-muted">
                          <div className="flex gap-3 items-center">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="bg-primary/20 text-primary">
                                <Bot className="h-3 w-3" />
                              </AvatarFallback>
                            </Avatar>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="text-sm text-gray-500">Thinking...</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>
              
              <CardFooter className="pt-3 pb-4 border-t">
                <form className="flex w-full gap-2" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                  <Textarea
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-10 resize-none"
                    disabled={isProcessing}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={isProcessing || !input.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Actions</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm mb-2" 
                  onClick={handleReset}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Reset Conversation
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Suggested Topics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className="w-full justify-start text-sm h-auto py-2 px-3"
                      onClick={() => handleSuggestedPrompt(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Important</AlertTitle>
              <AlertDescription className="text-xs">
                This is an AI assistant and not a substitute for professional mental health care. If you're experiencing a crisis, please contact emergency services or a mental health professional.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
