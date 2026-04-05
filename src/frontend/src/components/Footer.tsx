import { BookOpen, Compass, MapPin, Scale, Target, Zap } from "lucide-react";
import type { NavState } from "../types/navigation";

interface FooterProps {
  onNavigate: (state: NavState) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  const linkClass =
    "text-white/70 hover:text-white transition-colors cursor-pointer underline-offset-2 hover:underline";

  return (
    <footer
      style={{ background: "oklch(0.18 0.08 255)" }}
      className="text-white mt-auto print:hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <button
              type="button"
              data-ocid="footer.home.link"
              onClick={() => onNavigate({ view: "identity" })}
              className="flex items-center gap-2 mb-3 group"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <Target className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold font-display text-white group-hover:text-white/90">
                CareerLens India
              </span>
            </button>
            <p className="text-sm text-white/70 leading-relaxed">
              Helping Indian students discover their ideal career path with
              scientific assessments and actionable data.
            </p>
            <p className="text-xs text-white/50 mt-2">
              Your Career. Your Path.
            </p>
          </div>

          {/* Engines */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Engines
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  data-ocid="footer.identity.link"
                  onClick={() => onNavigate({ view: "identity" })}
                  className={linkClass}
                >
                  Identity Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.opportunity.link"
                  onClick={() => onNavigate({ view: "opportunity" })}
                  className={linkClass}
                >
                  Opportunity Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.decision.link"
                  onClick={() => onNavigate({ view: "decision" })}
                  className={linkClass}
                >
                  Decision Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.execution.link"
                  onClick={() => onNavigate({ view: "execution" })}
                  className={linkClass}
                >
                  Execution Engine
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.wow.link"
                  onClick={() => onNavigate({ view: "wow" })}
                  className={linkClass}
                >
                  WOW Blueprint
                </button>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  data-ocid="footer.explore.link"
                  onClick={() => onNavigate({ view: "explore" })}
                  className={linkClass}
                >
                  Career Universe
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.industries.link"
                  onClick={() => onNavigate({ view: "category" })}
                  className={linkClass}
                >
                  Browse Industries
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">
              Legal
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  data-ocid="footer.disclaimer.link"
                  onClick={() =>
                    onNavigate({ view: "legal", legalPage: "disclaimer" })
                  }
                  className={linkClass}
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.privacy.link"
                  onClick={() =>
                    onNavigate({ view: "legal", legalPage: "privacy" })
                  }
                  className={linkClass}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.terms.link"
                  onClick={() =>
                    onNavigate({ view: "legal", legalPage: "terms" })
                  }
                  className={linkClass}
                >
                  Terms of Use
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-ocid="footer.accuracy.link"
                  onClick={() =>
                    onNavigate({ view: "legal", legalPage: "accuracy" })
                  }
                  className={linkClass}
                >
                  Content Accuracy
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-white/60">
            \u00a9 {year}. Built with \u2764 using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              caffeine.ai
            </a>
          </p>
          <p className="text-xs text-white/40">
            For educational and awareness purposes only. No data is stored or
            shared.
          </p>
        </div>
      </div>
    </footer>
  );
}
