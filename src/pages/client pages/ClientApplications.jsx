import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

function ClientApplications() {
  //grabbing the usertype from redux store
  let usertype = useSelector((state) => state.userType)
  //create a state value for an array of listings
  const [applications, setApplications] = useState([])
  //setup the navigate functionality
  const navigate = useNavigate()

  //if they are a pilot,
  if (usertype === "client") {
    //if they are, grab listings where the assigned pilot matches the user
    useEffect(() => {
      axios.get("/api/applicationsForClient").then((response) => {
        setApplications(response.data)
      })
    }, [])

    //create an array of listings mapped to the axios response
    const applicationsItems = applications.map((application) => {
      //create a table row with each variable in the correct spot
      let rating = Number(application.reviews.avgRating).toFixed(2)
      return (
        <tr key={application.applicationId} className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray">
             <td>
             {application.applicationId}
          </td>
          <td>
          <button onClick={()=>{navigate(`/clientListing/${application.applyingListing}`)}} className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"> {application.applyingListing}</button>
          </td>
          <td>
          <button onClick={()=>{navigate(`/userProfile/pilot/${application.applyingPilot}`)}} className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"> {application.applyingPilot}</button>
            </td>
          {rating < 2 &&
          <td className="text-[#dc2626] font-medium">{rating}</td>
          }
          {rating >= 2 && rating < 3 &&
          <td className="text-[#ea580c] font-medium">{rating}</td>
          }
          {rating >= 3 && rating < 4 &&
          <td className="text-[#fbbf24] font-medium">{rating}</td>
          }
          {rating >= 4 && rating < 5 &&
          <td className="text-[#84cc16] font-medium">{rating}</td>
          }
          <td>
            <button onClick={()=>{
                axios.put(`/api/acceptApplication/${application.applicationId}`).then((response)=> {setApplications(response.data)})
            }}
            className="bg-ADJO_Keppel opacity-70 rounded-full w-20 text-black font-medium"
            >Accept</button>
          </td>
          <td>
            <button onClick={()=>{
                axios.delete(`/api/denyApplication/${application.applicationId}`).then((response)=> {setApplications(response.data)})
            }}
            className="border border-[#b91c1c] opacity-70 rounded-full w-20 text-[#b91c1c]"
            >Deny</button>
          </td>
        </tr>
      )
    })

    return (
      <>
        <h1>Pilots Applying to your Listings</h1>
        <p>
          This page should give a quick overview of the pilots applying to your
          listings. It will show in list form with each pilots rating, # of
          completed flights, which listing they are applying for, a link to the
          pilot's profile, and a button to accept or deny the application. Each
          of these header labels would be clickable and result in the
          applications being filtered by that field.
        </p>
        <section className="flex justify-center">
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 w-full ps-10 pt-5 pb-5">
        <table className="table-auto border-collapse font-rubik">
          <thead>
            <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
              <th>Application ID</th>
              <th>Listing ID</th>
              <th>Pilot ID</th>
              <th>Pilot Rating</th>
              <th>Accept</th>
              <th>Deny</th>
            </tr>
          </thead>
          <tbody>{applicationsItems}</tbody>
        </table>
          </div>
        </section>
        <NavLink to="/myListings">See all My Listings</NavLink>
      </>
    )
  }
}
export default ClientApplications
