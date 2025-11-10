import { useState } from "react";
import MultiStepGapScanForm from "./MultiStepGapScanForm";
import GapScanSuccess from "./GapScanSuccess";
import { useLanguage } from "@/contexts/LanguageContext";

interface GapScanProps {
  onSuccess: () => void;
}

const GapScan = ({ onSuccess }: GapScanProps) => {
  const { t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ industry?: string; biggestChallenge?: string }>({});

  const handleSuccess = () => {
    // In a real implementation, you'd get this from the form data
    setSubmittedData({
      industry: "your industry",
      biggestChallenge: "your biggest challenges",
    });
    setIsSuccess(true);
    
    // Scroll to success message
    setTimeout(() => {
      window.scrollTo({ top: document.getElementById("gap-scan")?.offsetTop, behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="gap-scan" className="py-20 px-4 bg-scan-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            {t("gapScan.title")}
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            {t("gapScan.subtitle")}
          </p>
        </div>
        
        {isSuccess ? (
          <GapScanSuccess
            industry={submittedData.industry}
            biggestChallenge={submittedData.biggestChallenge}
            onViewCalendly={onSuccess}
          />
        ) : (
          <MultiStepGapScanForm onSuccess={handleSuccess} />
        )}
      </div>
    </section>
  );
};

export default GapScan;
