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

      //change assigned pilot
      let assignedPilot
      if (listing.assignedPilot === null) {
        assignedPilot = "Unclaimed"
      } else {
        assignedPilot = listing.assignedPilot
      }

      //create a table row with each variable in the correct spot
      if(!listing.assignedPilot){
      return (
        <tr
          key={listing.listingId}
          className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
        >
          <td>
            <button
              onClick={() => {
                navigate(`/singleListing/${listing.listingId}`)
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
      )}
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
      
      //create a table row with each variable in the correct spot
      if(!listing.assignedPilot){
        return (
          <tr
            key={listing.listingId}
            className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
          >
            <td>{listing.listingId}</td>
            <td>{listing.clientId}</td>
            <td>{assignedPilot}</td>
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
      }
      
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
            <table className="table-auto border-collapse font-rubik pb-20 text-sm w-full">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[100px]">Listing</th>
                  <th className="w-[100px]">Client</th>
                  <th className="w-[100px]">Pilot</th>
                  <th className="w-[100px]">Offer</th>
                  <th className="w-[200px]">Zipcode</th>
                  <th className="w-[200px]">Date</th>
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
        </section>
      </div>
    </>
  )
}

export default Listings
