import { Subtitles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Subtitles className="h-5 w-5 text-primary" />
          <span className="font-bold text-foreground">
            HingLish<span className="text-primary">Sub</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 HinglishSub. Built with ❤️ for the Hinglish-speaking world.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
