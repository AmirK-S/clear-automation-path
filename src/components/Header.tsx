import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onGetReportClick: () => void;
}

const Header = ({ onGetReportClick }: HeaderProps) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky ? "bg-background/95 backdrop-blur-sm shadow-md py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary">Amir KELLOU-SIDHOUM</div>
        <Button
          onClick={onGetReportClick}
          size="lg"
          className="h-14 px-8 text-lg font-semibold bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          Get Free Report
        </Button>
      </div>
    </header>
  );
};

export default Header;
