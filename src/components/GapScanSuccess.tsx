import { CheckCircle2, Target, Zap, TrendingUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GapScanSuccessProps {
  industry?: string;
  biggestChallenge?: string;
  onViewCalendly: () => void;
}

const GapScanSuccess = ({ industry, biggestChallenge, onViewCalendly }: GapScanSuccessProps) => {
  return (
    <div className="max-w-3xl mx-auto text-center py-12">
      <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-8 animate-scale-in">
        <CheckCircle2 className="h-12 w-12 text-success-foreground" />
      </div>
      
      <h3 className="text-4xl md:text-5xl font-bold text-primary mb-4">
        Got it! Analyzing your business...
      </h3>
      
      <p className="text-xl md:text-2xl text-foreground/80 mb-12">
        Check your email in the next 10 minutes for your personalized AI Gap Scan
      </p>

      <div className="bg-muted p-8 md:p-12 rounded-2xl mb-12">
        <h4 className="text-2xl md:text-3xl font-bold text-primary mb-8">
          Your report will include:
        </h4>
        
        <div className="space-y-6 text-left">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Target className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">
                Specific automations for {industry || "your industry"}
              </p>
              <p className="text-foreground/70">
                Tailored solutions that fit your exact business context
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">
                Time savings estimates for {biggestChallenge || "your challenges"}
              </p>
              <p className="text-foreground/70">
                Real numbers on hours saved and efficiency gains
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">
                Quick wins you can implement first
              </p>
              <p className="text-foreground/70">
                Start seeing results within weeks, not months
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <p className="text-xl font-semibold text-primary">
                Strategic opportunities for growth
              </p>
              <p className="text-foreground/70">
                Long-term vision for scaling with automation
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl">
        <h4 className="text-2xl md:text-3xl font-bold mb-4">
          Want to discuss your report?
        </h4>
        <p className="text-xl mb-6 opacity-90">
          Book a call now and we'll walk through your personalized findings together
        </p>
        <Button
          onClick={onViewCalendly}
          size="lg"
          className="h-16 px-10 text-xl font-bold bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Book a Call Now
          <ArrowDown className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default GapScanSuccess;
