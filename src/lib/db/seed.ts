import { PrismaClient } from '@prisma/client'
import sampleData from '@/lib/db/sample-data'

async function main() {
  const prisma = new PrismaClient()

  await prisma.orderItem.deleteMany()
  await prisma.product.deleteMany()
  await prisma.account.deleteMany()
  await prisma.session.deleteMany()
  await prisma.verificationToken.deleteMany()
  await prisma.user.deleteMany()

  // Seed produktów
  for (const product of sampleData.products) {
    await prisma.product.create({
      data: {
        ...product,
      },
    })
  }

  // Użytkownicy nadal przez createMany (bo tam nie ma JSONów)
  await prisma.user.createMany({ data: sampleData.users })

  console.log('Database seeded successfully!')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})



// import { PrismaClient } from '@prisma/client'
// import sampleData from '@/lib/db/sample-data'

// async function main() {
// 	const prisma = new PrismaClient()

// 	await prisma.product.deleteMany()
// 	await prisma.account.deleteMany()
// 	await prisma.session.deleteMany()
// 	await prisma.verificationToken.deleteMany()
// 	await prisma.user.deleteMany()

// 	await prisma.product.createMany({ data: sampleData.products })
// 	await prisma.user.createMany({ data: sampleData.users })

// 	console.log('Database seeded successfully!')
// }

// main()
