import axios from "axios"

//this is the function that the loader user to retreive an exact listing object via a listingId
async function getAccountDetails({params}) {
    const {userType, userId} = params
    //console.log("log before the axios request", axios)
   const { data } = await axios.get(`/api/otherAccount/${userType}/${userId}`)
   //console.log("grabbed account:", userType, userId)
   data.userType = userType
   data.userId = userId

   console.log(data)
   return data
 }
 
 export default getAccountDetails