import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { BiListPlus } from "react-icons/bi"

function PilotJobs() {
  const navigate = useNavigate()
  //grabbing the usertype from redux store
  let usertype = useSelector((state) => state.userType)
  //create a state value for an array of listings
  const [listings, setListings] = useState([])

  //if they are a pilot,
  if (usertype === "pilot") {
    //if they are, grab listings where the assigned pilot matches the user
    useEffect(() => {
      axios.get("/api/appliedForJobs").then((response) => {
        setListings(response.data)
      })
    }, [])

    //create an array of listings mapped to the axios response
    const listingsItems = listings.map((listing) => {
      //change true/false/null to more readable strings
      //change "assigned pilot"
      if (listing.assignedPilot === null) {
        listing.assignedPilot = "None"
      }
      //change "hardware provided"
      let hardwareProvided
      if (listing.hardwareProvided === true) {
        hardwareProvided = "Yes"
      } else {
        hardwareProvided = "No"
      }
      //change "software provided"
      let softwareProvided
      if (listing.softwareProvided === true) {
        softwareProvided = "Yes"
      } else {
        softwareProvided = "No"
      }

      //create a table row with each variable in the correct spot
      return (
        <tr
          key={listing.listingId}
          className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
        >
          <td>
            <button
              onClick={() => {
                navigate(`/pilotListing/${listing.listingId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
            >
              {" "}
              {listing.listingId}
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                navigate(`/userProfile/client/${listing.clientId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
            >
              {" "}
              {listing.clientId}
            </button>
          </td>
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{hardwareProvided}</td>
          <td>{softwareProvided}</td>
          <td>{listing.flightAddress}</td>
          <td>{listing.flightRadius}</td>
          <td>
            <button
              onClick={() => {
                //find the applications on this listing with axios.get('/api/applicationsForClient/:listingId')
                //out of these resuts, find the application where "applying Pilot" matches the current userId
                //delete this application with axios.delete('/api/application/:applicationId')
              }}
              className="border bg-[#a0cfca] border-[#000000] rounded-full w-20 text-[#000000] font-medium"
            >
              Retract
            </button>
          </td>
        </tr>
      )
    })

    //render all the elements we created on the page
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
              Applications
            </h1>
            <p className="font-rubik text-l pb-5 w-3/4 text-center">
              This page shows all of the jobs you are currently applying for.
              You can view the specific listing, and the client who owns it by
              clicking on their respective Id's. You can also retract an
              application by clicking the "retract" button on any of your
              applications.
            </p>
          </div>
          {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
      <label for="showCompleted">Show Completed Jobs:</label> */}
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 w-11/12 pl-10 pr-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[100px]">Listing ID</th>
                  <th className="w-[100px]">Client ID</th>
                  <th>Offer</th>
                  <th className="w-[130px]">Flight Date</th>
                  <th>Hardware Provided</th>
                  <th>Software Provided</th>
                  <th className="w-[500px]">Flight Location</th>
                  <th>Flight Radius</th>
                  <th className="w-[100px]">Retract This Application?</th>
                </tr>
              </thead>
              <tbody>{listingsItems}</tbody>
            </table>
          </div>
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
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1>Oops!</h1>
        <p>You must be logged in as a pilot to view jobs your applied to</p>
      </>
    )
  }
}

export default PilotJobs
