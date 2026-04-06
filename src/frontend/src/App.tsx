import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { SessionProvider } from "./context/SessionContext";
import { CategoryPage } from "./pages/CategoryPage";
import { ExplorePage } from "./pages/ExplorePage";
import { LegalPage } from "./pages/LegalPage";
import { SearchPage } from "./pages/SearchPage";
import { SubtypeDetailPage } from "./pages/SubtypeDetailPage";
import { TypePage } from "./pages/TypePage";
import { DecisionEngine } from "./pages/engines/DecisionEngine";
import { ExecutionEngine } from "./pages/engines/ExecutionEngine";
import { IdentityEngine } from "./pages/engines/IdentityEngine";
import { OpportunityEngine } from "./pages/engines/OpportunityEngine";
import { WOWScreen } from "./pages/engines/WOWScreen";
import type { NavState } from "./types/navigation";

const queryClient = new QueryClient();

const initialState: NavState = { view: "identity" };

function AppContent() {
  const [nav, setNav] = useState<NavState>(initialState);

  const handleNavigate = (state: NavState) => {
    setNav(state);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (nav.view) {
      case "identity":
        return (
          <IdentityEngine
            onNavigate={handleNavigate}
            startDeepMode={nav.deepMode === true}
          />
        );

      case "opportunity":
        return <OpportunityEngine onNavigate={handleNavigate} />;

      case "decision":
        return (
          <DecisionEngine
            onNavigate={handleNavigate}
            selectedCareer={nav.selectedCareer}
          />
        );

      case "execution":
        return <ExecutionEngine onNavigate={handleNavigate} />;

      case "wow":
        return <WOWScreen onNavigate={handleNavigate} />;

      case "explore":
        return <ExplorePage onNavigate={handleNavigate} />;

      case "category":
        return (
          <CategoryPage
            categoryId={nav.categoryId || null}
            categoryName={nav.categoryName}
            onNavigate={handleNavigate}
          />
        );

      case "type":
        return nav.typeId ? (
          <TypePage
            typeId={nav.typeId}
            typeName={nav.typeName}
            categoryId={nav.categoryId}
            categoryName={nav.categoryName}
            onNavigate={handleNavigate}
          />
        ) : (
          <ExplorePage onNavigate={handleNavigate} />
        );

      case "subtype":
        return nav.subtypeId ? (
          <SubtypeDetailPage
            subtypeId={nav.subtypeId}
            subtypeName={nav.subtypeName}
            typeId={nav.typeId}
            typeName={nav.typeName}
            categoryId={nav.categoryId}
            categoryName={nav.categoryName}
            onNavigate={handleNavigate}
          />
        ) : (
          <ExplorePage onNavigate={handleNavigate} />
        );

      case "search":
        return (
          <SearchPage
            initialQuery={nav.searchQuery || ""}
            onNavigate={handleNavigate}
          />
        );

      // Legacy views — redirect to identity
      case "home":
      case "student-profile":
      case "subject-gateway":
      case "assessment":
        return <IdentityEngine onNavigate={handleNavigate} />;

      case "legal":
        return (
          <LegalPage
            legalPage={nav.legalPage || "disclaimer"}
            onNavigate={handleNavigate}
          />
        );

      default:
        return <IdentityEngine onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onNavigate={handleNavigate} currentView={nav.view} />
      <div className="flex-1">{renderPage()}</div>
      <Footer onNavigate={handleNavigate} />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AppContent />
      </SessionProvider>
    </QueryClientProvider>
  );
}
