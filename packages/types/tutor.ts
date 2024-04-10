import type { Database } from './database.types'

export type Tutor = Omit<Database['public']['Tables']['tutor']['Row'], 'password'>
export type TutorInsertForm = Database['public']['Tables']['tutor']['Insert']
export type TutorUpdateForm = Database['public']['Tables']['tutor']['Update']
