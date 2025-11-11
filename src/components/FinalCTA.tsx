import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";

interface FinalCTAProps {
  onBookCallClick: () => void;
}

const FinalCTA = ({ onBookCallClick }: FinalCTAProps) => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-primary">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-8">
          {t("finalCTA.title")}
        </h2>
        <p className="text-xl md:text-2xl text-primary-foreground/90 mb-12 leading-relaxed">
          {t("finalCTA.text")}
        </p>
        <Button
          onClick={onBookCallClick}
          size="lg"
          className="h-16 px-12 text-xl font-semibold bg-background hover:bg-background/90 text-foreground"
        >
          {t("finalCTA.button")}
          <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default FinalCTA;
