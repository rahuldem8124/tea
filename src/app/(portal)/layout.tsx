import { ShoppingBag, Box, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/portal" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg glow-green">
              <Box className="h-5 w-5" />
            </div>
            <span className="text-xl font-black tracking-tighter">TEA<span className="text-primary italic">SHOP</span></span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/portal" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">Catalog</Link>
            <Link href="/portal/orders" className="text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">My Orders</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10 text-muted-foreground">
              <User className="h-5 w-5" />
            </Button>
            <Link href="/portal/cart">
              <Button className="rounded-xl h-10 px-5 font-bold gap-2 glow-green shadow-primary/20">
                <ShoppingBag className="h-4 w-4" />
                Cart
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto p-6">
        {children}
      </main>
    </div>
  );
}
