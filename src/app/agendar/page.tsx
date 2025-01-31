"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AgendarConsulta() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [data, setData] = useState("")
  const [medico, setMedico] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para enviar os dados do agendamento para o backend
    console.log({ nome, email, data, medico })
    // Após o agendamento bem-sucedido, redirecione o usuário
    router.push("/agendamento-confirmado")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-primary">Agendar Consulta</h2>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">
            Data da Consulta
          </label>
          <input
            type="date"
            id="data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="medico" className="block text-sm font-medium text-gray-700">
            Médico
          </label>
          <select
            id="medico"
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          >
            <option value="">Selecione um médico</option>
            {/* Aqui você adicionaria opções dinâmicas baseadas nos médicos cadastrados */}
            <option value="1">Dr. Silva</option>
            <option value="2">Dra. Santos</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Agendar
        </button>
      </form>
    </div>
  )
}

