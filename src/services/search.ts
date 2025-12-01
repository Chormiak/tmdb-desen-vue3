import api from "@/plugins/axios";

export async function search(type: "movie" | "tv", params: Record<string, any>) {
  return api
    .get(`/search/${type}`, { params })
    .then(r => ({ result: true, data: r.data }))
    .catch(() => ({ result: false }));
}