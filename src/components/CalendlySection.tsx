import { useLanguage } from "@/contexts/LanguageContext";
import CalComBooker from "./CalComBooker";

const CalendlySection = () => {
  const { t } = useLanguage();

  const CAL_USERNAME = "aks-abrect";
  const CAL_EVENT_SLUG = "30min";

  return (
    <section id="book-call" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-[1000px]">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t("calendly.title")}</h2>
          <p className="text-lg md:text-xl text-foreground/70 max-w-[600px] mx-auto leading-relaxed">
            {t("calendly.subtitle")}
          </p>
        </div>

        <div className="bg-muted rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(26,26,46,0.08)] min-h-[800px] md:min-h-[800px] sm:min-h-[900px]">
          <CalComBooker
            username={CAL_USERNAME}
            eventSlug={CAL_EVENT_SLUG}
            view="month_view"
            onSuccess={() => {
              console.log("Booking successful!");
              // You can add custom success handling here (e.g., analytics, notifications)
            }}
          />
        </div>

        <p className="text-center text-sm text-foreground/60 mt-6">
          {t("calendly.smallText")}
        </p>
      </div>
    </section>
  );
};

export default CalendlySection;
