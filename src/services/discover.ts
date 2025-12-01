import api from "@/plugins/axios";

export async function discover(type: "movie" | "tv", params: Record<string, any>) {
  return api
    .get(`/discover/${type}`, { params })
    .then(r => ({ result: true, data: r.data }))
    .catch(() => ({ result: false }));
}