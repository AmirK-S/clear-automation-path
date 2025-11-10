import GapScanForm from "./GapScanForm";

const GapScan = () => {
  return (
    <section id="gap-scan" className="py-20 px-4 bg-scan-bg">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6">
            Not Sure Where to Start?
          </h2>
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed max-w-3xl mx-auto">
            Tell me about your business in 2 minutes. I'll send you a personalized report showing
            exactly where AI can help you make more money and save time.
          </p>
        </div>
        <GapScanForm />
      </div>
    </section>
  );
};

export default GapScan;
