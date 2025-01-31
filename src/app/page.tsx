import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
      <h1 className="text-4xl font-bold text-primary mb-8">Bem-vindo ao Saúde Connect</h1>
      <div className="flex space-x-4">
        <Link href="/login" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
          Login
        </Link>
        <Link href="/agendar" className="bg-secondary text-primary px-4 py-2 rounded-md hover:bg-blue-100 transition">
          Agendar Consulta
        </Link>
      </div>
    </main>
  )
}

