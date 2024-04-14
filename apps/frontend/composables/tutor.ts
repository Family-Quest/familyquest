import type { Tutor } from '@repo/types'

export function useFetchTutorByUser () {
  return useQuery({
    queryFn: async () => await $fetch<Tutor>('/api/tutor'),
    queryKey: ['tutor', 'get-one-tutor'],
  })
}
