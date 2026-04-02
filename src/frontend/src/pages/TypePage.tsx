import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { motion } from "motion/react";
import { PageBreadcrumb } from "../components/Breadcrumb";
import { useGetSubtypesByType } from "../hooks/useQueries";
import type { NavState } from "../types/navigation";

interface TypePageProps {
  typeId: string;
  typeName: string | undefined;
  categoryId: string | undefined;
  categoryName: string | undefined;
  onNavigate: (state: NavState) => void;
}

function formatWorkers(n: bigint): string {
  const num = Number(n);
  if (num >= 10_000_000) return `${(num / 10_000_000).toFixed(1)} Cr`;
  if (num >= 100_000) return `${(num / 100_000).toFixed(1)}L`;
  return num.toLocaleString("en-IN");
}

export function TypePage({
  typeId,
  typeName,
  categoryId,
  categoryName,
  onNavigate,
}: TypePageProps) {
  const { data: subtypes, isLoading } = useGetSubtypesByType(typeId);

  const breadcrumbItems = [
    ...(categoryId
      ? [
          {
            label: categoryName || "Category",
            navState: { view: "category" as const, categoryId, categoryName },
          },
        ]
      : []),
    {
      label: typeName || "Type",
      navState: {
        view: "type" as const,
        typeId,
        typeName,
        categoryId,
        categoryName,
      },
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <PageBreadcrumb items={breadcrumbItems} onNavigate={onNavigate} />

        <div className="mt-6 mb-8">
          <Button
            data-ocid="type.back.button"
            variant="ghost"
            size="sm"
            onClick={() =>
              onNavigate({ view: "category", categoryId, categoryName })
            }
            className="text-muted-foreground mb-2"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to{" "}
            {categoryName || "Category"}
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{typeName}</h1>
          <p className="text-muted-foreground mt-1">
            {subtypes?.length || 0} career pathways to explore
          </p>
        </div>

        {isLoading ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            data-ocid="type.loading_state"
          >
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(subtypes || []).map((sub, i) => (
              <motion.div
                key={sub.id}
                data-ocid={`subtypes.item.${i + 1}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-card rounded-xl border border-border shadow-card hover:shadow-lg transition-shadow p-6 flex flex-col"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-bold text-foreground text-base leading-snug">
                    {sub.name}
                  </h3>
                  <Badge className="text-xs flex-shrink-0 bg-[oklch(0.56_0.08_210/0.12)] text-[oklch(0.35_0.075_210)] border-[oklch(0.56_0.08_210/0.3)] hover:bg-[oklch(0.56_0.08_210/0.2)]">
                    {sub.employmentPercentage.toFixed(1)}% workforce
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-3">
                  {sub.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                  <Users className="w-3.5 h-3.5" />
                  <span>
                    ~{formatWorkers(sub.totalWorkersEstimate)} workers in India
                  </span>
                </div>
                <Button
                  data-ocid={`subtypes.item.${i + 1}.button`}
                  onClick={() =>
                    onNavigate({
                      view: "subtype",
                      categoryId,
                      categoryName,
                      typeId,
                      typeName,
                      subtypeId: sub.id,
                      subtypeName: sub.name,
                    })
                  }
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit"
                >
                  View Details <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
