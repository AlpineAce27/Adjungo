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
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center pt-10 pb-10">
            <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Create Review</h1>
            {userType === "client" && (
              <p className="font-rubik text-xl">Create a Review for Pilot #{userBeingReviewed}</p>
            )}
            {userType === "pilot" && (
              <p className="font-rubik text-xl">Create a Review for Client #{userBeingReviewed}</p>
            )}
          </div>

          <form className="font-rubik bg-ADJO_Celeste p-5 rounded-lg w-5/6 text-lg">
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
            onClick={()=> navigate('/myCompletedJobs')}>Cancel</button>
            <button
              className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
              onClick={handleReviewSubmission}>Submit Review</button>
          </div>
        </div>
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
