"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Moon,
  Sun,
  Search,
  AlertTriangle,
  CheckCircle2,
  Info,
  X,
} from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  {
    id: 1,
    type: "warning",
    message: "Sorting Conveyor needs repair",
    time: "3 hr ago",
  },
  {
    id: 2,
    type: "warning",
    message: "CTC Machine 1 maintenance overdue",
    time: "6 hr ago",
  },
  {
    id: 3,
    type: "info",
    message: "245 kg received from Kumara Perera",
    time: "2 hr ago",
  },
  {
    id: 4,
    type: "success",
    message: "Sale to Dilmah Tea Co. completed",
    time: "1 hr ago",
  },
];

const notifIcons: Record<string, React.ReactNode> = {
  warning: <AlertTriangle className="h-4 w-4 text-warning" />,
  success: <CheckCircle2 className="h-4 w-4 text-primary" />,
  info: <Info className="h-4 w-4 text-blue-500" />,
};

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const unreadCount = notifications.filter((n) => n.type === "warning").length;

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b border-border/50 bg-background/40 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="h-9 w-9 hover:bg-primary/10 hover:text-primary transition-all rounded-xl" />
        <Separator orientation="vertical" className="h-6 mx-1 bg-border/50" />
      </div>

      {/* Global Search Bar */}
      <div className="relative hidden flex-1 max-w-md sm:block ml-2">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative group"
        >
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
          <Input
            placeholder="Search factory data, machines, or employees..."
            className="pl-10 h-10 bg-muted/30 border-border/50 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary/50 text-sm rounded-2xl shadow-inner-sm transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </div>
        </motion.div>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* Dark mode toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all relative overflow-hidden"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </motion.div>
          </AnimatePresence>
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "relative h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-2xl transition-all"
            )}
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
              </span>
            )}
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0 glass-panel border-border/50 rounded-3xl mt-2 overflow-hidden shadow-2xl" align="end">
            <div className="flex items-center justify-between px-5 py-4 bg-muted/20 border-b border-border/50">
              <h4 className="font-bold text-sm tracking-tight text-foreground">Notifications</h4>
              <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 bg-primary/10 text-primary border-primary/20">
                {notifications.length} Total
              </Badge>
            </div>
            <div className="divide-y divide-border/50 max-h-[400px] overflow-y-auto custom-scrollbar">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="group flex items-start gap-4 px-5 py-4 hover:bg-primary/5 transition-all cursor-pointer"
                >
                  <div className="mt-1 shrink-0 bg-background border border-border/50 rounded-xl p-2 shadow-sm group-hover:border-primary/30 transition-colors">
                    {notifIcons[n.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">
                        {n.type}
                      </p>
                      <p className="text-[10px] font-medium text-muted-foreground">
                        {n.time}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-foreground leading-snug">
                      {n.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-muted/5">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-primary text-xs font-bold hover:bg-primary/10 rounded-xl"
              >
                View Activity History
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* User avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger
            className="inline-flex h-10 items-center justify-center rounded-2xl focus-visible:outline-none hover:bg-primary/5 px-2 py-1 transition-all group"
            aria-label="User menu"
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end hidden md:flex">
                <p className="text-sm font-bold text-foreground leading-none">Roshan Kumara</p>
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Admin</p>
              </div>
              <Avatar className="h-9 w-9 border-2 border-transparent group-hover:border-primary/30 transition-all shadow-sm">
                <AvatarImage
                  src="https://i.pravatar.cc/32?u=roshan-kumara"
                  alt="Roshan Kumara"
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                  RK
                </AvatarFallback>
              </Avatar>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-panel border-border/50 rounded-2xl shadow-2xl mt-2">
            <DropdownMenuLabel className="font-normal p-4">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-foreground">Roshan Kumara</p>
                <p className="text-xs text-muted-foreground">roshen@teafactory.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="py-2.5 px-4 cursor-pointer focus:bg-primary/5 rounded-lg mx-1 my-0.5">
              Profile Details
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2.5 px-4 cursor-pointer focus:bg-primary/5 rounded-lg mx-1 my-0.5">
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/50" />
            <DropdownMenuItem className="py-2.5 px-4 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5 rounded-lg mx-1 my-0.5 font-bold">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
