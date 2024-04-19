import type { Character } from './character.ts'
import type { Database } from './database.types.ts'
import type { Family } from './family.ts'


export type QuestStatus = 'pending' | 'toBeValidated' | 'validated'

export type Quest = Database['public']['Tables']['quest']['Row']
export type QuestInsertForm = Database['public']['Tables']['quest']['Insert']
export type QuestUpdateForm = Database['public']['Tables']['quest']['Update']
export type QuestWithDetails = Omit<Quest, 'character'> & {
  character?: Character
  family: Family
}
