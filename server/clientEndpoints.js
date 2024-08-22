import { Listing, Pilot, Application, PilotReview } from "./database/model.js"
import { Sequelize } from "sequelize"
import getRatingColor from "../src/functions/getRatingColor.js"

//return all listings with a specific client id
export const getListingsByClient = async (req, res) => {
  console.log(req.session)
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" })
  } else {
    const allListings = await Listing.findAll({
      where: { clientId: req.session.userId, completed: false },
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
  // grabs all applications for a specific user
  const applications = await Application.findAll({
    include: {
      model: Listing,
      where: {
        clientId: req.session.userId,
      },
    },
  })

  // set up array with a butt-ton of info
  // the data is wrapped in a Promise.all, because we are doing a repeated SQL query for each application in the array. We need to make sure we have all of that data before hitting the .send() method. If we don't put this in a Promise.all(), we'd be sending the unfulfilled Promise objects from our database
  const applicationsWithRatings = await Promise.all(
    applications.map(async (application) => {
      // creates a copy of the application object and does away with the Sequelize object data type
      const applicationCopy = { ...application.dataValues }

      // Finds all PilotReviews for the each pilot who applied
      const reviewsOnPilot = await PilotReview.findAll({
        where: {
          reviewedPilot: application.applyingPilot,
        },
        // creates a column called 'avgRating' which is an aggregated average of the pilot_rating columns from the PilotReview
        attributes: [
          [Sequelize.fn("AVG", Sequelize.col("pilot_rating")), "avgRating"],
        ],
      })

      // Adds a new key-value pair to the applicationCopy that includes the average review rating
      applicationCopy.reviews = (+reviewsOnPilot[0].dataValues.avgRating).toFixed(2)
      applicationCopy.reviewColor = getRatingColor(application.reviews)
      
      // returns applicationCopy to the applicationsWithRatings array
      return applicationCopy
    })
  )

  // Sends the updated array of objects to the front end
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
  //console.log(application)
  console.log("session", req.session)

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

    const applicationsWithRatings = await Promise.all(
      applications.map(async (application) => {
        const applicationCopy = { ...application.dataValues }

        const reviewsOnPilot = await PilotReview.findAll({
          where: {
            reviewedPilot: application.applyingPilot,
          },
          attributes: [
            [Sequelize.fn("AVG", Sequelize.col("pilot_rating")), "avgRating"],
          ],
        })

        applicationCopy.reviews = reviewsOnPilot[0]
        applicationCopy.reviewCol = getRatingColor(application.reviews)
        
        return applicationCopy
      })
    )

    res.send(applicationsWithRatings)
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
  //console.log(application)
  console.log("session", req.session)

  const listing = await Listing.findByPk(application.applyingListing)
  //console.log(listing.listingId, listing.assignedPilot, listing.clientId)

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

    const applicationsWithRatings = await Promise.all(
      applications.map(async (application) => {
        const applicationCopy = { ...application.dataValues }

        const reviewsOnPilot = await PilotReview.findAll({
          where: {
            reviewedPilot: application.applyingPilot,
          },
          attributes: [
            [Sequelize.fn("AVG", Sequelize.col("pilot_rating")), "avgRating"],
          ],
        })

        applicationCopy.reviews = reviewsOnPilot[0]
        applicationCopy.reviewCol = getRatingColor(application.reviews)

        return applicationCopy
      })
    )

    res.send(applicationsWithRatings)
  } else {
    res.status(401).json({
      error: "The Client ID on the listing does not match Current User ID",
    })
  }
}
