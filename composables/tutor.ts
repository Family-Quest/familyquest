import type { Database } from '~/types/database.types'

export function useFetchTutorByUser () {
  const supabase = useSupabaseClient<Database>()

  return useQuery({
    queryFn: async () => {
      const { data, error } = await supabase.from('tutor').select('id, family, user, pseudo').maybeSingle()
      if (error) throw new Error(error.message)
      return data
    },
    queryKey: ['tutor', 'get-tutor-by-user'],
  })
}
