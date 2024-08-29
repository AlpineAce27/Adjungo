import axios from "axios"

//this is the function that the loader user to retreive an exact listing object via a listingId
async function getOneListing({params}){
    const {listingId} = params
    //console.log("log before the axios request", axios)
    let data
   axios.get(`api/listings/${listingId}`).then((response)=> {
    data = response.data
   })
   //console.log("grabbed listing:", listingId)
   console.log(data)
   return data
 }
 
 export default getOneListing