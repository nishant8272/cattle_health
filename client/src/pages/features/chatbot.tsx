import { useState, useRef, useEffect } from "react";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatInputArea } from "@/components/chat/ChatInputArea";
import { ChatMessageItem } from "@/components/chat/ChatMessageItem";
import { Bot, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

interface Chat {
  id: string;
  title: string;
  date: string;
  messages: Message[];
}

export default function ChatbotPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Cow eating habits",
      date: new Date().toISOString(),
      messages: [
        { id: "m1", role: "user", content: "मेरी गाय खाना नहीं खा रही है, क्या करें?" },
        { id: "m2", role: "assistant", content: "यदि आपकी गाय खाना नहीं खा रही है, तो यह कई कारणों से हो सकता है जैसे कि पेट में कीड़े, अपच, या कोई संक्रमण। \n\n**प्राथमिक उपाय:**\n- उसे ताजा और साफ पानी पिलाएं।\n- थोड़ा गुड़ और नमक मिलाकर दें।\n\n*यदि स्थिति 24 घंटे में नहीं सुधरती है, तो कृपया तुरंत पशु चिकित्सक से संपर्क करें।*" }
      ]
    }
  ]);
  
  const [activeChatId, setActiveChatId] = useState<string | null>("1");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);
  const messages = activeChat?.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: "New chat",
      date: new Date().toISOString(),
      messages: []
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
  };

  const handleSendMessage = async (content: string) => {
    if (!activeChatId) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, userMessage],
          title: chat.messages.length === 0 ? content.slice(0, 30) + "..." : chat.title
        };
      }
      return chat;
    }));

    setIsLoading(true);

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I am the modern UI AI assistant for Cattle GPT. In production, I connect to an LLM to answer:\n\n> " + content + "\n\nFeel free to ask more. Notice how my text has no background box?"
      };
      
      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, aiResponse]
          };
        }
        return chat;
      }));
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-background dark:bg-[#212121] text-foreground overflow-hidden relative font-sans">
      <ChatSidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
      />
      
      <main className="flex-1 flex flex-col h-full relative min-w-0 transition-all duration-300">
        
        {/* Top Navbar Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-3 bg-background dark:bg-[#212121]">
          <div className="flex items-center gap-2 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 px-3 py-1.5 rounded-xl transition-colors">
            <h1 className="text-lg font-semibold text-foreground tracking-tight">Cattle GPT <span className="text-muted-foreground ml-1">4o</span></h1>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            U
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 overflow-y-auto w-full scroll-smooth">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center p-8 pb-32">
              <div className="w-16 h-16 rounded-full border border-border flex items-center justify-center mb-6 shadow-sm bg-background">
                <Bot className="w-8 h-8 text-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-8 text-center max-w-md">
                How can I help you with your cattle today?
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl px-4">
                <button 
                  onClick={() => handleSendMessage("What are the symptoms of foot-and-mouth disease?")}
                  className="px-4 py-3 rounded-2xl border border-border bg-background hover:bg-muted/50 text-left transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">Disease identification</p>
                  <p className="text-xs text-muted-foreground mt-0.5 opacity-70">Foot-and-mouth disease symptoms</p>
                </button>
                <button 
                  onClick={() => handleSendMessage("How to improve milk yield in cows?")}
                  className="px-4 py-3 rounded-2xl border border-border bg-background hover:bg-muted/50 text-left transition-colors"
                >
                  <p className="text-sm font-medium text-foreground">Diet & Nutrition</p>
                  <p className="text-xs text-muted-foreground mt-0.5 opacity-70">Ways to improve milk yield</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="pb-40 pt-4">
              {messages.map((message) => (
                <ChatMessageItem key={message.id} role={message.role} content={message.content} />
              ))}
              {isLoading && (
                <div className="w-full text-foreground px-4 py-3">
                  <div className="max-w-3xl flex gap-4 mx-auto">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-background border border-border shadow-sm mt-0.5">
                      <Bot className="w-5 h-5 text-foreground" />
                    </div>
                    <div className="flex items-center h-8">
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce mr-1"></div>
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s] mr-1"></div>
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Floating Input Area Wrapper */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background dark:from-[#212121] via-background/90 dark:via-[#212121]/90 to-transparent pt-10 pb-4 px-2">
          <ChatInputArea onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
