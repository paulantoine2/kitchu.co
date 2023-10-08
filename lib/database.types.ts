export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      cart_recipe: {
        Row: {
          quantity: number
          recipe_id: number
          user_id: string
        }
        Insert: {
          quantity: number
          recipe_id: number
          user_id: string
        }
        Update: {
          quantity?: number
          recipe_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_recipe_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_recipe_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      fridge_ingredient: {
        Row: {
          ingredient_id: number
          quantity: number
          unit_id: number
          user_id: string
        }
        Insert: {
          ingredient_id: number
          quantity: number
          unit_id: number
          user_id: string
        }
        Update: {
          ingredient_id?: number
          quantity?: number
          unit_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fridge_ingredient_ingredient_id_fkey"
            columns: ["ingredient_id"]
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fridge_ingredient_unit_id_fkey"
            columns: ["unit_id"]
            referencedRelation: "unit"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fridge_ingredient_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ingredient: {
        Row: {
          category: string
          created_at: string
          id: number
          name: string
          picture_url: string | null
        }
        Insert: {
          category?: string
          created_at?: string
          id?: number
          name: string
          picture_url?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          id?: number
          name?: string
          picture_url?: string | null
        }
        Relationships: []
      }
      ingredient_unit: {
        Row: {
          ingredient_id: number
          unit_id: number
        }
        Insert: {
          ingredient_id: number
          unit_id: number
        }
        Update: {
          ingredient_id?: number
          unit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ingredient_unit_ingredient_id_fkey"
            columns: ["ingredient_id"]
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredient_unit_unit_id_fkey"
            columns: ["unit_id"]
            referencedRelation: "unit"
            referencedColumns: ["id"]
          }
        ]
      }
      market_chain: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: number
          name: string
        }
        Update: {
          id?: number
          name?: string
        }
        Relationships: []
      }
      market_salepoint: {
        Row: {
          chain: number
          external_id: string
          id: number
          name: string
        }
        Insert: {
          chain: number
          external_id: string
          id?: number
          name: string
        }
        Update: {
          chain?: number
          external_id?: string
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_salepoint_chain_fkey"
            columns: ["chain"]
            referencedRelation: "market_chain"
            referencedColumns: ["id"]
          }
        ]
      }
      recipe: {
        Row: {
          author: string | null
          difficulty: number | null
          id: number
          is_public: boolean
          name: string
          picture_url: string | null
          prep_time_min: number | null
          slug: string
          steps: Json[] | null
        }
        Insert: {
          author?: string | null
          difficulty?: number | null
          id?: number
          is_public?: boolean
          name: string
          picture_url?: string | null
          prep_time_min?: number | null
          slug?: string
          steps?: Json[] | null
        }
        Update: {
          author?: string | null
          difficulty?: number | null
          id?: number
          is_public?: boolean
          name?: string
          picture_url?: string | null
          prep_time_min?: number | null
          slug?: string
          steps?: Json[] | null
        }
        Relationships: [
          {
            foreignKeyName: "recipe_author_fkey"
            columns: ["author"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      recipe_ingredient: {
        Row: {
          ingredient_id: number
          quantity: number
          recipe_id: number
          unit_id: number
        }
        Insert: {
          ingredient_id: number
          quantity: number
          recipe_id: number
          unit_id: number
        }
        Update: {
          ingredient_id?: number
          quantity?: number
          recipe_id?: number
          unit_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredient_ingredient_id_fkey"
            columns: ["ingredient_id"]
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredient_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_ingredient_unit_id_fkey"
            columns: ["unit_id"]
            referencedRelation: "unit"
            referencedColumns: ["id"]
          }
        ]
      }
      unit: {
        Row: {
          id: number
          internal_name: string
          name: string
          ratio_to_mass: number | null
          ratio_to_volume: number | null
          short_name: string | null
        }
        Insert: {
          id?: number
          internal_name: string
          name: string
          ratio_to_mass?: number | null
          ratio_to_volume?: number | null
          short_name?: string | null
        }
        Update: {
          id?: number
          internal_name?: string
          name?: string
          ratio_to_mass?: number | null
          ratio_to_volume?: number | null
          short_name?: string | null
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
