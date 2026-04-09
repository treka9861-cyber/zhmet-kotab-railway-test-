import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Homepage } from "@/pages/Homepage";
import { Store } from "@/pages/Store";
import { WorldsPage } from "@/pages/WorldsPage";
import { WorldDetail } from "@/pages/WorldDetail";
import { BookDetail } from "@/pages/BookDetail";
import { AuthorsPage, AuthorDetail } from "@/pages/AuthorsPage";
import { OffersPage } from "@/pages/OffersPage";
import { MediaPage } from "@/pages/MediaPage";
import { ReaderPage } from "@/pages/ReaderPage";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function AppLayout() {
  return (
    <div className="min-h-screen bg-[hsl(240_15%_4%)] text-[hsl(45_20%_92%)]">
      <Navbar />
      <main>
        <Switch>
          <Route path="/" component={Homepage} />
          <Route path="/store" component={Store} />
          <Route path="/worlds" component={WorldsPage} />
          <Route path="/worlds/:id" component={WorldDetail} />
          <Route path="/book/:id" component={BookDetail} />
          <Route path="/authors" component={AuthorsPage} />
          <Route path="/authors/:id" component={AuthorDetail} />
          <Route path="/offers" component={OffersPage} />
          <Route path="/media" component={MediaPage} />
          <Route path="/reader/:id" component={ReaderPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <AppLayout />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
