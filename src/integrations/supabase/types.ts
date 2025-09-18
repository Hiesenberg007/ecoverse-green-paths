export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      badges: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          name: string
          requirement_type: string
          requirement_value: number
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          name: string
          requirement_type: string
          requirement_value: number
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
          requirement_type?: string
          requirement_value?: number
        }
        Relationships: []
      }
      eco_tasks: {
        Row: {
          category: string
          created_at: string | null
          description: string
          difficulty: string | null
          event_date: string | null
          icon_name: string | null
          id: string
          is_featured: boolean | null
          max_participants: number | null
          points: number
          task_type: string | null
          time_estimate: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          difficulty?: string | null
          event_date?: string | null
          icon_name?: string | null
          id?: string
          is_featured?: boolean | null
          max_participants?: number | null
          points: number
          task_type?: string | null
          time_estimate?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          difficulty?: string | null
          event_date?: string | null
          icon_name?: string | null
          id?: string
          is_featured?: boolean | null
          max_participants?: number | null
          points?: number
          task_type?: string | null
          time_estimate?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          badges_earned: number | null
          campus_rank: number | null
          created_at: string | null
          current_streak: number | null
          display_name: string | null
          id: string
          level: number | null
          tasks_completed: number | null
          total_points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          badges_earned?: number | null
          campus_rank?: number | null
          created_at?: string | null
          current_streak?: number | null
          display_name?: string | null
          id?: string
          level?: number | null
          tasks_completed?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          badges_earned?: number | null
          campus_rank?: number | null
          created_at?: string | null
          current_streak?: number | null
          display_name?: string | null
          id?: string
          level?: number | null
          tasks_completed?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      rewards: {
        Row: {
          category: string
          created_at: string | null
          description: string
          id: string
          image_emoji: string | null
          is_popular: boolean | null
          original_price: string | null
          points_required: number
          rating: number | null
          reviews_count: number | null
          stock: number | null
          title: string
          updated_at: string | null
          validity_days: number | null
          vendor: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description: string
          id?: string
          image_emoji?: string | null
          is_popular?: boolean | null
          original_price?: string | null
          points_required: number
          rating?: number | null
          reviews_count?: number | null
          stock?: number | null
          title: string
          updated_at?: string | null
          validity_days?: number | null
          vendor: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string
          id?: string
          image_emoji?: string | null
          is_popular?: boolean | null
          original_price?: string | null
          points_required?: number
          rating?: number | null
          reviews_count?: number | null
          stock?: number | null
          title?: string
          updated_at?: string | null
          validity_days?: number | null
          vendor?: string
        }
        Relationships: []
      }
      user_badges: {
        Row: {
          badge_id: string
          earned_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          earned_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          badge_id?: string
          earned_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
            referencedColumns: ["id"]
          },
        ]
      }
      user_reward_redemptions: {
        Row: {
          expires_at: string
          id: string
          is_used: boolean | null
          points_spent: number
          redeemed_at: string | null
          redemption_code: string
          reward_id: string
          user_id: string
        }
        Insert: {
          expires_at: string
          id?: string
          is_used?: boolean | null
          points_spent: number
          redeemed_at?: string | null
          redemption_code: string
          reward_id: string
          user_id: string
        }
        Update: {
          expires_at?: string
          id?: string
          is_used?: boolean | null
          points_spent?: number
          redeemed_at?: string | null
          redemption_code?: string
          reward_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_reward_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      user_task_completions: {
        Row: {
          completed_at: string | null
          id: string
          points_earned: number
          proof_image_url: string | null
          reflection: string | null
          task_id: string
          user_id: string
          verified: boolean | null
        }
        Insert: {
          completed_at?: string | null
          id?: string
          points_earned: number
          proof_image_url?: string | null
          reflection?: string | null
          task_id: string
          user_id: string
          verified?: boolean | null
        }
        Update: {
          completed_at?: string | null
          id?: string
          points_earned?: number
          proof_image_url?: string | null
          reflection?: string | null
          task_id?: string
          user_id?: string
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "user_task_completions_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "eco_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
