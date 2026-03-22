import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PenSquare, PanelLeftClose, PanelLeft, Sun, Moon, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

interface Chat {
  id: string;
  title: string;
  date: string;
}

interface ChatSidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (id: string) => void;
  onNewChat: () => void;
}

export function ChatSidebar({ chats, activeChatId, onSelectChat, onNewChat }: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-[#f9f9f9] dark:bg-[#171717] transition-all duration-300 relative border-r border-[#ececec] dark:border-[#2f2f2f]",
        isCollapsed ? "w-[0px] md:w-[60px]" : "w-[260px] flex-shrink-0"
      )}
    >
      <div className="flex items-center justify-between p-3 h-[60px]">
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            onClick={() => setIsCollapsed(true)}
          >
            <PanelLeftClose className="h-5 w-5" strokeWidth={1.5} />
          </Button>
        )}
        
        {isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex mx-auto text-foreground hover:bg-black/5 dark:hover:bg-white/5 mt-2"
            onClick={() => setIsCollapsed(false)}
            title="Open Sidebar"
          >
            <PanelLeft className="h-5 w-5" strokeWidth={1.5} />
          </Button>
        )}

        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground hover:bg-black/5 dark:hover:bg-white/5"
            onClick={onNewChat}
          >
            <PenSquare className="h-5 w-5" strokeWidth={1.5} />
          </Button>
        )}
      </div>

      <div className={cn("flex-1 overflow-y-auto overflow-x-hidden p-3 pt-2", isCollapsed && "hidden md:block")}>
        {!isCollapsed && (
          <div className="mb-2 text-xs font-semibold text-foreground/50 px-2 mt-2">
            Today
          </div>
        )}
        <div className="space-y-[2px]">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "w-full flex items-center gap-3 px-2 py-2 rounded-lg text-sm transition-colors text-left group",
                activeChatId === chat.id
                  ? "bg-black/5 dark:bg-white/10 text-foreground"
                  : "text-foreground hover:bg-black/5 dark:hover:bg-white/5",
                isCollapsed && "justify-center"
              )}
              title={isCollapsed ? chat.title : undefined}
            >
              {!isCollapsed && <span className="truncate flex-1">{chat.title}</span>}
              {!isCollapsed && activeChatId === chat.id && (
                <MoreHorizontal className="h-4 w-4 shrink-0 text-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={cn("p-3 flex flex-col gap-1", isCollapsed && "hidden md:flex items-center")}>
        <button
          className={cn(
            "w-full flex items-center gap-3 px-2 py-2.5 rounded-lg text-sm text-foreground hover:bg-black/5 dark:hover:bg-white/5 transition-colors",
            isCollapsed && "justify-center"
          )}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-5 w-5 shrink-0" strokeWidth={1.5} /> : <Moon className="h-5 w-5 shrink-0" strokeWidth={1.5} />}
          {!isCollapsed && <span className="truncate font-medium">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </button>
      </div>

      {/* Floating open button when collapsed (Mobile friendly) */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute -right-12 top-4 h-10 w-10 flex md:hidden items-center justify-center text-foreground z-10 hover:bg-black/5 dark:hover:bg-white/5 rounded-full"
        >
          <PanelLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
