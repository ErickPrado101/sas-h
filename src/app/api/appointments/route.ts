import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/nextauth/route"
import type { Session } from "next-auth"

interface CustomSession extends Session {
  user: {
    id: string
    role: string
  }
}

export async function GET() {
  const session = (await getServerSession(authOptions)) as CustomSession | null

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  let appointments

  if (session.user?.role === "DOCTOR") {
    appointments = await prisma.appointment.findMany({
      where: {
        doctorId: session.user.id,
      },
      include: {
        patient: {
          select: {
            name: true,
          },
        },
      },
    })
  } else if (session.user?.role === "PATIENT") {
    appointments = await prisma.appointment.findMany({
      where: {
        patientId: session.user.id,
      },
      include: {
        doctor: {
          select: {
            name: true,
          },
        },
      },
    })
  } else {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  return NextResponse.json(appointments)
}

export async function POST(request: Request) {
  const session = (await getServerSession(authOptions)) as CustomSession | null

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const body = await request.json()
  const { doctorId, date } = body

  const appointment = await prisma.appointment.create({
    data: {
      patientId: session.user?.id,
      doctorId,
      date,
    },
  })

  return NextResponse.json(appointment)
}

