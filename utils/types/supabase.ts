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
      cuisine_groups: {
        Row: {
          group_name: string
          id: number
        }
        Insert: {
          group_name: string
          id?: number
        }
        Update: {
          group_name?: string
          id?: number
        }
        Relationships: []
      }
      cuisine_mappings: {
        Row: {
          google_cuisine: string
          group_id: number
          id: number
        }
        Insert: {
          google_cuisine: string
          group_id: number
          id?: number
        }
        Update: {
          google_cuisine?: string
          group_id?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "cuisine_mappings_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "cuisine_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_users: {
        Row: {
          group_id: number
          id: number
          softconstraints: string | null
          user_id: number
        }
        Insert: {
          group_id: number
          id?: number
          softconstraints?: string | null
          user_id: number
        }
        Update: {
          group_id?: number
          id?: number
          softconstraints?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_group"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_user"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string | null
          groupcreator: number | null
          hardconstraints: string | null
          id: number
          isdeleted: boolean | null
          location: string | null
          pickedrestaurant: number | null
          size: number | null
        }
        Insert: {
          created_at?: string | null
          groupcreator?: number | null
          hardconstraints?: string | null
          id?: number
          isdeleted?: boolean | null
          location?: string | null
          pickedrestaurant?: number | null
          size?: number | null
        }
        Update: {
          created_at?: string | null
          groupcreator?: number | null
          hardconstraints?: string | null
          id?: number
          isdeleted?: boolean | null
          location?: string | null
          pickedrestaurant?: number | null
          size?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "groups_groupcreator_fkey"
            columns: ["groupcreator"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "groups_pickedrestaurant_fkey"
            columns: ["pickedrestaurant"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          hardconstraints: string | null
          id: number
          name: string
          place_id: string
          price_level: string | null
          softconstraints: string | null
        }
        Insert: {
          hardconstraints?: string | null
          id?: number
          name: string
          place_id: string
          price_level?: string | null
          softconstraints?: string | null
        }
        Update: {
          hardconstraints?: string | null
          id?: number
          name?: string
          place_id?: string
          price_level?: string | null
          softconstraints?: string | null
        }
        Relationships: []
      }
      restaurants_times: {
        Row: {
          close: number | null
          day: number | null
          id: number
          open: number
          restaurant_id: number | null
        }
        Insert: {
          close?: number | null
          day?: number | null
          id?: number
          open: number
          restaurant_id?: number | null
        }
        Update: {
          close?: number | null
          day?: number | null
          id?: number
          open?: number
          restaurant_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "restaurants_times_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      test_table: {
        Row: {
          age: number | null
          id: number
          name: string | null
        }
        Insert: {
          age?: number | null
          id?: number
          name?: string | null
        }
        Update: {
          age?: number | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      test_users: {
        Row: {
          created_at: string
          email: string | null
          firstname: string | null
          id: number
          lastname: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          firstname?: string | null
          id?: number
          lastname?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          firstname?: string | null
          id?: number
          lastname?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          firstName: string | null
          hardconstraints: string | null
          id: number
          isDeleted: boolean
          lastName: string | null
        }
        Insert: {
          created_at?: string
          firstName?: string | null
          hardconstraints?: string | null
          id?: number
          isDeleted: boolean
          lastName?: string | null
        }
        Update: {
          created_at?: string
          firstName?: string | null
          hardconstraints?: string | null
          id?: number
          isDeleted?: boolean
          lastName?: string | null
        }
        Relationships: []
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
