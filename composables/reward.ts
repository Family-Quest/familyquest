import type { RewardInsertForm, RewardUpdateForm } from '~/types/reward.js'
import type { Database } from '~/types/database.types'

export function useFetchRewardsByFamily (familyId: MaybeRef<string>){
  const familyReference = toRef(familyId)
  const supabase = useSupabaseClient<Database>()

  return useQuery({
    queryKey: ['reward', familyReference.value],
    queryFn: async () => {
      const { data, error } = await supabase.from('reward').select('*').eq('family_id', familyReference.value)
      if (error) throw new Error(error.message)
      return data
    },
  })
}

export function useCreateReward () {
  const supabase = useSupabaseClient<Database>()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: RewardInsertForm) => {
      const { error } = await supabase.from('reward').insert(body)
      if (error) throw new Error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reward'] })
    },
  })
}

export function useUpdateReward (rewardId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const supabase = useSupabaseClient<Database>()
  const rewardIdReference = toRef(rewardId)

  return useMutation({
    mutationFn: async (data: RewardUpdateForm) => {
      const { error } = await supabase.from('reward').update(data).match({ id: rewardIdReference.value })
      if (error) throw new Error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reward'] })
    },
  })
}

export function useDeleteReward (rewardId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const supabase = useSupabaseClient<Database>()
  const rewardIdReference = toRef(rewardId)

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('reward').delete().match({ id: rewardIdReference.value })
      if (error) throw new Error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reward'] })
    },
  })
}
