import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "motion/react";
import type { NavState } from "../types/navigation";

type LegalPageId = "disclaimer" | "privacy" | "terms" | "accuracy";

interface LegalPageProps {
  legalPage: LegalPageId;
  onNavigate: (state: NavState) => void;
}

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalContent {
  title: string;
  subtitle: string;
  sections: LegalSection[];
}

const legalContent: Record<LegalPageId, LegalContent> = {
  disclaimer: {
    title: "Disclaimer",
    subtitle: "Important information about how to use CareerLens India",
    sections: [
      {
        heading: "Educational Purpose Only",
        body: "All content on CareerLens India is provided for general educational and informational purposes only. It does not constitute professional career counselling, vocational guidance, psychological assessment, or financial advice. Students are encouraged to consult qualified career counsellors, teachers, and parents before making major educational or career decisions.",
      },
      {
        heading: "No Liability",
        body: "CareerLens India, its creators, contributors, and operators shall not be liable for any direct, indirect, incidental, or consequential loss or damage arising from decisions made based on content available on this platform. Career outcomes depend on individual effort, aptitude, market conditions, and many other factors outside our control.",
      },
      {
        heading: "Assessment Results",
        body: "The Career Readiness Assessment on this platform is a self-reflection tool designed to help students explore their interests and aptitudes. It is not a certified psychometric test, IQ test, or professional evaluation. Results should be treated as one data point, not a definitive verdict on a student's abilities or future.",
      },
      {
        heading: "Content Accuracy",
        body: "While we strive to keep salary data, college information, and career descriptions accurate and current, the information may not reflect the most recent market conditions. Please cross-verify important data from official sources before acting on it.",
      },
      {
        heading: "External Links",
        body: "CareerLens India may reference external websites (Shiksha.com, QS Rankings, Kaggle, etc.) for further information. We are not responsible for the content, accuracy, or availability of these external sites.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    subtitle: "We respect your privacy. Here's what we do and don't collect.",
    sections: [
      {
        heading: "What We Collect",
        body: "Phase 1 of CareerLens India does not collect, store, or process any personal data. There are no user accounts, login systems, or data tracking mechanisms. Assessment results are stored only in your browser's session memory and are deleted when you close the tab.",
      },
      {
        heading: "Session Data",
        body: "The Career Readiness Assessment results exist only in your browser during your active session. We do not transmit this data to any server, database, or third party. The results disappear permanently when you close the browser tab.",
      },
      {
        heading: "Cookies",
        body: "This platform uses only essential technical cookies required for the application to function. No advertising cookies, tracking pixels, or third-party analytics are used.",
      },
      {
        heading: "Children's Privacy",
        body: "This platform is designed for use by students aged 13 and above. We do not knowingly collect any data from users under the age of 13. In line with India's Digital Personal Data Protection Act 2023 (DPDP), no personal data of minors is collected or processed.",
      },
      {
        heading: "Future Phases",
        body: "If future versions of CareerLens India introduce user accounts or data collection, a separate, updated Privacy Policy will be published, and explicit consent will be obtained before any data is collected.",
      },
      {
        heading: "Contact",
        body: "For any privacy-related questions, please contact us through the website.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    subtitle: "By using CareerLens India, you agree to these terms.",
    sections: [
      {
        heading: "Acceptance",
        body: "By accessing and using CareerLens India, you agree to comply with and be bound by these Terms of Use. If you do not agree to these terms, please do not use this platform.",
      },
      {
        heading: "Permitted Use",
        body: "CareerLens India is intended for personal, non-commercial use by students, parents, and educators exploring career awareness. You may share content from this platform with proper attribution. You may not reproduce, republish, or sell content from this platform without written permission.",
      },
      {
        heading: "Age Requirement",
        body: "This platform is intended for users aged 13 years and above. Users under 18 should use this platform with parental awareness and guidance.",
      },
      {
        heading: "No Misuse",
        body: "Users must not attempt to compromise the security, performance, or availability of this platform. Automated scraping, crawling, or data extraction is not permitted.",
      },
      {
        heading: "Intellectual Property",
        body: "All content on CareerLens India \u2014 including career descriptions, assessments, salary data, and design \u2014 is the intellectual property of the platform creators. Content is licensed for personal educational use only.",
      },
      {
        heading: "Changes to Terms",
        body: "We reserve the right to update these Terms of Use at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.",
      },
    ],
  },
  accuracy: {
    title: "Content Accuracy Notice",
    subtitle: "How we source our data and how to report inaccuracies",
    sections: [
      {
        heading: "Our Data Sources",
        body: "Career descriptions, salary ranges, employment statistics, and college information on CareerLens India are compiled from publicly available sources including the Ministry of Labour and Employment (India), National Sample Survey reports, NASSCOM India IT reports, LinkedIn India Jobs Reports (2023\u20132024), QS World University Rankings, Shiksha.com, and various industry association reports.",
      },
      {
        heading: "Salary Data",
        body: "Salary ranges are indicative annual CTC figures for the Indian job market as of 2024\u20132025. Actual salaries vary significantly based on company, city, skills, and individual performance. Salary data is reviewed and updated periodically.",
      },
      {
        heading: "AI-Generated Content Disclosure",
        body: "Some career descriptions, day-in-the-life narratives, and skill summaries on this platform were generated or refined with the assistance of AI tools. All AI-generated content has been reviewed for factual accuracy, but may not perfectly reflect every individual's experience in the field.",
      },
      {
        heading: "Last Reviewed",
        body: "Content was last reviewed in March 2026. We aim to review and update salary data, college information, and entrance exam details annually.",
      },
      {
        heading: "Report an Inaccuracy",
        body: "If you find information that appears incorrect, outdated, or misleading, we encourage you to report it. Accurate data is critical for students making important decisions, and we take correction requests seriously. Please contact us through the website with specific details of the inaccuracy.",
      },
      {
        heading: "No Liability",
        body: "Despite our best efforts, CareerLens India cannot guarantee 100% accuracy of all content. Please refer to the Disclaimer for our full liability policy.",
      },
    ],
  },
};

const pageTitles: Record<LegalPageId, string> = {
  disclaimer: "Disclaimer",
  privacy: "Privacy Policy",
  terms: "Terms of Use",
  accuracy: "Content Accuracy Notice",
};

export function LegalPage({ legalPage, onNavigate }: LegalPageProps) {
  const content = legalContent[legalPage];
  const title = pageTitles[legalPage];

  return (
    <main data-ocid="legal.page">
      {/* Dark header */}
      <section
        style={{
          background:
            "linear-gradient(135deg, oklch(0.18 0.08 255) 0%, oklch(0.25 0.10 240) 100%)",
        }}
        className="border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-sm text-white/60 mb-6"
            aria-label="Breadcrumb"
          >
            <button
              type="button"
              data-ocid="legal.link"
              onClick={() => onNavigate({ view: "home" })}
              className="hover:text-white transition-colors"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-white/90">{title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
              {content.title}
            </h1>
            <p className="text-white/70 text-lg">{content.subtitle}</p>
            <p className="text-white/45 text-sm mt-3">
              Last updated: March 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-card rounded-2xl border border-border shadow-sm p-8 md:p-10"
          >
            <div className="space-y-8">
              {content.sections.map((section, sectionIndex) => (
                <div
                  key={section.heading}
                  className="pb-8 border-b border-border last:border-0 last:pb-0"
                >
                  <h2 className="text-lg font-semibold text-foreground mb-3">
                    {sectionIndex + 1}. {section.heading}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Navigation at bottom */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              data-ocid="legal.back_button"
              variant="outline"
              onClick={() => onNavigate({ view: "home" })}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <Button
              data-ocid="legal.home_button"
              variant="ghost"
              onClick={() => onNavigate({ view: "home" })}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          </div>

          {/* Other legal pages */}
          <div className="mt-8 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3 font-medium">
              Other legal pages:
            </p>
            <div className="flex flex-wrap gap-4">
              {(Object.entries(pageTitles) as [LegalPageId, string][]).map(
                ([id, name]) =>
                  id !== legalPage ? (
                    <button
                      key={id}
                      type="button"
                      data-ocid={`legal.${id}.link`}
                      onClick={() =>
                        onNavigate({ view: "legal", legalPage: id })
                      }
                      className="text-sm text-primary underline-offset-2 hover:underline transition-colors"
                    >
                      {name}
                    </button>
                  ) : null,
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
