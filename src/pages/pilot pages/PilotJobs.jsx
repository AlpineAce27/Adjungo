import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { BiListPlus, BiCheckCircle } from "react-icons/bi"

function PilotJobs() {
  const navigate = useNavigate()
  //grabbing the userType from redux store
  let userType = useSelector((state) => state.userType)

  //create a state value for an array of listings
  const [listings, setListings] = useState([])
  //check if the user is a client

  //if they are a client,
  if (userType === "pilot") {
    //if they are, grab listings where the assigned pilot matches the user
    useEffect(() => {
      axios.get("/api/myJobs").then((response) => {
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
                navigate(`/${userType}Listing/${listing.listingId}`)
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
        </tr>
      )
    })

    //render all the elements we created on the page
    return (
      <>
        <div className="flex flex-col items-center">
          <section className="flex flex-col items-center">
            <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">Upcoming Jobs</h1>
            <p className="font-rubik text-l pb-5 w-3/4 text-center">
              This page shows all of the jobs where you're application has been accepted. (Right on!)
              Make sure to mark these dates on your calendar, and take note of the flight address.
            </p>
            <p className="font-rubik text-l pb-5 w-3/4 text-center">If you need to resign for any reason, just head into the listing by clicking on the Listing ID, there you will be able to resign. Please make sure
              you give adequate time and communicate with clients when resigning, as they need to find a substitute pilot after you resign. Clients will be able to review  
            </p>
            
          </section>

          {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
      <label for="showCompleted">Show Completed Jobs:</label> */}
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik pb-20">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[100px]">Listing ID</th>
                  <th className="w-[100px]">Client ID</th>
                  <th className="w-[100px]">Offer</th>
                  <th className="w-[130px]">Flight Date</th>
                  <th>Hardware Provided</th>
                  <th>Software Provided</th>
                  <th className="w-[500px]">Flight Location</th>
                  <th>Flight Radius</th>
                </tr>
              </thead>
              <tbody>{listingsItems}</tbody>
            </table>
          </div>
          <div className="flex justify-between">
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
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1>Oops!</h1>
        <p>You must be logged in as a pilot to view your upcoming jobs</p>
      </>
    )
  }
}

export default PilotJobs
