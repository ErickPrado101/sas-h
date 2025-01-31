"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Feedback() {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica para enviar o feedback para o backend
    console.log({ rating, comment })
    // Após o envio bem-sucedido, redirecione o usuário
    router.push("/feedback-enviado")
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-primary">Feedback da Consulta</h2>
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Avaliação
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            required
          >
            <option value="0">Selecione uma avaliação</option>
            <option value="1">1 - Muito ruim</option>
            <option value="2">2 - Ruim</option>
            <option value="3">3 - Regular</option>
            <option value="4">4 - Bom</option>
            <option value="5">5 - Excelente</option>
          </select>
        </div>
        <div className="mb-6">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            Comentário (opcional)
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
            rows={4}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Enviar Feedback
        </button>
      </form>
    </div>
  )
}

