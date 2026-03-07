import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { MapPin, Search, Star, Phone, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const vets = [
  { name: "Dr. Sandeep Singh", specialty: "Livestock Specialist", distance: "2.5 km", rating: 4.9, reviews: 128 },
  { name: "Dr. Priya Sharma", specialty: "Veterinary Surgeon", distance: "4.8 km", rating: 4.7, reviews: 95 },
  { name: "City Animal Clinic", specialty: "Multi-specialty Clinic", distance: "6.1 km", rating: 4.5, reviews: 210 },
];

export default function FindVetPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">Find a Vet Nearby</h1>
          <p className="text-muted-foreground text-lg mb-8">Locate verified veterinarians and clinics specialized in cattle care near you.</p>
          
          <div className="flex gap-4 p-2 bg-card border border-border shadow-lg rounded-2xl">
            <div className="flex-grow flex items-center px-4 gap-3 border-r border-border">
              <MapPin className="text-primary h-5 w-5" />
              <input type="text" placeholder="Enter your village or city..." className="w-full bg-transparent outline-none h-12" />
            </div>
            <Button className="h-12 px-8 rounded-xl font-bold shadow-md">
              <Search className="mr-2 h-5 w-5" /> Search
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vets.map((vet, i) => (
            <Card key={i} className="border-border shadow-md hover:shadow-xl transition-all group overflow-hidden">
              <div className="h-48 bg-muted relative">
                <img 
                  src={`https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop`} 
                  alt="clinic" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                  <Star className="h-4 w-4 text-secondary fill-secondary" />
                  <span className="text-sm font-bold">{vet.rating}</span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1">{vet.name}</h3>
                <p className="text-primary font-medium text-sm mb-4">{vet.specialty}</p>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Navigation className="h-4 w-4" />
                    <span>{vet.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    <span>{vet.reviews} reviews</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-grow rounded-xl font-bold">
                    <Phone className="mr-2 h-4 w-4" /> Call Now
                  </Button>
                  <Button variant="outline" className="rounded-xl font-bold">Directions</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
