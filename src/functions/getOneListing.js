import axios from "axios"

//this is the function that the loader user to retreive an exact listing object via a listingId
async function getOneListing({params}) {
    const {listingId} = params
    console.log("log before the axios request", axios)
   const { data } = await axios.get(`http://localhost:8000/api/mylistings/${listingId}`)
   console.log("grabbed listing:", listingId)
   return data
 }
 
 export default getOneListing