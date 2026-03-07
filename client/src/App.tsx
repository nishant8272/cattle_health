import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import ChatbotPage from "@/pages/features/chatbot";
import RecordsPage from "@/pages/features/records";
import FindVetPage from "@/pages/features/find-vet";
import EmergencyPage from "@/pages/features/emergency";
import PredictionPage from "@/pages/features/prediction";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <TooltipProvider>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/features/chatbot" component={ChatbotPage} />
        <Route path="/features/records" component={RecordsPage} />
        <Route path="/features/find-vet" component={FindVetPage} />
        <Route path="/features/emergency" component={EmergencyPage} />
        <Route path="/features/prediction" component={PredictionPage} />
        <Route component={NotFound} />
      </Switch>
    </TooltipProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
