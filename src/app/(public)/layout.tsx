import { PublicNavbar } from "@/components/layout/PublicNavbar";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-background">
      <PublicNavbar />
      <main className="pt-24">{children}</main>
      <footer className="py-12 px-6 border-t border-border/50 bg-muted/5 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-muted-foreground text-sm font-medium">
          <div className="flex items-center gap-2 group cursor-pointer text-foreground">
             <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)] group-hover:scale-110 transition-transform">
                <span className="font-black text-xs">TT</span>
             </div>
             <span className="font-black tracking-tighter text-sm uppercase">Tea Tech</span>
          </div>
          <p>© 2026 Tea Tech Operations. All rights reserved.</p>
          <div className="flex items-center gap-6">
             <a href="#" className="hover:text-primary transition-colors">Twitter</a>
             <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
             <a href="#" className="hover:text-primary transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
