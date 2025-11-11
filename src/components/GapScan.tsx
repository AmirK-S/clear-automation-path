import { useState } from "react";
import SimpleGapScanForm from "./SimpleGapScanForm";
import { useLanguage } from "@/contexts/LanguageContext";

interface GapScanProps {
  onSuccess: () => void;
}

const GapScan = ({ onSuccess }: GapScanProps) => {
  const { t } = useLanguage();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSuccess = () => {
    setIsSuccess(true);
    
    // Scroll to Calendly
    setTimeout(() => {
      onSuccess();
    }, 100);
  };

  return (
    <section id="gap-scan" className="py-20 px-4 bg-accent/5">
      <div className="container mx-auto max-w-3xl">
        {isSuccess ? (
          <div className="text-center">
            <div className="bg-card border-2 border-primary rounded-2xl p-12">
              <div className="text-6xl mb-6">✅</div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {t("gapScan.successTitle")}
              </h2>
              <p className="text-xl text-foreground/80">
                {t("gapScan.successSubtitle")}
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
                {t("gapScan.title")}
              </h2>
            </div>
            
            <div className="bg-card border-2 border-border rounded-2xl p-8 md:p-12">
              <SimpleGapScanForm onSuccess={handleSuccess} />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default GapScan;
