import { Client, Pilot, Listing, ClientReview, PilotReview, Application } from "./database/model.js"

import { Sequelize, Op } from "sequelize"

import getRatingColor from "../src/functions/getRatingColor.js"

import bcrypt from "bcryptjs"

//return all listings
export const getAllListings = async (req, res) => {
  const allListings = await Listing.findAll({
    where: { completed: false },
    include: { model: Client },
  })

  const listingCopy = [...allListings]

  let finalCopy = await Promise.all(
    listingCopy.map(async (e, i) => {
      let oneListing = { ...listingCopy[i].dataValues }

      const reviewsOnClient = await ClientReview.findAll({
        where: {
          reviewedClient: e.client.clientId,
        },
        // creates a column called 'avgRating' which is an aggregated average of the client_rating columns from the Client_Review
        attributes: [[Sequelize.fn("AVG", Sequelize.col("client_rating")), "avgRating"]],
      })

      oneListing.reviews = (+reviewsOnClient[0].dataValues.avgRating).toFixed(2)
      oneListing.reviewCol = getRatingColor(+oneListing.reviews)

      console.log(oneListing)
      listingCopy[i] = oneListing
      return listingCopy[i]
    })
  )

  // console.log('finalCopy', finalCopy)

  res.send(finalCopy)
}
//return all listings
export const getAllOpenListings = async (req, res) => {
  let allListings
  console.log(req.session.userType)
  if (req.session.userType === "pilot") {
    allListings = await Listing.findAll({
      where: { completed: false },
      include: [
        {
          model: Application,
          // where: {
          //   applyingPilot: { [Op.ne]: req.session.userId },
          // },
        },
        { model: Client },
      ],
    })
  } else {
    allListings = await Listing.findAll({
      where: { completed: false },
      include: { model: Client },
    })
  }

  const listingCopy = [...allListings]

  let finalCopy = await Promise.all(
    listingCopy.map(async (e, i) => {
      let oneListing = { ...listingCopy[i].dataValues }

      const reviewsOnClient = await ClientReview.findAll({
        where: {
          reviewedClient: e.client.clientId,
        },
        // creates a column called 'avgRating' which is an aggregated average of the client_rating columns from the Client_Review
        attributes: [[Sequelize.fn("AVG", Sequelize.col("client_rating")), "avgRating"]],
      })

      oneListing.reviews = (+reviewsOnClient[0].dataValues.avgRating).toFixed(2)
      oneListing.reviewCol = getRatingColor(+oneListing.reviews)

      console.log(oneListing)
      listingCopy[i] = oneListing
      return listingCopy[i]
    })
  )

  // console.log('finalCopy', finalCopy)

  res.send(finalCopy)
}

