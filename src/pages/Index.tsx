import { useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import CalendlySection from "@/components/CalendlySection";
import UseCases from "@/components/UseCases";
import Process from "@/components/Process";
import DenemLabsSection from "@/components/DenemLabsSection";
import GapScan from "@/components/GapScan";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";
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
        <div ref={calendlyRef}>
          <CalendlySection />
        </div>
        <UseCases onBookCallClick={scrollToCalendly} />
        <Process />
        <DenemLabsSection />
        <div ref={gapScanRef}>
          <GapScan onSuccess={scrollToCalendly} />
        </div>
        <About />
        <FinalCTA onBookCallClick={scrollToCalendly} />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
