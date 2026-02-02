import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Ads from "@/pages/ads";
import { 
  Home as HomeIcon, MapPin, Moon, Sun, Megaphone, Users 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/ads" component={Ads} />
      <Route component={NotFound} />
    </Switch>
  );
}

function BottomNav() {
  const [location] = useLocation();
  const translations = {
    ku_sorani: { home: "سەرەکی", places: "شوێنەکان", theme: "شەو/ڕۆژ", ads: "ڕیکلام", about: "دەربارە" },
    ku_badini: { home: "سەرەکی", places: "جهـ", theme: "شەڤ/ڕۆژ", ads: "ڕیکلام", about: "دەربارە" },
    ar: { home: "الرئيسية", places: "الأماكن", theme: "الوضع الليلي", ads: "إعلان", about: "حول" },
    en: { home: "Home", places: "Places", theme: "Dark Mode", ads: "Ads", about: "About" }
  };
  
  const lang = (localStorage.getItem('lang') || 'ku_sorani') as keyof typeof translations;
  const t = translations[lang] || translations.ku_sorani;

  if (location === "/ads") return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800 py-3 px-6 flex justify-around items-center z-50 rounded-t-3xl shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <Link href="/about">
        <Button variant="ghost" className={`flex flex-col gap-1 h-auto py-1 ${location === "/about" ? "text-blue-600" : "text-zinc-400"}`}>
          <Users className="h-6 w-6" />
          <span className="text-[10px] font-bold">{t.about}</span>
        </Button>
      </Link>
      <Link href="/">
        <Button variant="ghost" className={`flex flex-col gap-1 h-auto py-1 ${location === "/" ? "text-blue-600" : "text-zinc-400"}`}>
          <HomeIcon className="h-6 w-6" />
          <span className="text-[10px] font-bold">{t.home}</span>
        </Button>
      </Link>
    </nav>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Router />
          <BottomNav />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
