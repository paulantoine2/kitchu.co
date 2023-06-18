"use client"

import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type Session = {
  market_salepoint: {
    id: number
    chain: number
    name: string
    external_id: string
  }
}

interface SessionContextType {
  session: Session | null
  updateSession: (newSession: Session | null) => void
}

const SessionContext = createContext<SessionContextType>({
  session: null,
  updateSession: () => {},
})

interface SessionProviderProps {
  children: ReactNode
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(() => {
    const storedSession = localStorage.getItem("session")
    return storedSession ? JSON.parse(storedSession) : null
  })

  useEffect(() => {
    localStorage.setItem("session", JSON.stringify(session))
  }, [session])

  const updateSession = (newSession: Session | null) => {
    setSession(newSession)
  }

  return (
    <SessionContext.Provider value={{ session, updateSession }}>
      {children}
    </SessionContext.Provider>
  )
}

function useSession() {
  return useContext(SessionContext)
}

export { useSession, SessionProvider }
