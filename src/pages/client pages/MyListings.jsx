import { NavLink, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux";

function MyListings() {
  //grabbing the usertype from redux store
  let usertype = useSelector((state) => state.userType)
  //create a state value for an array of listings
  const [listings, setListings] = useState([])
  //check if the user is a client


  //if they are a client, 
  if (usertype === "client") {
    //if they are, grab listings where the client id matches the user
    useEffect(() => {
      axios.get("/api/mylistings").then((response) => {
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
            <Link to={`/clientListings/${listing.listingId}`}>
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
        <h1>Welcome to your Listings</h1>
        <p>
          This page should show all of the clients listings in table form where
          they can easily sort by any column header, and click on any listing to
          see more details on it. There should also be a "completed" tab where
          the client can view all of their completed jobs. Each listing should
          also show how many applications it has, with a link to the
          applications page.
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
        <NavLink to="/NewListing">Create a New Listing</NavLink>
      </>
    )
  } else {
    return <>
      <h1>Oops!</h1>
      <p>You must be logged in as a client to create a listing</p>
    </>
  }
}

export default MyListings
