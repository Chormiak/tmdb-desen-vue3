import api from '@/plugins/axios'

export async function trending(
  type: 'movie' | 'tv',
  period: 'day' | 'week',
  params?: Record<string, any>,
) {
  return api
    .get(`/trending/${type}/${period}`, { params })
    .then((r) => ({ result: true, data: r.data }))
    .catch(() => ({ result: false }))
}
