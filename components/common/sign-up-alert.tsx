"use client"

import React from "react"

import { useSupabase } from "@/app/supabase-provider"

import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

export default function SignUpAlert() {
  const { session } = useSupabase()

  if (!session) return null

  return (
    <Alert variant="primary" className="mt-2">
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
