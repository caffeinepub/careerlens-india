import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Briefcase } from "lucide-react";
import { motion } from "motion/react";
import { PageBreadcrumb } from "../components/Breadcrumb";
import { useGetCategories, useGetTypesByCategory } from "../hooks/useQueries";
import type { NavState } from "../types/navigation";

interface CategoryPageProps {
  categoryId: string | null;
  categoryName: string | undefined;
  onNavigate: (state: NavState) => void;
}

type SectorKey = "primary" | "secondary" | "services";

const sectorBanners: Record<
  SectorKey,
  { bg: string; text: string; label: string }
> = {
  primary: {
    bg: "oklch(0.35 0.13 145)",
    text: "white",
    label: "Primary Sector — Nature-based industries",
  },
  secondary: {
    bg: "oklch(0.35 0.10 220)",
    text: "white",
    label: "Secondary Sector — Manufacturing & production",
  },
  services: {
    bg: "oklch(0.44 0.12 55)",
    text: "white",
    label: "Services Sector — Knowledge, care & digital economy",
  },
};

const sectorAccents: Record<SectorKey, string> = {
  primary: "oklch(0.45 0.13 145)",
  secondary: "oklch(0.45 0.10 220)",
  services: "oklch(0.50 0.12 55)",
};

export function CategoryPage({
  categoryId,
  categoryName,
  onNavigate,
}: CategoryPageProps) {
  const { data: allCategories } = useGetCategories();
  const { data: types, isLoading } = useGetTypesByCategory(categoryId);

  const category = allCategories?.find((c) => c.id === categoryId);
  const displayName = categoryName || category?.name || "Category";

  const sectorKey = (categoryId?.toLowerCase() ?? "") as SectorKey;
  const banner = sectorBanners[sectorKey];
  const accentColor = sectorAccents[sectorKey] || "oklch(0.30 0.12 255)";

  // If no specific category selected, show all categories
  if (!categoryId) {
    return (
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <PageBreadcrumb
            items={[
              { label: "Browse Industries", navState: { view: "category" } },
            ]}
            onNavigate={onNavigate}
          />
          <h1 className="text-3xl font-bold text-foreground mt-6 mb-2">
            Browse Industries
          </h1>
          <p className="text-muted-foreground mb-8">
            Select a sector to explore industry types and career paths.
          </p>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(allCategories || []).map((cat, i) => {
                const key = cat.id.toLowerCase() as SectorKey;
                const accent = sectorAccents[key] || "oklch(0.30 0.12 255)";
                return (
                  <motion.div
                    key={cat.id}
                    data-ocid={`browse.item.${i + 1}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="bg-card rounded-xl border border-border shadow-card p-6"
                    style={{ borderLeft: `4px solid ${accent}` }}
                  >
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {cat.description}
                    </p>
                    <Button
                      data-ocid={`browse.item.${i + 1}.button`}
                      onClick={() =>
                        onNavigate({
                          view: "category",
                          categoryId: cat.id,
                          categoryName: cat.name,
                        })
                      }
                      size="sm"
                      style={{ background: accent, color: "white" }}
                    >
                      Explore <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Sector Banner — dark accent zone */}
      {banner && (
        <div
          className="py-5 px-4"
          style={{ background: banner.bg, color: banner.text }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
            <Badge
              className="text-xs uppercase tracking-widest font-semibold border border-white/30"
              style={{ background: "oklch(1 0 0 / 0.12)", color: "white" }}
            >
              {categoryId?.toUpperCase()}
            </Badge>
            <span className="text-white/80 text-sm">{banner.label}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <PageBreadcrumb
          items={[
            {
              label: displayName,
              navState: { view: "category", categoryId, categoryName },
            },
          ]}
          onNavigate={onNavigate}
        />

        <div className="mt-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Button
              data-ocid="category.back.button"
              variant="ghost"
              size="sm"
              onClick={() => onNavigate({ view: "category" })}
              className="text-muted-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-foreground">{displayName}</h1>
          {category?.description && (
            <p className="text-muted-foreground mt-2 max-w-2xl">
              {category.description}
            </p>
          )}
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ocid="category.loading_state"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-48 rounded-xl" />
            ))}
          </div>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              {types?.length || 0} industry types in this sector
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(types || []).map((type, i) => (
                <motion.div
                  key={type.id}
                  data-ocid={`types.item.${i + 1}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-card rounded-xl border border-border shadow-card hover:shadow-md transition-shadow p-6 flex flex-col"
                  style={{ borderLeft: `3px solid ${accentColor}` }}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                      style={{
                        background: accentColor.replace(")", " / 0.12)"),
                        color: accentColor,
                      }}
                    >
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-xs mb-1">
                        {displayName}
                      </Badge>
                      <h3 className="font-bold text-foreground text-lg leading-tight">
                        {type.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                    {type.description}
                  </p>
                  <Button
                    data-ocid={`types.item.${i + 1}.button`}
                    onClick={() =>
                      onNavigate({
                        view: "type",
                        categoryId,
                        categoryName,
                        typeId: type.id,
                        typeName: type.name,
                      })
                    }
                    size="sm"
                    style={{ background: accentColor, color: "white" }}
                  >
                    Explore Subtypes <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
