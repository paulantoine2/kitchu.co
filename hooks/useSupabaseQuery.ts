import { useCallback, useEffect, useMemo, useState } from "react"
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
    supabase: SupabaseClient<Database>,
    params: any
  ) => Promise<PostgrestSingleResponse<any>>,
  P extends Parameters<Q>["1"]
>(query: Q, params?: P) {
  const supabase = createClientComponentClient()
  const [data, setData] = useState<ResponseData<typeof query>>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  const getData = useCallback(async () => {
    console.log("query", params)
    query(supabase, params)
      .then((response) => {
        console.log("query", params)
        if (response.data) setData(response.data)
        if (response.error) setIsError(true)
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [params])

  useEffect(() => {
    getData()
  }, [getData])

  return { data, isError, isLoading }
}
