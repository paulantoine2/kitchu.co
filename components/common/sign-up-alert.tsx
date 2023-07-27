"use client"

import React from "react"
import Link from "next/link"

import { useSupabase } from "@/app/supabase-provider"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { Button } from "../ui/button"

export default function SignUpAlert() {
  const { session } = useSupabase()

  if (!session)
    return (
      <Button asChild size="lg">
        <Link href="/auth">Pré-inscription</Link>
      </Button>
    )

  return (
    <Alert variant="primary" className="mb-5 w-[500px]">
      <AlertTitle>
        Félicitations ! Vous êtes maintenant pré-inscrit à Kitchu.
      </AlertTitle>
      <AlertDescription>
        Nous avons bien enregistré votre intérêt et vous tiendrons informé(e)
        des dernières mises à jour et du lancement officiel. <br />
        Merci de nous avoir rejoints dans cette aventure culinaire !
      </AlertDescription>
    </Alert>
  )
}
