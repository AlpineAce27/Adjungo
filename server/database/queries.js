import { Client, Pilot, Listing, Application, PilotReview, ClientReview, db  } from "./model.js"

const allListings = await Listing.findAll()

console.log('all listings', allListings.length)