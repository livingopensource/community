import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  const community = await prisma.membership.create({
    data: {
      name: "Community",
      subTitle: "This tier is perfect for those starting their journey in the open-source world or looking to stay informed about industry developments.",
      description: "<p>Access to open source resources and repositories</p> <p>Discounted entry to conferences and networking events</p> <p>Opportunities to contribute to high profile open-source projects</p> <p>Reduced rates for Linux certification courses</p>",
      amount: 600,
      currency: "ZMW",
      period: 12,
    },
  })

  const professional = await prisma.membership.create({
    data: {
      name: "Proffesional",
      subTitle: "Ideal for professionals seeking to deepen their expertise and expand their network within the open-source community.",
      description: "<p>All Community benefits</p><p>One-on-one mentorship sessions with experienced IT professional</p> <p>Personalized career development plans and guidance</p> <p>Recognition as a Premium Member on the LOS website</p>",
      amount: 6000,
      currency: "ZMW",
      period: 12,
    },
  })

  const corporate = await prisma.membership.create({
    data: {
      name: "Corporate",
      subTitle: "The corporate tier offers exclusive access and premium support,",
      description: "<p>All professional benefits </p> <p>Exclusive live sessions with renowned instructor Sander Van Vugt</p> <p>Early access to high-level training and certification programs</p> <p>VIP invitations to global open-source conferences and events</p> <p>Personalized introductions to industry leaders and experts</p> <p>Priority support and direct access to the Foundation’s leadership team</p>",
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