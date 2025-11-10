const CalendlySection = () => {
  return (
    <section id="book-call" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Ready to Talk?</h2>
          <p className="text-xl md:text-2xl text-foreground/80">
            Book a 30-minute call. We'll discuss what's possible for your business.
          </p>
        </div>

        <div className="bg-muted rounded-2xl p-4 min-h-[700px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-foreground/80 mb-4">
              Calendly widget will be embedded here
            </p>
            <p className="text-lg text-foreground/60">
              Add your Calendly embed code to replace this placeholder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendlySection;