//return a single listing with a specific listing id
export const getOneListing = async (req, res) => {
  console.log("getOneListing endpoint hit")
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
  console.log(enteredPassword)
  if (userType === "client") {
    const user = await Client.findOne({ where: { login: enteredLogin } })
    const passwordCheck = bcrypt.compareSync(enteredPassword, user.password)
    if (passwordCheck === true) {
      req.session.userId = user.clientId
      req.session.userType = "client"
      //console.log("Login:", req.session)
      res.send({
        success: true,
        userId: user.clientId,
      })
    } else {
      res.status(401).send({ success: false })
    }
  } else if (userType === "pilot") {
    const user = await Pilot.findOne({ where: { login: enteredLogin } })
    const passwordCheck = bcrypt.compareSync(enteredPassword, user.password)
    if (passwordCheck === true) {
      req.session.userId = user.pilotId
      req.session.userType = "pilot"
      res.send({
        success: true,
        userId: user.pilotId,
      })
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
//session check
export const sessionCheck = async (req, res) => {
  if (req.session.userId) {
    res.send({ userId: req.session.userId, userType: req.session.userType })
  } else {
    res.send("No user logged in")
  }
}
//return account details based on the userID in the session
export const getMyAccount = async (req, res) => {
  if (!req.session.userId) {
    res.status(401).send({ null: "No user logged in" })
  } else {
    if (req.session.userType === "client") {
      const user = await Client.findByPk(req.session.userId)
      //make a copy
      const userCopy = { ...user.dataValues }
      //get the reviews on this user
      const reviewsOnClient = await ClientReview.findAll({
        where: {
          reviewedClient: req.session.userId,
        },
        // creates a column called 'avgRating' which is an aggregated average of the client_rating columns from the Client_Review
        attributes: [[Sequelize.fn("AVG", Sequelize.col("client_rating")), "avgRating"]],
      })
      console.log(reviewsOnClient)
      //add rating as a key/property on the user copy
      userCopy.rating = (+reviewsOnClient[0].dataValues.avgRating).toFixed(2)
      userCopy.ratingCol = getRatingColor(userCopy.rating)

      //send the user copy
      res.send(userCopy)
    } else if (req.session.userType === "pilot") {
      const user = await Pilot.findByPk(req.session.userId)
      const userCopy = { ...user.dataValues }

      const reviewsOnPilot = await PilotReview.findAll({
        where: {
          reviewedPilot: req.session.userId,
        },
        // creates a column called 'avgRating' which is an aggregated average of the client_rating columns from the Pilot_Review
        attributes: [[Sequelize.fn("AVG", Sequelize.col("pilot_rating")), "avgRating"]],
      })
      userCopy.rating = (+reviewsOnPilot[0].dataValues.avgRating).toFixed(2)
      userCopy.ratingCol = getRatingColor(userCopy.rating)

      //delete the password field
      delete userCopy.password
      //console.log(userCopy)
      res.send(userCopy)
    }
  }
}
//send account details of another user
export const getOtherAccount = async (req, res) => {
  if (req.params.userType === "client") {
    //find a client with the current userID
    const user = await Client.findByPk(req.params.userId)
    //make a copy
    const userCopy = { ...user.dataValues }
    //hide the password
    delete userCopy.password
    //get the reviews on this user
    const reviewsOnClient = await ClientReview.findAll({
      where: {
        reviewedClient: req.params.userId,
      },
      // creates a column called 'avgRating' which is an aggregated average of the client_rating columns from the Client_Review
      attributes: [[Sequelize.fn("AVG", Sequelize.col("client_rating")), "avgRating"]],
    })
    console.log(reviewsOnClient)
    //add rating as a key/property on the user copy
    userCopy.rating = (+reviewsOnClient[0].dataValues.avgRating).toFixed(2)
    userCopy.ratingCol = getRatingColor(userCopy.reviews)

    //send the user copy
    res.send(userCopy)
  } else if (req.params.userType === "pilot") {
    const user = await Pilot.findByPk(req.params.userId)
    const userCopy = { ...user.dataValues }
    delete userCopy.password

    const reviewsOnPilot = await PilotReview.findAll({
      where: {
        reviewedPilot: req.params.userId,
      },
      // creates a column called 'avgRating' which is an aggregated average of the client_rating columns from the Pilot_Review
      attributes: [[Sequelize.fn("AVG", Sequelize.col("pilot_rating")), "avgRating"]],
    })
    userCopy.rating = (+reviewsOnPilot[0].dataValues.avgRating).toFixed(2)
    userCopy.ratingCol = getRatingColor(userCopy.rating)

    //console.log(userCopy)
    res.send(userCopy)
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
  const newAccount = req.body
  //encrypt their password
  const salt = bcrypt.genSaltSync(5)
  const passwordHash = bcrypt.hashSync(newAccount.password, salt)
  newAccount.password = passwordHash

  if (AccountType === "client") {
    Client.create(newAccount)
    res.send(`New user created! ${AccountType}: ${newAccount.contactEmail}`)
  } else if (AccountType === "pilot") {
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
//get all reviews on a specific user
export const getReviewsOnUser = async (req, res) => {
  const { userType, userId } = req.params
  if (userType === "client") {
    const reviews = await ClientReview.findAll({
      where: {
        reviewedClient: userId,
      },
    })
    res.send(reviews)
  } else if (userType === "pilot") {
    const reviews = await PilotReview.findAll({
      where: {
        reviewedPilot: userId,
      },
    })
    res.send(reviews)
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
      console.log(reviewAllowed)
      if (reviewAllowed) {
        newReview.reviewedPilot = IdBeingReviewed
        newReview.clientReviewing = req.session.userId
        newReview.reviewContent = reviewContent
        newReview.pilotRating = reviewRating
        PilotReview.create(newReview)
        console.log("new review created:", newReview)
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
      if (reviewAllowed) {
        newReview.reviewedClient = IdBeingReviewed
        newReview.pilotReviewing = req.session.userId
        newReview.reviewContent = reviewContent
        newReview.clientRating = reviewRating
        ClientReview.create(newReview)
        console.log("new review created:", newReview)
        res.send(newReview)
      } else {
        res.send("Pilots cannot review clients that they have not worked with")
      }
    }
  } else {
    res.status(401).send({ error: "Unauthorized, must be logged in to create a review" })
  }
}
//get a single review
export const getSingleReview = async (req, res) => {
  const { authorUserType, reviewId } = req.params
  console.log(authorUserType, reviewId)
  if (authorUserType === "client") {
    //search the pilot reviews table for a matching authorId and review Id
    const review = await PilotReview.findByPk(reviewId)
    res.send(review)
  } else if (authorUserType === "pilot") {
    //search the client reviews table for a match authorId and review Id
    const review = await ClientReview.findByPk(reviewId)
    res.send(review)
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
  console.log("server hit, changes requested:", changes)
  if (req.session.userType === "client") {
    const review = await PilotReview.findByPk(reviewId)
    review.set(changes)
    review.save()
    console.log("review saved:", review)
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
    review.destroy()
    res.send(`review ${reviewId} has been deleted`)
  }
}
export const getMyCompletedJobs = async (req, res) => {
  //find jobs that are labeled "complete" with the owner Id mathcing the current user Id
  if (req.session.userType === "client") {
    const completedListings = await Listing.findAll({
      where: {
        completed: true,
        clientId: req.session.userId,
      },
    })
    res.send(completedListings)
  } else if (req.session.userType === "pilot") {
    //find jobs that are labeled "complete" where the assigned pilot matches the current user Id
    const completedListings = await Listing.findAll({
      where: {
        completed: true,
        assignedPilot: req.session.userId,
      },
    })
    res.send(completedListings)
  }
}
