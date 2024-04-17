import type { Tables, TablesInsert, TablesUpdate } from '~/types/database.types'

export type Family = Tables<'family'>
export type FamilyInsertForm = Pick<Tables<'member'>, 'password' | 'pseudo'> & TablesInsert<'family'>
export type FamilyUpdateForm = TablesUpdate<'family'>

export interface FamilyInvitationForm {
  invitedEmail: string
}
