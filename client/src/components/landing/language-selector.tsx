import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const languages = [
  { code: "hi", name: "हिन्दी (Hindi)", native: "नमस्ते" },
  { code: "en", name: "English", native: "Hello" },
  { code: "pb", name: "ਪੰਜਾਬੀ (Punjabi)", native: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ" },
  { code: "mr", name: "मराठी (Marathi)", native: "नमस्कार" },
  { code: "gu", name: "ગુજરાતી (Gujarati)", native: "નમસ્તે" },
];

export function LanguageSelector({ onSelect }: { onSelect: (lang: string) => void }) {
  const [selected, setSelected] = useState("hi");

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-xl p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="relative h-48 bg-primary p-8 flex flex-col justify-end">
          <div className="absolute inset-0 opacity-20">
             <img src="/images/agri-bg.png" alt="background" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white relative z-10">Choose Language</h2>
          <p className="text-white/80 relative z-10">अपनी भाषा चुनें / Select your language</p>
        </div>
        
        <div className="p-6 grid gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                selected === lang.code 
                  ? "border-primary bg-primary/5 text-primary" 
                  : "border-border hover:border-primary/30 text-foreground"
              }`}
            >
              <div className="flex flex-col items-start text-left">
                <span className="text-lg font-bold">{lang.name}</span>
                <span className="text-sm opacity-60">{lang.native}</span>
              </div>
              {selected === lang.code && (
                <div className="bg-primary text-white p-1 rounded-full">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </button>
          ))}
          
          <Button 
            className="w-full h-14 mt-4 text-lg font-bold rounded-2xl shadow-lg"
            onClick={() => onSelect(selected)}
          >
            {selected === 'hi' ? 'जारी रखें' : 'Continue'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
