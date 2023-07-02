import { useCallback, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { PostgrestSingleResponse, SupabaseClient } from "@supabase/supabase-js"

import { Database } from "@/lib/database.types"

export type ResponseData<
  T extends (
    supabase: SupabaseClient<Database>,
    params?: any
  ) => Promise<PostgrestSingleResponse<any>>
> = T extends (
  supabase: SupabaseClient<Database>,
  params?: any
) => Promise<PostgrestSingleResponse<infer U>>
  ? U
  : never

export function useSupabaseQuery<
  Q extends (
    supabase: SupabaseClient<Database>
  ) => Promise<PostgrestSingleResponse<any>>
>(query: Q) {
  const supabase = createClientComponentClient()
  const [data, setData] = useState<ResponseData<typeof query>>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const getData = useCallback(async () => {
    query(supabase)
      .then((response) => {
        if (response.data) setData(response.data)
        if (response.error) setIsError(true)
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [query, supabase])

  useEffect(() => {
    getData()
  }, [getData])

  return { data, isError, isLoading }
}
