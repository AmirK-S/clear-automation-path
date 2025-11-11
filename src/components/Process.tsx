import { MessageCircle, TestTube, Wrench, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Process = () => {
  const { t } = useLanguage();

  const steps = [
    {
      icon: MessageCircle,
      title: t("process.step1Title"),
      description: t("process.step1Text"),
    },
    {
      icon: TestTube,
      title: t("process.step2Title"),
      description: t("process.step2Text"),
    },
    {
      icon: Wrench,
      title: t("process.step3Title"),
      description: t("process.step3Text"),
    },
    {
      icon: TrendingUp,
      title: t("process.step4Title"),
      description: t("process.step4Text"),
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-16">
          {t("process.title")}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <Icon className="h-12 w-12 text-accent-foreground" />
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 -right-8 text-5xl font-bold text-accent/30 hidden lg:block">
                    {index < steps.length - 1 && "→"}
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-xl text-foreground/80">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-accent/10 border-2 border-accent p-8 rounded-2xl">
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            {t("process.specialNote")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Process;
