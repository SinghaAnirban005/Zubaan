import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Subtle grid bg */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(0_0%_15%/_0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_15%/_0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />

      <div className="container relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-glow bg-secondary px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Now with AI-powered translation
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Generate{" "}
          <span className="text-gradient-orange">Hinglish</span>
          <br />
          Subtitles in Seconds
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your video. Get perfectly mixed Hindi-English subtitles powered by AI.
          Natural, colloquial, and ready to embed — just like your audience speaks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="lg" className="text-base px-8">
            Start Generating <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
          <Button variant="heroOutline" size="lg" className="text-base px-8">
            <Play className="mr-1 h-4 w-4" /> Watch Demo
          </Button>
        </div>

        {/* Terminal-style preview */}
        <div className="mt-16 max-w-2xl mx-auto rounded-lg border border-border bg-card p-6 text-left font-mono text-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full bg-primary/40" />
            <div className="h-3 w-3 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="space-y-2 text-muted-foreground">
            <p><span className="text-primary">$</span> hinglishsub generate --input video.mp4</p>
            <p className="text-foreground/60">⠋ Transcribing audio...</p>
            <p className="text-foreground/60">⠙ Translating to Hinglish...</p>
            <p className="text-foreground">✓ <span className="text-primary">48 subtitles</span> generated in <span className="text-primary">12s</span></p>
            <p className="text-foreground/50">→ output: video_hinglish.srt</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
