import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function MyCompletedJobs() {
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  let userId = useSelector((state) => state.userId)
  //create a state value for an array of listings
  const [completedListings, setcompletedListings] = useState([])
  const [givenReviews, setGivenReviews] = useState([])
  const [pilotArray, setPilotArray] = useState([])
  const [clientArray, setClientArray] = useState([])
  const navigate = useNavigate()
  //let alreadyReviewed = false
  //if they are a client,
  if (userType === "client") {
    //if they are, grab completed jobs where the owner is matches the client ID, as well as any reviews on the assigned pilot
    useEffect(() => {
      //console.log("useffect hit")
      axios.get("/api/myCompletedJobs").then((jobsResponse) => {
        axios.get("/api/givenReviews").then((reviewsResponse) => {
            //console.log("reviews response:", reviewsResponse.data)
            //console.log("jobs response:", jobsResponse.data)
          setGivenReviews(reviewsResponse.data)
          setcompletedListings(jobsResponse.data)
          let tempArray = []
          reviewsResponse.data.forEach((review) => {
            tempArray.push(review.reviewedPilot)
          })
          setPilotArray(tempArray)
        })
      })
    }, [])

    //create an array of listings mapped to the axios response
    const completedListingsItems = completedListings.map((listing) => {

      const thisReview = givenReviews.filter(
        (review) => review.reviewedPilot === listing.assignedPilot
      )
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
          {pilotArray.includes(listing.assignedPilot) && (
            <td>
              <button
                onClick={()=>navigate(`/review/client/${thisReview[0].pilotReviewId}`)}
              >
                See my Current Review of this Pilot
              </button>
            </td>
          )}
          {!pilotArray.includes(listing.assignedPilot) && (
            <td>
              <button onClick={()=>navigate(`/createReview/${listing.assignedPilot}`)}>Create a Review for this Pilot</button>
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
          Each row should have a button at the end to allow them to update their
          review on that job's partner, or create a review for that jobs partner
          if one doensn't already exist
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
  } else if (userType === "pilot") {
    
        //if they are, grab completed jobs where the owner is matches the client ID, as well as any reviews on the assigned pilot
    useEffect(() => {
        //console.log("useffect hit")
        axios.get("/api/myCompletedJobs").then((jobsResponse) => {
          axios.get("/api/givenReviews").then((reviewsResponse) => {
              //console.log("reviews response:", reviewsResponse.data)
              //console.log("jobs response:", jobsResponse.data)
            setGivenReviews(reviewsResponse.data)
            setcompletedListings(jobsResponse.data)
            let tempArray = []
            reviewsResponse.data.forEach((review) => {
              tempArray.push(review.reviewedClient)
            })
            setClientArray(tempArray)
          })
        })
      }, [])
  
      //create an array of listings mapped to the axios response
      const completedListingsItems = completedListings.map((listing) => {
  
        const thisReview = givenReviews.filter(
          (review) => review.reviewedClient === listing.clientId
        )
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
            {clientArray.includes(listing.clientId) && (
              <td>
                <button
                  onClick={()=>navigate(`/review/pilot/${thisReview[0].clientReviewId}`)}
                >
                  See my Current Review of this Client
                </button>
              </td>
            )}
            {!clientArray.includes(listing.clientId) && (
              <td>
                <button onClick={()=>navigate(`/createReview/${listing.clientId}`)}>Create a Review for this client</button>
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
            Each row should have a button at the end to allow them to update their
            review on that job's partner, or create a review for that jobs partner
            if one doensn't already exist
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
    <>
        <h1>Oops!</h1>
        <p>You must be logged in as a client or a pilot to view your completed jobs</p>
      </>
  }
}

export default MyCompletedJobs
