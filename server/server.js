import express from "express";
import session from "express-session";
import morgan from "morgan";
import ViteExpress from "vite-express";
//import { Client, Pilot, Listing, Application } from "../src/model.js";
import {
  getAllListings,
  getOneListing,
  login,
  logout,
  getMyAccount,
  editAccount,
  createAccount,
  getAllReceivedReviews,
  getOneReceivedReview,
  getAllGivenReviews,
  createReview,
  getOneGivenReview,
  editGivenReview,
  deleteGivenReview
} from "./globalEndpoints.js"
import { 
  getListingsByClient,
  getOneListingByClient,
  createListing,
  editListing,
  deleteListing,
  getApplicationsbyClient,
  getApplicationsbyListing,
  acceptApplication,
  denyApplication,
} from "./clientEndpoints.js"
import {
  getApplicationsbyPilot,
  createApplication,
  getListingsByPilot,
  getJobsAppliedFor,
  resignFromJob,
  retractApplication
} from "./pilotEndpoints.js"
const app = express()
const port = "8000"
ViteExpress.config({ printViteDevServerHost: true })

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(session({ secret: "ssshhhhh", saveUninitialized: true, resave: false }))

//Universal Endpoints (both pilots and clients can access use them)
app.get("/api/listings", getAllListings)
app.get("/api/listings/:listingId", getOneListing)
app.post("/api/auth", login)
app.post("/api/logout", logout)
app.get("/api/myAccount", getMyAccount)
app.put("/api/account", editAccount)
app.post("/api/account/:AccountType", createAccount)
app.get("/api/receivedReviews", getAllReceivedReviews)
app.get("/api/receivedReviews/:reviewId", getOneReceivedReview)
app.get("/api/givenReviews", getAllGivenReviews)
app.post("/api/givenReview",createReview)
app.get("/api/givenReviews/:reviewId", getOneGivenReview)
app.put("/api/givenReviews/:reviewId", editGivenReview)
app.delete("/api/givenReviews/:reviewId", deleteGivenReview)

//Client-Only endpoints
app.get('/api/mylistings', getListingsByClient)
app.get('/api/mylistings/:listingId', getOneListingByClient)
app.post('/api/listing', createListing)
app.put('/api/listing/:listingId', editListing)
app.delete('/api/listing/:listingId', deleteListing)
app.get('/api/applicationsForClient', getApplicationsbyClient)
app.get('/api/applicationsForClient/:listingId', getApplicationsbyListing)
app.put('/api/acceptApplication/:applicationId', acceptApplication)
app.delete('/api/denyApplication/:applicationId', denyApplication)

//Pilot-Only endpoints
app.get("/api/pendingApplications", getApplicationsbyPilot)
app.post("/api/application/:jobId", createApplication) 
app.get("/api/myJobs", getListingsByPilot)
app.get("/api/appliedForJobs", getJobsAppliedFor)
app.put("/api/myJobs/:jobId", resignFromJob)
app.delete("/api/application/:applicationId", retractApplication)


ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
);
