import type { Database } from '~/types/database.types'

export type Reward = Database['public']['Tables']['reward']['Row']
export type RewardInsertForm = Database['public']['Tables']['reward']['Insert']
export type RewardUpdateForm = Database['public']['Tables']['reward']['Update']
