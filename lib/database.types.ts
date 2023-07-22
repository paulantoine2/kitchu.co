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
          persons: number
          recipe_id: string
          user_id: string
        }
        Insert: {
          persons: number
          recipe_id: string
          user_id: string
        }
        Update: {
          persons?: number
          recipe_id?: string
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
      cuisine: {
        Row: {
          icon: string | null
          id: string
          name: string
        }
        Insert: {
          icon?: string | null
          id: string
          name: string
        }
        Update: {
          icon?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      fridge: {
        Row: {
          ingredient_id: string
          quantity: number
          unit: string
          user_id: string
        }
        Insert: {
          ingredient_id: string
          quantity: number
          unit: string
          user_id: string
        }
        Update: {
          ingredient_id?: string
          quantity?: number
          unit?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fridge_ingredient_id_fkey"
            columns: ["ingredient_id"]
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fridge_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ingredient: {
        Row: {
          category: string
          id: string
          name: string
        }
        Insert: {
          category?: string
          id: string
          name: string
        }
        Update: {
          category?: string
          id?: string
          name?: string
        }
        Relationships: []
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
      market_product: {
        Row: {
          external_id: string
          id: number
          ingredient: string
          name: string
          sale_unit: string
          sale_volume: number
        }
        Insert: {
          external_id: string
          id?: number
          ingredient: string
          name: string
          sale_unit: string
          sale_volume: number
        }
        Update: {
          external_id?: string
          id?: number
          ingredient?: string
          name?: string
          sale_unit?: string
          sale_volume?: number
        }
        Relationships: [
          {
            foreignKeyName: "market_product_ingredient_fkey"
            columns: ["ingredient"]
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          }
        ]
      }
      market_product_price: {
        Row: {
          price_kg: number
          product_id: number
          sale_price: number
          salepoint_id: number
          updated_at: string
        }
        Insert: {
          price_kg: number
          product_id: number
          sale_price: number
          salepoint_id: number
          updated_at: string
        }
        Update: {
          price_kg?: number
          product_id?: number
          sale_price?: number
          salepoint_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_product_price_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "market_product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_product_price_salepoint_id_fkey"
            columns: ["salepoint_id"]
            referencedRelation: "market_salepoint"
            referencedColumns: ["id"]
          }
        ]
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
      quantity: {
        Row: {
          amount: number | null
          ingredient_id: string
          recipe_id: string
          unit: string
        }
        Insert: {
          amount?: number | null
          ingredient_id: string
          recipe_id: string
          unit?: string
        }
        Update: {
          amount?: number | null
          ingredient_id?: string
          recipe_id?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "quantity_ingredient_id_fkey"
            columns: ["ingredient_id"]
            referencedRelation: "ingredient"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quantity_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          }
        ]
      }
      recipe: {
        Row: {
          headline: string | null
          id: string
          link: string | null
          name: string
          full_name: string | null
        }
        Insert: {
          headline?: string | null
          id: string
          link?: string | null
          name: string
        }
        Update: {
          headline?: string | null
          id?: string
          link?: string | null
          name?: string
        }
        Relationships: []
      }
      recipe_cuisine: {
        Row: {
          cuisine_id: string
          recipe_id: string
        }
        Insert: {
          cuisine_id: string
          recipe_id: string
        }
        Update: {
          cuisine_id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_cuisine_cuisine_id_fkey"
            columns: ["cuisine_id"]
            referencedRelation: "cuisine"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_cuisine_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          }
        ]
      }
      recipe_tag: {
        Row: {
          recipe_id: string
          tag_id: string
        }
        Insert: {
          recipe_id: string
          tag_id: string
        }
        Update: {
          recipe_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_tag_recipe_id_fkey"
            columns: ["recipe_id"]
            referencedRelation: "recipe"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recipe_tag_tag_id_fkey"
            columns: ["tag_id"]
            referencedRelation: "tag"
            referencedColumns: ["id"]
          }
        ]
      }
      tag: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      full_name: {
        Args: {
          "": unknown
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
