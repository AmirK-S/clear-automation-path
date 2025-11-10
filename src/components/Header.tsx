import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface HeaderProps {
  onGetReportClick: () => void;
}

const Header = ({ onGetReportClick }: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? "bg-background/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary">{t("header.name")}</div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === "en" ? "fr" : "en")}
            className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors text-sm font-semibold"
          >
            <span className={language === "en" ? "text-primary" : "text-foreground/50"}>EN</span>
            <span className="text-foreground/30 mx-1">|</span>
            <span className={language === "fr" ? "text-primary" : "text-foreground/50"}>FR</span>
          </button>
          
          <Button
            onClick={onGetReportClick}
            size="lg"
            className="h-14 px-8 text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {t("header.cta")}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
