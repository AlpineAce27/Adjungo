import { NavLink, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

function PilotJobs() {
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
        <tr key={listing.listingId}>
          <td>
          <Link to={`/pilotListing/${listing.listingId}`}>
              {listing.listingId}
            </Link>
          </td>
          <td>
            <Link to={`/clientAccount`}></Link>
            {listing.clientId}
          </td>
          <td>
            <Link to={`/pilotProfile/${listing.assignedPilot}`}></Link>
            {listing.assignedPilot}
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
        <h1>Listings You've applied for</h1>
        <p>
          This page should show all of the jobs that the pilot is currently
          assigned to
          they can easily sort by any column header, and click on any listing to
          see more details on it. There should also be a "completed" tab where
          the pilot can view all of their completed jobs.
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
            </tr>
          </thead>
          <tbody>{listingsItems}</tbody>
        </table>
        <NavLink to="/listings">Find More Jobs</NavLink>
      </>
    )
  } else {
    return <>
      <h1>Oops!</h1>
      <p>You must be logged in as a pilot to view jobs your applied to</p>
    </>
  }
}

export default PilotJobs
