export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
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
      }
      ingredient: {
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
          unit: string
        }
        Update: {
          amount?: number | null
          ingredient_id?: string
          recipe_id?: string
          unit?: string
        }
      }
      recipe: {
        Row: {
          headline: string
          id: string
          link: string | null
          name: string
        }
        Insert: {
          headline?: string
          id: string
          link?: string | null
          name: string
        }
        Update: {
          headline?: string
          id?: string
          link?: string | null
          name?: string
        }
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
