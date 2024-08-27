import { Client, Pilot, Listing, Application, PilotReview, ClientReview, db  } from "../server/database/model.js"
import clientData from "./data/clients.json" assert { type: "json" }
import pilotData from "./data/pilots.json" assert { type: "json" }
import listingData from "./data/listings.json" assert { type: "json" }
import generatedListingData from "./data/listingsGeneration.js"
import applicationData from "./data/applications.json" assert { type: "json" }
import pilotReviewData from "./data/pilotReviews.json" assert { type: "json"}
import clientReviewData from "./data/clientReviews.json" assert { type: "json"}

console.log("Syncing database...")
await db.sync({ force: true })

const clientsInDB = await Promise.all(
  clientData.map((client) => {
    const newClient = Client.create({
      login: client.login,
      password: client.password,
      company: client.company,
      website: client.website,
      contactEmail: client.contactEmail,
      contactPhone: client.contactPhone,
      companyBio: client.companyBio,
      individual: client.individual,
    })

    return newClient
  })
)
//console.log(clientsInDB);

const pilotsInDB = await Promise.all(
  pilotData.map((pilot) => {
    const newPilot = Pilot.create({
      fname: pilot.fname,
      lname: pilot.lname,
      login: pilot.login,
      password: pilot.password,
      contactEmail: pilot.contactEmail,
      contactPhone: pilot.contactPhone,
      bio: pilot.bio,
      part107Cert: pilot.part107Cert,
    })

    return newPilot
  })
)
//console.log(pilotsInDB);

const listingsInDB = await Promise.all(
  generatedListingData.map((listing) => {
    const newListing = Listing.create({
      clientId: listing.clientId,
      assignedPilot: listing.assignedPilot,
      offer: listing.offer,
      flightDate: listing.flightDate,
      multiday: listing.multiday,
      hardwareProvided: listing.hardwareProvided,
      softwareProvided: listing.softwareProvided,
      internetProvided: listing.internetProvided,
      powerProvided: listing.powerProvided,
      description: listing.description,
      highFlying: listing.highFlying,
      blosFlying: listing.blosFlying,
      payloadDropping: listing.payloadDropping,
      hazmatFlying: listing.hazmatFlying,
      heavyFlying: listing.heavyFlying,
      nightFlying: listing.nightFlying,
      crowdFlying: listing.crowdFlying,
      flightAddress: listing.flightAddress,
      flightCoordinates: JSON.stringify(listing.flightCoordinates),
      flightRadius: listing.flightRadius,
      completed: listing.completed
    })
    if(listing.completed){
      newListing.completed = listing.completed
    }
    return newListing
  })
)
//console.log(listingsInDB)

const applicationsInDB = await Promise.all(
  applicationData.map((application) => {
    const newApplication = Application.create({
      applyingListing: application.applyingListing,
      applyingPilot: application.applyingPilot,
    })

    return newApplication
  })
)
//console.log(applicationsInDB)

const PilotReviewsInDB = await Promise.all(

  pilotReviewData.map((review) => {
 
    const newReview = PilotReview.create({
      reviewedPilot: review.reviewedPilot,
      clientReviewing: review.clientReviewing,
      reviewContent: review.reviewContent,
      pilotRating: review.pilotRating
    })
    return newReview
  })
)

const ClientReviewsInDB = await Promise.all(

  clientReviewData.map((review) => {
    const newReview = ClientReview.create({
      reviewedClient: review.reviewedClient,
      pilotReviewing: review.pilotReviewing,
      reviewContent: review.reviewContent,
      clientRating: review.clientRating
    })
    return newReview
  })
)


