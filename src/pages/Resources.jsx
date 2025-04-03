
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, BookOpen, FileText, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    id: 1,
    title: "Understanding Anxiety: Causes, Symptoms, and Management",
    description: "Learn about the biological and psychological factors that contribute to anxiety disorders and effective strategies for managing symptoms.",
    category: "anxiety",
    readTime: "8 min read",
    date: "Apr 2, 2025",
    image: "https://images.unsplash.com/photo-1631015045972-f03bd561d5af?q=80&w=400&h=250&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "The Science of Stress: How It Affects Your Mind and Body",
    description: "Explore the physiological mechanisms of the stress response and its impact on physical and mental health over time.",
    category: "stress",
    readTime: "10 min read",
    date: "Mar 28, 2025",
    image: "https://images.unsplash.com/photo-1541199249251-f713e6145474?q=80&w=400&h=250&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Mindfulness Meditation: A Beginner's Guide",
    description: "A step-by-step introduction to mindfulness meditation practices that can help reduce stress and improve focus.",
    category: "mindfulness",
    readTime: "7 min read",
    date: "Mar 25, 2025",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=400&h=250&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Cognitive Behavioral Therapy: Principles and Applications",
    description: "An overview of cognitive behavioral therapy techniques and how they can be applied to various mental health challenges.",
    category: "therapy",
    readTime: "12 min read",
    date: "Mar 20, 2025",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=400&h=250&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Building Emotional Resilience in Challenging Times",
    description: "Strategies for developing emotional resilience to better navigate life's difficulties and bounce back from setbacks.",
    category: "resilience",
    readTime: "9 min read",
    date: "Mar 15, 2025",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=400&h=250&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "The Connection Between Sleep and Mental Health",
    description: "Explore the bidirectional relationship between sleep quality and mental wellbeing, with practical tips for better sleep.",
    category: "sleep",
    readTime: "8 min read",
    date: "Mar 10, 2025",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=400&h=250&auto=format&fit=crop"
  }
];

const exercises = [
  {
    id: 1,
    title: "5-Minute Breathing Exercise",
    description: "A quick breathing technique to help calm your nervous system and reduce anxiety in the moment.",
    category: "anxiety",
    duration: "5 minutes",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Progressive Muscle Relaxation",
    description: "A systematic technique for releasing tension throughout your body to reduce physical symptoms of stress.",
    category: "stress",
    duration: "15 minutes",
    difficulty: "Beginner"
  },
  {
    id: 3,
    title: "Body Scan Meditation",
    description: "A mindfulness practice where you systematically bring attention to different parts of your body.",
    category: "mindfulness",
    duration: "20 minutes",
    difficulty: "Intermediate"
  },
  {
    id: 4,
    title: "Thought Record Exercise",
    description: "A cognitive behavioral technique for identifying and challenging unhelpful thoughts.",
    category: "therapy",
    duration: "10 minutes",
    difficulty: "Intermediate"
  },
  {
    id: 5,
    title: "Gratitude Journaling Practice",
    description: "A structured approach to cultivating gratitude through daily reflective writing.",
    category: "resilience",
    duration: "5 minutes",
    difficulty: "Beginner"
  },
  {
    id: 6,
    title: "Sleep Hygiene Checklist",
    description: "A practical checklist to optimize your sleeping environment and habits for better rest.",
    category: "sleep",
    duration: "N/A",
    difficulty: "Beginner"
  }
];

