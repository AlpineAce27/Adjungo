import axios from "axios"
import { useLoaderData } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"

function PilotSingleListing() {
  const [listingState, SetListingState] = useState("new")
  //take the data from the loader and assign it to the listing variable (this should be an entire listing object)
  //this loader data comes from the loader section of this route in the App.jsx
  const listing = useLoaderData()
  //console.log(listing)

  //figure out the user ID of this session
  let userId = useSelector((state) => state.userId)

  //setup the navigate functionality
  const navigate = useNavigate()

  //check to see if the user has any applications that match the listing we are viewing
  let appliedForThisJob
  let currListingApplication
  axios.get("/api/pendingApplications").then((response) => {
    const applications = response.data
    //console.log(applications)
    //find if the listing we're viewing (listing.listingId) is included in any of the applications we just pulled
    appliedForThisJob = applications.some(
      (application) => application.applyingListing === listing.listingId
    )
    if(appliedForThisJob === true){
      currListingApplication = applications.filter(application => application.applyingListing === listing.listingId)
      currListingApplication = currListingApplication[0]
      //console.log(currListingApplication)
    }
    //console.log(`The user has applied for this job:`, appliedForThisJob)
    //Set up conditional render state

    //if the current user has an application for this job, then this is in "applied"
    if (appliedForThisJob === true) {
      SetListingState("applied")
      
    }
    //if the current user is the assigned pilot for this job, then it is in "assigned"
    else if (listing.assignedPilot === userId) {
      SetListingState("assigned")
    }
    //if the current user does not have an application for this job, AND they are not the assigned pilot, then this is in "new"
  })

  console.log("listing state", listingState)
  //Render this if they are not in edit mode
  return (
    <>
      <h1>Listing #{listing.listingId}</h1>
      <div>
        <p>
          This page should show a single listing with all of it's details. From
          a pilots perspective this listing can fall into 1 of the 3 categories:
        </p>
        <p>New: They havent had any interaction with it so far</p>
        <p>
          Applied For: They have applied for this job but haven't been
          accepted/rejected yet
        </p>
        <p>Assigned To: They are the pilot assiged to this job</p>
        depending on which relationship the pilot has with the listing,
        different options should be shown. If it's new, there should be an
        "apply" button. If they have already applied, there should be a "retract
        application" button. If they are assigned to this job, there should be a
        "resign from job" button.
      </div>
      <div>
        <h3>Listing Id: {listing.listingId}</h3>
        <h3>Owner Id: {listing.clientId}</h3>
        <br />
        <p>Date: {listing.date}</p>
        <p>Flight Address: {listing.flightAddress}</p>
        <p>Description: {listing.description}</p>
        <table>
          <thead>
            <tr>
              <th>Offering</th>
              <th>Multi-Day Operation</th>
              <th>Providing Hardware</th>
              <th>Providing Software</th>
              <th>Operating at Night</th>
              <th>Operating over People</th>
              <th>Flight Radius</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{listing.offer}</td>
              <td>{listing.multiday.toString()}</td>
              <td>{listing.hardwareProvided.toString()}</td>
              <td>{listing.softwareProvided.toString()}</td>
              <td>{listing.nightFlying.toString()}</td>
              <td>{listing.crowdFlying.toString()}</td>
              <td>{listing.flightRadius}</td>
            </tr>
          </tbody>
        </table>
      </div>
      {listingState === "new" && (
        <button onClick={() => {
          axios.post(`/api/application/${listing.listingId}`)
          navigate("/PilotJobsApplied")
        }}>Apply For this Job</button>
      )}
      {listingState === "applied" && (
        <button onClick={() => {
          axios.delete(`/api/application/${currListingApplication.applicationId}`)
          navigate("/PilotJobsApplied")
        }}>Retract my Application</button>
      )}
      {listingState === "assigned" && (
        <button onClick={() => {
          axios.put(`/api/myJobs/${listing.listingId}`)
          navigate("/PilotJobs")
        }}>Resign from this job</button>
      )}
    </>
  )
}

export default PilotSingleListing
