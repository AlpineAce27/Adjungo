import {
  Client,
  Pilot,
  Listing,
  ClientReview,
  PilotReview,
} from "./database/model.js"

//return all listings
export const getAllListings = async (req, res) => {
  const allListings = await Listing.findAll({ where: { completed: false } })
  res.send(allListings)
}

//return a single listing with a specific listing id
export const getOneListing = async (req, res) => {
  const { listingId } = req.params
  console.log("Listing:", listingId)
  if (!req.session.userId) {
    res.status(401).json({ error: "Unauthorized" })
  } else {
    const listing = await Listing.findByPk(listingId)
    res.send(listing)
  }
}

//log a user in
export const login = async (req, res) => {
  const { enteredLogin, enteredPassword, userType } = req.body

  if (userType === "client") {
    console.log("client type hit")
    const user = await Client.findOne({ where: { login: enteredLogin } })
    if (user && user.password === enteredPassword) {
      req.session.userId = user.clientId
      req.session.userType = "client"
      console.log("Login:", req.session)
      res.send({
        success: true,
        userID: req.session.userId
       })
    } else {
      res.status(401).send({ success: false })
    }
  } else if (userType === "pilot") {
    const user = await Pilot.findOne({ where: { login: enteredLogin } })
    if (user && user.password === enteredPassword) {
      req.session.userId = user.pilotId
      req.session.userType = "pilot"
      res.send({
        success: true,
        userID: req.session.userId })
    } else {
      res.status(401).send({ success: false })
    }
  }
}

//log a user out
export const logout = async (req, res) => {
  if (!req.session.userId) {
    res.status(401).send({ error: "Unauthorized" })
  } else {
    req.session.destroy()
    res.send({ success: true })
  }
}

//return account details based on the userID in the session
export const getAccount = async (req, res) => {
  if (!req.session.userId) {
    res.status(401).send({null: "No user logged in"})
  } else {
    if (req.session.userType === "client") {
      const user = await Client.findByPk(req.session.userId)
      res.send(user)
    } else if (req.session.userType === "pilot") {
      const user = await Pilot.findByPk(req.session.userId)
      res.send(user)
    }
  }
}

//change account details based on the userID in the session
export const editAccount = async (req, res) => {
  if (!req.session.userId) {
    res.status(401).send({ error: "Unauthorized" })
  } else {
    //req.body should come with an object called changes that contains all the properties and values to be changed
    const { changes } = req.body
    if (req.session.userType === "client") {
      const user = await Client.findByPk(req.session.userId)
      user.set(changes)
      await user.save()
      res.send(user)
    } else if (req.session.userType === "pilot") {
      const user = await Pilot.findByPk(req.session.userId)
      user.set(changes)
      await user.save()
      res.send(user)
    }
  }
}

//create a new user account
export const createAccount = async (req, res) => {
  //req.body should come with an object called newAccount that contains all the properties and values to be made
  const { AccountType } = req.params //userType should come as either "Client" or "Pilot"
  const { newAccount } = req.body
  if (AccountType === "Client") {
    Client.create(newAccount)
    res.send(`New user created! ${AccountType}: ${newAccount.contactEmail}`)
  } else if (AccountType === "Pilot") {
    Pilot.create(newAccount)
    res.send(`New user created! ${AccountType}: ${newAccount.contactEmail}`)
  }
}

//send all reviews given to the current user
export const getAllReceivedReviews = async (req, res) => {
  if (req.session.userType === "client") {
    const reviews = await ClientReview.findAll({
      where: { reviewedClient: req.session.userId },
    })
    res.send(reviews)
  } else if (req.session.userType === "pilot") {
    const reviews = await PilotReview.findAll({
      where: { reviewedPilot: req.session.userId },
    })
    res.send(reviews)
  }
}

//send a single review given to the user (by review Id)
export const getOneReceivedReview = async (req, res) => {
  const { reviewId } = req.params
  if (req.session.userType === "client") {
    const review = await ClientReview.findByPk(reviewId)
    res.send(review)
  } else if (req.session.userType === "pilot") {
    const review = await PilotReview.findByPk(reviewId)
    res.send(review)
  }
}

//send all reviews that were created by the current user
export const getAllGivenReviews = async (req, res) => {
  if (req.session.userType === "client") {
    const reviews = await PilotReview.findAll({
      where: { clientReviewing: req.session.userId },
    })
    res.send(reviews)
  } else if (req.session.userType === "pilot") {
    const reviews = await ClientReview.findAll({
      where: { pilotReviewing: req.session.userId },
    })
    res.send(reviews)
  }
}

//create a new review
export const createReview = async (req, res) => {
  if (req.session.userId) {
    //req.body should come with an object with a newReview object that contains the rating and content, as well as the id of the user making the review, and the id of the user they are reviewing
    const { IdBeingReviewed, reviewContent, reviewRating } = req.body
    const newReview = {}
    if (req.session.userType === "client") {
      const reviewAllowed = await Listing.findOne({
        where: {
          completed: true,
          assignedPilot: IdBeingReviewed,
          clientId: req.session.userId,
        },
      })
      if (reviewAllowed == true) {
        newReview.reviewedPilot = IdBeingReviewed
        newReview.clientReviewing = req.session.userId
        newReview.reviewContent = reviewContent
        newReview.pilotRating = reviewRating
        console.log(newReview)
        PilotReview.create(newReview)
        res.send(newReview)
      } else {
        res.send("Clients cannot review pilots that they have not worked with")
      }
    } else if (req.session.userType === "pilot") {
      const reviewAllowed = await Listing.findOne({
        where: {
          completed: true,
          clientId: IdBeingReviewed,
          assignedPilot: req.session.userId,
        },
      })
      if (reviewAllowed == true){
      newReview.reviewedClient = IdBeingReviewed
      newReview.pilotReviewing = req.session.userId
      newReview.reviewContent = reviewContent
      newReview.clientRating = reviewRating
      ClientReview.create(newReview)
      res.send(newReview)
      }else {
        res.send("Pilots cannot review clients that they have not worked with")
      }
    }
  } else {
    res
      .status(401)
      .send({ error: "Unauthorized, must be logged in to create a review" })
  }
}

//send a single review created by the current user (by review Id)
export const getOneGivenReview = async (req, res) => {
  const { reviewId } = req.params
  if (req.session.userType === "client") {
    const review = await PilotReview.findByPk(reviewId)
    res.send(review)
  } else if (req.session.userType === "pilot") {
    const review = await ClientReview.findByPk(reviewId)
    res.send(review)
  }
}

export const editGivenReview = async (req, res) => {
  const { reviewId } = req.params
  const { changes } = req.body //req.body should come with an object called changes that contains all the properties and values to be changed
  if (req.session.userType === "client") {
    const review = await PilotReview.findByPk(reviewId)
    review.set(changes)
    review.save()
    res.send(review)
  } else if (req.session.userType === "pilot") {
    const review = await ClientReview.findByPk(reviewId)
    review.set(changes)
    review.save()
    res.send(review)
  }
}
export const deleteGivenReview = async (req, res) => {
  const { reviewId } = req.params
  if (req.session.userType === "client") {
    const review = await PilotReview.findByPk(reviewId)
    review.destroy()
    res.send(`review ${reviewId} has been deleted`)
  } else if (req.session.userType === "pilot") {
    const review = await ClientReview.findByPk(reviewId)
    review.set(changes)
    review.save()
    res.send(review)
  }
}
