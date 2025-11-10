import { TrendingUp, Clock, Smile } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Benefits = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Make More Revenue",
      items: [
        "Automate sales follow-ups",
        "Faster customer responses",
        "Find opportunities you're missing",
      ],
    },
    {
      icon: Clock,
      title: "Save Time & Money",
      items: [
        "Eliminate repetitive work",
        "Reduce manual errors",
        "Your team focuses on what matters",
      ],
    },
    {
      icon: Smile,
      title: "Happier Team",
      items: [
        "No more boring tasks",
        "Systems they actually understand",
        "Full training included",
      ],
    },
  ];

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-primary mb-16">
          What You Get
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card
                key={index}
                className="border-2 hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-primary">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {benefit.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="text-accent mr-2 text-xl">•</span>
                        <span className="text-lg text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
