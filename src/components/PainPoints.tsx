import { useLanguage } from "@/contexts/LanguageContext";
import { AlertCircle, Zap } from "lucide-react";

const PainPoints = () => {
  const { t } = useLanguage();

  const painPoints = [
    {
      title: t("painPoints.card1Title"),
      pain: t("painPoints.card1Pain"),
      build: t("painPoints.card1Build"),
      impact: t("painPoints.card1Impact")
    },
    {
      title: t("painPoints.card2Title"),
      pain: t("painPoints.card2Pain"),
      build: t("painPoints.card2Build"),
      impact: t("painPoints.card2Impact")
    },
    {
      title: t("painPoints.card3Title"),
      pain: t("painPoints.card3Pain"),
      build: t("painPoints.card3Build"),
      impact: t("painPoints.card3Impact")
    },
    {
      title: t("painPoints.card4Title"),
      pain: t("painPoints.card4Pain"),
      build: t("painPoints.card4Build"),
      impact: t("painPoints.card4Impact")
    },
    {
      title: t("painPoints.card5Title"),
      pain: t("painPoints.card5Pain"),
      build: t("painPoints.card5Build"),
      impact: t("painPoints.card5Impact")
    },
    {
      title: t("painPoints.card6Title"),
      pain: t("painPoints.card6Pain"),
      build: t("painPoints.card6Build"),
      impact: t("painPoints.card6Impact")
    }
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            {t("painPoints.title")}
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
            {t("painPoints.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-primary mb-4 flex items-start gap-3">
                <AlertCircle className="h-7 w-7 flex-shrink-0 mt-1 text-destructive" />
                {point.title}
              </h3>
              
              <p className="text-lg text-foreground/80 mb-6 leading-relaxed">
                {point.pain}
              </p>

              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-accent mb-2 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    {t("painPoints.whatIBuild")}
                  </p>
                  <p className="text-foreground/90 pl-7">{point.build}</p>
                </div>

                <div>
                  <p className="font-semibold text-success mb-2">
                    {t("painPoints.impact")}
                  </p>
                  <p className="text-foreground/90 italic">"{point.impact}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary text-primary-foreground p-12 rounded-2xl text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            {t("painPoints.bottomTitle")}
          </h3>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto opacity-95">
            {t("painPoints.bottomText")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
