import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroProps {
  onGetReportClick: () => void;
  onBookCallClick: () => void;
}

const Hero = ({ onGetReportClick, onBookCallClick }: HeroProps) => {
  const { t } = useLanguage();
  
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
          {t("hero.title")}
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
          {t("hero.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={onBookCallClick}
            size="lg"
            className="h-16 px-10 text-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {t("hero.primaryCta")}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Button
            onClick={onGetReportClick}
            size="lg"
            variant="outline"
            className="h-16 px-10 text-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            {t("hero.secondaryCta")}
          </Button>
        </div>

        <p className="text-base md:text-lg text-foreground/70 max-w-2xl mx-auto">
          {t("hero.smallText")}
        </p>
      </div>
    </section>
  );
};

export default Hero;
