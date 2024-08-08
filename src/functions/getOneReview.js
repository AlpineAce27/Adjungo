import axios from "axios"

//this is the function that the loader user to retreive an exact review object via an author usertype and review Id
async function getOneReview({params}) {
    const {authorUserType, reviewId} = params
   let review
   await axios.get(`/api/review/${authorUserType}/${reviewId}`).then((response) => {
    review = response.data
    review.authorUserType = authorUserType
   })
   return review
 }
 
 export default getOneReview