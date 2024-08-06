import axios from "axios"
import { useSelector } from "react-redux"

//this is the function that multiple pages use to calculate the rating of the logged in user
async function getUsersRating() {
    //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)

  //grab account information of the current user
    const {receivedReviews} = await axios.get("/api/receivedReviews")
    console.log(receivedReviews)
  //calculate the average rating that this user has
  let total = 0
  receivedReviews.forEach((review) => {
    if(userType === "client"){
        total = total + Number(review.clientRating)
    }
    else if(userType === "pilot"){
        total = total + Number(review.pilotRating)
    } 
    //console.log(avg)
  })
  const rating = total / receivedReviews.length
  return rating
 }
 
 export default getUsersRating