const externalResources = [
  {
    id: 1,
    title: "National Institute of Mental Health",
    description: "Comprehensive information about mental health conditions, research, and treatments.",
    url: "https://www.nimh.nih.gov/",
    category: "Official"
  },
  {
    id: 2,
    title: "Mental Health America",
    description: "Resources for mental health screening, education, and finding help.",
    url: "https://www.mhanational.org/",
    category: "Nonprofit"
  },
  {
    id: 3,
    title: "Crisis Text Line",
    description: "Free 24/7 support for those in crisis via text message.",
    url: "https://www.crisistextline.org/",
    category: "Crisis Support"
  },
  {
    id: 4,
    title: "Headspace",
    description: "Guided meditation app for mindfulness and stress reduction.",
    url: "https://www.headspace.com/",
    category: "App"
  },
  {
    id: 5,
    title: "Psychology Today Therapist Finder",
    description: "Directory to find mental health professionals in your area.",
    url: "https://www.psychologytoday.com/us/therapists",
    category: "Directory"
  },
  {
    id: 6,
    title: "National Suicide Prevention Lifeline",
    description: "24/7 support for people in distress and suicide prevention.",
    url: "https://suicidepreventionlifeline.org/",
    category: "Crisis Support"
  }
];

const getCategoryColor = (category) => {
  const colors = {
    anxiety: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    stress: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    mindfulness: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    therapy: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    resilience: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    sleep: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    Official: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    Nonprofit: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    "Crisis Support": "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
    App: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    Directory: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300"
  };
  
  return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
};

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredExercises = exercises.filter(exercise => 
    exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredExternalResources = externalResources.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="pt-28 pb-16">
      <div className="container">
        <div className="max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl font-bold mb-4">Mental Wellness Resources</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Explore our collection of articles, exercises, and external resources to help you understand and improve your mental wellbeing.
          </p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input 
              type="search" 
              placeholder="Search resources..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="articles" className="mb-12">
          <TabsList className="w-full max-w-lg grid grid-cols-3 mx-auto mb-8">
            <TabsTrigger value="articles" className="gap-2">
              <FileText className="h-4 w-4" /> Articles
            </TabsTrigger>
            <TabsTrigger value="exercises" className="gap-2">
              <CheckCircle className="h-4 w-4" /> Exercises
            </TabsTrigger>
            <TabsTrigger value="external" className="gap-2">
              <ExternalLink className="h-4 w-4" /> External Resources
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map(article => (
                  <Card key={article.id} className="overflow-hidden card-hover">
                    <div className="aspect-video relative bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=400&h=250&auto=format&fit=crop";
                        }}
                      />
                      <Badge 
                        className={`absolute bottom-3 left-3 ${getCategoryColor(article.category)}`}
                      >
                        {article.category}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                        <span>{article.readTime}</span>
                        <span>{article.date}</span>
                      </div>
                      <CardTitle className="line-clamp-2">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <CardDescription className="line-clamp-3 mb-4">{article.description}</CardDescription>
                      <Button variant="ghost" className="p-0 h-auto" asChild>
                        <Link to={`/resources/${article.id}`}>
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <BookOpen className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No articles found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search query</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="exercises">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.length > 0 ? (
                filteredExercises.map(exercise => (
                  <Card key={exercise.id} className="card-hover h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={getCategoryColor(exercise.category)}>
                          {exercise.category}
                        </Badge>
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-medium">{exercise.difficulty}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{exercise.duration}</span>
                        </div>
                      </div>
                      <CardTitle>{exercise.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4 flex-grow">
                      <CardDescription className="mb-4">{exercise.description}</CardDescription>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/resources/exercise/${exercise.id}`}>
                          Start Exercise
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <CheckCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No exercises found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search query</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="external">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExternalResources.length > 0 ? (
                filteredExternalResources.map(resource => (
                  <Card key={resource.id} className="card-hover">
                    <CardHeader>
                      <Badge className={getCategoryColor(resource.category)} className="w-fit mb-2">
                        {resource.category}
                      </Badge>
                      <CardTitle>{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <CardDescription className="mb-4">{resource.description}</CardDescription>
                      <Button variant="outline" size="sm" className="gap-1" asChild>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <ExternalLink className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-1">No external resources found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search query</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Personalized Support?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Take our assessment to get insights tailored to your specific needs, or chat with our AI assistant
            for personalized guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/assessment">Take Assessment</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/chat">Chat Support</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
