import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Truck, 
  UserPlus, 
  FileText, 
  Package, 
  FileSpreadsheet, 
  TrendingUp, 
  MessageSquare, 
  Receipt 
} from "lucide-react";

interface UseCasesProps {
  onBookCallClick: () => void;
}

const UseCases = ({ onBookCallClick }: UseCasesProps) => {
  const { t } = useLanguage();

  const useCases = [
    {
      icon: Mail,
      title: t("useCases.case1Title"),
      problem: t("useCases.case1Problem"),
      solution: t("useCases.case1Solution"),
      result: t("useCases.case1Result")
    },
    {
      icon: Truck,
      title: t("useCases.case2Title"),
      problem: t("useCases.case2Problem"),
      solution: t("useCases.case2Solution"),
      result: t("useCases.case2Result")
    },
    {
      icon: UserPlus,
      title: t("useCases.case3Title"),
      problem: t("useCases.case3Problem"),
      solution: t("useCases.case3Solution"),
      result: t("useCases.case3Result")
    },
    {
      icon: FileText,
      title: t("useCases.case4Title"),
      problem: t("useCases.case4Problem"),
      solution: t("useCases.case4Solution"),
      result: t("useCases.case4Result")
    },
    {
      icon: Package,
      title: t("useCases.case5Title"),
      problem: t("useCases.case5Problem"),
      solution: t("useCases.case5Solution"),
      result: t("useCases.case5Result")
    },
    {
      icon: FileSpreadsheet,
      title: t("useCases.case6Title"),
      problem: t("useCases.case6Problem"),
      solution: t("useCases.case6Solution"),
      result: t("useCases.case6Result")
    },
    {
      icon: TrendingUp,
      title: t("useCases.case7Title"),
      problem: t("useCases.case7Problem"),
      solution: t("useCases.case7Solution"),
      result: t("useCases.case7Result")
    },
    {
      icon: MessageSquare,
      title: t("useCases.case8Title"),
      problem: t("useCases.case8Problem"),
      solution: t("useCases.case8Solution"),
      result: t("useCases.case8Result")
    },
    {
      icon: Receipt,
      title: t("useCases.case9Title"),
      problem: t("useCases.case9Problem"),
      solution: t("useCases.case9Solution"),
      result: t("useCases.case9Result")
    }
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            {t("useCases.title")}
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80">
            {t("useCases.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-primary flex-1">
                    {useCase.title}
                  </h3>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-destructive mb-1">
                      {t("useCases.problemLabel")}
                    </p>
                    <p className="text-foreground/80">{useCase.problem}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-accent mb-1">
                      {t("useCases.solutionLabel")}
                    </p>
                    <p className="text-foreground/80">{useCase.solution}</p>
                  </div>

                  <div>
                    <p className="font-semibold text-success mb-1">
                      {t("useCases.resultLabel")}
                    </p>
                    <p className="text-foreground/80 italic">{useCase.result}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center space-y-6">
          <p className="text-xl md:text-2xl font-bold text-foreground">
            {t("useCases.bottomText")}
          </p>
          <Button
            onClick={onBookCallClick}
            size="lg"
            className="h-16 px-10 text-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {t("useCases.ctaButton")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
