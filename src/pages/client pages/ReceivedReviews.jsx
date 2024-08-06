import { NavLink, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import getUsersRating from "../../functions/getUsersRating"

function ReceivedReviews() {
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  //create a state value for an array of listings
  const [receivedReviews, setReceivedReviews] = useState([])
  const [rating, setRating] = useState(0)

  async function getRatings() {
    //get the current users rating
    const ratingResponse = await getUsersRating()
    console.log(ratingResponse)
    setRating(ratingResponse)
  }
  
  //if they are a client,
  if (userType === "client") {
    //if they are, grab listings where the client id matches the user
    useEffect(() => {
      axios.get("/api/receivedReviews").then((response) => {
        setReceivedReviews(response.data)
      })
      getRatings()
    }, [])

    //create an array of listings mapped to the axios response
    const reviewsList = receivedReviews.map((review) => {
      //change true/false/null to more readable strings

      //create a table row with each variable in the correct spot
      return (
        <>
          {userType === "client" && (
            <tr key={review.clientReviewId}>
              <td>{review.clientReviewId}</td>
              <td>
                <Link to={`/pilotAccount`}></Link>
                {review.pilotReviewing}
              </td>
              <td>{review.reviewContent}</td>
              <td>{review.clientRating}</td>
            </tr>
          )}
          {userType === "pilot" && (
            <tr key={review.pilotReviewId}>
              <td>{review.clientReviewId}</td>
              <td>
                <Link to={`/clientAccount`}></Link>
                {review.clientReviewing}
              </td>
              <td>{review.reviewContent}</td>
              <td>{review.pilotRating}</td>
            </tr>
          )}
        </>
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

        <h3>Rating: {rating.toFixed(2)}/5</h3>
        {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
    <label for="showCompleted">Show Completed Jobs:</label> */}
        <table>
          <thead>
            <tr>
              <th>Review ID</th>
              {userType === "client" && <th>Pilot ID</th>}
              {userType === "pilot" && <td>Client ID</td>}
              <th>Content</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>{reviewsList}</tbody>
        </table>
      </>
    )
  } else {
    return (
      <>
        <h1>Oops!</h1>
        <p>You must be logged in as a client to create a listing</p>
      </>
    )
  }
}

export default ReceivedReviews
