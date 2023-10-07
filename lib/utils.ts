import { ReadonlyURLSearchParams } from "next/navigation"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`

  return `${pathname}${queryString}`
}

export function removeImageDataPrefix(dataUrl: string): string {
  const prefix = "data:image/png;base64, "
  if (dataUrl.startsWith(prefix)) {
    return dataUrl.slice(prefix.length)
  }
  return dataUrl
}
