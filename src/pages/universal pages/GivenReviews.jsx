import { NavLink, Link } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import getUsersRating from "../../functions/getUsersRating"

function GivenReviews() {
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  //create a state value for an array of listings
  const [givenReviews, setGivenReviews] = useState([])
  const [rating, setRating] = useState(0)

  async function getRatings() {
    //get the current users rating
    const ratingResponse = await getUsersRating()
    console.log(ratingResponse)
    setRating(ratingResponse)
  }
  
  //if they are a logged in,
  if (userType === "client" || userType === "pilot") {
    //if they are, grab reviews made my the current user
    useEffect(() => {
      axios.get("/api/givenReviews").then((response) => {
        setGivenReviews(response.data)
      })
      getRatings()
    }, [])

    //create an array of listings mapped to the axios response
    const reviewsList = givenReviews.map((review) => {
      //change true/false/null to more readable strings

      //create a table row with each variable in the correct spot
      return (
        <>
          {userType === "client" && (
            <tr key={review.pilotReviewId}>
              <td>{review.pilotReviewId}</td>
              <td>
              <NavLink to={`/userProfile/pilot/${review.reviewedPilot}`}>
                {review.reviewedPilot}
              </NavLink>
              </td>
              <td>{review.reviewContent}</td>
              <td>{review.pilotRating}</td>
            </tr>
          )}
          {userType === "pilot" && (
            <tr key={review.clientReviewId}>
              <td>{review.clientReviewId}</td>
              <NavLink to={`/userProfile/client/${review.reviewedClient}`}>
                {review.reviewedClient}
              </NavLink>
              <td>{review.reviewContent}</td>
              <td>{review.clientRating}</td>
            </tr>
          )}
        </>
      )
    })

    //render all the elements we created on the page
    return (
      <>
        <h1>Reviews and Feedback</h1>
        <p>
          This page should show all of the reviews that other partners have given you, it also provides
          a link to each of your partners profiles, where you could add a review for them
        </p>

        <h3>Current Reviews</h3>
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
        <p>You must be logged in to view ratings and reviews</p>
      </>
    )
  }
}

export default GivenReviews
