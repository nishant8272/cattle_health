import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Tractor, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { translations, type Language } from "@/lib/translations";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [, setLocation] = useLocation();
  const [currentLang, setCurrentLang] = useState<Language>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("gaushala_lang") as Language;
    if (saved) {
      setCurrentLang(saved);
    } else {
      const oldSaved = localStorage.getItem("cattlegpt_lang") as Language;
      if (oldSaved) {
        setCurrentLang(oldSaved);
        localStorage.setItem("gaushala_lang", oldSaved);
      }
    }
  }, []);

  const t = translations[currentLang].nav;
  const brand = translations[currentLang].brand;

  const handleLanguageChange = (lang: Language) => {
    localStorage.setItem("gaushala_lang", lang);
    setCurrentLang(lang);
    window.location.reload(); 
  };

  const links = [
    { name: t.features, href: "/#features" },
    { name: t.howItWorks, href: "/#how-it-works" },
    { name: t.findVet, href: "/features/find-vet" },
    { name: t.emergency, href: "/features/emergency" },
    { name: t.forVets, href: "/features/prediction" },
  ];

  const languages = [
    { code: "hi", name: "हिन्दी" },
    { code: "en", name: "English" },
    { code: "pb", name: "ਪੰਜਾਬੀ" },
    { code: "mr", name: "मराठी" },
    { code: "gu", name: "ગુજરાતી" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/40 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-1.5 rounded-lg group-hover:bg-primary/90 transition-colors">
            <Tractor className="h-6 w-6" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-foreground">
            {brand}
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            link.href.startsWith("/#") ? (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 font-medium">
                <Globe className="h-4 w-4" />
                {languages.find(l => l.code === currentLang)?.name || "Language"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {languages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code as Language)}
                  className="cursor-pointer"
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" className="font-medium" onClick={() => setLocation("/features/chatbot")}>
            {t.login}
          </Button>
          <Button className="font-medium shadow-md hover:shadow-lg transition-all" onClick={() => setLocation("/features/records")}>
            {t.getStarted}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="px-2">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code as Language)}>
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l-border/50">
              <div className="flex flex-col gap-8 mt-8">
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    link.href.startsWith("/#") ? (
                      <a
                        key={link.name}
                        href={link.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors px-2 py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors px-2 py-1"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )
                  ))}
                </div>
                <div className="flex flex-col gap-4 mt-auto">
                  <Button variant="outline" className="w-full justify-center" onClick={() => { setLocation("/features/chatbot"); setIsOpen(false); }}>
                    {t.login}
                  </Button>
                  <Button className="w-full justify-center" onClick={() => { setLocation("/features/records"); setIsOpen(false); }}>
                    {t.getStarted}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
