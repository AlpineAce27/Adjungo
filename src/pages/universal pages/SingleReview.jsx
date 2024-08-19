import { useState } from "react"
import { useSelector } from "react-redux"
import { useLoaderData, useNavigate } from "react-router-dom"
import axios from "axios"

function SingleReview() {
  const [review, setReview] = useState(useLoaderData())
  const [editing, setEditing] = useState(false)
  let userType = useSelector((state) => state.userType)
  let userId = useSelector((state) => state.userId)
  //state values and initial values in case the user edits this review
  let initialRating
  if (userType === "client") {
    initialRating = review.pilotRating
  } else if (userType === "pilot") {
    initialRating = review.clientRating
  }
  const [content, setContent] = useState(review.reviewContent)
  const [rating, setRating] = useState(initialRating)

  //setup the navigate functionality
  const navigate = useNavigate()

  //create a function to change the value of editing
  function handleEditButton(e) {
    e.preventDefault()
    setEditing(!editing)
  }

  //create a function to edit a review
  const handleReviewEdit = (e) => {
    e.preventDefault()

    if (userType === "client") {
      axios
        .put(`/api/givenReviews/${review.pilotReviewId}`, {
          changes: {
            pilotRating: rating,
            reviewContent: content,
          },
        })
        .then((res) => {
          console.log("The review changes have been saved", res.data)
          setReview(res.data)
          setEditing(!editing)
        })
    } else if (userType === "pilot") {
      axios
        .put(`/api/givenReviews/${review.clientReviewId}`, {
          changes: {
            clientRating: rating,
            reviewContent: content,
          },
        })
        .then((res) => {
          console.log("The review changes have been saved", res.data)
          setReview(res.data)
          setEditing(!editing)
        })
    }
  }

  //create a function to delete a review
  function handleDeleteButton(e) {
    e.preventDefault()
    if (userType === "client") {
      axios.delete(`/api/givenReviews/${review.pilotReviewId}`).then(() => {
        navigate("/myCompletedJobs")
      })
    } else if (userType === "pilot") {
      axios.delete(`/api/givenReviews/${review.clientReviewId}`).then(() => {
        navigate("/myCompletedJobs")
      })
    }
  }

  if (editing === false) {
    return (
      <div className="flex flex-col items-center w-full">
        {review.clientReviewId &&
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Client Review #{review.clientReviewId}</h1>
        }
        {review.pilotReviewId &&
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Pilot Review #{review.pilotReviewId}</h1>
        }

        {(userType === "client" && review.clientReviewing === userId) && (
          <div className="flex flex-col items-center w-full">
            <p className="font-rubik text-xl">
              You created this review for pilot #{review.reviewedPilot}
            </p>
            <br />
            {editing === false && (
              <div className="flex flex-col items-start pl-10 pr-10">
                <h3 className=" font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Rating: {review.pilotRating}</h3>
                <br />
                <div >
                  <h3 className=" font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Content:</h3>
                  <p className="font-rubik text-xl">{review.reviewContent}</p>
                </div>
                <br />
                <div className="flex justify-center items-center">
                  <button
                    className="border-2 border-x-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg text-ADJO_Keppel"
                    onClick={handleEditButton}>Change My Review</button>
                  <button
                    className="border-2 border-[#dd7d7d] px-8 py-1 text-xl text- uppercase font-rubik rounded-lg text-[#dd7d7d]"
                    onClick={handleDeleteButton}>Delete my Review</button>
                </div>
              </div>
            )}
          </div>
        )}
        {(userType === "pilot" && review.pilotReviewing === userId) && (
          <div className="flex flex-col items-center w-full">
            <p className="font-rubik text-xl">
              You created this review for client #{review.reviewedClient}
            </p>
            <br />
            {editing === false && (
              <div className="flex flex-col items-start pl-10 pr-10">
                <h3 className=" font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Rating: {review.clientRating}</h3>
                <br />
                <div >
                  <h3 className=" font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Content:</h3>
                  <p className="font-rubik text-xl">{review.reviewContent}</p>
                </div>
                <br />
                <div className="flex justify-center items-center">
                  <button
                    className="border-2 border-x-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg text-ADJO_Keppel"
                    onClick={handleEditButton}>Change My Review</button>
                  <button
                    className="border-2 border-[#dd7d7d] px-8 py-1 text-xl text- uppercase font-rubik rounded-lg text-[#dd7d7d]"
                    onClick={handleDeleteButton}>Delete my Review</button>
                </div>
              </div>
            )}
          </div>
        )}
        {(review.clientReviewing !== userId && review.pilotReviewing !== userId) && (
          <div className="flex flex-col items-center w-full">
            <br />
            {editing === false && (
              <div className="flex flex-col items-start pl-10 pr-10">
                {review.clientRating &&
                  <h3 className=" font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Rating: {review.clientRating}</h3>
                }
                {review.PilotRating &&
                  <h3 className=" font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Rating: {review.pilotRating}</h3>
                }
                <br />
                <div>
                  <h3 className=" font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray justify-center">Content:</h3>
                  <p className="font-rubik text-xl">{review.reviewContent}</p>
                </div>
                <br />
              </div>
            )}
          </div>
        )}
        {userType !== "client" && userType !== "pilot" && (
          <>
            <h3>Oops!</h3>
            <p>
              You must be logged in as either a pilot or a client to see reviews
            </p>
          </>
        )}
      </div>
    )
  } else if (editing === true) {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center pt-10 pb-10">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Edit Review</h1>
          <p className="font-rubik text-xl">Make your changes below, and save them when your ready</p>
        </div>

        <form className="font-rubik text-xl bg-ADJO_Celeste p-5 rounded-lg w-3/5">
          <div className="pb-1 pt-1">
            <label htmlFor="rating">Rating:</label>
            <input
              className="pl-2 pt-1 pb-1 w-14 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
              type="number"
              name="rating"
              step={0.1}
              min={0}
              max={5}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div >
          <br />
          <div >
            <label htmlFor="content">Content:</label>
            <br />
            <textarea
              className="p-3 w-full h-72 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
              type="text"
              name="number"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>

          </div>
          <br />

        </form>
        <div className="flex w-3/5 justify-around pt-10 pb-10">
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={handleEditButton}>Cancel</button>
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={handleReviewEdit}>Save Changes</button>
        </div>
      </div>
    )
  }
}

export default SingleReview
