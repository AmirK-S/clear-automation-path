import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
          {t("about.title")}
        </h2>

        <div className="prose prose-lg max-w-none text-foreground/90">
          <p className="text-xl leading-relaxed whitespace-pre-line">
            {t("about.text")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
