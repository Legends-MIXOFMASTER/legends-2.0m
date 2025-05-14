
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Course({ courseId }: { courseId: string }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentModule, setCurrentModule] = useState(0);
  const [progress, setProgress] = useState(0);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      setCourse(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load course",
        variant: "destructive",
      });
    }
  };

  const handleQuizSubmit = async (answers: number[]) => {
    try {
      const response = await fetch(`/api/courses/${courseId}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleId: course.modules[currentModule].id, answers }),
      });

      if (response.ok) {
        setProgress((prev) => prev + (100 / course.modules.length));
        if (currentModule < course.modules.length - 1) {
          setCurrentModule((prev) => prev + 1);
        } else {
          toast({
            title: "Congratulations!",
            description: "You've completed the course!",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quiz",
        variant: "destructive",
      });
    }
  };

  if (!user?.isEmailVerified) {
    return (
      <div className="p-8">
        <Card>
          <CardContent>
            <p className="text-center py-4">Please verify your email to access the course.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <Progress value={progress} className="mb-8" />
      {course && (
        <Card>
          <CardHeader>
            <CardTitle>{course.title} - Module {currentModule + 1}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ 
              __html: course.modules[currentModule].content 
            }} />
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const answers = Array.from(formData.values()).map(Number);
              handleQuizSubmit(answers);
            }}>
              {course.modules[currentModule].quiz.map((question: any, idx: number) => (
                <div key={idx} className="mb-6">
                  <h4 className="mb-4">{question.question}</h4>
                  <RadioGroup name={`question-${idx}`}>
                    {question.options.map((option: string, optIdx: number) => (
                      <div key={optIdx} className="flex items-center space-x-2">
                        <RadioGroupItem value={optIdx.toString()} id={`q${idx}-opt${optIdx}`} />
                        <label htmlFor={`q${idx}-opt${optIdx}`}>{option}</label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
