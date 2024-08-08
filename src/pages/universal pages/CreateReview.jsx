import { useSelector } from "react-redux"
import { useNavigate, useLoaderData } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

function CreateReview() {
  const params = useLoaderData()
  const userBeingReviewed = params.userBeingReviewed
  //console.log(userBeingReviewed)

  let userType = useSelector((state) => state.userType)
  let userid = useSelector((state) => state.userId)
  const navigate = useNavigate()

  const [rating, setRating] = useState(5.0)
  const [content, setContent] = useState("")

  const handleReviewSubmission = (e) => {
    e.preventDefault()
    axios
      .post("/api/givenReview", {
        IdBeingReviewed: userBeingReviewed,
        reviewContent: content,
        reviewRating: rating,
      })
      .then(() => {
        navigate("/myCompletedJobs")
        console.log("A new review has been created.")
      })
  }

  if (userType === "client" || userType === "pilot") {
    return (
      <>
        {userType === "client" && (
          <h1>Create a Review for Pilot #{userBeingReviewed}</h1>
        )}
        {userType === "pilot" && (
          <h1>Create a Review for Client #{userBeingReviewed}</h1>
        )}
        <p>This page is one giant form that allows a user to create a review</p>
        <form onSubmit={handleReviewSubmission}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            name="rating"
            step={0.1}
            min={0}
            max={5}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value).toFixed(1))}
            required
          ></input>
          <br />
          <label htmlFor="content">Review Content: </label>
          <br />
          <input
            type="textarea"
            name="description"
            rows="10"
            cols="50"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></input>
          <br />
          <input type="submit" value="Submit Review"></input>
        </form>
      </>
    )
  } else {
    return (
      <>
        <h1>Oops!</h1>
        <p>You must be logged in as a pilot or client to create a review</p>
      </>
    )
  }
}

export default CreateReview
