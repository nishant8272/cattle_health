import { Button } from "@/components/ui/button";
import { ArrowRight, Stethoscope } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { translations, type Language } from "@/lib/translations";

export function CTASection() {
  const [, setLocation] = useLocation();
  const [currentLang, setCurrentLang] = useState<Language>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("gaushala_lang") as Language;
    if (saved) setCurrentLang(saved);
  }, []);

  const t = translations[currentLang].cta;

  return (
    <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Abstract Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 max-w-3xl mx-auto">
          {t.title}
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            size="lg" 
            variant="secondary" 
            className="h-14 px-8 text-lg font-bold shadow-lg w-full sm:w-auto hover:bg-white hover:text-primary"
            onClick={() => setLocation("/features/records")}
          >
            {t.cta1}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            size="lg" 
            className="h-14 px-8 text-lg font-bold bg-black text-white hover:bg-black/80 border-none w-full sm:w-auto"
            onClick={() => setLocation("/features/find-vet")}
          >
            <Stethoscope className="mr-2 h-5 w-5" />
            {t.cta2}
          </Button>
        </div>
      </div>
    </section>
  );
}
