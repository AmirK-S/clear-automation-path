import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl text-center">
        <h3 className="text-2xl font-bold mb-4">Amir KELLOU-SIDHOUM</h3>
        <a
          href="https://www.linkedin.com/in/amir-kellou-sidhoum/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-lg hover:text-accent transition-colors"
          aria-label="LinkedIn Profile"
        >
          <Linkedin className="h-6 w-6" />
          Connect on LinkedIn
        </a>
      </div>
    </footer>
  );
};

export default Footer;
