//this is the function that the loader user to retreive an exact listing object via a listingId
async function getOneListing({params}) {
    const {listingId} = params
   const { data } = await axios.get(`/api/listings/${listingId}`)
   return data
 }
 
 export default getOneListing