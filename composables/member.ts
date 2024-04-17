import type { Database } from '~/types/database.types'

export function useFetchMembersByFamily (familyId: MaybeRef<string>) {
  const supabase = useSupabaseClient<Database>()
  const familyReference = toRef(familyId)

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: Boolean(familyReference.value),
    queryFn: async () => {
      const { data, error } = await supabase.from('member').select('id, pseudo, role, supabase_user, createdAt').eq('family', familyReference.value).order('pseudo')
      if (error) throw new Error(error.message)
      return data
    },
    queryKey: ['member', 'get-all-family-members', familyReference.value],
  })
}

