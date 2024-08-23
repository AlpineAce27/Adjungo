import { Client, Pilot, Listing, Application, PilotReview, ClientReview, db  } from "./model.js"

const result = await Client.findByPk(1)

console.log('client1', result)

await db.close()