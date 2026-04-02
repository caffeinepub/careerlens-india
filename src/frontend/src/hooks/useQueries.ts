import { useQuery } from "@tanstack/react-query";
import type { Category, IndustryType, Subtype } from "../backend";
import { useActor } from "./useActor";

export function useGetCategories() {
  const { actor, isFetching } = useActor();
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTypesByCategory(categoryId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<IndustryType[]>({
    queryKey: ["types", categoryId],
    queryFn: async () => {
      if (!actor || !categoryId) return [];
      return actor.getTypesByCategory(categoryId);
    },
    enabled: !!actor && !isFetching && !!categoryId,
  });
}

export function useGetSubtypesByType(typeId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Subtype[]>({
    queryKey: ["subtypes", typeId],
    queryFn: async () => {
      if (!actor || !typeId) return [];
      return actor.getSubtypesByType(typeId);
    },
    enabled: !!actor && !isFetching && !!typeId,
  });
}

export function useGetSubtypeDetail(subtypeId: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Subtype | null>({
    queryKey: ["subtype", subtypeId],
    queryFn: async () => {
      if (!actor || !subtypeId) return null;
      return actor.getSubtypeDetail(subtypeId);
    },
    enabled: !!actor && !isFetching && !!subtypeId,
  });
}

export function useSearchSubtypes(keyword: string) {
  const { actor, isFetching } = useActor();
  return useQuery<Subtype[]>({
    queryKey: ["search", keyword],
    queryFn: async () => {
      if (!actor || !keyword.trim()) return [];
      return actor.searchSubtypes(keyword);
    },
    enabled: !!actor && !isFetching && keyword.trim().length > 0,
  });
}
