export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      character: {
        Row: {
          avatar: Database["public"]["Enums"]["AvatarName"]
          experience: number
          family: string
          gold: number
          id: string
          password: string
          pseudo: string
        }
        Insert: {
          avatar: Database["public"]["Enums"]["AvatarName"]
          experience?: number
          family: string
          gold?: number
          id?: string
          password: string
          pseudo: string
        }
        Update: {
          avatar?: Database["public"]["Enums"]["AvatarName"]
          experience?: number
          family?: string
          gold?: number
          id?: string
          password?: string
          pseudo?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_character_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
        ]
      }
      family: {
        Row: {
          creator: string
          id: string
          name: string
        }
        Insert: {
          creator: string
          id?: string
          name: string
        }
        Update: {
          creator?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_family_creator_fkey"
            columns: ["creator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      history: {
        Row: {
          character: string
          createdAt: string
          family: string
          gold: number
          id: string
          quest: string | null
          reward: string | null
          tutor: string | null
        }
        Insert: {
          character: string
          createdAt?: string
          family: string
          gold: number
          id?: string
          quest?: string | null
          reward?: string | null
          tutor?: string | null
        }
        Update: {
          character?: string
          createdAt?: string
          family?: string
          gold?: number
          id?: string
          quest?: string | null
          reward?: string | null
          tutor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_history_reward_fkey"
            columns: ["reward"]
            isOneToOne: false
            referencedRelation: "reward"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_point_character_fkey"
            columns: ["character"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_point_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_point_task_fkey"
            columns: ["quest"]
            isOneToOne: false
            referencedRelation: "quest"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_point_tutor_fkey"
            columns: ["tutor"]
            isOneToOne: false
            referencedRelation: "tutor"
            referencedColumns: ["id"]
          },
        ]
      }
      quest: {
        Row: {
          character: string | null
          created_at: string
          description: string | null
          family: string
          gold: number
          id: string
          name: string
          rank: number | null
          status: string | null
        }
        Insert: {
          character?: string | null
          created_at?: string
          description?: string | null
          family: string
          gold: number
          id?: string
          name: string
          rank?: number | null
          status?: string | null
        }
        Update: {
          character?: string | null
          created_at?: string
          description?: string | null
          family?: string
          gold?: number
          id?: string
          name?: string
          rank?: number | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_quest_character_fkey"
            columns: ["character"]
            isOneToOne: false
            referencedRelation: "character"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_task_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
        ]
      }
      reward: {
        Row: {
          created_at: string
          description: string
          family: string | null
          gold: number
          id: string
          name: string
          rank: number | null
        }
        Insert: {
          created_at?: string
          description: string
          family?: string | null
          gold: number
          id?: string
          name: string
          rank?: number | null
        }
        Update: {
          created_at?: string
          description?: string
          family?: string | null
          gold?: number
          id?: string
          name?: string
          rank?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "public_activity_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor: {
        Row: {
          family: string
          id: string
          password: string
          pseudo: string
          user: string
        }
        Insert: {
          family: string
          id?: string
          password: string
          pseudo: string
          user: string
        }
        Update: {
          family?: string
          id?: string
          password?: string
          pseudo?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_administrator_family_fkey"
            columns: ["family"]
            isOneToOne: false
            referencedRelation: "family"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_administrator_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_auth_family: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      AvatarName: "drakus" | "elara" | "erevan" | "fenrir"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
