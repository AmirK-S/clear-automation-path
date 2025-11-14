import { useLanguage } from "@/contexts/LanguageContext";
import CalComBooker from "./CalComBooker";

const CalendlySection = () => {
  const { t } = useLanguage();

  const CAL_USERNAME = "aks-abrect";
  const CAL_EVENT_SLUG = "30min";

  return (
    <section id="book-call" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">{t("calendly.title")}</h2>
          <p className="text-lg md:text-xl text-foreground/80">
            {t("calendly.subtitle")}
          </p>
        </div>

        <CalComBooker
          username={CAL_USERNAME}
          eventSlug={CAL_EVENT_SLUG}
          view="month_view"
          onSuccess={() => {
            console.log("Booking successful!");
            // You can add custom success handling here (e.g., analytics, notifications)
          }}
        />

        <p className="text-center text-sm text-foreground/60 mt-6">
          {t("calendly.smallText")}
        </p>
      </div>
    </section>
  );
};

export default CalendlySection;
