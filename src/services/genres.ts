import api from "@/plugins/axios";

export async function getGenres(type: "movie" | "tv") {
  return api
    .get(`/genre/${type}/list`)
    .then((r) => ({ result: true as true, data: r.data.genres }))
    .catch(() => ({ result: false as false }));
}