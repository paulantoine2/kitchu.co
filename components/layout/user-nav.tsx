"use client"

import Link from "next/link"
import { LogOut } from "lucide-react"
import md5 from "md5"

import { useSupabase } from "@/app/supabase-provider"

import { Icons } from "../icons"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

function getGravatarURL(email: string) {
  // Trim leading and trailing whitespace from
  // an email address and force all characters
  // to lower case
  const address = String(email).trim().toLowerCase()

  // Create an MD5 hash of the final string
  const hash = md5(address)

  // Grab the actual image URL
  return `https://www.gravatar.com/avatar/${hash}`
}

export function UserNav({ Buttons }: { Buttons: React.ReactNode }) {
  const { session, supabase } = useSupabase()

  if (session)
    return (
      <div className="flex items-center space-x-4">
        {Buttons}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={getGravatarURL(session.user.email || "")}
                  alt={session.user.id}
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => {
                supabase.auth.signOut()
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    )

  return (
    <div className="flex items-center space-x-4">
      <Button asChild size="sm" variant="secondary">
        <Link href="/auth">
          <Icons.user className="mr-2 h-4 w-4" />
          Connexion
        </Link>
      </Button>
      <Button asChild size="sm" variant="secondary">
        <Link href="/auth">Inscription</Link>
      </Button>
    </div>
  )
}
