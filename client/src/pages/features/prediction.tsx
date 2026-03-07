import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { BrainCircuit, Activity, ShieldCheck, AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PredictionPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12">
        <div className="relative py-24 overflow-hidden bg-primary">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
            <img src="/images/feature-prediction.png" alt="bg" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl">
              <div className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-xs font-bold w-fit mb-6">PREDICTIVE AI TECHNOLOGY</div>
              <h1 className="text-5xl font-serif font-bold text-white mb-6 leading-tight">AI-Powered Disease Prediction</h1>
              <p className="text-xl text-white/80 mb-10 leading-relaxed">Stop diseases before they spread. Our advanced ML models analyze symptoms and environmental data to forecast health risks for your herd.</p>
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg font-bold rounded-xl shadow-xl">
                Run Health Scan <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-8">How AI Protects Your Herd</h2>
              <div className="space-y-8">
                {[
                  { title: "Symptom Pattern Recognition", desc: "Identify subtle changes in animal behavior or appearance that the human eye might miss.", icon: Activity },
                  { title: "Regional Risk Forecasting", desc: "Monitor disease outbreaks in nearby areas and get preventive alerts specifically for your location.", icon: ShieldCheck },
                  { title: "Early Warning System", desc: "Receive alerts 3-5 days before clinical symptoms typically appear.", icon: AlertTriangle },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="bg-primary/10 p-4 rounded-2xl h-fit">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-muted rounded-[3rem] overflow-hidden shadow-2xl p-4">
               <img src="/images/feature-records.png" alt="Scanning" className="w-full h-full object-cover rounded-[2.5rem]" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
