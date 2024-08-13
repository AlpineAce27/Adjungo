import { NavLink, Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function Listings() {
  const navigate = useNavigate()
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  //create a state value for an array of listings
  const [listings, setListings] = useState([])
  //grab all the listings in the database
  useEffect(() => {
    axios.get("/api/listings").then((response) => {
      setListings(response.data)
    })
  }, [])
  let listingsItems = []
  if (userType === "client" || userType === "pilot") {
    //create an array of listings mapped to the axios response
    listingsItems = listings.map((listing) => {
      //change true/false/null to more readable strings

      //change assigned pilot
      let assignedPilot
      if (listing.assignedPilot === null) {
        assignedPilot = "Unclaimed"
      } else {
        assignedPilot = listing.assignedPilot
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
          {assignedPilot === "Unclaimed" && <td>{assignedPilot}</td>}
          {assignedPilot !== "Unclaimed" && (
            <td>
              <button
                onClick={() => {
                  navigate(`/userProfile/pilot/${assignedPilot}`)
                }}
                className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
              >
                {" "}
                {assignedPilot}
              </button>
            </td>
          )}
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{hardwareProvided}</td>
          <td>{softwareProvided}</td>
          <td>{listing.flightAddress}</td>
          <td>{listing.flightRadius}</td>
          <td>{listing.completed}</td>
        </tr>
      )
    })
  } else {
    //create an array of listings mapped to the axios response
    listingsItems = listings.map((listing) => {
      //change true/false/null to more readable strings
      //change "assigned pilot"
      let assignedPilot
      if (listing.assignedPilot === null) {
        assignedPilot = "Unclaimed"
      } else {
        assignedPilot = "Claimed"
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
      //change "completed"
      let completed
      if (listing.completed === true) {
        completed = "Yes"
      } else {
        completed = "No"
      }

      //create a table row with each variable in the correct spot
      return (
        <tr
          key={listing.listingId}
          className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
        >
          <td>{listing.listingId}</td>
          <td>{listing.clientId}</td>
          <td>{assignedPilot}</td>
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{hardwareProvided}</td>
          <td>{softwareProvided}</td>
          <td>{listing.flightAddress}</td>
          <td>{listing.flightRadius}</td>
          <td>{listing.completed}</td>
        </tr>
      )
    })
  }
  //render all the elements we created on the page
  return (
    <>
      <div className="flex-col items-center">
        <section className="flex flex-col justify-center items-center">
          <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
            Welcome the Adjugo Listings
          </h1>
          <p className="font-rubik text-l pb-5 w-3/4 text-center">
            This page shows all the listings on the entire Adjungo site! If you
            want to see more details on a specific listing, then you can log in
            and explore more in depth! You can easily sort by any column header
            by clicking on it.
          </p>
        </section>

        {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
        <label for="showCompleted">Show Completed Jobs:</label> */}
        <section className="flex justify-center pb-10">
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik pb-20">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[100px]">Listing ID</th>
                  <th className="w-[100px]">Client ID</th>
                  <th className="w-[100px]">Assigned Pilot</th>
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
        </section>
      </div>
    </>
  )
}

export default Listings
