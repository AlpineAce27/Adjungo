import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { BiListUl } from "react-icons/bi"

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
     
      const user = await axios.get(`/api/otherAccount/pilot/${application.applyingPilot}`)
      console.log(user)

       //create a table row with each variable in the correct spot
      return (
        <tr
          key={application.applicationId}
          className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
        >
          <td>{application.applicationId}</td>
          <td>
            <button
              onClick={() => {
                navigate(`/clientListing/${application.applyingListing}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
            >
              {" "}
              {application.applyingListing}
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                navigate(`/userProfile/pilot/${application.applyingPilot}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
            >
              {" "}
              {application.applyingPilot}
            </button>
          </td>
          {user.rating < 2 && (
            <td className="text-[#dc2626] font-medium">{user.rating}</td>
          )}
          {user.rating >= 2 && user.rating < 3 && (
            <td className="text-[#ea580c] font-medium">{user.rating}</td>
          )}
          {user.rating >= 3 && user.rating < 4 && (
            <td className="text-[#fbbf24] font-medium">{user.rating}</td>
          )}
          {user.rating >= 4 && user.rating < 5 && (
            <td className="text-[#84cc16] font-medium">{user.rating}</td>
          )}
          <td>
            <button
              onClick={() => {
                axios
                  .put(`/api/acceptApplication/${application.applicationId}`)
                  .then((response) => {
                    setApplications(response.data)
                  })
              }}
              className="bg-ADJO_Keppel opacity-70 rounded-full w-20 text-black font-medium"
            >
              Accept
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                axios
                  .delete(`/api/denyApplication/${application.applicationId}`)
                  .then((response) => {
                    setApplications(response.data)
                  })
              }}
              className="border border-[#b91c1c] opacity-70 rounded-full w-20 text-[#b91c1c]"
            >
              Deny
            </button>
          </td>
        </tr>
      )
    })

    return (
      <>
        <div className="flex flex-col items-center">
          <section className="flex flex-col items-center">
            <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
              Pending Applications
            </h1>
            <p className="font-rubik text-l pb-5 w-3/4 text-center">
              Here are the applications that are waiting for your feedback. Each one of these applications means a 
              pilot has applied to one of you're listings. The exact listing and Pilot Id are shown with a link on each
              application. The pilot's ratings has also been displayed to help make your decision faster!
            </p>
          </section>

          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 w-1/2 pl-10 pr-10 pt-5 pb-5">
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

          <section
            onClick={() => {
              navigate("/myListings")
            }}
            className="flex w-[250px] items-center hover: cursor-pointer"
          >
            <BiListUl size={25} style={{ color: "#08BFA1" }} />
            <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel text-center">
              See all My Listings
            </section>
          </section>
        </div>
      </>
    )
  }
}
export default ClientApplications
