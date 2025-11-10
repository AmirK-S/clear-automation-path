import { useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Benefits from "@/components/Benefits";
import PainPoints from "@/components/PainPoints";
import GapScan from "@/components/GapScan";
import CalendlySection from "@/components/CalendlySection";
import Process from "@/components/Process";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

const Index = () => {
  const gapScanRef = useRef<HTMLDivElement>(null);
  const calendlyRef = useRef<HTMLDivElement>(null);

  const scrollToGapScan = () => {
    gapScanRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToCalendly = () => {
    calendlyRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <Header onGetReportClick={scrollToGapScan} />
        <Hero onGetReportClick={scrollToGapScan} onBookCallClick={scrollToCalendly} />
        <Ticker />
        <Benefits />
        <PainPoints />
        <div ref={gapScanRef}>
          <GapScan onSuccess={scrollToCalendly} />
        </div>
        <div ref={calendlyRef}>
          <CalendlySection />
        </div>
        <Process />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
