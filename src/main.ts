import { PrismaClient } from '@prisma/client'
import { randEmail, randFullName, randNumber, randPassword, randPhoneNumber } from '@ngneat/falso';
const prisma = new PrismaClient()

async function main() {
    const userContactsMockData = Array.from({ length: 100 }).map(() => ({
        name: randFullName(),
        contactId: randNumber(),
        phone: randPhoneNumber(),

    }))

    const usersMockData = Array.from({ length: 100 }).map(() => ({
        name: randFullName(),
        email: randEmail(),
        password: randPassword(),
        phone_number: randPhoneNumber(),


    }))

    await prisma.user.createMany({ data: usersMockData })
    await prisma.contact.create({
        data: {
            contactId: 13,
            name: randFullName(),
            phone: randPhoneNumber()
        }

    })


    await prisma.spam.create({
        data: {
            phone_number: randPhoneNumber(),
            spamId: 10,
           
        }
    })
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