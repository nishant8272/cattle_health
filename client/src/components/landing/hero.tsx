import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { translations, type Language } from "@/lib/translations";

export function Hero() {
  const [, setLocation] = useLocation();
  const [currentLang, setCurrentLang] = useState<Language>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("gaushala_lang") as Language;
    if (saved) setCurrentLang(saved);
  }, []);

  const t = translations[currentLang].hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-cattle.png"
          alt="Farmer with cattle at golden hour"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay: Darker on left for text readability */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary-foreground text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            {t.badge}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 drop-shadow-lg">
            {t.title1} <br />
            <span className="text-secondary italic">{t.title2}</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed drop-shadow-md">
            {t.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button 
              size="lg" 
              className="text-base font-semibold h-12 px-8 shadow-xl hover:scale-105 transition-transform"
              onClick={() => setLocation("/features/records")}
            >
              {t.cta1}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-black/40 text-white border-white/20 hover:bg-black/60 hover:text-white backdrop-blur-md h-12 px-8"
              onClick={() => setLocation("/features/chatbot")}
            >
              <MessageCircle className="mr-2 h-4 w-4 text-green-400" />
              {t.cta2}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-medium text-gray-300">
            {t.features.map(
              (item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="bg-primary/20 p-1 rounded-full text-primary-foreground border border-primary/30">
                    <Check className="h-3 w-3" />
                  </div>
                  {item}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest">Dier more</span>
        <div className="w-px h-12 bg-linear-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
