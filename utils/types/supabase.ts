export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      avatars: {
        Row: {
          id: number;
          url: string | null;
        };
        Insert: {
          id?: number;
          url?: string | null;
        };
        Update: {
          id?: number;
          url?: string | null;
        };
        Relationships: [];
      };
      badges: {
        Row: {
          description: string | null;
          id: number;
          name: string | null;
          url_display: string | null;
          url_gray: string | null;
        };
        Insert: {
          description?: string | null;
          id?: number;
          name?: string | null;
          url_display?: string | null;
          url_gray?: string | null;
        };
        Update: {
          description?: string | null;
          id?: number;
          name?: string | null;
          url_display?: string | null;
          url_gray?: string | null;
        };
        Relationships: [];
      };
      cuisine_groups: {
        Row: {
          cuisine_soft_constraints: string | null;
          group_name: string;
          id: number;
        };
        Insert: {
          cuisine_soft_constraints?: string | null;
          group_name: string;
          id?: number;
        };
        Update: {
          cuisine_soft_constraints?: string | null;
          group_name?: string;
          id?: number;
        };
        Relationships: [];
      };
      cuisine_mappings: {
        Row: {
          google_cuisine: string;
          group_id: number;
          id: number;
        };
        Insert: {
          google_cuisine: string;
          group_id: number;
          id?: number;
        };
        Update: {
          google_cuisine?: string;
          group_id?: number;
          id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "cuisine_mappings_group_id_fkey";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "cuisine_groups";
            referencedColumns: ["id"];
          },
        ];
      };
      group_users: {
        Row: {
          budget: string | null;
          cuisine_preferences: string | null;
          group_id: number;
          id: number;
          is_deleted: boolean | null;
          isready: boolean | null;
          review_description: string | null;
          review_rating: number;
          soft_constraints: string | null;
          user_id: number;
        };
        Insert: {
          budget?: string | null;
          cuisine_preferences?: string | null;
          group_id: number;
          id?: number;
          is_deleted?: boolean | null;
          isready?: boolean | null;
          review_description?: string | null;
          review_rating?: number;
          soft_constraints?: string | null;
          user_id: number;
        };
        Update: {
          budget?: string | null;
          cuisine_preferences?: string | null;
          group_id?: number;
          id?: number;
          is_deleted?: boolean | null;
          isready?: boolean | null;
          review_description?: string | null;
          review_rating?: number;
          soft_constraints?: string | null;
          user_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "fk_group";
            columns: ["group_id"];
            isOneToOne: false;
            referencedRelation: "groups";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "fk_user";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      groups: {
        Row: {
          created_at: string | null;
          day: string | null;
          dining_date: string | null;
          group_code: string | null;
          group_creator: string | null;
          hard_constraints: string | null;
          id: number;
          isdeleted: boolean | null;
          name: string | null;
          pickedrestaurant: number | null;
          similarity: number | null;
          size: number | null;
          status: boolean | null;
        };
        Insert: {
          created_at?: string | null;
          day?: string | null;
          dining_date?: string | null;
          group_code?: string | null;
          group_creator?: string | null;
          hard_constraints?: string | null;
          id?: number;
          isdeleted?: boolean | null;
          name?: string | null;
          pickedrestaurant?: number | null;
          similarity?: number | null;
          size?: number | null;
          status?: boolean | null;
        };
        Update: {
          created_at?: string | null;
          day?: string | null;
          dining_date?: string | null;
          group_code?: string | null;
          group_creator?: string | null;
          hard_constraints?: string | null;
          id?: number;
          isdeleted?: boolean | null;
          name?: string | null;
          pickedrestaurant?: number | null;
          similarity?: number | null;
          size?: number | null;
          status?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "groups_pickedrestaurant_fkey";
            columns: ["pickedrestaurant"];
            isOneToOne: false;
            referencedRelation: "restaurants";
            referencedColumns: ["id"];
          },
        ];
      };
      restaurants: {
        Row: {
          business_status: string | null;
          formatted_address: string | null;
          google_id: string;
          google_maps_URI: string | null;
          hard_constraints: string | null;
          id: number;
          logos: string | null;
          name: string;
          national_phone_number: string | null;
          price_level: string | null;
          primary_type: string | null;
          primary_type_display_name: string | null;
          soft_constraints: string | null;
          website_URI: string | null;
        };
        Insert: {
          business_status?: string | null;
          formatted_address?: string | null;
          google_id: string;
          google_maps_URI?: string | null;
          hard_constraints?: string | null;
          id?: number;
          logos?: string | null;
          name: string;
          national_phone_number?: string | null;
          price_level?: string | null;
          primary_type?: string | null;
          primary_type_display_name?: string | null;
          soft_constraints?: string | null;
          website_URI?: string | null;
        };
        Update: {
          business_status?: string | null;
          formatted_address?: string | null;
          google_id?: string;
          google_maps_URI?: string | null;
          hard_constraints?: string | null;
          id?: number;
          logos?: string | null;
          name?: string;
          national_phone_number?: string | null;
          price_level?: string | null;
          primary_type?: string | null;
          primary_type_display_name?: string | null;
          soft_constraints?: string | null;
          website_URI?: string | null;
        };
        Relationships: [];
      };
      restaurants_duplicate: {
        Row: {
          business_status: string | null;
          formatted_address: string | null;
          google_id: string;
          google_maps_URI: string | null;
          hard_constraints: string | null;
          id: number;
          logos: string | null;
          name: string;
          national_phone_number: string | null;
          price_level: string | null;
          primary_type: string | null;
          primary_type_display_name: string | null;
          soft_constraints: string | null;
          website_URI: string | null;
        };
        Insert: {
          business_status?: string | null;
          formatted_address?: string | null;
          google_id: string;
          google_maps_URI?: string | null;
          hard_constraints?: string | null;
          id?: number;
          logos?: string | null;
          name: string;
          national_phone_number?: string | null;
          price_level?: string | null;
          primary_type?: string | null;
          primary_type_display_name?: string | null;
          soft_constraints?: string | null;
          website_URI?: string | null;
        };
        Update: {
          business_status?: string | null;
          formatted_address?: string | null;
          google_id?: string;
          google_maps_URI?: string | null;
          hard_constraints?: string | null;
          id?: number;
          logos?: string | null;
          name?: string;
          national_phone_number?: string | null;
          price_level?: string | null;
          primary_type?: string | null;
          primary_type_display_name?: string | null;
          soft_constraints?: string | null;
          website_URI?: string | null;
        };
        Relationships: [];
      };
      restaurants_logos: {
        Row: {
          id: number;
          name: string | null;
          restaurant_id: number | null;
          url: string | null;
          url2: string | null;
        };
        Insert: {
          id?: never;
          name?: string | null;
          restaurant_id?: number | null;
          url?: string | null;
          url2?: string | null;
        };
        Update: {
          id?: never;
          name?: string | null;
          restaurant_id?: number | null;
          url?: string | null;
          url2?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "restaurants_logos_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurants_duplicate";
            referencedColumns: ["id"];
          },
        ];
      };
      restaurants_photos: {
        Row: {
          id: number;
          photo: string | null;
          restaurant_id: number | null;
        };
        Insert: {
          id?: number;
          photo?: string | null;
          restaurant_id?: number | null;
        };
        Update: {
          id?: number;
          photo?: string | null;
          restaurant_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "restaurant_photos_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurants";
            referencedColumns: ["id"];
          },
        ];
      };
      restaurants_times: {
        Row: {
          close_hour: number | null;
          close_minute: number | null;
          day: number | null;
          id: number;
          open_hour: number;
          open_minute: number | null;
          restaurant_id: number | null;
        };
        Insert: {
          close_hour?: number | null;
          close_minute?: number | null;
          day?: number | null;
          id?: number;
          open_hour: number;
          open_minute?: number | null;
          restaurant_id?: number | null;
        };
        Update: {
          close_hour?: number | null;
          close_minute?: number | null;
          day?: number | null;
          id?: number;
          open_hour?: number;
          open_minute?: number | null;
          restaurant_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "restaurants_times_restaurant_id_fkey";
            columns: ["restaurant_id"];
            isOneToOne: false;
            referencedRelation: "restaurants";
            referencedColumns: ["id"];
          },
        ];
      };
      user_badges: {
        Row: {
          badge_id: number | null;
          display: boolean | null;
          id: number;
          user_id: number | null;
        };
        Insert: {
          badge_id?: number | null;
          display?: boolean | null;
          id?: number;
          user_id?: number | null;
        };
        Update: {
          badge_id?: number | null;
          display?: boolean | null;
          id?: number;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey";
            columns: ["badge_id"];
            isOneToOne: false;
            referencedRelation: "badges";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_badges_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_weights: {
        Row: {
          atmosphere_weight: number | null;
          budget_weight: number | null;
          cuisine_weight: number | null;
          drink_weight: number | null;
          id: number;
          user_id: number | null;
        };
        Insert: {
          atmosphere_weight?: number | null;
          budget_weight?: number | null;
          cuisine_weight?: number | null;
          drink_weight?: number | null;
          id?: number;
          user_id?: number | null;
        };
        Update: {
          atmosphere_weight?: number | null;
          budget_weight?: number | null;
          cuisine_weight?: number | null;
          drink_weight?: number | null;
          id?: number;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_weights_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          avatar_id: number | null;
          city: string | null;
          country: string | null;
          created_at: string;
          firstName: string | null;
          groups_created: number;
          groups_joined: number;
          hard_constraints: string | null;
          id: number;
          is_deleted: boolean;
          lastName: string | null;
          uid: string | null;
        };
        Insert: {
          avatar_id?: number | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          firstName?: string | null;
          groups_created?: number;
          groups_joined?: number;
          hard_constraints?: string | null;
          id?: number;
          is_deleted?: boolean;
          lastName?: string | null;
          uid?: string | null;
        };
        Update: {
          avatar_id?: number | null;
          city?: string | null;
          country?: string | null;
          created_at?: string;
          firstName?: string | null;
          groups_created?: number;
          groups_joined?: number;
          hard_constraints?: string | null;
          id?: number;
          is_deleted?: boolean;
          lastName?: string | null;
          uid?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_avatar_id_fkey";
            columns: ["avatar_id"];
            isOneToOne: false;
            referencedRelation: "avatars";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      generate_logos_urls: {
        Args: Record<PropertyKey, never>;
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

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
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

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
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;
