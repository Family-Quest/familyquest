import type { QuestInsertForm, QuestUpdateForm } from '~/types/quest'
import type { Database } from '~/types/database.types'

export function useFetchQuestsByFamily (familyId: MaybeRef<string>){
  const familyReference = toRef(familyId)

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    queryFn: async () => await $fetch(`/api/family/${familyReference.value}/quests`, { method: 'get' }),
    queryKey: ['quest', familyReference.value],
  })
}

export function useCreateQuest () {
  const supabase = useSupabaseClient<Database>()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: QuestInsertForm) => {
      const { error } = await supabase.from('quest').insert(body)
      if (error) throw new Error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
    },
  })
}

export function useUpdateQuest (questId: MaybeRef<string>) {
  const questIdReference = toRef(questId)
  const supabase = useSupabaseClient<Database>()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: QuestInsertForm) => {
      const { error } = await supabase.from('quest').update(data).match({ id: questIdReference.value })
      if (error) throw new Error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['quest'] })
    },
  })
}

export function useDeleteQuest (questId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const supabase = useSupabaseClient<Database>()
  const questIdReference = toRef(questId)

  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('quest').delete().match({ id: questIdReference.value })
      if (error) throw new Error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['quest'] })
    },

  })
}

export function useValidateQuest (questId: MaybeRef<string>) {
  const queryClient = useQueryClient()
  const supabase = useSupabaseClient<Database>()
  const questIdReference = toRef(questId)
  return useMutation({
    mutationFn: async (data: QuestUpdateForm) => {
      const { error } = await supabase.from('quest').update(data).match({ id: questIdReference.value })
      if (error) throw new Error(error.message)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['quest'] })
    },

  })
}

