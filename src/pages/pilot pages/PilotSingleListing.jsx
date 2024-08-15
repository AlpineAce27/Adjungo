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
    if (appliedForThisJob === true) {
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
    <div className="flex flex-col items-center">

      <div className="flex flex-col items-center pt-10 pb-10">
        <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Listing #{listing.listingId}</h1>
        <p className="font-rubik text-xl">
          This show's all of detials for listing {listing.listingId}. Depending on your relationship with this listing, you can apply, retract or resign.
        </p>
      </div>

      <div className="flex pt-10 pb-10 justify-between font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray">

        <div className="pr-10 pl-10">
          <h3 >Listing Id: {listing.listingId}</h3>
          <h3>Owner Id: <button
            onClick={() => {
              navigate(`/userProfile/client/${listing.clientId}`)
            }}
            className="border-2 border-ADJO_Keppel opacity-70 rounded-full h-8 w-20 text-ADJO_Keppel text-lg font-medium"
          >
            {" "}
            {listing.clientId}
          </button></h3>
        </div>

        <div>
          <p>Flight Date: {listing.flightDate}</p>
          <p>Flight Address: {listing.flightAddress}</p>
        </div>

      </div >

      <div className="flex pt-10 pb-10 font-rubik font-medium">
        <p>Description: {listing.description}</p>
      </div>

      <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
        <table className="table-auto border-collapse font-rubik pb-20">
          <thead>
            <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
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

      <div className="pt-10 pb-10">
        {listingState === "new" && (
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => {
              axios.post(`/api/application/${listing.listingId}`)
              navigate("/PilotJobsApplied")
            }}>Apply For this Job</button>
        )}
        {listingState === "applied" && (
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => {
              axios.delete(`/api/application/${currListingApplication.applicationId}`)
              navigate("/PilotJobsApplied")
            }}>Retract my Application</button>
        )}
        {listingState === "assigned" && (
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => {
              axios.put(`/api/myJobs/${listing.listingId}`)
              navigate("/PilotJobs")
            }}>Resign from this job</button>
        )}
      </div>
    </div>
  )
}

export default PilotSingleListing
