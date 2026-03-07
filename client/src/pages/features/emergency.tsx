import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Ambulance, Phone, ShieldAlert, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function EmergencyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="bg-destructive text-destructive-foreground py-20 px-4 md:px-6">
          <div className="container mx-auto text-center max-w-4xl">
            <div className="bg-white/20 p-4 rounded-full w-fit mx-auto mb-8 animate-pulse">
              <ShieldAlert className="h-16 w-16" />
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Emergency Services</h1>
            <p className="text-xl opacity-90 mb-10 leading-relaxed">24/7 critical care support for your livestock. If every second counts, we are here to help.</p>
            <Button size="lg" className="h-20 px-12 text-2xl font-black rounded-full bg-white text-destructive hover:bg-white/90 shadow-2xl animate-bounce">
              <Phone className="mr-4 h-8 w-8" /> CALL 1800-VET-HELP
            </Button>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Rapid Response", desc: "Mobile veterinary units dispatched within 30 minutes of call.", icon: Zap },
              { title: "Tele-Diagnosis", desc: "Instant video consultation with senior livestock specialists.", icon: Clock },
              { title: "24/7 Helpline", desc: "Our emergency desk is staffed round the clock in 12 languages.", icon: Phone },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-xl bg-card">
                <CardContent className="p-10 text-center">
                  <div className="bg-primary/10 p-4 rounded-3xl w-fit mx-auto mb-6">
                    <item.icon className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
