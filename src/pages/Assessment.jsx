
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

// Sample questions for the psychological assessment
const questions = [
  {
    id: 1,
    category: "anxiety",
    question: "How often do you feel nervous, anxious, or on edge?",
    tooltip: "Consider your experiences over the past two weeks",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 2,
    category: "depression",
    question: "How often do you feel down, depressed, or hopeless?",
    tooltip: "Consider your experiences over the past two weeks",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 3,
    category: "stress",
    question: "How often have you felt that you were unable to control the important things in your life?",
    tooltip: "Consider your experiences over the past month",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Almost never" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Fairly often" },
      { value: 4, label: "Very often" }
    ]
  },
  {
    id: 4,
    category: "anxiety",
    question: "How often do you find yourself worrying too much about different things?",
    tooltip: "Consider your general tendency",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 5,
    category: "depression",
    question: "How often do you have little interest or pleasure in doing things?",
    tooltip: "Consider your experiences over the past two weeks",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 6,
    category: "stress",
    question: "How often have you felt that things were going your way?",
    tooltip: "This is a positively phrased question. Consider your experiences over the past month",
    options: [
      { value: 4, label: "Never" },
      { value: 3, label: "Almost never" },
      { value: 2, label: "Sometimes" },
      { value: 1, label: "Fairly often" },
      { value: 0, label: "Very often" }
    ]
  },
  {
    id: 7,
    category: "focus",
    question: "How often do you have trouble keeping your mind on what you're doing?",
    tooltip: "Consider your general experiences",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very often" }
    ]
  },
  {
    id: 8,
    category: "anxiety",
    question: "How often do you have trouble relaxing?",
    tooltip: "Consider your experiences over the past two weeks",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 9,
    category: "depression",
    question: "How often do you feel tired or have little energy?",
    tooltip: "Consider your experiences over the past two weeks",
    options: [
      { value: 0, label: "Not at all" },
      { value: 1, label: "Several days" },
      { value: 2, label: "More than half the days" },
      { value: 3, label: "Nearly every day" }
    ]
  },
  {
    id: 10,
    category: "focus",
    question: "How often do you find yourself easily distracted by things around you?",
    tooltip: "Consider your general experiences",
    options: [
      { value: 0, label: "Never" },
      { value: 1, label: "Rarely" },
      { value: 2, label: "Sometimes" },
      { value: 3, label: "Often" },
      { value: 4, label: "Very often" }
    ]
  }
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const totalQuestions = questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      toast({
        title: "Please select an answer",
        description: "You need to select an option before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleAnswer = (value) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: {
        value,
        category: questions[currentQuestion].category
      }
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Calculate scores by category
    const scores = {};
    
    // Initialize categories
    const categories = ['anxiety', 'depression', 'stress', 'focus'];
    categories.forEach(category => {
      scores[category] = { 
        sum: 0, 
        count: 0,
        max: 0
      };
    });
    
    // Sum up scores by category
    Object.values(answers).forEach(answer => {
      const { category, value } = answer;
      scores[category].sum += value;
      scores[category].count += 1;
      
      // Find the maximum possible score for this question
      const questionData = questions.find(q => q.category === category);
      if (questionData) {
        const maxValue = Math.max(...questionData.options.map(opt => opt.value));
        scores[category].max += maxValue;
      }
    });
    
    // Calculate percentages
    categories.forEach(category => {
      if (scores[category].count > 0) {
        scores[category].percentage = (scores[category].sum / scores[category].max) * 100;
      } else {
        scores[category].percentage = 0;
      }
    });
    
    // Store results in sessionStorage
    sessionStorage.setItem('assessmentResults', JSON.stringify({
      scores,
      answers,
      timestamp: new Date().toISOString()
    }));
    
    // Navigate to results page
    setTimeout(() => {
      navigate('/results');
    }, 1000);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Psychological Assessment</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Answer each question honestly based on your experiences. Your responses will help generate personalized insights.
          </p>
        </div>

        <Card className="mb-6 shadow-md">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Question {currentQuestion + 1} of {totalQuestions}
              </div>
              <div className="text-sm font-medium text-primary">
                {Math.round(progress)}% Complete
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent className="pt-4">
            <div className="mb-6">
              <div className="flex items-start gap-2 mb-6">
                <h2 className="text-xl font-medium">{questions[currentQuestion].question}</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
                        <HelpCircle className="h-4 w-4" />
                        <span className="sr-only">More info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{questions[currentQuestion].tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <RadioGroup 
                value={answers[questions[currentQuestion].id]?.value?.toString()} 
                onValueChange={(value) => handleAnswer(parseInt(value, 10))}
                className="space-y-3"
              >
                {questions[currentQuestion].options.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <RadioGroupItem 
                      id={`option-${option.value}`} 
                      value={option.value.toString()}
                      className="cursor-pointer"
                    />
                    <Label 
                      htmlFor={`option-${option.value}`}
                      className="w-full cursor-pointer py-2 text-base"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8 flex-wrap gap-4 sm:flex-nowrap">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            disabled={currentQuestion === 0}
            className="rounded-lg px-4 py-2 flex items-center w-full sm:w-auto"
            size="lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isSubmitting}
            className="rounded-lg px-4 py-2 flex items-center w-full sm:w-auto"
            size="lg"
          >
            {currentQuestion < totalQuestions - 1 ? (
              <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              isSubmitting ? "Submitting..." : "Submit"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;
