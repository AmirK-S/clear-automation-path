import { DollarSign, Clock, Users } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Benefits = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
            <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">{t("benefits.card1Title")}</h3>
            <ul className="space-y-3 text-lg text-foreground/80">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card1Point1")}
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card1Point2")}
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card1Point3")}
              </li>
            </ul>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
            <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
              <Clock className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">{t("benefits.card2Title")}</h3>
            <ul className="space-y-3 text-lg text-foreground/80">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card2Point1")}
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card2Point2")}
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card2Point3")}
              </li>
            </ul>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
            <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">{t("benefits.card3Title")}</h3>
            <ul className="space-y-3 text-lg text-foreground/80">
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card3Point1")}
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card3Point2")}
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">•</span>
                {t("benefits.card3Point3")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
