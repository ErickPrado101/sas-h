"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

interface Appointment {
  id: string
  patient: { name: string }
  date: string
  status: string
}

interface CustomSession {
  user: {
    role?: string
  }
}

export default function MedicoDashboard() {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: string }
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    if (status === "unauthenticated" || session?.user?.role !== "DOCTOR") {
      router.push("/login")
    }
  }, [status, session, router])

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await fetch("/api/appointments")
      const data = await response.json()
      setAppointments(data)
    }
    fetchAppointments()
  }, [])

  if (status === "loading") {
    return <div>Carregando...</div>
  }

  if (!session || session.user?.role !== "DOCTOR") {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="text-3xl font-bold text-primary mb-6">Painel do Médico</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Próximas Consultas</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Paciente</th>
            <th className="py-2 px-4 border-b">Data</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="py-2 px-4 border-b">{appointment.patient.name}</td>
              <td className="py-2 px-4 border-b">{new Date(appointment.date).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{appointment.status}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:text-blue-700 mr-2">Remarcar</button>
                <button className="text-red-500 hover:text-red-700">Cancelar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

