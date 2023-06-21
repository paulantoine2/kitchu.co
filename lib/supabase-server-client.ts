import { cache } from "react"
import { cookies } from "next/headers"
import {
  SupabaseClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs"

import { Database } from "./database.types"

export const createServerSupabaseClient = cache(() =>
  createServerComponentClient<Database>({ cookies })
)
