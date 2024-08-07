import { Listing, Pilot, Application, PilotReview } from "./database/model.js"

//return all listings with a specific client id
export const getListingsByClient = async (req, res) => {
  console.log(req.session)
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" })
  } else {
    const allListings = await Listing.findAll({
      where: { clientId: req.session.userId },
    })
    res.send(allListings)
  }
}

//return a single listing with a specific client id and listing id
export const getOneListingByClient = async (req, res) => {
  const { listingId } = req.params
  console.log(listingId)
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" })
  } else {
    const listing = await Listing.findOne({
      where: {
        listingId: listingId,
        //clientId: req.session.userId,
      },
    })
    res.send(listing)
  }
}

//create a new listing
export const createListing = async (req, res) => {
  //req.body should come with an object called newListing that contains all the properties and values to be made
  const { newListing } = req.body
  console.log(newListing)
  if (req.session.userId) {
    newListing.clientId = req.session.userId
    Listing.create(newListing)
    res.send(
      `New listing created! ${newListing.listingId}: ${newListing.clientId}`
    )
  } else {
    res.status(401).json({
      error: "The Client ID on the listing does not match Current User ID",
    })
  }
}

//edit an existing listing
export const editListing = async (req, res) => {
  //req.params will specify which listing is being change
  const { listingId } = req.params
  //req.body should come with an object called changes that contains the properties and values to be changed
  const { changes } = req.body
  const listing = await Listing.findOne({
    where: {
      listingId: listingId,
    },
  })
  if (req.session.userId === listing.clientId) {
    listing.set(changes)
    await listing.save()
    console.log(listing)
    res.send(listing)
  } else {
    res.status(401).json({
      error: "The Client ID on the listing does not match Current User ID",
    })
  }
}

//delete an existing listing
export const deleteListing = async (req, res) => {
  const { listingId } = req.params
  const listing = await Listing.findOne({
    where: {
      listingId: listingId,
    },
  })
  if (req.session.userId === listing.clientId) {
    await listing.destroy()
    res.send(`Listing deleted: ${listingId}`)
  } else {
    res.status(401).json({
      error: "The Client ID on the listing does not match Current User ID",
    })
  }
}
//send all applications the current client has
export const getApplicationsbyClient = async (req, res) => {
  const applications = await Application.findAll({
    include: {
      model: Listing,
      where: {
        clientId: req.session.userId,
      },
    },
  })
 
  //console.log(applications)
  //we would like to show the average rating of each pilot applying, so we add a "avgRating" property to each application object before sending it
  const applicationsWithRatings = applications.map(async(application) => { 
    //grab reviews of the pilot applying
    const reviewsOnPilot = await PilotReview.findAll({
      where: {
        reviewedPilot : application.applyingPilot
      }
    })
    //console.log(reviewsOnPilot)
    //calculate the average rating that this user has
    let total = 0
    reviewsOnPilot.forEach((review) => {
      total = total + Number(review.pilotRating)
      //console.log(avg)
    })
    const rating = total / reviewsOnPilot.length
    // application.pilotRating = rating
    console.log("new application", rating)
    return application
  })
  //console.log(applicationsWithRatings)
  res.send(applicationsWithRatings)
}

//send all applications from a specific listing that the client has
export const getApplicationsbyListing = async (req, res) => {
  const { listingId } = req.params
  const ownedByUser = await Listing.findOne({
    where: { listingId: listingId, clientId: req.session.userId },
  })
  console.log(ownedByUser)
  if (ownedByUser) {
    const applications = await Application.findAll({
      include: {
        model: Listing,
        where: {
          listingId: listingId,
          clientId: req.session.userId,
        },
      },
    })
    res.send(applications)
  } else {
    res.send("This listing is not owned by the current user")
  }
}

//accept an application
export const acceptApplication = async (req, res) => {
  const { applicationId } = req.params
  const application = await Application.findByPk(applicationId)
  console.log(application)

  const listing = await Listing.findByPk(application.applyingListing)
  //console.log(listing.listingId, listing.assignedPilot, listing.clientId)

  if (req.session.userId === listing.clientId) {
    //accept the application by changing the "assigned pilot"
    listing.set({ assignedPilot: application.applyingPilot })
    await listing.save()
    //delete the application
    await application.destroy()
    const applications = await Application.findAll({
      include: {
        model: Listing,
        where: {
          clientId: req.session.userId,
        },
      },
    })
    res.send(applications)
  } else {
    res.status(401).json({
      error: "The Client ID on the listing does not match Current User ID",
    })
  }
}

//accept an application
export const denyApplication = async (req, res) => {
  const { applicationId } = req.params
  const application = await Application.findByPk(applicationId)
  const listing = await Listing.findByPk(application.applyingListing)
  if (req.session.userId === listing.clientId) {
    //delete the application
    await application.destroy()
    const applications = await Application.findAll({
      include: {
        model: Listing,
        where: {
          clientId: req.session.userId,
        },
      },
    })
    res.send(applications)
  } else {
    res.status(401).json({
      error: "The Client ID on the listing does not match Current User ID",
    })
  }
}
