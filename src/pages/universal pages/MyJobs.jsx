import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { BiListPlus, BiCheckCircle } from "react-icons/bi"
import { useLoaderData } from "react-router-dom"
import { Tooltip } from "../../components/Tooltip"

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
import { BiNetworkChart, BiSolidDollarCircle } from "react-icons/bi"
import { GiBombingRun } from "react-icons/gi"
import { MdDarkMode } from "react-icons/md"
import { FaPeopleGroup } from "react-icons/fa6"
import { FaWeightHanging } from "react-icons/fa6"

const MyJobs = () => {
  const navigate = useNavigate()

  const loaderData = useLoaderData()

  //grab the current userType from the redux store
  let userType = useSelector((state) => state.userType)
  //create a state value for an array of jobs
  const [jobs, setJobs] = useState(loaderData)

  //create state values for the filters and sorting
  const [filterConditions, setFilterConditions] = useState({})
  const [sortCondition, setSortCondition] = useState([])
  const [count, setCount] = useState(1)

  //create a handler funciton for completing a job
  const completeJob = (job) => {
    if (job.assignedPilot) {
      axios
        .put(`/api/listing/${job.listingId}`, {
          changes: { completed: true },
        })
        .then((res) => {
          console.log(res.data)
          if(res.data.length){
            setJobs(res.data)
          }
          //window.location.reload()
        })
    }
  }
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

  //filter the listings
  let filteredListings = filterListings(jobs)

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
  const listingsItems = filteredListings.map((listing) => {
    //change true/false/null to more readable strings
    //change "assigned pilot" to "none" if null
    if (listing.assignedPilot === null) {
      listing.assignedPilot = "None"
    }
    //change "hardware provided" to yes/no
    let hardwareProvided
    if (listing.hardwareProvided === true) {
      hardwareProvided = "Yes"
    } else {
      hardwareProvided = "No"
    }
    //change "software provided" to yes/no
    let softwareProvided
    if (listing.softwareProvided === true) {
      softwareProvided = "Yes"
    } else {
      softwareProvided = "No"
    }

    //check is the listing date has passed todays date
    const currDate = new Date()
    const listingDate = new Date(listing.flightDate)
    let flightDatePassed

    if (listingDate < currDate) {
      flightDatePassed = true
    } else flightDatePassed = false

    //check if this listing can be marked as completed
    let canBeCompleted
    if (listing.assignedPilot !== "None" && flightDatePassed === true) {
      canBeCompleted = true
    } else {
      canBeCompleted = false
    }

    //create a table row with the data from this listing iteration
    return (
      <tr key={listing.listingId} className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray">
        {userType === "client" && (
          <td>
            {canBeCompleted === true && (
              
              <Tooltip position="right" content='mark this job as "complete"'>
                <button
                  className="flex items-center justify-center h-6 w-6 rounded-full bg-ADJO_Keppel "
                  onClick={() => completeJob(listing)}>
                  <BiCheckCircle size={20} style={{ color: "#BDF3E7", alignSelf : "center" }} />
                </button>
              </Tooltip>
             
            )}
            {canBeCompleted === false && (
              <Tooltip position="right" content='cannot mark as "complete"'>
                <button className="flex justify-center items-center h-6 w-6 rounded-full bg-[#e0e0e0] ">
                  <BiCheckCircle size={20} style={{ color: "#ffffff", alignSelf: "center" }} />
                </button>
              </Tooltip>
            )}
          </td>
        )}
        <td>
          <button
            onClick={() => {
              navigate(`/singleListing/${listing.listingId}`)
            }}
            className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
            {listing.listingId}
          </button>
        </td>
        {userType === "client" && <td>Me</td>}
        {userType === "pilot" && (
          <td>
            {/* render a button with the client Id that leads to their profile */}
            <button
              onClick={() => {
                navigate(`/userProfile/client/${listing.clientId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
              {listing.clientId}
            </button>
          </td>
        )}
        {userType === "pilot" && <td>Me</td>}
        {userType !== "pilot" && (
          <>
            {/* if there is no assigned pilot, render "none", if there is an assigned pilot, render a button that leads to their profile */}
            {listing.assignedPilot === "None" && <td>{listing.assignedPilot}</td>}
            {listing.assignedPilot !== "None" && (
              <td>
                <button
                  onClick={() => {
                    navigate(`/userProfile/pilot/${listing.assignedPilot}`)
                  }}
                  className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
                  {listing.assignedPilot}
                </button>
              </td>
            )}
          </>
        )}
        <td>${listing.offer}</td>
        <td>{listing.flightZipcode}</td>
        <td>{listing.flightDate}</td>
        <td>{listing.flightRadius}</td>
        <td>
          {listing.multiday === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.multiday === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.hardwareProvided === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.hardwareProvided === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.softwareProvided === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.softwareProvided === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.internetProvided === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.internetProvided === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.powerProvided === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.powerProvided === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.highFlying === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.highFlying === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.payloadDropping === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.payloadDropping === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.hazmatFlying === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.hazmatFlying === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.heavyFlying === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.heavyFlying === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.nightFlying === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.nightFlying === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
        <td>
          {listing.crowdFlying === true && (
            <div className="flex items-center justify-center">
              <ImCheckmark size={15} style={{ color: "#08BFA1" }} />
            </div>
          )}
          {listing.crowdFlying === false && (
            <div className="flex items-center justify-center">
              <ImCross size={13} style={{ color: "#dc2626" }} />
            </div>
          )}
        </td>
      </tr>
    )
  })

  //render the page contents
  if (userType === "client" || "pilot") {
    return (
      <div className="flex flex-col items-center w-full">
        <section className="flex flex-col items-center">
          {userType === "client" && (
            <div className="flex flex-col items-center">
              {/* header and text */}
              <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
                Your Listings
              </h1>
              <p className="font-rubik text-l pb-5 w-3/4 text-center">
                This page shows all of the jobs you've created. If any of these jobs have an assigned pilot, make sure
                to mark that date on your calendar, and take note of the flight address.
              </p>
            </div>
          )}
          {userType === "pilot" && (
            <div className="flex flex-col items-center">
              {/* header and text */}
              <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
                Upcoming Jobs
              </h1>
              <p className="font-rubik text-l pb-5 w-3/4 text-center">
                This page shows all of the jobs where you're application has been accepted. (Right on!) Make sure to
                mark these dates on your calendar, and take note of the flight address.
              </p>
              <p className="font-rubik text-l pb-5 w-3/4 text-center">
                If you need to resign for any reason, just head into the listing by clicking on the Listing ID, there
                you will be able to resign. Please make sure you give adequate time and communicate with clients when
                resigning, as they need to find a substitute pilot after you resign. Clients will still be able to
                review pilots who resign from their jobs.
              </p>
            </div>
          )}
        </section>
        <div className="pb-3">
          {userType === "client" && (
            <div className="flex justify-between">
              {/* other client options */}
              <section
                onClick={() => {
                  navigate("/NewListing")
                }}
                className="flex w-[300px] items-center hover: cursor-pointer">
                <BiListPlus size={25} style={{ color: "#08BFA1" }} />
                <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                  Create a New Listing
                </section>
              </section>
              <section
                onClick={() => {
                  navigate("/myCompletedJobs")
                }}
                className="flex w-[300px] items-center hover: cursor-pointer">
                <BiCheckCircle size={25} style={{ color: "#08BFA1" }} />
                <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                  View My Completed Jobs
                </section>
              </section>
            </div>
          )}
          {userType === "pilot" && (
            <div className="flex justify-between">
              {/* other pilot options */}
              <section
                onClick={() => {
                  navigate("/listings")
                }}
                className="flex w-[250px] items-center hover: cursor-pointer">
                <BiListPlus size={25} style={{ color: "#08BFA1" }} />
                <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">Find More Jobs</section>
              </section>
              <section
                onClick={() => {
                  navigate("/myCompletedJobs")
                }}
                className="flex w-[300px] items-center hover: cursor-pointer">
                <BiCheckCircle size={25} style={{ color: "#08BFA1" }} />
                <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                  View My Completed Jobs
                </section>
              </section>
            </div>
          )}
        </div>
        <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
          <table className="table-auto border-collapse font-rubik text-sm w-full">
            <thead>
              <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                {userType === "client" && <th className="w-[30px]"></th>}
                <th className="w-[50px]">Listing</th>
                <th className="w-[50px]">Client</th>
                <th>Pilot</th>
                <th>
                  <button onClick={() => changeSort("offer")}>
                    <Tooltip position="top" content="Payment">
                      {sortCondition[0] === "offer" && sortCondition[1] === "H-L" && (
                        <TbArrowBigDownLine size={25} style={{ color: "#000000" }} />
                      )}
                      {sortCondition[0] === "offer" && sortCondition[1] === "L-H" && (
                        <TbArrowBigUpLine size={25} style={{ color: "#000000" }} />
                      )}
                      {sortCondition[0] !== "offer" && <BiSolidDollarCircle size={30} style={{ color: "#000000" }} />}
                    </Tooltip>
                  </button>
                </th>
                <th>
                  <Tooltip position="top" content="Flight-Op location">
                    Zipcode
                  </Tooltip>
                </th>
                <th>
                  <Tooltip position="top" content="Flight-Op date">
                    <button onClick={() => changeSort("flightDate")}>
                      {sortCondition[0] === "flightDate" && sortCondition[1] === "H-L" && (
                        <TbArrowBigDownLine size={25} style={{ color: "#000000" }} />
                      )}
                      {sortCondition[0] === "flightDate" && sortCondition[1] === "L-H" && (
                        <TbArrowBigUpLine size={25} style={{ color: "#000000" }} />
                      )}
                      {sortCondition[0] !== "flightDate" && <TbCalendar size={25} style={{ color: "#000000" }} />}
                    </button>
                  </Tooltip>
                </th>

                <th>
                  <Tooltip position="top" content="Range (miles)">
                    <button onClick={() => changeSort("flightRadius")}>
                      {sortCondition[0] === "flightRadius" && sortCondition[1] === "H-L" && (
                        <TbArrowBigDownLine size={25} style={{ color: "#000000" }} />
                      )}
                      {sortCondition[0] === "flightRadius" && sortCondition[1] === "L-H" && (
                        <TbArrowBigUpLine size={25} style={{ color: "#000000" }} />
                      )}
                      {sortCondition[0] !== "flightRadius" && <GiOrange size={25} style={{ color: "#000000" }} />}
                    </button>
                  </Tooltip>
                </th>

                <th className="w-[50px]">
                  <Tooltip position="top" content="Requires multiple days to complete">
                    <button onClick={() => changeFilter("multiday")}>
                      <TbCalendarStats
                        size={25}
                        style={{
                          color:
                            filterConditions.multiday === false
                              ? "#dc2626"
                              : filterConditions.multiday
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Hardware provided">
                    <button onClick={() => changeFilter("hardwareProvided")}>
                      <TbDrone
                        size={25}
                        style={{
                          color:
                            filterConditions.hardwareProvided === false
                              ? "#dc2626"
                              : filterConditions.hardwareProvided
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Software provided">
                    <button onClick={() => changeFilter("softwareProvided")}>
                      <BiNetworkChart
                        size={25}
                        style={{
                          color:
                            filterConditions.softwareProvided === false
                              ? "#dc2626"
                              : filterConditions.softwareProvided
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Onsite internet access">
                    <button onClick={() => changeFilter("internetProvided")}>
                      <TbWifi
                        size={35}
                        style={{
                          color:
                            filterConditions.internetProvided === false
                              ? "#dc2626"
                              : filterConditions.internetProvided
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Onsite power access">
                    <button onClick={() => changeFilter("powerProvided")}>
                      <ImPowerCord
                        size={25}
                        style={{
                          color:
                            filterConditions.powerProvided === false
                              ? "#dc2626"
                              : filterConditions.powerProvided
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Flying >400ft">
                    <button onClick={() => changeFilter("highFlying")}>
                      <TbCloudShare
                        size={30}
                        style={{
                          color:
                            filterConditions.highFlying === false
                              ? "#dc2626"
                              : filterConditions.highFlying
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Delivering a payload">
                    <button onClick={() => changeFilter("payloadDropping")}>
                      <GiBombingRun
                        size={25}
                        style={{
                          color:
                            filterConditions.payloadDropping === false
                              ? "#dc2626"
                              : filterConditions.payloadDropping
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Carrying hazardous materials">
                    <button onClick={() => changeFilter("hazmatFlying")}>
                      <TbRadioactiveFilled
                        size={28}
                        style={{
                          color:
                            filterConditions.hazmatFlying === false
                              ? "#dc2626"
                              : filterConditions.hazmatFlying
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Weight >55lbs">
                    <button onClick={() => changeFilter("heavyFlying")}>
                      <FaWeightHanging
                        size={22}
                        style={{
                          color:
                            filterConditions.heavyFlying === false
                              ? "#dc2626"
                              : filterConditions.heavyFlying
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Flying in the dark">
                    <button onClick={() => changeFilter("nightFlying")}>
                      <MdDarkMode
                        size={25}
                        style={{
                          color:
                            filterConditions.nightFlying == false
                              ? "#dc2626"
                              : filterConditions.nightFlying
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
                <th className="w-[50px]">
                  <Tooltip position="top" content="Flying over people">
                    <button onClick={() => changeFilter("crowdFlying")}>
                      <FaPeopleGroup
                        size={25}
                        style={{
                          color:
                            filterConditions.crowdFlying === false
                              ? "#dc2626"
                              : filterConditions.crowdFlying
                              ? "#08BFA1"
                              : "#000000",
                        }}
                      />
                    </button>
                  </Tooltip>
                </th>
              </tr>
            </thead>
            <tbody>{listingsItems}</tbody>
          </table>
        </div>
      </div>
    )
  } else {
    return (
      <>
        {/* non-auth catch */}
        <h1>Oops!</h1>
        <p>You must be logged in to view your jobs</p>
      </>
    )
  }
}

export default MyJobs
