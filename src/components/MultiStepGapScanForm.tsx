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
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();

  const challengeOptions = [
    t("gapScan.challenge1"),
    t("gapScan.challenge2"),
    t("gapScan.challenge3"),
    t("gapScan.challenge4"),
    t("gapScan.challenge5"),
    t("gapScan.challenge6"),
    t("gapScan.challenge7"),
    t("gapScan.challenge8"),
  ];

  const industries = [
    t("industries.tech"),
    t("industries.consulting"),
    t("industries.ecommerce"),
    t("industries.healthcare"),
    t("industries.finance"),
    t("industries.manufacturing"),
    t("industries.realestate"),
    t("industries.education"),
    t("industries.marketing"),
    t("industries.legal"),
    t("industries.hospitality"),
    t("industries.construction"),
    t("industries.other"),
  ];

  const teamSizes = [
    t("teamSizes.solo"),
    t("teamSizes.small"),
    t("teamSizes.medium"),
    t("teamSizes.large"),
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
            {t("gapScan.step1Title")}
          </span>
          <span className={currentStep >= 2 ? "text-accent" : "text-muted-foreground"}>
            {t("gapScan.step2Title")}
          </span>
          <span className={currentStep >= 3 ? "text-accent" : "text-muted-foreground"}>
            {t("gapScan.step3Title")}
          </span>
        </div>
      </div>

      {/* Step 1: About You */}
      {currentStep === 1 && (
        <form onSubmit={handleStep1Next} className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="name" className="text-xl font-semibold text-primary">
              {t("gapScan.name")} *
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
              {t("gapScan.email")} *
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
              {t("gapScan.companyName")} *
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
              {t("gapScan.industry")} *
            </Label>
            <Select
              onValueChange={(value) => step1Form.setValue("industry", value)}
              defaultValue={formData.industry}
            >
              <SelectTrigger className="h-16 text-lg border-2">
                <SelectValue placeholder={t("gapScan.industryPlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 z-50">
                {industries.map((industry, idx) => (
                  <SelectItem key={idx} value={industry} className="text-lg py-3 cursor-pointer">
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
              {t("gapScan.teamSize")} *
            </Label>
            <Select
              onValueChange={(value) => step1Form.setValue("teamSize", value)}
              defaultValue={formData.teamSize}
            >
              <SelectTrigger className="h-16 text-lg border-2">
                <SelectValue placeholder={t("gapScan.teamSizePlaceholder")} />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 z-50">
                {teamSizes.map((size, idx) => (
                  <SelectItem key={idx} value={size} className="text-lg py-3 cursor-pointer">
                    {size}
                  </SelectItem>
                ))}
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
            {t("gapScan.next")}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </form>
      )}

      {/* Step 2: Your Challenges */}
      {currentStep === 2 && (
        <form onSubmit={handleStep2Next} className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-xl text-foreground/80">{t("gapScan.step2Intro")}</p>
          </div>

          <div className="space-y-4">
            <Label className="text-xl font-semibold text-primary">
              {t("gapScan.step2Intro")} *
            </Label>
            <div className="space-y-4">
              {challengeOptions.map((challenge, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <Checkbox
                    id={`challenge-${idx}`}
                    checked={selectedChallenges.includes(challenge)}
                    onCheckedChange={() => toggleChallenge(challenge)}
                    className="h-6 w-6"
                  />
                  <label
                    htmlFor={`challenge-${idx}`}
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
              {t("gapScan.mostTimeQuestion")} *
            </Label>
            <Textarea
              id="biggestTimeConsumer"
              {...step2Form.register("biggestTimeConsumer")}
              className="min-h-32 text-lg border-2 resize-none"
              placeholder={t("gapScan.mostTimePlaceholder")}
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
              {t("gapScan.back")}
            </Button>
            <Button
              type="submit"
              className="flex-1 h-16 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {t("gapScan.next")}
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </div>
        </form>
      )}

      {/* Step 3: What You Want */}
      {currentStep === 3 && (
        <form onSubmit={handleFinalSubmit} className="space-y-8">
          <div className="text-center mb-8">
            <p className="text-xl text-foreground/80">{t("gapScan.step3Intro")}</p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="automationWish" className="text-xl font-semibold text-primary">
              {t("gapScan.automateQuestion")} *
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
            <Label className="text-xl font-semibold text-primary">{t("gapScan.timelineQuestion")} *</Label>
            <RadioGroup
              onValueChange={(value) => step3Form.setValue("timeline", value)}
              defaultValue={formData.timeline}
              className="space-y-3"
            >
              <div className="flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="exploring" id="exploring" className="h-5 w-5" />
                <Label htmlFor="exploring" className="text-lg cursor-pointer flex-1">
                  {t("gapScan.timelineExploring")}
                </Label>
              </div>
              <div className="flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="3-months" id="3-months" className="h-5 w-5" />
                <Label htmlFor="3-months" className="text-lg cursor-pointer flex-1">
                  {t("gapScan.timeline3Months")}
                </Label>
              </div>
              <div className="flex items-center space-x-3 border-2 rounded-lg p-4 cursor-pointer hover:bg-muted/50">
                <RadioGroupItem value="urgent" id="urgent" className="h-5 w-5" />
                <Label htmlFor="urgent" className="text-lg cursor-pointer flex-1">
                  {t("gapScan.timelineUrgent")}
                </Label>
              </div>
            </RadioGroup>
            {step3Form.formState.errors.timeline && (
              <p className="text-destructive text-sm">{step3Form.formState.errors.timeline.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="additionalNotes" className="text-xl font-semibold text-primary">
              {t("gapScan.anythingElse")}
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
              {t("gapScan.back")}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 h-16 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  {t("gapScan.successTitle")}
                </>
              ) : (
                t("gapScan.submit")
              )}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MultiStepGapScanForm;
