export type ViewType =
  | "home"
  | "category"
  | "type"
  | "subtype"
  | "search"
  | "student-profile"
  | "subject-gateway"
  | "assessment"
  | "legal";

export interface NavState {
  view: ViewType;
  categoryId?: string;
  categoryName?: string;
  typeId?: string;
  typeName?: string;
  subtypeId?: string;
  subtypeName?: string;
  searchQuery?: string;
  legalPage?: "disclaimer" | "privacy" | "terms" | "accuracy";
  grade?: string;
  stream?: string;
  selectedSubjects?: string[];
}
