import { NavLink, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function Listings() {
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
      //change "completed"
      let completed
      if (listing.completed === true) {
        completed = "Yes"
      } else {
        completed = "No"
      }

      //create a table row with each variable in the correct spot
      return (
        <tr key={listing.listingId}>
          <td>
            <Link to={`/${userType}Listing/${listing.listingId}`}>
              {listing.listingId}
            </Link>
          </td>
          <td>
            <NavLink to={`/userProfile/client/${listing.clientId}`}>
              {listing.clientId}
            </NavLink>
          </td>
          {assignedPilot === "Unclaimed" && <td>{assignedPilot}</td>}
          {assignedPilot !== "Unclaimed" && (
            <td>
              <NavLink to={`/userProfile/pilot/${assignedPilot}`}>
                {assignedPilot}
              </NavLink>
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
        <tr key={listing.listingId}>
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
      <h1>Welcome the Adjugo Listings</h1>
      <p>
        This page should show all listings on the site! they can easily sort by
        any column header, and click on any listing to see more details on it.
      </p>
      {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
        <label for="showCompleted">Show Completed Jobs:</label> */}
      <table>
        <thead>
          <tr>
            <th>Listing ID</th>
            <th>Client ID</th>
            <th>Assigned Pilot</th>
            <th>Offer</th>
            <th>Flight Date</th>
            <th>Hardware Provided</th>
            <th>Software Provided</th>
            <th>Flight Location</th>
            <th>Flight Radius</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>{listingsItems}</tbody>
      </table>
    </>
  )
}

export default Listings
