import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { Button } from "@/components/ui/button";
import { MessageSquareText, Mic, Send, Bot } from "lucide-react";

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex flex-col h-[80vh] bg-card border border-border rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-primary p-6 text-white flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <Bot className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold">CattleGPT AI Assistant</h1>
              <p className="text-white/80 text-sm italic">Available in Hindi, English & 10+ languages</p>
            </div>
          </div>

          <div className="flex-grow p-6 overflow-y-auto flex flex-col gap-4 bg-muted/30">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-border max-w-[80%] self-start shadow-sm">
              <p className="text-foreground">नमस्ते! मैं CattleGPT हूँ। मैं आपकी गायों और भैंसों के स्वास्थ्य में आपकी कैसे मदद कर सकता हूँ?</p>
              <p className="text-xs text-muted-foreground mt-2">Just now</p>
            </div>
            <div className="bg-primary text-white p-4 rounded-2xl rounded-tr-none max-w-[80%] self-end shadow-md">
              <p>मेरी गाय खाना नहीं खा रही है, क्या करें?</p>
              <p className="text-xs text-white/60 mt-2">Just now</p>
            </div>
          </div>

          <div className="p-6 bg-card border-t border-border flex gap-4 items-center">
            <Button variant="outline" size="icon" className="h-12 w-12 rounded-full border-2">
              <Mic className="h-5 w-5" />
            </Button>
            <div className="flex-grow relative">
              <input 
                type="text" 
                placeholder="यहाँ अपना सवाल लिखें..." 
                className="w-full h-12 bg-muted rounded-full px-6 border-none focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <Button size="icon" className="h-12 w-12 rounded-full shadow-lg">
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
