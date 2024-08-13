import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { BiListPlus, BiCheckCircle } from "react-icons/bi"

function MyListings() {
  const navigate = useNavigate()
  //grabbing the usertype from redux store
  let usertype = useSelector((state) => state.userType)
  //create a state value for an array of listings
  const [listings, setListings] = useState([])
  //check if the user is a client

  //if they are a client,
  if (usertype === "client") {
    //if they are, grab listings where the client id matches the user
    useEffect(() => {
      axios.get("/api/mylistings").then((response) => {
        setListings(response.data)
      })
    }, [])

    //create an array of listings mapped to the axios response
    const listingsItems = listings.map((listing) => {
      //change true/false/null to more readable strings
      //change "assigned pilot"
      if (listing.assignedPilot === null) {
        listing.assignedPilot = "None"
      }
      //change "hardware provided"
      let hardwareProvided
      if (listing.hardwareProvided === true) {
        hardwareProvided = "Yes"
      } else {
        hardwareProvided = "No"
      }
      //change "software provided"
      let softwareProvided
      if (listing.softwareProvided === true) {
        softwareProvided = "Yes"
      } else {
        softwareProvided = "No"
      }

      //create a table row with each variable in the correct spot
      return (
        <tr
          key={listing.listingId}
          className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
        >
          <td>
            <button
              onClick={() => {
                navigate(`/clientListing/${listing.listingId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
            >
              {" "}
              {listing.listingId}
            </button>
          </td>
          {listing.assignedPilot === "None" && <td>{listing.assignedPilot}</td>}
          {listing.assignedPilot !== "None" && (
            <td>
              <button
                onClick={() => {
                  navigate(`/userProfile/pilot/${listing.assignedPilot}`)
                }}
                className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
              >
                {" "}
                {listing.assignedPilot}
              </button>
            </td>
          )}
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{hardwareProvided}</td>
          <td>{softwareProvided}</td>
          <td>{listing.flightAddress}</td>
          <td>{listing.flightRadius}</td>
        </tr>
      )
    })

    //render all the elements we created on the page
    return (
      <>
        <div className="flex flex-col items-center">
          <section className="flex flex-col items-center">
            <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">Welcome to your Listings</h1>
            <p className="font-rubik text-l pb-5 w-3/4 text-center">
              This page should show all of the clients listings in table form
              where they can easily sort by any column header, and click on any
              listing to see more details on it. There should also be a
              "completed" tab where the client can view all of their completed
              jobs. Each listing should also show how many applications it has,
              with a link to the applications page.
            </p>
          </section>
          <section className="flex justify-center">
            <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 ps-10 pt-5 pb-5">
              <table className="table-auto border-collapse font-rubik">
                <thead>
                  <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                    <th className="w-[100px]">Listing ID</th>
                    <th className="w-[100px]">Assigned Pilot</th>
                    <th>Offer</th>
                    <th className="w-[130px]">Flight Date</th>
                    <th>Hardware Provided</th>
                    <th>Software Provided</th>
                    <th className="w-[500px]">Flight Location</th>
                    <th>Flight Radius</th>
                  </tr>
                </thead>
                <tbody>{listingsItems}</tbody>
              </table>
            </div>
          </section>
          <div className="flex justify-between">
            <section
              onClick={() => {
                navigate("/NewListing")
              }}
              className="flex w-[300px] items-center hover: cursor-pointer"
            >
              <BiListPlus size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Create a New Listing
              </section>
            </section>
            <section
              onClick={() => {
                navigate("/myCompletedJobs")
              }}
              className="flex w-[300px] items-center hover: cursor-pointer"
            >
              <BiCheckCircle size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                View My Completed Jobs
              </section>
            </section>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1>Oops!</h1>
        <p>You must be logged in as a client to create a listing</p>
      </>
    )
  }
}

export default MyListings
