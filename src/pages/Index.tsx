import { useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import GapScan from "@/components/GapScan";
import Process from "@/components/Process";
import CalendlySection from "@/components/CalendlySection";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-background">
      <Header onGetReportClick={scrollToGapScan} />
      <Hero onGetReportClick={scrollToGapScan} onBookCallClick={scrollToCalendly} />
      <Benefits />
      <div ref={gapScanRef}>
        <GapScan />
      </div>
      <Process />
      <div ref={calendlyRef}>
        <CalendlySection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
