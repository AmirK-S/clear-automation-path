import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, CheckCircle2, ArrowLeft, ArrowRight, Target, Zap, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const step1Schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  company: z.string().min(2, "Company name is required").max(100),
  industry: z.string().min(1, "Please select your industry"),
  teamSize: z.string().min(1, "Please select team size"),
});

const step2Schema = z.object({
  challenges: z.array(z.string()).min(1, "Please select at least one challenge"),
  biggestTimeConsumer: z.string().min(10, "Please tell us what takes the most time").max(200),
});

const step3Schema = z.object({
  automationWish: z.string().min(10, "Please tell us what you'd like to automate").max(150),
  timeline: z.string().min(1, "Please select a timeline"),
  additionalNotes: z.string().max(200).optional(),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;
type FormData = Step1Data & Step2Data & Step3Data;

const STORAGE_KEY = "gapScanFormData";

interface MultiStepGapScanFormProps {
  onSuccess: () => void;
}

const MultiStepGapScanForm = ({ onSuccess }: MultiStepGapScanFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({});
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  const challengeOptions = [
    "Too much manual data entry",
    "Repetitive admin tasks",
    "Slow customer response times",
    "Missing sales opportunities",
    "Team spending time on boring work",
    "Inconsistent processes",
    "Information scattered everywhere",
    "Other",
  ];

  const industries = [
    "Technology/Software",
    "Professional Services",
    "E-commerce/Retail",
    "Healthcare",
    "Finance/Banking",
    "Manufacturing",
    "Real Estate",
    "Marketing/Advertising",
    "Education",
    "Other",
  ];

  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(parsed);
      if (parsed.challenges) {
        setSelectedChallenges(parsed.challenges);
      }
    }
  }, []);

  // Save data on change
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
  }, [formData]);

  const step1Form = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: formData as Step1Data,
  });

  const step2Form = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      challenges: formData.challenges || [],
      biggestTimeConsumer: formData.biggestTimeConsumer || "",
    },
  });

  const step3Form = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      automationWish: formData.automationWish || "",
      timeline: formData.timeline || "",
      additionalNotes: formData.additionalNotes || "",
    },
  });

  const handleStep1Next = step1Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
    window.scrollTo({ top: document.getElementById("gap-scan")?.offsetTop, behavior: "smooth" });
  });

  const handleStep2Next = step2Form.handleSubmit((data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
    window.scrollTo({ top: document.getElementById("gap-scan")?.offsetTop, behavior: "smooth" });
  });

  const handleFinalSubmit = step3Form.handleSubmit(async (data) => {
    const finalData = { ...formData, ...data };
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", finalData);
    
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEY);
    
    setIsSubmitting(false);
    toast({
      title: "Got it! Analyzing your business...",
      description: "Check your email in the next 10 minutes.",
    });
    
    onSuccess();
  });

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: document.getElementById("gap-scan")?.offsetTop, behavior: "smooth" });
  };

  const toggleChallenge = (challenge: string) => {
    const updated = selectedChallenges.includes(challenge)
      ? selectedChallenges.filter((c) => c !== challenge)
      : [...selectedChallenges, challenge];
    setSelectedChallenges(updated);
    step2Form.setValue("challenges", updated);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  currentStep >= step
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step}
              </div>
              {step < 3 && (
                <div
                  className={`flex-1 h-1 mx-2 ${
                    currentStep > step ? "bg-accent" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm font-semibold">
          <span className={currentStep >= 1 ? "text-accent" : "text-muted-foreground"}>
            About You
          </span>
          <span className={currentStep >= 2 ? "text-accent" : "text-muted-foreground"}>
            Your Challenges
          </span>
          <span className={currentStep >= 3 ? "text-accent" : "text-muted-foreground"}>
            What You Want
          </span>
        </div>
      </div>

      {/* Step 1: About You */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Next} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-xl font-semibold text-primary">
              Your Name *
            </Label>
            <Input
              id="name"
              {...step1Form.register("name")}
              className="h-16 text-lg border-2"
              placeholder="John Smith"
              autoFocus
            />
            {step1Form.formState.errors.name && (
              <p className="text-destructive text-sm">{step1Form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-xl font-semibold text-primary">
              Email *
            </Label>
            <Input
              id="email"
              type="email"
              {...step1Form.register("email")}
              className="h-16 text-lg border-2"
              placeholder="john@company.com"
            />
            {step1Form.formState.errors.email && (
              <p className="text-destructive text-sm">{step1Form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="company" className="text-xl font-semibold text-primary">
              Company Name *
            </Label>
            <Input
              id="company"
              {...step1Form.register("company")}
              className="h-16 text-lg border-2"
              placeholder="Your Company"
            />
            {step1Form.formState.errors.company && (
              <p className="text-destructive text-sm">{step1Form.formState.errors.company.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="industry" className="text-xl font-semibold text-primary">
              Industry/Sector *
            </Label>
            <Select
              onValueChange={(value) => step1Form.setValue("industry", value)}
              defaultValue={formData.industry}
            >
              <SelectTrigger className="h-16 text-lg border-2">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 z-50">
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry} className="text-lg py-3 cursor-pointer">
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {step1Form.formState.errors.industry && (
              <p className="text-destructive text-sm">{step1Form.formState.errors.industry.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="teamSize" className="text-xl font-semibold text-primary">
              Team Size *
            </Label>
            <Select
              onValueChange={(value) => step1Form.setValue("teamSize", value)}
              defaultValue={formData.teamSize}
            >
              <SelectTrigger className="h-16 text-lg border-2">
                <SelectValue placeholder="Select team size" />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 z-50">
                <SelectItem value="just-me" className="text-lg py-3 cursor-pointer">
                  Just me
                </SelectItem>
                <SelectItem value="2-10" className="text-lg py-3 cursor-pointer">
                  2-10
                </SelectItem>
                <SelectItem value="11-50" className="text-lg py-3 cursor-pointer">
                  11-50
                </SelectItem>
                <SelectItem value="50+" className="text-lg py-3 cursor-pointer">
                  50+
                </SelectItem>
              </SelectContent>
            </Select>
            {step1Form.formState.errors.teamSize && (
              <p className="text-destructive text-sm">{step1Form.formState.errors.teamSize.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-16 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Next
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </form>
      )}

      {/* Step 2: Your Challenges */}
      {currentStep === 2 && (
        <form onSubmit={handleStep2Next} className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-xl text-foreground/80">Help me understand what's slowing you down</p>
          </div>

          <div className="space-y-4">
            <Label className="text-xl font-semibold text-primary">
              What challenges are you facing? (Select all that apply) *
            </Label>
            <div className="space-y-4">
              {challengeOptions.map((challenge) => (
                <div key={challenge} className="flex items-center space-x-3">
                  <Checkbox
                    id={challenge}
                    checked={selectedChallenges.includes(challenge)}
                    onCheckedChange={() => toggleChallenge(challenge)}
                    className="h-6 w-6"
                  />
                  <label
                    htmlFor={challenge}
                    className="text-lg cursor-pointer select-none"
                  >
                    {challenge}
                  </label>
                </div>
              ))}
            </div>
            {step2Form.formState.errors.challenges && (
              <p className="text-destructive text-sm">{step2Form.formState.errors.challenges.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="biggestTimeConsumer" className="text-xl font-semibold text-primary">
              What takes the MOST time in your business? *
            </Label>
            <Textarea
              id="biggestTimeConsumer"
              {...step2Form.register("biggestTimeConsumer")}
              className="min-h-32 text-lg border-2 resize-none"
              placeholder="e.g., Following up with leads, processing invoices, scheduling..."
              maxLength={200}
              autoFocus
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {step2Form.formState.errors.biggestTimeConsumer && (
                  <span className="text-destructive">
                    {step2Form.formState.errors.biggestTimeConsumer.message}
                  </span>
                )}
              </span>
              <span>{step2Form.watch("biggestTimeConsumer")?.length || 0}/200</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="h-16 px-8 text-lg font-semibold border-2"
            >
              <ArrowLeft className="mr-2 h-6 w-6" />
              Back
            </Button>
            <Button
              type="submit"
              className="flex-1 h-16 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Next
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: What You Want */}
      {currentStep === 3 && (
        <form onSubmit={handleFinalSubmit} className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-xl text-foreground/80">What would success look like?</p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="automationWish" className="text-xl font-semibold text-primary">
              If you could automate ONE thing tomorrow, what would it be? *
            </Label>
            <Textarea
              id="automationWish"
              {...step3Form.register("automationWish")}
              className="min-h-28 text-lg border-2 resize-none"
              placeholder="Tell us your biggest automation wish..."
              maxLength={150}
              autoFocus
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {step3Form.formState.errors.automationWish && (
                  <span className="text-destructive">
                    {step3Form.formState.errors.automationWish.message}
                  </span>
                )}
              </span>
              <span>{step3Form.watch("automationWish")?.length || 0}/150</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-xl font-semibold text-primary">What's your timeline? *</Label>
            <RadioGroup
              onValueChange={(value) => step3Form.setValue("timeline", value)}
              defaultValue={formData.timeline}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="exploring" id="exploring" className="h-5 w-5" />
                <Label htmlFor="exploring" className="text-lg cursor-pointer flex-1">
                  Exploring ideas
                </Label>
              </div>
              <div className="flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="3-months" id="3-months" className="h-5 w-5" />
                <Label htmlFor="3-months" className="text-lg cursor-pointer flex-1">
                  Next 3 months
                </Label>
              </div>
              <div className="flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="urgent" id="urgent" className="h-5 w-5" />
                <Label htmlFor="urgent" className="text-lg cursor-pointer flex-1">
                  Urgent need
                </Label>
              </div>
            </RadioGroup>
            {step3Form.formState.errors.timeline && (
              <p className="text-destructive text-sm">{step3Form.formState.errors.timeline.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="additionalNotes" className="text-xl font-semibold text-primary">
              Anything else I should know? (Optional)
            </Label>
            <Textarea
              id="additionalNotes"
              {...step3Form.register("additionalNotes")}
              className="min-h-28 text-lg border-2 resize-none"
              placeholder="Any additional context that would help..."
              maxLength={200}
            />
            <div className="text-right text-sm text-muted-foreground">
              {step3Form.watch("additionalNotes")?.length || 0}/200
            </div>
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="h-16 px-8 text-lg font-semibold border-2"
            >
              <ArrowLeft className="mr-2 h-6 w-6" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-16 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Send Me My Personalized Report"
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MultiStepGapScanForm;
