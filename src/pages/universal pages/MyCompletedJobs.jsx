import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {
  BiChevronLeftCircle,
  BiCommentEdit,
  BiCommentAdd,
} from "react-icons/bi"

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
              <button className="h-8 w-8 rounded-full bg-ADJO_Keppel"
                onClick={() =>
                  navigate(`/review/client/${thisReview[0].pilotReviewId}`)}>
                <BiCommentEdit size={20} style={{ color: "#000000" }}/>
              </button>
            </td>
          )}
          {!pilotArray.includes(listing.assignedPilot) && (
            <td>
              <button className="h-8 w-8 rounded-full bg-[#fa8989] text-center"
                onClick={() =>
                  navigate(`/createReview/${listing.assignedPilot}`)}>
                <BiCommentAdd  size={20} style={{ color: "#BDF3E7" }}/>
              </button>
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
              <button className="h-8 w-8 rounded-full bg-ADJO_Keppel"
                onClick={() =>
                  navigate(`/review/pilot/${thisReview[0].clientReviewId}`)
                }
              >
               <BiCommentEdit size={20} style={{ color: "#000000" }}/>
              </button>
            </td>
          )}
          {!clientArray.includes(listing.clientId) && (
            <td>
              <button className="h-8 w-8 rounded-full bg-[#fa8989] "
                onClick={() => navigate(`/createReview/${listing.clientId}`)}
              >
                <BiCommentAdd size={20} style={{ color: "#BDF3E7" }}/>
              </button>
            </td>
          )}
        </tr>
      )
    })

    //render all the elements we created on the page
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
              My Completed Jobs
            </h1>
            <p className="font-rubik text-l pb-5 w-3/4 text-center">
              This page should show all of the jobs that the user has completed.
              Each row should have a button at the end to allow them to update
              their review on that job's partner, or create a review for that
              jobs partner if one doensn't already exist
            </p>
          </div>
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik pb-20">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[100px]">Listing ID</th>
                  <th className="w-[100px]">Client ID</th>
                  <th className="w-[100px]">Pilot ID</th>
                  <th className="w-[100px]">Payment</th>
                  <th className="w-[130px]">Flight Date</th>
                  <th>Hardware Provided</th>
                  <th>Software Provided</th>
                  <th className="w-[500px]">Flight Location</th>
                  <th>Flight Radius</th>
                  <th className="w-[100px]">Review Status</th>
                </tr>
              </thead>
              <tbody>{completedListingsItems}</tbody>
            </table>
          </div>
          <div>
            <section
              onClick={() => {
                if (userType === "pilot") {
                  navigate("/pilotJobs")
                } else if (userType === "client") {
                  navigate("/myListings")
                }
              }}
              className="flex w-[250px] items-center hover: cursor-pointer"
            >
              <BiChevronLeftCircle size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Back to My Jobs
              </section>
            </section>
          </div>
        </div>
      </>
    )
  } else {
    ;<>
      <h1>Oops!</h1>
      <p>
        You must be logged in as a client or a pilot to view your completed jobs
      </p>
    </>
  }
}

export default MyCompletedJobs
