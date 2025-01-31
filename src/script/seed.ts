import prisma from "../lib/prisma"
import bcrypt from "bcrypt"

async function main() {
  const hashedPassword = await bcrypt.hash("21072002", 10)

  const admin = await prisma.user.upsert({
    where: { email: "epg1.prado@gmail.com" },
    update: {},
    create: {
      email: "epg1.prado@gmail.com",
      name: "Admin",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log({ admin })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

