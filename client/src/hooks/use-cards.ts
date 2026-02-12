import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type InsertSavedCard } from "@shared/routes";
import { type SavedCard } from "@shared/schema";

export function useCards() {
  return useQuery({
    queryKey: [api.cards.list.path],
    queryFn: async () => {
      const res = await fetch(api.cards.list.path);
      if (!res.ok) throw new Error("Failed to fetch saved cards");
      return api.cards.list.responses[200].parse(await res.json());
    },
  });
}

export function useCard(id: number) {
  return useQuery({
    queryKey: [api.cards.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.cards.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch card");
      return api.cards.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}

export function useCreateCard() {
  const queryClient = useQueryClient();

  // Check if API is enabled (will be false on GitHub Pages)
  const apiEnabled = import.meta.env.VITE_API_ENABLED !== "false";

  return useMutation({
    mutationFn: async (data: InsertSavedCard) => {
      if (!apiEnabled) {
        throw new Error("Backend API is not available in static hosting mode");
      }

      const res = await fetch(api.cards.create.path, {
        method: api.cards.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.cards.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to save card");
      }
      return api.cards.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cards.list.path] });
    },
  });
}
