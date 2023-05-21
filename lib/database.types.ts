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
      recipe: {
        Row: {
          category: string
          id: string
          name: string
          rating_average: number | null
          rating_count: number
        }
        Insert: {
          category?: string
          id: string
          name: string
          rating_average?: number | null
          rating_count?: number
        }
        Update: {
          category?: string
          id?: string
          name?: string
          rating_average?: number | null
          rating_count?: number
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
