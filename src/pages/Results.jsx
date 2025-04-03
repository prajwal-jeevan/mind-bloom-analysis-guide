
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ArrowRight, AlertCircle, BookOpen, BarChart3, Activity } from "lucide-react";

const getGeminiAnalysis = async (results) => {
  try {
    const API_KEY = "AIzaSyDfre4670HNfsJcpQe039hdZ43roymvbag";
    const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
    
    // Create formatted scores for better prompt context
    const categories = Object.keys(results.scores);
    const formattedScores = categories.map(category => {
      const score = results.scores[category];
      return `${category.toUpperCase()}: ${Math.round(score.percentage)}%`;
    }).join(", ");
    
    const prompt = `
      You are a professional psychological assessment analyst. Based on the following assessment results, provide a helpful, compassionate analysis and personalized advice.
      
      ASSESSMENT RESULTS:
      ${formattedScores}
      
      For each category (anxiety, depression, stress, focus), provide:
      1. A brief explanation of what this score might mean
      2. 2-3 practical, evidence-based strategies to improve in this area
      3. When someone should consider seeking professional help
      
      Format your response with clear headings, bullet points, and highlight the most important advice. Be compassionate, supportive, and educational in tone. Avoid making definitive diagnoses.
      
      End with a positive, encouraging message about the journey to mental wellness.
    `;
    
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
          maxOutputTokens: 2048,
        },
      }),
    });
    
    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }
    
    throw new Error("Invalid response format");
  } catch (error) {
    console.error("Error getting analysis:", error);
    return "We couldn't generate a personalized analysis at this time. Please try again later.";
  }
};

