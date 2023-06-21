import Link from "next/link"

import { UserAuthForm } from "@/components/user-auth-form"

export default async function Login() {
  return (
    <div className="mx-auto flex align-center mt-20 w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          What's your email ?
        </h1>
      </div>
      <UserAuthForm />
    </div>
  )
}
