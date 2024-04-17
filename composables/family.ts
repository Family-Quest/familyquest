import type { Database } from '~/types/database.types'
import type { FamilyInsertForm, FamilyInvitationForm } from '~/types/family'
import bcrypt from 'bcryptjs'

export function useFetchFamilyByUser () {
  const supabase = useSupabaseClient<Database>()

  return useQuery({
    queryFn: async () => {
      const { data, error } = await supabase.from('family').select('*').maybeSingle()
      if (error) throw new Error(error.message)
      return data
    },
    queryKey: ['family', 'get-family-by-user'],
  })
}

export function useFetchFamilyById (familyId: MaybeRef<string>) {
  const supabase = useSupabaseClient<Database>()
  const familyReference = toRef(familyId)

  return useQuery({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    enabled: Boolean(familyReference.value),
    queryFn: async () => {
      const { data, error } = await supabase.from('family').select('*').eq('id', familyReference.value).single()
      if (error) throw new Error(error.message)
      return data
    },
    queryKey: ['family', 'get-one-family', familyReference.value],
  })
}

export function useCreateFamily () {
  const supabase = useSupabaseClient<Database>()
  const user = useSupabaseUser()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (body: FamilyInsertForm) => {
      const { data: family, error: errorFamily } = await supabase.from('family').insert({ name: body.name }).select().single()
      if(errorFamily) throw createError(errorFamily)

      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(body.password, salt)

      // eslint-disable-next-line camelcase, @typescript-eslint/naming-convention
      const { error: errorMember } = await supabase.from('member').insert({ password: hash, family: family.id, pseudo: body.pseudo, supabase_user: user.value?.id, role: 'tutor' })
      if(errorMember) throw createError(errorMember)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
    },
  })
}

export function useFamilyInvitation (familyId: MaybeRef<string>) {
  const familyIdRefence = toRef(familyId)
  const supabase = useSupabaseClient<Database>()
  const runtimeConfig = useRuntimeConfig()
  const redirectTo = `${runtimeConfig.public.DEPLOY_PRIME_URL}/create-password`

  return useMutation({
    mutationFn: async (body: FamilyInvitationForm) => {
      const { error } = await supabase.auth.admin.inviteUserByEmail(body.invitedEmail, { data: { family: familyIdRefence.value }, redirectTo })
      if (error) throw createError(error)
    },
  })
}

export function useJoinFamily (familyId: MaybeRef<string>) {
  const supabase = useSupabaseClient<Database>()
  const queryClient = useQueryClient()
  const familyReference = toRef(familyId)
  const user = useSupabaseUser()

  return useMutation({
    mutationFn: async (body: FamilyInsertForm) => {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync(body.password, salt)

      // eslint-disable-next-line camelcase, @typescript-eslint/naming-convention
      const { error: errorMember } = await supabase.from('member').insert({ password: hash, family: familyReference.value, pseudo: body.pseudo, supabase_user: user.value?.id, role: 'tutor' })
      if(errorMember) throw createError(errorMember)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['family'] })
    },
  })
}
