import { useLanguage } from "@/contexts/LanguageContext";

const Ticker = () => {
  const { t } = useLanguage();
  
  const companies = [
    "Centrale Paris",
    "TotalEnergies",
    "ENGIE",
    "Image7",
    "QoQa",
    "ExplorIA",
    "DenemLabs",
    "Arkel",
    "Serrulink",
    "Prevote",
    "BBWorkers"
  ];

  // Double the array for seamless infinite scroll
  const doubledCompanies = [...companies, ...companies];

  return (
    <section className="py-16 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl md:text-3xl font-bold text-center text-primary mb-12">
          {t("ticker.title")}
        </h3>
        
        <div className="relative">
          <div className="flex animate-scroll">
            {doubledCompanies.map((company, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-12 md:mx-16 flex items-center justify-center h-20 transition-opacity hover:opacity-70"
              >
                <span className="text-xl md:text-2xl font-semibold text-foreground/60 whitespace-nowrap">
                  {company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ticker;
