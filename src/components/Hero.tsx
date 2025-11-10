import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onGetReportClick: () => void;
  onBookCallClick: () => void;
}

const Hero = ({ onGetReportClick, onBookCallClick }: HeroProps) => {
  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-primary mb-6 leading-tight">
          Make More Money. Save Time. Keep Your Team Happy.
        </h1>
        <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
          I build AI systems and automations that work. Your business runs smoother, faster, and
          more profitable.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            onClick={onGetReportClick}
            size="lg"
            className="h-16 px-10 text-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            See What's Possible (Free)
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
          <Button
            onClick={onBookCallClick}
            size="lg"
            variant="outline"
            className="h-16 px-10 text-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Book a Call
          </Button>
        </div>

        <div className="bg-muted p-8 rounded-2xl">
          <p className="text-lg md:text-xl text-foreground leading-relaxed">
            <span className="font-semibold">Not sure if AI can help your business?</span> I'll show
            you exactly where it can - for free. No commitment, just clarity.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
