import axios from "axios"

//this is the function that the loader user to retreive an exact listing object via a listingId
async function getOneReview({params}) {
    const {authorUserType, reviewId} = params
    //console.log("log before the axios request", axios)
   const { review } = await axios.get(`/api/review/${authorUserType}/${reviewId}`)
   //console.log("grabbed listing:", listingId)
   return review
 }
 
 export default getOneReview