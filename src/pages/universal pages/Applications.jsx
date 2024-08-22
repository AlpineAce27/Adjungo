import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { BiListPlus, BiListUl } from "react-icons/bi"
import { useLoaderData } from "react-router-dom"

const Applications = () => {
  const navigate = useNavigate()
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)

  const loaderData = useLoaderData()

  //create a state value for an array of listings
  const [items, setItems] = useState(loaderData)

  //create an array of listings mapped to the axios response
  const tableItems = items.map((item) => {
    //change true/false/null to more readable strings
    //change "assigned pilot"
    if (item.assignedPilot === null) {
      item.assignedPilot = "None"
    }
    //change "hardware provided"
    let hardwareProvided
    if (item.hardwareProvided === true) {
      hardwareProvided = "Yes"
    } else {
      hardwareProvided = "No"
    }
    //change "software provided"
    let softwareProvided
    if (item.softwareProvided === true) {
      softwareProvided = "Yes"
    } else {
      softwareProvided = "No"
    }

    //create a table row for pilots view of their applications for each listing
    if (userType === "pilot") {
      return (
        <tr key={item.listingId} className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray">
          <td>
            <button
              onClick={() => {
                navigate(`/singleListing/${item.listingId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
              {item.listingId}
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                navigate(`/userProfile/client/${item.clientId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
              {" "}
              {item.clientId}
            </button>
          </td>
          <td>${item.offer}</td>
          <td>{item.flightDate}</td>
          <td>{hardwareProvided}</td>
          <td>{softwareProvided}</td>
          <td>{item.flightAddress}</td>
          <td>{item.flightRadius}</td>
          <td>
            <button
              onClick={() => {
                //find the applications on this listing with axios.get('/api/applicationsForClient/:listingId')
                //out of these resuts, find the application where "applying Pilot" matches the current userId
                //delete this application with axios.delete('/api/application/:applicationId')
              }}
              className="border bg-[#a0cfca] border-[#000000] rounded-full w-20 text-[#000000] font-medium">
              Retract
            </button>
          </td>
        </tr>
      )
      //create a table row for clients view of their applications for each application
    } else if (userType === "client") {
      return (
        <tr key={item.applicationId} className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray">
          <td>{item.applicationId}</td>
          <td>
            <button
              onClick={() => {
                navigate(`/singleListing/${item.applyingListing}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
              {item.applyingListing}
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                navigate(`/userProfile/pilot/${item.applyingPilot}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
              {" "}
              {item.applyingPilot}
            </button>
          </td>
          <td className={`font-bold text-${item.reviewColor}`}>{item.reviews}</td>
          <td>
            <button
              onClick={() => {
                axios.put(`/api/acceptApplication/${item.applicationId}`).then((response) => {
                  setItems(response.data)
                })
              }}
              className="bg-ADJO_Keppel opacity-70 rounded-full w-20 text-black font-medium">
              Accept
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                axios.delete(`/api/denyApplication/${item.applicationId}`).then((response) => {
                  setItems(response.data)
                })
              }}
              className="border border-[#b91c1c] opacity-70 rounded-full w-20 text-[#b91c1c]">
              Deny
            </button>
          </td>
        </tr>
      )
    }
  })

  //render all the elements we created on the page

  if (userType === "client" || userType === "pilot") {
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            {userType === "pilot" && (
              <div className="flex flex-col items-center">
                <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
                  Applications
                </h1>
                <p className="font-rubik text-l pb-5 w-3/4 text-center">
                  This page shows all of the jobs you are currently applying for. You can view the specific listing, and
                  the client who owns it by clicking on their respective Id's. You can also retract an application by
                  clicking the "retract" button on any of your applications.
                </p>
              </div>
            )}
            {userType === "client" && (
              <div className="flex flex-col items-center">
                <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
                  Pending Applications
                </h1>
                <p className="font-rubik text-l pb-5 w-3/4 text-center">
                  Here are the applications that are waiting for your feedback. Each one of these applications means a
                  pilot has applied to one of you're listings. The exact listing and Pilot Id are shown with a link on
                  each application. The pilot's ratings has also been displayed to help make your decision faster!
                </p>
              </div>
            )}
          </div>
          {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
    <label for="showCompleted">Show Completed Jobs:</label> */}
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 w-1/2 pl-10 pr-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik w-full">
              <thead>
                {userType === "pilot" && (
                  <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                    <th className="w-[100px]">Listing ID</th>
                    <th className="w-[100px]">Client ID</th>
                    <th>Offer</th>
                    <th className="w-[130px]">Flight Date</th>
                    <th>Hardware Provided</th>
                    <th>Software Provided</th>
                    <th className="w-[500px]">Flight Location</th>
                    <th>Flight Radius</th>
                    <th className="w-[100px]">Retract This Application?</th>
                  </tr>
                )}
                {userType === "client" && (
                  <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                    <th>Application ID</th>
                    <th>Listing ID</th>
                    <th>Pilot ID</th>
                    <th>Pilot Rating</th>
                    <th>Accept</th>
                    <th>Deny</th>
                  </tr>
                )}
              </thead>
              <tbody>{tableItems}</tbody>
            </table>
          </div>
          {userType === "pilot" && (
            <section
              onClick={() => {
                navigate("/listings")
              }}
              className="flex w-[250px] items-center hover: cursor-pointer">
              <BiListPlus size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">Find More Jobs</section>
            </section>
          )}
          {userType === "client" && (
            <section
              onClick={() => {
                navigate("/myListings")
              }}
              className="flex w-[250px] items-center hover: cursor-pointer">
              <BiListUl size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel text-center">
                See all My Listings
              </section>
            </section>
          )}
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1>Oops!</h1>
        <p>You must be logged in to view applications</p>
      </>
    )
  }
}
export default Applications
