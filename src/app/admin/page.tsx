"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string | null
  email: string | null
  role: string
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "ADMIN") {
      router.push("/login")
    }
  }, [status, session, router])

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users")
      const data = await response.json()
      setUsers(data)
    }
    fetchUsers()
  }, [])

  if (status === "loading") {
    return <div>Carregando...</div>
  }

  if (!session || session.user?.role !== "ADMIN") {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Painel do Administrador</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Gerenciar Usuários</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nome</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Função</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.name}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.role}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:text-blue-700 mr-2">Editar</button>
                <button className="text-red-500 hover:text-red-700">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

