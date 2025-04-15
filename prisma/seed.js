import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  const community = await prisma.membership.create({
    data: {
      name: "Community",
      subTitle: "This tier is perfect for those starting their journey in the open-source world or looking to stay informed about industry developments.",
      description: "Access to open-source resources and repositories \nMonthly updates on industry news and trends \nParticipation in professional online forums \nDiscounts on training courses, webinars, and events \nOpportunity to join live sessions on requested topics",
      amount: 600,
      currency: "ZMW",
      period: 12,
    },
  })

  const professional = await prisma.membership.create({
    data: {
      name: "Proffesional",
      subTitle: "Ideal for professionals seeking to deepen their expertise and expand their network within the open-source community.",
      description: "All Explorer tier benefits \nAccess to exclusive webinars and virtual workshops \nFree or discounted entry to conferences and networking events \nPriority access to new open-source project releases \nOpportunities to contribute to high-profile open-source projects \nReduced rates for Linux certification courses",
      amount: 6000,
      currency: "ZMW",
      period: 12,
    },
  })

  const corporate = await prisma.membership.create({
    data: {
      name: "Corporate",
      subTitle: "This tier is designed for individuals aiming for significant career advancement, offering tailored support and recognition.",
      description: "All Professional benefits \nOne-on-one mentorship sessions with experienced IT professionals \nPersonalized career development plans and guidance \nRecognition as a Premium Member on the LOS website",
      amount: 9000,
      currency: "ZMW",
      period: 12,
    },
  })

  console.log(`Seeding finished.`)
  console.log({community, professional, corporate})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })