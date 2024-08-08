import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function MyCompletedJobs() {
  //grabbing the usertype from redux store
  let usertype = useSelector((state) => state.userType)
  let userId = useSelector((state) => state.userId)
  //create a state value for an array of listings
  const [completedListings, setcompletedListings] = useState([])
  const [givenReviews, setGivenReviews] = useState([])
  const [alreadyReviewed, setAlreadyReviewed] = useState(false)
  const navigate = useNavigate()
  //let alreadyReviewed = false
  //if they are a client,
  if (usertype === "client") {
    //if they are, grab completed jobs where the owner is matches the client ID, as well as any reviews on the assigned pilot
    useEffect(() => {
        console.log("useeffect hit")
      axios.get("/api/myCompletedJobs").then((response) => {
        setcompletedListings(response.data)
      })
      axios.get("/api/givenReviews").then((response) => {
        setGivenReviews(response.data)
      })
    }, [])

    //create an array of listings mapped to the axios response
    const completedListingsItems = completedListings.map((listing) => {
      //check to see if this client has already reviewed the assigned pilot on this job
      let asdf = givenReviews.some(
        (review) => review.reviewedPilot === listing.assignedPilot
      )
      if(asdf){
        setAlreadyReviewed(true)
      }
    //   console.log(
    //     userId,
    //     "has already reviewed",
    //     listing.assignedPilot,
    //     ":",
    //     alreadyReviewed
    //   )
      const thisReview = givenReviews.filter((review) => review.pilotReviewd === listing.assignedPilot)
      //create a table row with each variable in the correct spot
      return (
        <tr key={listing.listingId}>
          <td>
            <Link to={`/pilotListing/${listing.listingId}`}>
              {listing.listingId}
            </Link>
          </td>
          <td>
            <NavLink to={`/userProfile/client/${listing.clientId}`}>
              {listing.clientId}
            </NavLink>
          </td>
          <td>
            <Link to={`/pilotProfile/${listing.assignedPilot}`}></Link>
            {listing.assignedPilot}
          </td>
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{listing.hardwareProvided}</td>
          <td>{listing.softwareProvided}</td>
          <td>{listing.flightAddress}</td>
          <td>{listing.flightRadius}</td>
          {alreadyReviewed === true && (
            <td>
                {}
              <button onClick={navigate(`/review/client/${thisReview.pilotReviewId}`)}>See Current Review</button>
            </td>
          )}
          {alreadyReviewed === false && (
            <td>
              <button>Create a new review</button>
            </td>
          )}
        </tr>
      )
    })

    //render all the elements we created on the page
    return (
      <>
        <h1>My Completed Jobs</h1>
        <p>
          This page should show all of the jobs that the user has completed. 
          Each row should have a button at the end to allow them to update their review on that job's partner,
          or create a review for that jobs partner if one doensn't already exist
        </p>
        {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
      <label for="showCompleted">Show Completed Jobs:</label> */}
        <table>
          <thead>
            <tr>
              <th>Listing ID</th>
              <th>Client ID</th>
              <th>Assigned Pilot</th>
              <th>Payment</th>
              <th>Flight Date</th>
              <th>Hardware Provided</th>
              <th>Software Provided</th>
              <th>Flight Location</th>
              <th>Flight Radius</th>
              <th>Review Status</th>
            </tr>
          </thead>
          <tbody>{completedListingsItems}</tbody>
        </table>
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

export default MyCompletedJobs
