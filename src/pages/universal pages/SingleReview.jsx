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
      <>
        <h1>Single Review Page</h1>
        <p>
          This page can show a review given to you, a review you made, or a
          review made by another user for another user
        </p>
        {userType === "client" && review.clientReviewing === userId && (
          <>
            <p>
              I, client #{userId}, created this review for pilot #
              {review.reviewedPilot}
            </p>
            {editing === false && (
              <>
                <h3>Provided Rating: {review.pilotRating}</h3>
                <p>Content: {review.reviewContent}</p>
                <button onClick={handleEditButton}>Change My Review</button>
                <button onClick={handleDeleteButton}>Delete my Review</button>
              </>
            )}
          </>
        )}
        {userType === "pilot" && review.pilotReviewing === userId && (
          <>
            <p>
              I, pilot #{userId}, created this review fro client #
              {review.reviewedClient}
            </p>
            <h3>Provided Rating: {review.clientRating}</h3>
            <p>Content: {review.reviewContent}</p>
            <button onClick={handleEditButton}>Edit Listing</button>
            <button onClick={handleDeleteButton}>Delete my Review</button>
          </>
        )}
        {(userType === "client" || userType === "pilot") &&
          (review.clientReviewing !== userId ||
            review.pilotReviewing !== userId) && (
            <>
              <p>
                I, {userType} #{userId}, did not create this review, so I am
                only viewing it
              </p>
              {review.authorUserType === "client" && (
                <p>
                  This review was created by client {review.clientReviewing} for
                  pilot {review.reviewedPilot}
                </p>
              )}
              {review.authorUserType === "pilot" && (
                <p>
                  This review was created by pilot {review.pilotReviewing} for
                  client {review.reviewedClient}
                </p>
              )}
            </>
          )}
        {userType !== "client" && userType !== "pilot" && (
          <>
            <h3>Oops!</h3>
            <p>
              You must be logged in as either a pilot or a client to see reviews
            </p>
          </>
        )}
      </>
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
