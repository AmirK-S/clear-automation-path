import { useLanguage } from "@/contexts/LanguageContext";

const DenemLabsSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 my-20 bg-gradient-to-br from-muted/50 to-muted/30">
      <div className="container mx-auto px-4 max-w-[900px]">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-shrink-0">
            <a
              href="https://denemlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
            >
              <div className="h-[100px] md:h-[100px] w-auto flex items-center justify-center">
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  DenemLabs
                </span>
              </div>
            </a>
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              {t("denemLabs.title")}
            </h3>
            <p className="text-base md:text-lg text-foreground/70 leading-relaxed mb-5">
              {t("denemLabs.description")}
            </p>
            <a
              href="https://denemlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary text-base inline-block border-b border-transparent hover:border-secondary transition-all"
            >
              {t("denemLabs.link")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DenemLabsSection;
