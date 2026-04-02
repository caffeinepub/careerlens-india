import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchSubtypes } from "../hooks/useQueries";
import type { NavState } from "../types/navigation";

interface SearchPageProps {
  initialQuery?: string;
  onNavigate: (state: NavState) => void;
}

function formatWorkers(n: bigint): string {
  const num = Number(n);
  if (num >= 10_000_000) return `${(num / 10_000_000).toFixed(1)} Cr`;
  if (num >= 100_000) return `${(num / 100_000).toFixed(1)}L`;
  return num.toLocaleString("en-IN");
}

export function SearchPage({ initialQuery = "", onNavigate }: SearchPageProps) {
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery);

  const { data: results, isLoading } = useSearchSubtypes(submitted);

  useEffect(() => {
    setQuery(initialQuery);
    setSubmitted(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(query);
  };

  return (
    <main className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold text-foreground mb-6">
          Search Career Paths
        </h1>

        <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              data-ocid="search.search_input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by industry, role, or keyword (e.g. software, agriculture, IAS)"
              className="pl-9"
            />
          </div>
          <Button
            data-ocid="search.submit_button"
            type="submit"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Search
          </Button>
        </form>

        {isLoading && submitted ? (
          <div className="space-y-4" data-ocid="search.loading_state">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-28 rounded-xl" />
            ))}
          </div>
        ) : results && results.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {results.length} result{results.length !== 1 ? "s" : ""} for "
              {submitted}"
            </p>
            <div className="space-y-4" data-ocid="search.list">
              {results.map((sub, i) => (
                <div
                  key={sub.id}
                  data-ocid={`search.item.${i + 1}`}
                  className="bg-card rounded-xl border border-border shadow-card hover:shadow-lg transition-shadow p-5 flex items-start gap-4"
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">
                      {sub.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                      {sub.description}
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge className="text-xs bg-[oklch(0.56_0.08_210/0.12)] text-[oklch(0.35_0.075_210)] border-[oklch(0.56_0.08_210/0.3)] hover:bg-[oklch(0.56_0.08_210/0.2)]">
                        {sub.employmentPercentage.toFixed(1)}% workforce
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="w-3 h-3" /> ~
                        {formatWorkers(sub.totalWorkersEstimate)} workers
                      </span>
                    </div>
                  </div>
                  <Button
                    data-ocid={`search.item.${i + 1}.button`}
                    onClick={() =>
                      onNavigate({
                        view: "subtype",
                        subtypeId: sub.id,
                        subtypeName: sub.name,
                        typeId: sub.typeId,
                      })
                    }
                    size="sm"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0"
                  >
                    View <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              ))}
            </div>
          </>
        ) : submitted ? (
          <div className="text-center py-16" data-ocid="search.empty_state">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              No results found
            </h3>
            <p className="text-muted-foreground text-sm">
              Try a different keyword like "software", "farming", or "civil
              services".
            </p>
          </div>
        ) : (
          <div className="text-center py-16" data-ocid="search.empty_state">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">
              Start searching
            </h3>
            <p className="text-muted-foreground text-sm">
              Enter a keyword above to discover career paths across India's
              industries.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                "Software Engineer",
                "IAS Officer",
                "Agriculture",
                "NGO",
                "Gig Work",
                "Healthcare",
              ].map((kw) => (
                <Button
                  key={kw}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setQuery(kw);
                    setSubmitted(kw);
                  }}
                  className="text-xs"
                >
                  {kw}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
