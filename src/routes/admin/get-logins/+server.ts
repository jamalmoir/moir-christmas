import { PrismaClient } from '@prisma/client'
import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const db = new PrismaClient()

    const people = await db.person.findMany()
    const logins = people.map(p => [p.name, p.passcode])

    return json(logins)
}