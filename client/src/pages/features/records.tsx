import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { FileText, Plus, Search, Calendar, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RecordsPage() {
  const records = [
    { id: "C-102", name: "Gauri", breed: "Gir", status: "Healthy", lastUpdate: "2 days ago" },
    { id: "C-105", name: "Lakshmi", breed: "Murrah", status: "Due Vaccination", lastUpdate: "1 week ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-serif font-bold text-foreground">Digital Animal Records</h1>
            <p className="text-muted-foreground mt-2">Manage your herd health history and production.</p>
          </div>
          <Button className="h-12 px-6 rounded-xl shadow-lg font-bold">
            <Plus className="mr-2 h-5 w-5" /> Add New Animal
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Cattle", value: "12", icon: Activity, color: "text-blue-600 bg-blue-50" },
            { label: "Milk Production", value: "145L/day", icon: Calendar, color: "text-primary bg-primary/5" },
            { label: "Vaccinations Due", value: "2", icon: Activity, color: "text-amber-600 bg-amber-50" },
            { label: "Total Vets Visited", value: "4", icon: Search, color: "text-purple-600 bg-purple-50" },
          ].map((stat, i) => (
            <Card key={i} className="border-none shadow-md">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border border-border rounded-3xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-xl font-bold">Current Herd</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Search by name or ID..." className="pl-10 pr-4 py-2 bg-muted rounded-lg text-sm outline-none" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-4 font-bold">Animal ID</th>
                  <th className="px-6 py-4 font-bold">Name</th>
                  <th className="px-6 py-4 font-bold">Breed</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold">Last Update</th>
                  <th className="px-6 py-4 font-bold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-sm">{r.id}</td>
                    <td className="px-6 py-4 font-bold">{r.name}</td>
                    <td className="px-6 py-4">{r.breed}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${r.status.includes('Due') ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground text-sm">{r.lastUpdate}</td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="text-primary font-bold">View History</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
