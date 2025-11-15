import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { Loader2 } from "lucide-react";
import { sendToN8nWebhook } from "@/services/webhookService";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  mostTime: z.string().min(10).max(150),
  automate: z.string().min(10).max(150),
});

type FormData = z.infer<typeof formSchema>;

interface SimpleGapScanFormProps {
  onSuccess: () => void;
}

const SimpleGapScanForm = ({ onSuccess }: SimpleGapScanFormProps) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const mostTimeValue = watch("mostTime") || "";
  const automateValue = watch("automate") || "";

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Send form data to n8n webhook
      await sendToN8nWebhook(data, language);

      console.log("Form submitted successfully:", data);

      // Show success toast
      toast({
        title: t("gapScan.successTitle") || "Success!",
        description: t("gapScan.successMessage") || "Your submission has been received.",
      });

      // Trigger success callback (scrolls to calendar)
      onSuccess();

    } catch (error) {
      console.error("Form submission error:", error);

      // Show error toast
      toast({
        title: t("gapScan.errorTitle") || "Submission Failed",
        description: error instanceof Error
          ? error.message
          : t("gapScan.errorMessage") || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-lg">
          {t("gapScan.name")}
        </Label>
        <Input
          id="name"
          {...register("name")}
          className="h-14 text-lg mt-2"
          disabled={isSubmitting}
        />
        {errors.name && (
          <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email" className="text-lg">
          {t("gapScan.email")}
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className="h-14 text-lg mt-2"
          disabled={isSubmitting}
        />
        {errors.email && (
          <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="company" className="text-lg">
          {t("gapScan.companyName")}
        </Label>
        <Input
          id="company"
          {...register("company")}
          className="h-14 text-lg mt-2"
          disabled={isSubmitting}
        />
        {errors.company && (
          <p className="text-destructive text-sm mt-1">{errors.company.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="mostTime" className="text-lg">
          {t("gapScan.mostTimeQuestion")}
        </Label>
        <Textarea
          id="mostTime"
          {...register("mostTime")}
          placeholder={t("gapScan.mostTimePlaceholder")}
          className="min-h-24 text-lg mt-2 resize-none"
          maxLength={150}
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.mostTime && (
            <p className="text-destructive text-sm">{errors.mostTime.message}</p>
          )}
          <p className="text-sm text-foreground/60 ml-auto">
            {mostTimeValue.length}/150
          </p>
        </div>
      </div>

      <div>
        <Label htmlFor="automate" className="text-lg">
          {t("gapScan.automateQuestion")}
        </Label>
        <Textarea
          id="automate"
          {...register("automate")}
          className="min-h-24 text-lg mt-2 resize-none"
          maxLength={150}
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center mt-1">
          {errors.automate && (
            <p className="text-destructive text-sm">{errors.automate.message}</p>
          )}
          <p className="text-sm text-foreground/60 ml-auto">
            {automateValue.length}/150
          </p>
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full h-16 text-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            {t("gapScan.sending")}
          </>
        ) : (
          t("gapScan.submit")
        )}
      </Button>
    </form>
  );
};

export default SimpleGapScanForm;
