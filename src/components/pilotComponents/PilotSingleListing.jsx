import axios from "axios"
import { useLoaderData } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import { API_KEY, mapId } from "../../../util/location"

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

      <div className="flex items-center justify-center w-5/6 gap-5 h-[40vh]">
          <section className="flex flex-col gap-3 items-start py-8 justify-between font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray w-1/3 text-lg pl-5 border-ADJO_Celeste border-4 h-full rounded-lg">
            <p className="flex items-center justify-between">
              Owner Id:{" "}
              <button
                className="flex items-center text-center justify-center border-2 border-ADJO_Keppel opacity-70 rounded-full h-[20px] w-[50px] text-ADJO_Keppel text-sm font-medium"
                onClick={() => {
                  navigate(`/userProfile/client/${listing.clientId}`)
                }}
              >
                {" "}
                {listing.clientId}
              </button>
            </p>
            {listing.assignedPilot && (
              <p className="flex items-center justify-between">
                Assigned Pilot:
                <button
                  className="flex items-center text-center justify-center border-2 border-ADJO_Keppel opacity-70 rounded-full h-[20px] w-[50px] text-ADJO_Keppel text-sm font-medium"
                  onClick={() => {
                    navigate(`/userProfile/pilot/${listing.assignedPilot}`)
                  }}
                >
                  {" "}
                  {listing.clientId}
                </button>
              </p>
            )}
            {!listing.assignedPilot && (
              <p className="flex items-center justify-between">
                Assigned Pilot: None
              </p>
            )}
            <p>Flight Date: {listing.flightDate}</p>
            <p>Flight Time: {listing.flightTime}</p>
            <div className="flex flex-col items-start text-left text-sm">
              <p className="text-lg">Flight Address:</p>
              <p>{listing.flightAddress}</p>
            </div>
            
          </section>

          <section className="flex w-1/3 justify-center items-center font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray border-ADJO_Celeste border-4 h-full rounded-lg">
            <div className="flex flex-col items-start pr-2 w-5/6">
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Offer</p>
                <p>${listing.offer}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Flight Radius</p>
                <p>{listing.flightRadius} miles</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Multi-Day</p>
                <p>{listing.multiday.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Hardware Provided</p>
                <p>{listing.hardwareProvided.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Software Provided</p>
                <p>{listing.softwareProvided.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Internet Access</p>
                <p>{listing.internetProvided.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Power Access</p>
                <p>{listing.powerProvided.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Flying over 400ft</p>
                <p>{listing.highFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Beyond-line-of-sight</p>
                <p>{listing.blosFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Payload Drop</p>
                <p>{listing.payloadDropping.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Carrying Hazmat</p>
                <p>{listing.hazmatFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Liftoff Weight Over 55lbs</p>
                <p>{listing.heavyFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Operating at Night</p>
                <p>{listing.nightFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Operating over People</p>
                <p>{listing.crowdFlying.toString()}</p>
              </section>
            </div>
          </section>
          <section className="flex w-1/3 h-full border-ADJO_Celeste border-4  rounded-lg justify-center items-center">
            <img className="rounded-lg"src={`https://maps.googleapis.com/maps/api/staticmap?center=${JSON.parse(listing.flightCoordinates).lat},${JSON.parse(listing.flightCoordinates).lng}&zoom=15&size=300x300&map_id=${mapId}&markers=color:red%7Csize:large%7Cscale:4%7C${JSON.parse(listing.flightCoordinates).lat},${JSON.parse(listing.flightCoordinates).lng}&key=${API_KEY}`} alt="" />
          </section>
        </div>
        <div className="flex flex-col items-start justify-center w-3/4 font-rubik font-medium text-[15px] text-left text-AJGO_DarkSlateGray pt-5">
              <p className="text-lg">Description:</p>
              <p>{listing.description}</p>
            </div>

      <div className="pt-10 pb-10">
        {listingState === "new" && (
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => {
              axios.post(`/api/application/${listing.listingId}`)
              navigate("/applications/pilot")
            }}>Apply For this Job</button>
        )}
        {listingState === "applied" && (
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => {
              axios.delete(`/api/application/${currListingApplication.applicationId}`)
              navigate("/applications/pilot")
            }}>Retract my Application</button>
        )}
        {listingState === "assigned" && (
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => {
              axios.put(`/api/myJobs/${listing.listingId}`)
              navigate("/myJobs/pilot")
            }}>Resign from this job</button>
        )}
      </div>
    </div>
  )
}

export default PilotSingleListing
