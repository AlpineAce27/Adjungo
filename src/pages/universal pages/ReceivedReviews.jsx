import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function ReceivedReviews() {
  const navigate = useNavigate()
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
  if (userType === "client" || userType === "pilot") {
    //if they are, grab listings where the client id matches the user
    useEffect(() => {
      axios.get("/api/receivedReviews").then((response) => {
        setReceivedReviews(response.data)
      })
    }, [])

    //create an array of listings mapped to the axios response
    const reviewsList = receivedReviews.map((review) => {
      //change true/false/null to more readable strings

      //create a table row with each variable in the correct spot
      return (
        <>
          {userType === "client" && (
            <tr
              className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
              key={review.clientReviewId}>
              <td>
                <button
                  onClick={() => {
                    navigate(`/review/pilot/${review.clientReviewId}`)
                  }}
                  className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
                >{" "}
                  {review.clientReviewId}
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/userProfile/pilot/${review.pilotReviewing}`)
                  }}
                  className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
                >{" "}
                  {review.pilotReviewing}
                </button>
              </td>
              <td>{review.reviewContent}</td>
              <td>{review.clientRating}</td>
            </tr>
          )}
          {userType === "pilot" && (
            <tr
              className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
              key={review.pilotReviewId}>
              <td>
              <button
                  onClick={() => {
                    navigate(`/review/client/${review.pilotReviewId}`)
                  }}
                  className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
                >{" "}
                  {review.pilotReviewId}
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    navigate(`/userProfile/client/${review.clientReviewing}`)
                  }}
                  className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
                >{" "}
                  {review.clientReviewing}
                </button>
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
      <div className="flex flex-col items-center">
        <section className="flex flex-col items-center w-5/6">
          <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">Reviews and Feedback for Me</h1>
          <p className="font-rubik text-xl text-center">
            This page should show all of the reviews that other partners have given you, it also provides
            a link to each of your partners profiles, where you could add a review for them
          </p>
        </section>
        <h3 className="pt-10 pb-10 font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Rating: {rating.toFixed(2)}/5</h3>
        <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-3/4 ps-10 pt-5 pb-5">
          <table className="table-auto border-collapse font-rubik">
            <thead>
              <tr className="font-rubik font-bold">
                <th>Review ID</th>
                {userType === "client" && <th>Pilot ID</th>}
                {userType === "pilot" && <td>Client ID</td>}
                <th>Content</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>{reviewsList}</tbody>
          </table>
        </div>
      </div>
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

export default ReceivedReviews
