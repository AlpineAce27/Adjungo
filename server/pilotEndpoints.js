import { Listing, Pilot, Application, PilotReview } from "./database/model.js"

//send all applications the current pilot has sent
export const getApplicationsbyPilot = async (req, res) => {
  const applications = await Application.findAll({
    where: {
      applyingPilot: req.session.userId,
    },
  })
  res.send(applications)
}

//create a new application
export const createApplication = async (req, res) => {
  //req.body should come with an object called newListing that contains all the properties and values to be made
  let { jobId } = req.params
  jobId = Number(jobId)
  let isItDuplicate = await Application.findOne({
    where: {
      applyingListing: jobId,
      applyingPilot: req.session.userId,
    },
  })
  console.log(isItDuplicate)
  if (
    req.session.userId &&
    req.session.userType === "pilot" &&
    isItDuplicate === null
  ) {
    const newApplication = {
      applyingListing: jobId,
      applyingPilot: req.session.userId,
    }
    console.log(newApplication)
    Application.create(newApplication)
    res.send(`Application sent! ${newApplication.applyingListing}`)
  } else {
    if (isItDuplicate !== null) {
      res.status(401).json({
        error: "Cannot send more than one application per job per pilot.",
      })
    } else {
      res.status(401).json({
        error: "Must be logged in as a pilot to create applications.",
      })
    }
  }
}

//send all listings where the current user is the assigned pilot
export const getListingsByPilot = async (req, res) => {
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" })
  } else {
    const allListings = await Listing.findAll({
      where: { assignedPilot: req.session.userId },
    })
    res.send(allListings)
  }
}

//remove the current user from the assigned pilot slot of a job listing
export const resignFromJob = async (req, res) => {
  let { jobId } = req.params
  jobId = Number(jobId)
  const listing = await Listing.findOne({
    where: {
      listingId: jobId,
      assignedPilot: req.session.userId,
    },
  })
  if (req.session.userId && req.session.userType === "pilot" && listing !== null) {
    listing.set({assignedPilot: null})
    await listing.save()
    res.send(`Resigned from job! ${listing}`)
  } else {
    if (listing === null) {
      res.status(401).json({
        error: "Listing does not exist.",
      })
    } else {
      res.status(401).json({
        error: "Must be logged in as a pilot to resign from jobs.",
      })
    }
  }
}

//delete an application created by the curren user (by applicationId)
export const retractApplication = async (req, res) => {
    const { applicationId } = req.params
    const application = await Application.findByPk(applicationId)
    console.log(application)
    if (req.session.userId === application.applyingPilot) {
      await application.destroy()
      res.send(`Application deleted: ${applicationId}`)
    } else {
      res.status(401).json({
        error: "The pilotID on the application does not match Current User ID",
      })
    }
  }