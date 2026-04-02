import { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AssessmentPage } from "./pages/AssessmentPage";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { LegalPage } from "./pages/LegalPage";
import { SearchPage } from "./pages/SearchPage";
import { SubjectGatewayPage } from "./pages/SubjectGatewayPage";
import { SubtypeDetailPage } from "./pages/SubtypeDetailPage";
import { TypePage } from "./pages/TypePage";
import type { NavState } from "./types/navigation";

const initialState: NavState = { view: "home" };

export default function App() {
  const [nav, setNav] = useState<NavState>(initialState);

  const handleNavigate = (state: NavState) => {
    setNav(state);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (nav.view) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;

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
          <HomePage onNavigate={handleNavigate} />
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
          <HomePage onNavigate={handleNavigate} />
        );

      case "search":
        return (
          <SearchPage
            initialQuery={nav.searchQuery || ""}
            onNavigate={handleNavigate}
          />
        );

      case "subject-gateway":
        return <SubjectGatewayPage onNavigate={handleNavigate} />;

      case "assessment":
        return <AssessmentPage onNavigate={handleNavigate} />;

      case "legal":
        return (
          <LegalPage
            legalPage={nav.legalPage || "disclaimer"}
            onNavigate={handleNavigate}
          />
        );

      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onNavigate={handleNavigate} currentView={nav.view} />
      <div className="flex-1">{renderPage()}</div>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
