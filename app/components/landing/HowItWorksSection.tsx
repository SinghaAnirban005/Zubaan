const steps = [
  { step: "01", title: "Upload", description: "Drop your video or paste a YouTube link. We support MP4, MOV, MKV, and more." },
  { step: "02", title: "Process", description: "Our AI transcribes the audio and translates it into natural Hinglish subtitles." },
  { step: "03", title: "Download", description: "Review, edit if needed, and download your perfectly timed subtitle file." },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-32 border-t border-border">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase mb-3">How it works</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Three steps. That's it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item) => (
            <div key={item.step} className="text-center md:text-left">
              <span className="text-5xl font-black text-gradient-orange mb-4 block">{item.step}</span>
              <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
