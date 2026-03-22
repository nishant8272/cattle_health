import { Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
  role: "user" | "assistant" | "system";
  content: string;
}

export function ChatMessageItem({ role, content }: ChatMessageItemProps) {
  if (role === "system") return null;

  return (
    <div className="w-full text-foreground px-4 py-3 pb-4">
      <div className={cn(
        "max-w-3xl flex gap-4 mx-auto",
        role === "user" ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Assistant Avatar */}
        {role === "assistant" && (
          <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-background border border-border shadow-sm mt-0.5">
            <Bot className="w-5 h-5 text-foreground" />
          </div>
        )}

        <div className={cn(
          "relative flex flex-col gap-1 md:gap-3 max-w-[80%] md:max-w-[70%]",
          role === "user" ? "items-end" : "items-start w-full max-w-full"
        )}>
          {role === "user" ? (
            <div className="px-5 py-2.5 rounded-3xl bg-muted/60 dark:bg-[#2f2f2f] text-foreground inline-block">
              <div className="whitespace-pre-wrap">{content}</div>
            </div>
          ) : (
            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none break-words w-full">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
