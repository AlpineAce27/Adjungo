import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { BiListPlus, BiCheckCircle } from "react-icons/bi"
import { useLoaderData } from "react-router-dom"

const MyJobs = () => {
  const navigate = useNavigate()

  const loaderData = useLoaderData()

  //grab the current userType from the redux store
  let userType = useSelector((state) => state.userType)
  //create a state value for an array of jobs
  const [jobs, setJobs] = useState(loaderData)


  //create an array of listings mapped to the axios response
  const listingsItems = jobs.map((listing) => {
    //change true/false/null to more readable strings
    //change "assigned pilot" to "none" if null
    if (listing.assignedPilot === null) {
      listing.assignedPilot = "None"
    }
    //change "hardware provided" to yes/no
    let hardwareProvided
    if (listing.hardwareProvided === true) {
      hardwareProvided = "Yes"
    } else {
      hardwareProvided = "No"
    }
    //change "software provided" to yes/no
    let softwareProvided
    if (listing.softwareProvided === true) {
      softwareProvided = "Yes"
    } else {
      softwareProvided = "No"
    }

    //create a table row with the data from this listing iteration
    return (
      <tr
        key={listing.listingId}
        className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
      >
        <td>
          <button
            onClick={() => {
              navigate(`/clientListing/${listing.listingId}`)
            }}
            className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
          >
            {listing.listingId}
          </button>
        </td>
        {userType === "client" && <td>Me</td>}
        {userType === "pilot" && (
          <td>
            {/* render a button with the client Id that leads to their profile */}
            <button
              onClick={() => {
                navigate(`/userProfile/client/${listing.clientId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
            >
              {listing.clientId}
            </button>
          </td>
        )}
        {userType === "pilot" && <td>Me</td>}
        {userType !== "pilot" && (
          <>
            {/* if there is no assigned pilot, render "none", if there is an assigned pilot, render a button that leads to their profile */}
            {listing.assignedPilot === "None" && (
              <td>{listing.assignedPilot}</td>
            )}
            {listing.assignedPilot !== "None" && (
              <td>
                <button
                  onClick={() => {
                    navigate(`/userProfile/pilot/${listing.assignedPilot}`)
                  }}
                  className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
                >
                  {listing.assignedPilot}
                </button>
              </td>
            )}
          </>
        )}
        <td>${listing.offer}</td>
          <td>{listing.flightZipcode}</td>
          <td>{listing.flightDate}</td>
          <td>{listing.flightRadius}</td>
          <td>{listing.multiday.toString()}</td>
          <td>{listing.hardwareProvided.toString()}</td>
          <td>{listing.softwareProvided.toString()}</td>
          <td>{listing.internetProvided.toString()}</td>
          <td>{listing.powerProvided.toString()}</td>
          <td>{listing.highFlying.toString()}</td>
          <td>{listing.payloadDropping.toString()}</td>
          <td>{listing.hazmatFlying.toString()}</td>
          <td>{listing.heavyFlying.toString()}</td>
          <td>{listing.nightFlying.toString()}</td>
          <td>{listing.crowdFlying.toString()}</td>
      </tr>
    )
  })

  //render the page contents
  if (userType === "client" || "pilot") {
    return (
      <div className="flex flex-col items-center w-full">
        <section className="flex flex-col items-center">
          {userType === "client" && (
            <div className="flex flex-col items-center">
              {/* header and text */}
              <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
                Your Listings
              </h1>
              <p className="font-rubik text-l pb-5 w-3/4 text-center">
                This page shows all of the jobs you've created. If any of these
                jobs have an assigned pilot, make sure to mark that date on your
                calendar, and take note of the flight address.
              </p>
            </div>
          )}
          {userType === "pilot" && (
            <div className="flex flex-col items-center">
              {/* header and text */}
              <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
                Upcoming Jobs
              </h1>
              <p className="font-rubik text-l pb-5 w-3/4 text-center">
                This page shows all of the jobs where you're application has
                been accepted. (Right on!) Make sure to mark these dates on your
                calendar, and take note of the flight address.
              </p>
              <p className="font-rubik text-l pb-5 w-3/4 text-center">
                If you need to resign for any reason, just head into the listing
                by clicking on the Listing ID, there you will be able to resign.
                Please make sure you give adequate time and communicate with
                clients when resigning, as they need to find a substitute pilot
                after you resign. Clients will be able to review
              </p>
            </div>
          )}
        </section>
        
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik text-sm w-full">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                <th className="w-[100px]">Listing</th>
                  <th>Client</th>
                  <th className="w-[100px]">Pilot</th>
                  <th className="w-[100px]">Offer</th>
                  <th className="w-[150px]">Zipcode</th>
                  <th className="w-[150px]">Date</th>
                  <th>Radius</th>
                  <th>Multiday</th>
                  <th>Hardware</th>
                  <th>Software</th>
                  <th>Internet</th>
                  <th>Power</th>
                  <th>High</th>
                  <th>Payload</th>
                  <th>Hazmat</th>
                  <th>Heavy</th>
                  <th>Night</th>
                  <th>Crowd</th>
                </tr>
              </thead>
              <tbody>{listingsItems}</tbody>
            </table>
          </div>
        
        {userType === "client" && (
          <div className="flex justify-between">
            {/* other client options */}
            <section
              onClick={() => {
                navigate("/NewListing")
              }}
              className="flex w-[300px] items-center hover: cursor-pointer"
            >
              <BiListPlus size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Create a New Listing
              </section>
            </section>
            <section
              onClick={() => {
                navigate("/myCompletedJobs")
              }}
              className="flex w-[300px] items-center hover: cursor-pointer"
            >
              <BiCheckCircle size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                View My Completed Jobs
              </section>
            </section>
          </div>
        )}
        {userType === "pilot" && (
          <div className="flex justify-between">
            {/* other pilot options */}
            <section
              onClick={() => {
                navigate("/listings")
              }}
              className="flex w-[250px] items-center hover: cursor-pointer"
            >
              <BiListPlus size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Find More Jobs
              </section>
            </section>
            <section
              onClick={() => {
                navigate("/myCompletedJobs")
              }}
              className="flex w-[300px] items-center hover: cursor-pointer"
            >
              <BiCheckCircle size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                View My Completed Jobs
              </section>
            </section>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <>
        {/* non-auth catch */}
        <h1>Oops!</h1>
        <p>You must be logged in to view your jobs</p>
      </>
    )
  }
}

export default MyJobs
