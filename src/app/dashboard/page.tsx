"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return <div>Carregando...</div>
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
      <p className="text-gray-700">Bem-vindo, {session.user?.name || session.user?.email}</p>
      {/* Adicione mais conteúdo do dashboard aqui */}
    </div>
  )
}

