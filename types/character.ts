import type { Database } from '~/types/database.types'

export type Character = Omit<Database['public']['Tables']['character']['Row'], 'password'>
export type CharacterInsertForm = Database['public']['Tables']['character']['Insert']
export type CharacterUpdateForm = Database['public']['Tables']['character']['Update']
