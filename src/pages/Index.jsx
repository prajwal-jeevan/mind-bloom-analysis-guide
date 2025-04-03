
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Activity, BarChart3, Heart, CheckCircle2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const features = [
  {
    icon: <Brain className="h-10 w-10 text-mindbloom-500" />,
    title: "Psychological Assessment",
    description: "Take our comprehensive psychological assessment to gain insights into your mental wellbeing."
  },
  {
    icon: <Activity className="h-10 w-10 text-mindbloom-500" />,
    title: "Personal Analysis",
    description: "Receive a detailed analysis of your mental health based on established psychological frameworks."
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-mindbloom-500" />,
    title: "Visual Results",
    description: "View your results through easy-to-understand charts and graphs that highlight key areas."
  },
  {
    icon: <Heart className="h-10 w-10 text-mindbloom-500" />,
    title: "Personalized Guidance",
    description: "Get tailored recommendations and strategies to improve your mental wellbeing."
  }
];

const testimonials = [
  {
    quote: "MindBloom helped me understand my anxiety patterns in a way no other tool has before.",
    author: "Sarah J.",
    title: "Teacher"
  },
  {
    quote: "The assessment was eye-opening. I now have concrete steps to improve my mental health.",
    author: "Michael T.",
    title: "Software Engineer"
  },
  {
    quote: "I appreciate how the results were presented - clear, supportive, and actionable.",
    author: "Anita R.",
    title: "Healthcare Professional"
  }
];

const resources = [
  {
    title: "Understanding Cognitive Biases",
    description: "Learn how cognitive biases affect your perception and decision-making.",
    link: "/resources"
  },
  {
    title: "Mindfulness Techniques",
    description: "Discover practical mindfulness techniques for everyday mental wellness.",
    link: "/resources"
  },
  {
    title: "Emotional Intelligence",
    description: "Explore how emotional intelligence contributes to psychological wellbeing.",
    link: "/resources"
  }
];

const Index = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative hero-pattern py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Understand Your Mind. <span className="text-highlight">Unlock Your Potential.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 animate-fade-in animate-delay-100">
              Gain insights into your psychological wellbeing through our
              evidence-based assessment and receive personalized guidance for growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-200">
              <Button size="lg" className="rounded-full whitespace-normal px-6 py-2 h-auto" asChild>
                <Link to="/assessment">
                  <span className="flex items-center">
                    Take Assessment <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                  </span>
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="rounded-full whitespace-normal px-6 py-2 h-auto" asChild>
                <Link to="/resources">
                  <span className="flex items-center">
                    Learn More
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Floating illustration */}
          <div className="mt-16 max-w-4xl mx-auto relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl animate-float">
              <div className="aspect-[16/9] bg-gradient-to-tr from-mindbloom-100 via-lavender-200 to-calm-300 rounded-lg flex items-center justify-center p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  {["Anxiety", "Depression", "Focus", "Stress"].map((label, i) => (
                    <div 
                      key={label}
                      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg p-4 shadow-sm animate-fade-in`}
                      style={{ animationDelay: `${(i + 1) * 100}ms` }}
                    >
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-2 bg-gradient-to-r from-mindbloom-400 to-mindbloom-600 rounded-full"
                          style={{ width: `${(i + 1) * 20}%` }}
                        ></div>
                      </div>
                      <div className="mt-2 text-center text-sm font-medium">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 bg-gradient-to-tr from-mindbloom-300 to-mindbloom-500 rounded-full blur-xl opacity-50"></div>
            <div className="absolute -top-5 -left-5 h-20 w-20 bg-gradient-to-tr from-lavender-300 to-lavender-500 rounded-full blur-xl opacity-50"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How MindBloom Works</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our comprehensive approach to psychological assessment combines clinical expertise
              with modern technology to deliver personalized insights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 card-hover">
                <CardHeader className="pb-2 px-6 pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold mb-6">The Assessment Process</h3>
            <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-0">
              {[
                { step: 1, title: "Take Assessment", icon: <CheckCircle2 className="h-6 w-6" /> },
                { step: 2, title: "Get Analysis", icon: <BarChart3 className="h-6 w-6" /> },
                { step: 3, title: "Receive Guidance", icon: <BookOpen className="h-6 w-6" /> },
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 z-10">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                  </div>
                  <h4 className="font-medium">{item.title}</h4>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 gradient-bg">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Thousands of people have gained insights into their mental wellbeing with MindBloom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-md card-hover">
                <CardContent className="pt-6 px-6 pb-6">
                  <div className="mb-4 text-mindbloom-500">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className="text-2xl">★</span>
                    ))}
                  </div>
                  <p className="mb-4 italic text-gray-700 dark:text-gray-300">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Preview */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Learn & Grow</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore our collection of resources designed to help you understand and improve your mental wellbeing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="card-hover border border-gray-200 dark:border-gray-700">
                <CardHeader className="px-6 pt-6">
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription className="mt-2">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 pb-6">
                  <Button variant="outline" asChild>
                    <Link to={resource.link}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-mindbloom-600 dark:bg-mindbloom-800 text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to understand your mind better?</h2>
            <p className="mb-8">
              Take our comprehensive psychological assessment and get personalized insights and guidance.
            </p>
            <Button size="lg" variant="secondary" className="rounded-full whitespace-normal px-6 py-2 h-auto" asChild>
              <Link to="/assessment">
                <span className="flex items-center">
                  Start Assessment <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
