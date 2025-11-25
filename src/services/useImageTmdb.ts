export const sizes = ['w92', 'w154', 'w185', 'w342', 'w500', 'w780', 'original'] as const;

export default function (size: (typeof sizes)[number], path: string) {
  if (!sizes.includes(size)) throw new Error('invalid size');
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
