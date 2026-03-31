import { Zap, Languages, FileText, Wand2, Clock, Download } from "lucide-react";

const features = [
  {
    icon: Languages,
    title: "True Hinglish",
    description: "Not just translation — natural code-mixed Hindi-English the way people actually speak.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate subtitles for a 10-minute video in under 30 seconds with our optimized pipeline.",
  },
  {
    icon: Wand2,
    title: "AI-Powered",
    description: "Context-aware translations that understand slang, idioms, and cultural nuances.",
  },
  {
    icon: FileText,
    title: "Multiple Formats",
    description: "Export as SRT, VTT, ASS, or burn directly into your video. Your choice.",
  },
  {
    icon: Clock,
    title: "Perfect Timing",
    description: "Frame-accurate subtitle timing synced to speech with automatic segmentation.",
  },
  {
    icon: Download,
    title: "Batch Processing",
    description: "Upload multiple videos at once. Queue, process, download. Simple as that.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">Features</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Everything you need, nothing you don't
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Built for creators who want Hinglish subtitles without the hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:border-glow hover:glow-orange"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-primary">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
