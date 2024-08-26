import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
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
  TbStarsFilled,
} from "react-icons/tb"
import { BiNetworkChart, BiSolidDollarCircle, BiPlusCircle, BiMinusCircle } from "react-icons/bi"
import { GiBombingRun } from "react-icons/gi"
import { MdDarkMode } from "react-icons/md"
import { FaPeopleGroup } from "react-icons/fa6"
import { FaWeightHanging } from "react-icons/fa6"

function Listings() {
  const navigate = useNavigate()
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  //create a state value for an array of listings
  let [listings, setListings] = useState([])
  let [maxListingQty, setMaxListingQty] = useState(10)

  //create a state value for the entry fields on location, client, etc
  let [currentLocation, setCurrentLocation] = useState(`40°45'38"N 111°53'27"W`)

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

  //grab all the listings in the database
  useEffect(() => {
    axios.get("/api/openListings").then((response) => {
      //console.log(response.data)
      setListings(response.data)
    })
  }, [])

  //filter the listings
  let filteredListings = filterListings(listings)

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

  //make sure to only show the max number of listings
  filteredListings = filteredListings.slice(0, maxListingQty)
  //console.log(filteredListings)
  //create an array of listings mapped to the filtered listings array
  let listingsItems = filteredListings.map((listing) => {
    //change assigned pilot
    let assignedPilot
    if (listing.assignedPilot === null) {
      assignedPilot = "Unclaimed"
    } else {
      assignedPilot = listing.assignedPilot
    }

    //create a table row with each variable in the correct spot
    return (
      <tr key={listing.listingId} className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray">
        <td>
          {(userType === "client" || userType === "pilot") && (
            <button
              onClick={() => {
                navigate(`/singleListing/${listing.listingId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
              {" "}
              {listing.listingId}
            </button>
          )}
          {userType !== "client" && userType !== "pilot" && <>{listing.listingId}</>}
        </td>
        <td>
          {(userType === "client" || userType === "pilot") && (
            <button
              onClick={() => {
                navigate(`/userProfile/client/${listing.clientId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium">
              {" "}
              {listing.clientId}
            </button>
          )}
          {userType !== "client" && userType !== "pilot" && <>{listing.clientId}</>}
        </td>
        <td className={`font-bold text-[${listing.reviewCol}]`}>{listing.reviews}</td>
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

  //render all the elements we created on the page
  return (
    <>
      <div className="flex-col items-center">
        <section className="flex flex-col justify-center items-center">
          <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
            Welcome the Adjungo Listings
          </h1>

          <p className="font-rubik text-l pb-5 w-3/4 text-center">
            This page shows all the listings on the entire Adjungo site! If you are logged in, then you can click on
            listing ID to view more details. Hover over a column header icon to understand more about that listing
            property. You can easily sort and filter by clicking on column header icons.
          </p>
        </section>
        <section>
          <form>
            <input
            type="text" name="currLocation" id="currLocation"
            value={currentLocation}
            onChange={(e) => setCurrentLocation(e.target.value)} 
            />
            
          </form>
        </section>
        {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
        <label for="showCompleted">Show Completed Jobs:</label> */}
        <section className="flex justify-center">
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
            <table className="border-collapse font-rubik pb-20 text-sm w-full">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[50px]">Listing</th>
                  <th className="w-[50px]">Client</th>
                  <th>
                    <button onClick={() => changeSort("reviews")}>
                      <Tooltip position="top" content="Client Rating">
                        {sortCondition[0] === "reviews" && sortCondition[1] === "H-L" && (
                          <TbArrowBigDownLine size={25} style={{ color: "#000000" }} />
                        )}
                        {sortCondition[0] === "reviews" && sortCondition[1] === "L-H" && (
                          <TbArrowBigUpLine size={25} style={{ color: "#000000" }} />
                        )}
                        {sortCondition[0] !== "reviews" && <TbStarsFilled size={25} style={{ color: "#000000" }} />}
                      </Tooltip>
                    </button>
                  </th>
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
        </section>
        <div className="flex justify-center pt-3 pb-10">
          <div className="flex w-1/2 justify-center">
          {maxListingQty > 10 && (
            <section
              onClick={() => {
                setMaxListingQty(maxListingQty - 10)
              }}
              className="flex w-[200px] items-center justify-center hover: cursor-pointer">
              <BiMinusCircle size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">Show Less</section>
            </section>
          )}
            <section
              onClick={() => {
                setMaxListingQty(maxListingQty + 10)
              }}
              className="flex w-[200px] items-center justify-center hover: cursor-pointer">
              <BiPlusCircle size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">Show More</section>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Listings
