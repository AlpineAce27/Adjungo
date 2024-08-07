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
      return (
        <tr key={application.applicationId}>
             <td>
             {application.applicationId}
          </td>
          <td>
            <Link to={`/clientListing/${application.applyingListing}`}>
              {application.applyingListing}
            </Link>
          </td>
          <td>
              <NavLink to={`/userProfile/pilot/${application.applyingPilot}`}>
                {application.applyingPilot}
              </NavLink>
            </td>
          <td>{Number(application.reviews.avgRating).toFixed(2)}</td>
          <td>
            <button onClick={()=>{
                axios.put(`/api/acceptApplication/${application.applicationId}`).then((response)=> {setApplications(response.data)})
            }}>Accept</button>
          </td>
          <td>
            <button onClick={()=>{
                axios.delete(`/api/denyApplication/${application.applicationId}`).then((response)=> {setApplications(response.data)})
            }}>Deny</button>
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
        <table>
          <thead>
            <tr>
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
        <NavLink to="/myListings">See all My Listings</NavLink>
      </>
    )
  }
}
export default ClientApplications
