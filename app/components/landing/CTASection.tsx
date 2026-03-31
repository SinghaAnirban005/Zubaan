import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 border-t border-border">
      <div className="container text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Ready to go <span className="text-gradient-orange">Hinglish</span>?
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-8">
          Join thousands of creators making their content accessible in the language their audience actually speaks.
        </p>
        <Button variant="hero" size="lg" className="text-base px-10">
          Start for Free <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
        <p className="text-xs text-muted-foreground mt-4">No credit card required</p>
      </div>
    </section>
  );
};

export default CTASection;
