import axios from "axios"
import { useLoaderData, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"
import ClientSingleListing from "../../components/clientComponents/ClientSingleListing"
import PilotSingleListing from "../../components/pilotComponents/PilotSingleListing"


const SingleListing = () => {
    const userType = useSelector(state => state.userType)

    if(userType === 'client'){
        return <ClientSingleListing />
    }else if(userType === 'pilot'){
        return <PilotSingleListing />
    }else{
        return (
            <>
              {/* non-auth catch */}
              <h1>Oops!</h1>
              <p>You must be logged in to view your jobs</p>
            </>
          )
    }

}

export default SingleListing