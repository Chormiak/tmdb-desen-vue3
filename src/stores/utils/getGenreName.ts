export default function (id: number, genres: { id: number; name: string }[]): string | undefined {
  return genres.find((genre) => genre.id === id)?.name;
}