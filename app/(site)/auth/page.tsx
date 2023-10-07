import { Metadata } from "next"
import Link from "next/link"

import { Logo } from "@/components/common/logo"
import { UserAuthForm } from "@/components/user-auth-form"

export const metadata: Metadata = {
  robots: { index: false },
}

export default async function Login() {
  return (
    <div className="mx-auto flex align-center mt-20 w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <Logo height="20" />
        <h1 className="text-2xl font-semibold tracking-tight">
          Quel est votre email ?
        </h1>
      </div>
      <UserAuthForm />
    </div>
  )
}
