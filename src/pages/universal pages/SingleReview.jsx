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
        navigate("/givenReviews")
      })
    } else if (userType === "pilot") {
      axios.delete(`/api/givenReviews/${review.clientReviewId}`).then(() => {
        navigate("/givenReviews")
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
                <div >
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
      <>
        <h1>Edit Review</h1>
        <form onSubmit={handleReviewEdit}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            name="rating"
            step={0.1}
            min={0}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
          <br />
          <label htmlFor="content">Content:</label>
          <input
            type="text"
            name="number"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <br />
          <input type="submit" value="Save Changes"></input>
        </form>
        <button onClick={handleEditButton}>Discard Changes</button>
      </>
    )
  }
}

export default SingleReview
