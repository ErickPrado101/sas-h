import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  const body = await request.json()
  const { appointmentId, rating, comment } = body

  const feedback = await prisma.feedback.create({
    data: {
      appointmentId,
      rating,
      comment,
    },
  })

  return NextResponse.json(feedback)
}

