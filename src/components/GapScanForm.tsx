import { useState } from "react";
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
import { Loader2, CheckCircle2, Mail, FileText, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email").max(255),
  company: z.string().min(2, "Company name is required").max(100),
  challenge: z.string().min(1, "Please select a challenge"),
});

type FormData = z.infer<typeof formSchema>;

const GapScanForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);
    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: "Report on its way!",
      description: "Check your email in the next 5 minutes.",
    });
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-success-foreground" />
        </div>
        <h3 className="text-3xl font-bold text-primary mb-4">Check Your Email!</h3>
        <p className="text-xl text-foreground/80 mb-8">
          Your personalized report is being prepared and will arrive in your inbox within 5 minutes.
        </p>
        <div className="bg-muted p-8 rounded-2xl space-y-4">
          <h4 className="text-2xl font-semibold text-primary mb-6">What Happens Next:</h4>
          <div className="flex items-start gap-4 text-left">
            <Mail className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-lg">Check your email (in 5 minutes)</p>
              <p className="text-foreground/70">Look for "Your AI Gap Scan Report"</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left">
            <FileText className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-lg">Read your personalized report</p>
              <p className="text-foreground/70">See exactly where AI can help your business</p>
            </div>
          </div>
          <div className="flex items-start gap-4 text-left">
            <Phone className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-lg">Book a call if it makes sense</p>
              <p className="text-foreground/70">No pressure - only if you see the value</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-8">
      <div className="space-y-3">
        <Label htmlFor="name" className="text-xl font-semibold text-primary">
          Your Name
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="h-16 text-lg border-2"
          placeholder="John Smith"
        />
        {errors.name && <p className="text-destructive text-sm">{errors.name.message}</p>}
      </div>

      <div className="space-y-3">
        <Label htmlFor="email" className="text-xl font-semibold text-primary">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="h-16 text-lg border-2"
          placeholder="john@company.com"
        />
        {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
      </div>

      <div className="space-y-3">
        <Label htmlFor="company" className="text-xl font-semibold text-primary">
          Company Name
        </Label>
        <Input
          id="company"
          {...register("company")}
          className="h-16 text-lg border-2"
          placeholder="Your Company"
        />
        {errors.company && <p className="text-destructive text-sm">{errors.company.message}</p>}
      </div>

      <div className="space-y-3">
        <Label htmlFor="challenge" className="text-xl font-semibold text-primary">
          What's your biggest challenge?
        </Label>
        <Select onValueChange={(value) => setValue("challenge", value)}>
          <SelectTrigger className="h-16 text-lg border-2">
            <SelectValue placeholder="Select your biggest challenge" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="manual-work" className="text-lg py-3">
              Too much manual work
            </SelectItem>
            <SelectItem value="sales" className="text-lg py-3">
              Missing sales opportunities
            </SelectItem>
            <SelectItem value="overwhelmed" className="text-lg py-3">
              Team overwhelmed
            </SelectItem>
            <SelectItem value="not-sure" className="text-lg py-3">
              Not sure where to start
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.challenge && <p className="text-destructive text-sm">{errors.challenge.message}</p>}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-16 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            Sending your report...
          </>
        ) : (
          "Get My Free Report"
        )}
      </Button>
    </form>
  );
};

export default GapScanForm;
