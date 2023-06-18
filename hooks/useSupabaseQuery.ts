import { useEffect, useState } from "react"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export type ResponseData<
  T extends (...args: any[]) => Promise<PostgrestSingleResponse<any>>
> = T extends (...args: any[]) => Promise<PostgrestSingleResponse<infer U>>
  ? U
  : never

export function useSupabaseQuery<
  Q extends (...args: any[]) => Promise<PostgrestSingleResponse<any>>,
  P extends Parameters<Q>
>(query: Q, ...args: P) {
  const [data, setData] = useState<ResponseData<typeof query>>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    query(...args)
      .then((response) => {
        if (response.data) setData(response.data)
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false))
  }, [...args])

  return { data, isError, isLoading }
}
