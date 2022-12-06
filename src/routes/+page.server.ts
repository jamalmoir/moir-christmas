import type { PageServerLoad } from './$types'
import { PrismaClient } from '@prisma/client'

export const load: PageServerLoad = async ({ }) => {
    const db = new PrismaClient()

    const pairs = await db.secretSantaPair.findMany()
    const people = await db.person.findMany()

    return {pairs, people}
}