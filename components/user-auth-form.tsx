"use client"

import { HTMLAttributes, useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userAuthSchema } from "@/lib/validations/auth"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { useSupabase } from "@/app/supabase-provider"

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false)

  const { supabase } = useSupabase()

  const disabled = isLoading || isGoogleLoading

  async function onSubmit(data: FormData) {
    setIsLoading(true)

    const result = await supabase.auth.signInWithOtp({
      email: data.email.toLowerCase(),
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    setIsLoading(false)

    if (result.error) {
      return toast({
        title: "Une erreur est survenue.",
        description:
          "Votre tentative d'inscription à échoué. Veuillez réessayer.",
        variant: "destructive",
      })
    }

    return toast({
      title: "Vérifiez vos emails",
      description:
        "Nous vous avons envoyé un lien de connexion. Pensez à vérifier vos spam.",
    })
  }

  async function signInGoogle() {
    setIsGoogleLoading(true)
    const result = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    })

    if (result.error) {
      return toast({
        title: "Une erreur est survenue.",
        description:
          "Votre tentative d'inscription à échoué. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={disabled}
              {...register("email")}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <button
            className={cn(buttonVariants())}
            disabled={disabled}
            aria-label="signup"
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Pré-inscription
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ou se pré-inscrire avec
          </span>
        </div>
      </div>
      <div className="grid gap-2">
        <button
          type="button"
          className={cn(buttonVariants({ variant: "secondary" }))}
          onClick={() => {
            signInGoogle()
          }}
          disabled={disabled}
          aria-label="google"
        >
          {isGoogleLoading ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </button>
      </div>
    </div>
  )
}
