import { NavLink, useNavigate} from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"


function GivenReviews() {
  const navigate = useNavigate()
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
    }, [])

    //create an array of listings mapped to the axios response
    const reviewsList = givenReviews.map((review) => {
      //change true/false/null to more readable strings

      //create a table row with each variable in the correct spot
      return (
        <>
          {userType === "client" && (
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
                    navigate(`/userProfile/pilot/${review.reviewedPilot}`)
                  }}
                  className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
                >{" "}
                  {review.reviewedPilot}
                </button>
              </td>
              <td>{review.reviewContent}</td>
              <td>{review.pilotRating}</td>
            </tr>
          )}
          {userType === "pilot" && (
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
              <button
                onClick={() => {
                  navigate(`/userProfile/client/${review.reviewedClient}`)
                }}
                className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
              >{" "}
                {review.reviewedClient}
              </button>
              <td className="w-full">{review.reviewContent}</td>
              <td>{review.clientRating}</td>
            </tr>
          )}
        </>
      )
    })

    //render all the elements we created on the page
    return (
      <div className="flex flex-col items-center">
        <section className="flex flex-col items-center w-5/6">
          <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">Reviews and Feedback</h1>
          <p className="font-rubik text-xl text-center">
            This page should show all of the reviews that other partners have given you, it also provides
            a link to each of your partners profiles, where you could add a review for them
          </p>
        </section>
        <h3 className="pt-10 pb-10 font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Current Reviews</h3>
        {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
    <label for="showCompleted">Show Completed Jobs:</label> */}
        <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-3/4 ps-10 pt-5 pb-5">
          <table className="table-auto border-collapse font-rubik">
            <thead>
              <tr>
                <th>Review ID</th>
                {userType === "client" && <th>Pilot ID</th>}
                {userType === "pilot" && <td>Client ID</td>}
                <th className="w-full">Content</th>
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

export default GivenReviews