// Function to convert gemini text to formatted HTML
const formatAnalysisText = (text) => {
  if (!text) return "";
  
  // Replace headings
  let formatted = text
    .replace(/^# (.*?)$/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
    .replace(/^## (.*?)$/gm, '<h3 class="text-xl font-semibold mt-5 mb-2">$1</h3>')
    .replace(/^### (.*?)$/gm, '<h4 class="text-lg font-medium mt-4 mb-2">$1</h4>');
  
  // Replace bullet points
  formatted = formatted.replace(/^\* (.*?)$/gm, '<li class="ml-5 list-disc my-1">$1</li>');
  formatted = formatted.replace(/^\- (.*?)$/gm, '<li class="ml-5 list-disc my-1">$1</li>');
  
  // Replace numbered lists
  formatted = formatted.replace(/^\d+\. (.*?)$/gm, '<li class="ml-5 list-decimal my-1">$1</li>');
  
  // Add paragraph tags
  formatted = formatted.replace(/^(?!<h|<li)(.*?)$/gm, function(match) {
    if (match.trim() === '') return '';
    return `<p class="my-2">${match}</p>`;
  });
  
  // Highlight important phrases
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary">$1</span>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  return formatted;
};

const ResultsPage = () => {
  const [results, setResults] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [formattedAnalysis, setFormattedAnalysis] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedResults = sessionStorage.getItem('assessmentResults');
    
    if (!storedResults) {
      navigate('/assessment');
      return;
    }
    
    setResults(JSON.parse(storedResults));
    setIsLoading(false);
  }, [navigate]);
  
  useEffect(() => {
    const fetchAnalysis = async () => {
      if (results) {
        setIsLoading(true);
        const analysisText = await getGeminiAnalysis(results);
        setAnalysis(analysisText);
        setFormattedAnalysis(formatAnalysisText(analysisText));
        setIsLoading(false);
      }
    };
    
    fetchAnalysis();
  }, [results]);
  
  if (isLoading) {
    return (
      <div className="pt-28 pb-16 min-h-screen">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded mb-4 max-w-md mx-auto"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 max-w-sm mx-auto"></div>
              <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!results) {
    return null;
  }
  
  // Prepare chart data
  const barChartData = Object.keys(results.scores).map(category => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    score: Math.round(results.scores[category].percentage),
  }));
  
  const radarChartData = barChartData.map(item => ({
    subject: item.name,
    score: item.score,
    fullMark: 100,
  }));
  
  // Get interpretation levels
  const getCategoryLevel = (category, percentage) => {
    if (category === 'focus') {
      // For focus, higher is better
      if (percentage >= 75) return { level: "Excellent", color: "text-green-500" };
      if (percentage >= 50) return { level: "Good", color: "text-blue-500" };
      if (percentage >= 25) return { level: "Fair", color: "text-yellow-500" };
      return { level: "Needs Improvement", color: "text-red-500" };
    } else {
      // For anxiety, depression, stress - lower is better
      if (percentage <= 25) return { level: "Low", color: "text-green-500" };
      if (percentage <= 50) return { level: "Moderate", color: "text-yellow-500" };
      if (percentage <= 75) return { level: "High", color: "text-orange-500" };
      return { level: "Very High", color: "text-red-500" };
    }
  };
  
  return (
    <div className="pt-28 pb-16">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Your Assessment Results</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Here's a breakdown of your psychological assessment. Remember, this is not a clinical diagnosis 
              but an informative snapshot of your current mental wellbeing.
            </p>
          </div>
          
          <Tabs defaultValue="charts" className="mb-8">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="charts" className="gap-2">
                <BarChart3 className="h-4 w-4" /> Charts
              </TabsTrigger>
              <TabsTrigger value="analysis" className="gap-2">
                <Activity className="h-4 w-4" /> Analysis
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="gap-2">
                <BookOpen className="h-4 w-4" /> Recommendations
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="charts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Score Breakdown</CardTitle>
                    <CardDescription>Visual representation of your scores by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Score']}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              borderRadius: '0.5rem',
                              borderColor: '#e2e8f0',
                            }}
                          />
                          <Bar 
                            dataKey="score" 
                            fill="rgba(46, 125, 255, 0.7)"
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Mental Wellness Profile</CardTitle>
                    <CardDescription>Overview of your mental wellness dimensions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart outerRadius="80%" data={radarChartData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="subject" />
                          <PolarRadiusAxis domain={[0, 100]} />
                          <Radar 
                            name="Score" 
                            dataKey="score" 
                            stroke="rgba(46, 125, 255, 0.8)" 
                            fill="rgba(46, 125, 255, 0.5)" 
                            animationDuration={1500}
                          />
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Score']}
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              borderRadius: '0.5rem',
                              borderColor: '#e2e8f0',
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Scores</CardTitle>
                  <CardDescription>Numerical breakdown of your assessment results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.keys(results.scores).map(category => {
                      const score = Math.round(results.scores[category].percentage);
                      const { level, color } = getCategoryLevel(category, score);
                      return (
                        <div key={category} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </div>
                          <div className="text-3xl font-bold mb-1">{score}%</div>
                          <div className={`text-sm font-medium ${color}`}>{level}</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
              
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Note</AlertTitle>
                <AlertDescription>
                  This assessment is for informational purposes only and is not a substitute for professional 
                  psychological or medical advice, diagnosis, or treatment. If you're experiencing severe symptoms,
                  please consult with a healthcare professional.
                </AlertDescription>
              </Alert>
            </TabsContent>
            
            <TabsContent value="analysis">
              <Card>
                <CardHeader>
                  <CardTitle>Your Personalized Analysis</CardTitle>
                  <CardDescription>
                    Based on your assessment results, here's an analysis of your current mental wellbeing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ) : (
                    <div 
                      className="analysis-content prose max-w-none dark:prose-invert prose-headings:text-primary"
                      dangerouslySetInnerHTML={{ __html: formattedAnalysis }}
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Recommendations</CardTitle>
                  <CardDescription>
                    Based on your assessment, here are some strategies that may help improve your mental wellbeing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.keys(results.scores).map(category => {
                        const score = Math.round(results.scores[category].percentage);
                        const { level, color } = getCategoryLevel(category, score);
                        return (
                          <div key={category} className="pb-4 border-b last:border-0">
                            <h3 className="text-lg font-medium flex items-center gap-2">
                              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                              <span className={`text-sm ${color}`}>{level} ({score}%)</span>
                            </h3>
                            <p className="mt-2 mb-3">
                              {category === 'anxiety' && (
                                <>Based on your anxiety score, we recommend focusing on stress reduction techniques and mindfulness practices.</>
                              )}
                              {category === 'depression' && (
                                <>Your depression score suggests maintaining regular self-care routines and staying connected with supportive people.</>
                              )}
                              {category === 'stress' && (
                                <>To manage your stress levels, consider implementing boundaries and regular relaxation techniques.</>
                              )}
                              {category === 'focus' && (
                                <>To enhance your focus, try incorporating structured time management and minimizing distractions.</>
                              )}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                              {category === 'anxiety' && (
                                <>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                    <h4 className="font-medium mb-1">Deep Breathing</h4>
                                    <p className="text-sm">Practice 4-7-8 breathing: inhale for 4 counts, hold for 7, exhale for 8.</p>
                                  </div>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                    <h4 className="font-medium mb-1">Progressive Muscle Relaxation</h4>
                                    <p className="text-sm">Tense and then release each muscle group to reduce physical tension.</p>
                                  </div>
                                </>
                              )}
                              {category === 'depression' && (
                                <>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                    <h4 className="font-medium mb-1">Behavioral Activation</h4>
                                    <p className="text-sm">Schedule enjoyable activities, even when motivation is low.</p>
                                  </div>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                    <h4 className="font-medium mb-1">Morning Sunlight</h4>
                                    <p className="text-sm">Get 15-30 minutes of morning sunlight to regulate your circadian rhythm.</p>
                                  </div>
                                </>
                              )}
                              {category === 'stress' && (
                                <>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                    <h4 className="font-medium mb-1">Time Boundaries</h4>
                                    <p className="text-sm">Set clear work/personal life boundaries and stick to them.</p>
                                  </div>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                    <h4 className="font-medium mb-1">Nature Exposure</h4>
                                    <p className="text-sm">Spend time in natural settings to reduce cortisol levels.</p>
                                  </div>
                                </>
                              )}
                              {category === 'focus' && (
                                <>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                    <h4 className="font-medium mb-1">Pomodoro Technique</h4>
                                    <p className="text-sm">Work in focused 25-minute intervals with 5-minute breaks.</p>
                                  </div>
                                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                                    <h4 className="font-medium mb-1">Digital Minimalism</h4>
                                    <p className="text-sm">Reduce notifications and schedule specific times to check email/messages.</p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      
                      <Alert className="mt-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>When to Seek Professional Help</AlertTitle>
                        <AlertDescription>
                          If you're experiencing persistent symptoms that interfere with your daily life, or if you have thoughts of harming yourself or others, please reach out to a mental health professional immediately.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-10 flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/assessment')} className="rounded-full">
              Retake Assessment
            </Button>
            <Button onClick={() => navigate('/chat')} className="rounded-full">
              Chat with AI Support <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
