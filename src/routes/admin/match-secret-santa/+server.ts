import { PrismaClient } from '@prisma/client'
import type { RequestHandler } from './$types';
import { getEventListeners } from 'events';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
    const people = ['jamal', 'mai', 'kiuchi', 'tatsuya', 'tsukki', 'shimi', 'yuriko', 'hiroya'];
    const allowedPairings: {[key: string]: string[]} = {
        jamal: ['kiuchi', 'tatsuya', 'tsukki', 'shimi', 'yuriko', 'hiroya'],
        mai: ['kiuchi', 'tatsuya', 'tsukki', 'shimi', 'yuriko', 'hiroya'],
        kiuchi: ['jamal', 'mai', 'tsukki', 'shimi', 'yuriko', 'hiroya'],
        tatsuya: ['jamal', 'mai', 'tsukki', 'shimi', 'yuriko', 'hiroya'],
        tsukki: ['jamal', 'mai', 'kiuchi', 'tatsuya', 'shimi', 'yuriko', 'hiroya'],
        shimi: ['jamal', 'mai', 'kiuchi', 'tatsuya', 'tsukki', 'yuriko', 'hiroya'],
        yuriko: ['jamal', 'mai', 'kiuchi', 'tatsuya', 'tsukki', 'shimi'],
        hiroya: ['jamal', 'mai', 'kiuchi', 'tatsuya', 'tsukki', 'shimi'],
    };
    let chosen: string[] = [];

    function findPairing(name: string) {
        let possible = allowedPairings[name];

        while (possible) {
            const candidate = possible[Math.floor(Math.random() * possible.length)];
            
            if (candidate === undefined) {
                return null
            }

            if (chosen.includes(candidate)) {
                possible = possible.filter(p => p !== candidate);
            } else {
                return candidate
            }
        }
    return null;
    }

    function pairPeople(people: string[]): {[key: string]: string} {
        const pairs: {[key: string]: string} = {};

        for (const name of people) {
            const candidate = findPairing(name);

            if (candidate === null) {
                console.warn(`No pairing found for ${name}. Retrying...`);
                chosen = []
                return pairPeople(people);
            } else {
                pairs[name] = candidate
                chosen.push(candidate)
            }
        }
        
        try {
            checkPairs(pairs)
        } catch (e) {
            console.error(e)
            chosen = []
            return pairPeople(people)
        }
        return pairs
    }

    function checkPairs(pairs: {[key: string]: string}) {
        const pairedPeople = Object.keys(pairs)
        
        for (const person of people) {
            if (!pairedPeople.includes(person)) {
                throw Error("Not all people are paired!")
            }
        }
        
        for (const person of pairedPeople) {
            if (!pairs[person]) {
                throw Error(`Missing pair for ${person}`)
            }
        }
    }
    const pairs = pairPeople(people)


    const db = new PrismaClient()
    await db.person.createMany({
        data: people.map(name => ({name, passcode: `${name}${Math.floor(Math.random() * 90 + 10)}`})),
    })

    for (const [giverName, receiverName] of Object.entries(pairs)) {
        const giver = await db.person.findUnique({where: {name: giverName}})
        const receiver = await db.person.findUnique({where: {name: receiverName}})

        if (!giver || !receiver) {
            throw Error("MISSING GIVER OR RECEIVER")
        }

        await db.secretSantaPair.create({
            data: {
                giverId: giver.id,
                receiverId: receiver.id,
            }
        })
    }

    const peopleAnon = {}

    for (const person of people) {
        peopleAnon[person.name] = Math.floor(Math.random() * 90 + 10)
    }

    const pairsAnon = Object.entries(pairs).map(pair => [peopleAnon[pair[0]], peopleAnon[pair[1]]])

	return json(pairsAnon);
};
