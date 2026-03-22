import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputAreaProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInputArea({ onSendMessage, isLoading }: ChatInputAreaProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-2 relative">
      <div className="relative flex w-full bg-[#f4f4f4] dark:bg-[#2f2f2f] rounded-[26px] overflow-hidden focus-within:bg-muted/80 dark:focus-within:bg-[#383838] transition-colors">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 bottom-1.5 h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-transparent rounded-full"
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Cattle GPT"
          className="w-full max-h-[200px] min-h-[52px] bg-transparent border-0 focus:ring-0 resize-none py-[14px] pl-[52px] pr-[52px] text-foreground placeholder:text-muted-foreground scrollbar-thin scrollbar-thumb-muted-foreground/20 leading-6"
          rows={1}
          disabled={isLoading}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          size="icon"
          className={cn(
            "absolute right-2 bottom-2 h-9 w-9 rounded-full transition-all flex items-center justify-center",
            input.trim() ? "bg-black dark:bg-white text-white dark:text-black" : "bg-muted-foreground/20 dark:bg-muted-foreground/20 text-muted-foreground dark:text-muted-foreground/50 hover:bg-muted-foreground/20"
          )}
        >
          <ArrowUp className="h-5 w-5" strokeWidth={3} />
        </Button>
      </div>
      <div className="text-center mt-3 text-xs text-muted-foreground/70">
        Cattle GPT can make mistakes. Check important info.
      </div>
    </div>
  );
}
