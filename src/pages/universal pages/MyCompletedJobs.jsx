import { NavLink, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

//icon imports
import { ImCross, ImCheckmark, ImPowerCord } from "react-icons/im"
import { GiOrange } from "react-icons/gi"
import {
  TbCalendarStats,
  TbCalendar,
  TbDrone,
  TbWifi,
  TbCloudShare,
  TbRadioactiveFilled,
  TbArrowBigDownLine,
  TbArrowBigUpLine,
} from "react-icons/tb"
import { BiNetworkChart, BiSolidDollarCircle, BiChevronLeftCircle, BiCommentEdit, BiCommentAdd } from "react-icons/bi"
import { GiBombingRun } from "react-icons/gi"
import { MdDarkMode } from "react-icons/md"
import { FaPeopleGroup } from "react-icons/fa6"
import { FaWeightHanging } from "react-icons/fa6"

function MyCompletedJobs() {
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  let userId = useSelector((state) => state.userId)
  //create a state value for an array of listings
  const [completedListings, setcompletedListings] = useState([])
  const [givenReviews, setGivenReviews] = useState([])
  const [pilotArray, setPilotArray] = useState([])
  const [clientArray, setClientArray] = useState([])
  const navigate = useNavigate()

  //create state values for the filters and sorting
  const [filterConditions, setFilterConditions] = useState({})
  const [sortCondition, setSortCondition] = useState([])

  //create a handler function for changing filters
  const changeFilter = (key) => {
    if (filterConditions[key] === false) {
      const copy = filterConditions
      delete copy[key]
      setFilterConditions({ ...copy })
    } else if (filterConditions[key] === true) {
      setFilterConditions({ ...filterConditions, [key]: false })
    } else if (!filterConditions[key]) {
      setFilterConditions({ ...filterConditions, [key]: true })
    }
  }

  //create a handler function for sorting the listings
  const changeSort = (key) => {
    if (key === sortCondition[0])
      if (sortCondition.length < 1) {
        const array = [key, "H-L"]
        setSortCondition(array)
      } else if (sortCondition.length > 1 && sortCondition[1] === "H-L") {
        const array = [key, "L-H"]
        setSortCondition(array)
      } else {
        setSortCondition([])
      }
    else {
      const array = [key, "H-L"]
      setSortCondition(array)
    }
  }

  //create handler function for filtering the listings (Magic box)
  const filterListings = (data) => {
    const filteredData = data.filter((item) =>
      Object.keys(filterConditions).every((key) => item[key] === filterConditions[key])
    )
    return filteredData
  }

  if (userType === "client") {
    //if they are, grab completed jobs where the owner is matches the client ID, as well as any reviews on the assigned pilot
    useEffect(() => {
      //console.log("useffect hit")
      axios.get("/api/myCompletedJobs").then((jobsResponse) => {
        axios.get("/api/givenReviews").then((reviewsResponse) => {
          //console.log("reviews response:", reviewsResponse.data)
          //console.log("jobs response:", jobsResponse.data)
          setGivenReviews(reviewsResponse.data)
          setcompletedListings(jobsResponse.data)
          let tempArray = []
          reviewsResponse.data.forEach((review) => {
            tempArray.push(review.reviewedPilot)
          })
          setPilotArray(tempArray)
        })
      })
    }, [])

    //filter the listings
    let filteredListings = filterListings(completedListings)
    //sort the remaining listings
    if (sortCondition.length > 1) {
      filteredListings.sort((a, b) => {
        let aVar = Number(a[sortCondition[0]])
        let bVar = Number(b[sortCondition[0]])

        if (sortCondition[0] === "flightDate") {
          aVar = a[sortCondition[0]].replace(/-/g, "")
          bVar = b[sortCondition[0]].replace(/-/g, "")
          if (sortCondition[1] === "H-L") {
            return aVar - bVar
          } else if (sortCondition[1] === "L-H") {
            return bVar - aVar
          }
        } else {
          if (sortCondition[1] === "H-L") {
            return aVar - bVar
          } else if (sortCondition[1] === "L-H") {
            return bVar - aVar
          }
        }
      })
    }

    //create an array of listings mapped to the axios response
    const completedListingsItems = filteredListings.map((listing) => {
      const thisReview = givenReviews.filter((review) => review.reviewedPilot === listing.assignedPilot)
      //create a table row with each variable in the correct spot
      return (
        <tr key={listing.listingId} className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray">
          <td>
            <Link to={`/pilotListing/${listing.listingId}`}>{listing.listingId}</Link>
          </td>
          <td>
            <NavLink to={`/userProfile/client/${listing.clientId}`}>{listing.clientId}</NavLink>
          </td>
          <td>
            <Link to={`/pilotProfile/${listing.assignedPilot}`}></Link>
            {listing.assignedPilot}
          </td>
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{listing.flightZipcode}</td>
          {pilotArray.includes(listing.assignedPilot) && (
            <td className="flex justify-center align-middle">
              <button
                className="flex h-8 w-8 rounded-full bg-ADJO_Keppel justify-center align-middle"
                onClick={() => navigate(`/review/client/${thisReview[0].pilotReviewId}`)}>
                <BiCommentEdit size={20} style={{ color: "#000000", alignSelf: "center" }} />
              </button>
            </td>
          )}
          {!pilotArray.includes(listing.assignedPilot) && (
            <td className="flex justify-center align-middle">
              <button
                className="flex h-8 w-8 rounded-full bg-[#fa8989] justify-center align-middle"
                onClick={() => navigate(`/createReview/${listing.assignedPilot}`)}>
                <BiCommentAdd size={20} style={{ color: "#BDF3E7", alignSelf: "center" }} />
              </button>
            </td>
          )}
        </tr>
      )
    })

    //render all the elements we created on the page
    return (
      <>
        <div className="flex flex-col items-center">
          <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
            My Completed Jobs
          </h1>
          <p className="font-rubik text-l pb-5 w-3/4 text-center">
            This page should show all of the jobs that the user has completed. Each row should have a button at the end
            to allow them to update their review on that job's partner, or create a review for that jobs partner if one
            doensn't already exist
          </p>
          {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
      <label for="showCompleted">Show Completed Jobs:</label> */}
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-1/2 pr-10 pl-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik pb-20 text-sm">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th>Listing ID</th>
                  <th>Client</th>
                  <th>Pilot</th>
                  <th className="w-[100px]">Payment</th>
                  <th className="w-[120px]">Date</th>
                  <th className="w-[120px]">Location</th>
                  <th>Review Status</th>
                </tr>
              </thead>
              <tbody>{completedListingsItems}</tbody>
            </table>
          </div>
        </div>
      </>
    )
  } else if (userType === "pilot") {
    //if they are, grab completed jobs where the owner is matches the client ID, as well as any reviews on the assigned pilot
    useEffect(() => {
      //console.log("useffect hit")
      axios.get("/api/myCompletedJobs").then((jobsResponse) => {
        axios.get("/api/givenReviews").then((reviewsResponse) => {
          //console.log("reviews response:", reviewsResponse.data)
          //console.log("jobs response:", jobsResponse.data)
          setGivenReviews(reviewsResponse.data)
          setcompletedListings(jobsResponse.data)
          let tempArray = []
          reviewsResponse.data.forEach((review) => {
            tempArray.push(review.reviewedClient)
          })
          setClientArray(tempArray)
        })
      })
    }, [])

    //filter the listings
    let filteredListings = filterListings(completedListings)
    //sort the remaining listings
    if (sortCondition.length > 1) {
      filteredListings.sort((a, b) => {
        let aVar = Number(a[sortCondition[0]])
        let bVar = Number(b[sortCondition[0]])

        if (sortCondition[0] === "flightDate") {
          aVar = a[sortCondition[0]].replace(/-/g, "")
          bVar = b[sortCondition[0]].replace(/-/g, "")
          if (sortCondition[1] === "H-L") {
            return aVar - bVar
          } else if (sortCondition[1] === "L-H") {
            return bVar - aVar
          }
        } else {
          if (sortCondition[1] === "H-L") {
            return aVar - bVar
          } else if (sortCondition[1] === "L-H") {
            return bVar - aVar
          }
        }
      })
    }

    //create an array of listings mapped to the axios response
    const completedListingsItems = filteredListings.map((listing) => {
      const thisReview = givenReviews.filter((review) => review.reviewedClient === listing.clientId)
      //create a table row with each variable in the correct spot
      return (
        <tr key={listing.listingId} className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray">
          <td>
            <Link to={`/pilotListing/${listing.listingId}`}>{listing.listingId}</Link>
          </td>
          <td>
            <NavLink to={`/userProfile/client/${listing.clientId}`}>{listing.clientId}</NavLink>
          </td>
          <td>
            <Link to={`/pilotProfile/${listing.assignedPilot}`}></Link>
            {listing.assignedPilot}
          </td>
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{listing.hardwareProvided}</td>
          <td>{listing.softwareProvided}</td>
          <td>{listing.flightAddress}</td>
          <td>{listing.flightRadius}</td>
          {clientArray.includes(listing.clientId) && (
            <td className="flex justify-center align-middle">
              <button
                className="flex h-8 w-8 rounded-full bg-ADJO_Keppel justify-center align-middle"
                onClick={() => navigate(`/review/pilot/${thisReview[0].clientReviewId}`)}>
                <BiCommentEdit size={20} style={{ color: "#000000", alignSelf: "center" }} />
              </button>
            </td>
          )}
          {!clientArray.includes(listing.clientId) && (
            <td className="flex justify-center align-middle">
              <button
                className="flex h-8 w-8 rounded-full bg-[#fa8989] justify-center align-middle"
                onClick={() => navigate(`/createReview/${listing.clientId}`)}>
                <BiCommentAdd size={20} style={{ color: "#BDF3E7", alignSelf: "center" }} />
              </button>
            </td>
          )}
        </tr>
      )
    })

    //render all the elements we created on the page
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
              My Completed Jobs
            </h1>
            <p className="font-rubik text-l pb-5 w-3/4 text-center">
              This page should show all of the jobs that the user has completed. Each row should have a button at the
              end to allow them to update their review on that job's partner, or create a review for that jobs partner
              if one doensn't already exist
            </p>
          </div>
          <div>
            <section
              onClick={() => {
                if (userType === "pilot") {
                  navigate("/myJobs/pilot")
                } else if (userType === "client") {
                  navigate("/myJobs/client")
                }
              }}
              className="flex w-[250px] items-center hover: cursor-pointer">
              <BiChevronLeftCircle size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">Back to My Jobs</section>
            </section>
          </div>
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik pb-20">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[100px]">Listing ID</th>
                  <th className="w-[100px]">Client ID</th>
                  <th className="w-[100px]">Pilot ID</th>
                  <th>
                    <button onClick={() => changeSort("offer")}>
                      <Tooltip position="top" content="Payment">
                        {sortCondition[0] === "offer" && sortCondition[1] === "H-L" &&
                        <TbArrowBigDownLine size={25} style={{ color: "#000000" }} />
                        }
                        {sortCondition[0] === "offer" && sortCondition[1] === "L-H" &&
                        <TbArrowBigUpLine size={25} style={{ color: "#000000" }}/>
                        }
                        {sortCondition[0] !== "offer" &&
                        <BiSolidDollarCircle size={30} style={{ color: "#000000" }}/>
                        }
                        
                      </Tooltip>
                    </button>
                  </th>
                  <th>
                    <Tooltip position="top" content="Flight-Op date">
                      <button onClick={() => changeSort("flightDate")}>
                      {sortCondition[0] === "flightDate" && sortCondition[1] === "H-L" &&
                        <TbArrowBigDownLine size={25} style={{ color: "#000000" }} />
                        }
                        {sortCondition[0] === "flightDate" && sortCondition[1] === "L-H" &&
                        <TbArrowBigUpLine size={25} style={{ color: "#000000" }}/>
                        }
                        {sortCondition[0] !== "flightDate" &&
                        <TbCalendar size={25} style={{ color: "#000000" }} />
                        }
                      </button>
                    </Tooltip>
                  </th>
                  <Tooltip position="top" content="Flight-Op location">
                      Zipcode
                    </Tooltip>
                  <th>
                    <Tooltip position="top" content="Range (miles)">
                      <button onClick={() => changeSort("flightRadius")}>
                      {sortCondition[0] === "flightRadius" && sortCondition[1] === "H-L" &&
                        <TbArrowBigDownLine size={25} style={{ color: "#000000" }} />
                        }
                        {sortCondition[0] === "flightRadius" && sortCondition[1] === "L-H" &&
                        <TbArrowBigUpLine size={25} style={{ color: "#000000" }}/>
                        }
                        {sortCondition[0] !== "flightRadius" &&
                        <GiOrange size={25} style={{ color: "#000000" }} />
                        }
                      </button>
                    </Tooltip>
                  </th>
                  <th className="w-[100px]">Review Status</th>
                </tr>
              </thead>
              <tbody>{completedListingsItems}</tbody>
            </table>
          </div>
        </div>
      </>
    )
  } else {
    ;<>
      <h1>Oops!</h1>
      <p>You must be logged in as a client or a pilot to view your completed jobs</p>
    </>
  }
}

export default MyCompletedJobs
