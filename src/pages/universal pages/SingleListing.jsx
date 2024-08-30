import axios from "axios"
import { useLoaderData, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import ClientSingleListing from "../../components/clientComponents/ClientSingleListing"
import PilotSingleListing from "../../components/pilotComponents/PilotSingleListing"


const SingleListing = () => {
    const userType = useSelector(state => state.userType)

    const {listingId} = useParams()

    const [listing, setListing] = useState()

    useEffect(() => {
        getListing()
    }, [])

    const getListing = () => {
        axios.get(`/api/listings/${listingId}`).then((response)=> {
            let myListing = response.data
            console.log('axios', myListing)
            setListing(myListing)
          })
    }

    if(listing){
        if(userType === 'client'){
            return <ClientSingleListing oneListing={listing} setListing={setListing} />
        }else if(userType === 'pilot'){
            return <PilotSingleListing oneListing={listing} setListing={setListing}  />
        }else{
            return (
                <>
                  {/* non-auth catch */}
                  <h1>Oops!</h1>
                  <p>You must be logged in to view your jobs</p>
                </>
              )
        }
    }else{
        return <div>
            Loading
        </div>
    }

}

export default SingleListing