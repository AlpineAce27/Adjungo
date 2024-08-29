import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Tooltip } from "../../components/Tooltip"
;("use client")

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
import { BiNetworkChart, BiSolidDollarCircle, BiPlusCircle, BiMinusCircle, BiTargetLock } from "react-icons/bi"
import { GiBombingRun } from "react-icons/gi"
import { MdDarkMode } from "react-icons/md"
import { FaPeopleGroup } from "react-icons/fa6"
import { FaWeightHanging } from "react-icons/fa6"

//Google APIs
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps"
// import { API_KEY, mapId, getCoordinatesFromAddress } from "../../../util/location"
import inRange from "../../functions/inRange"
import { API_KEY, mapId, getCoordinatesFromAddress } from "../../../util/location"

//set up some google maps utilities

function Listings() {
  const navigate = useNavigate()
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  //create a state value for an array of listings
  let [listings, setListings] = useState([])
  let [allListingPins, setAllListingPins] = useState([])
  let [maxListingQty, setMaxListingQty] = useState(30)

  //40°45'33"N 111°53'14"W
  //create a state value for the entry fields on location, client, etc
  let [mapLock, setMapLock] = useState(true)
  let [currentLat, setCurrentLat] = useState(40.759)
  let [currentLng, setCurrentLng] = useState(-111.886)
  let [currentAddress, setCurrentAddress] = useState("451 State St, Salt Lake City, Utah")
  let [currentLocation, setCurrentLocation] = useState({ lat: 40.759, lng: -111.886 })
  let [range, setRange] = useState(20)

  //create state values for the filters and sorting
  const [filterConditions, setFilterConditions] = useState({})
  const [sortCondition, setSortCondition] = useState([])

  //create a handler function for geocoding the current address the user typed in
  const updateLocation = async (address) => {
    setCurrentAddress(address)
    setCurrentLocation(await getCoordinatesFromAddress(address))
    //console.log(currentLocation)
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
    const iconFilteredData = data.filter((listing) =>
      Object.keys(filterConditions).every((key) => listing[key] === filterConditions[key])
    )
    const rangefilteredData = iconFilteredData.filter(
      (listing) =>
        inRange(
          currentLocation.lat,
          currentLocation.lng,
          JSON.parse(listing.flightCoordinates).lat,
          JSON.parse(listing.flightCoordinates).lng,
          range
        ) === true
    )
    return rangefilteredData
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

  //create map-pin for each of the filtered listings
  let allPins = filteredListings.map((listing) => {
    const coordinates = JSON.parse(listing.flightCoordinates)
    return (
      <AdvancedMarker
        key={listing.listingId}
        position={{ lat: coordinates.lat, lng: coordinates.lng }}
        onClick={() => {
          navigate(`/singleListing/${listing.listingId}`)
        }}>
        <Pin background={"#08BFA1"} borderColor={"#283B36"} glyphColor={"#283B36"} />
      </AdvancedMarker>
    )
  })

  //create table row for each of the filtered listings
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
    <APIProvider apiKey={API_KEY}>
      <div className="flex flex-col items-center w-full justify-center gap-6">
        <section id="header" className="flex flex-col justify-center items-center font-rubik font-medium">
          <h1 className="pt-10 pb-6 text-5xl text-AJGO_DarkSlateGray justify-center">Welcome the Adjungo Listings</h1>
          <p className="text-left">
            This page shows all the listings on the entire Adjungo site! If you are logged in, then you can click on
            listing ID to view more details.
          </p>
        </section>
        <section
          id="location-fields"
          className="flex justify-between w-11/12 border-4 border-ADJO_Celeste p-2 rounded-lg gap-3 font-rubik text-l text-left">
          <div id="address" className="flex flex-col gap-3 w-2/3">
            <label htmlFor="address">My Location:</label>
            <input
              className="flex items-center w-full bg-[#efefef] border-2 border-ADJO_Celeste rounded-lg pl-3"
              type="text"
              name="address"
              id="address"
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
            />
          </div>
          <div id="range" className="flex flex-col gap-3 w-40">
            <label htmlFor="range">Range (miles):</label>
            <input
              className="flex items-center justify-center text-center w-24 rounded-lg bg-[#efefef]"
              type="number"
              name="range"
              id="range"
              value={range}
              onChange={(e) => setRange(e.target.value)}
            />
          </div>
          <div id="button" className="flex w-1/6">
            {mapLock === true && (
              <button
                className="border-2 w-full border-x-ADJO_Keppel px-1 py-1 text-l uppercase font-rubik  rounded-lg text-ADJO_Keppel"
                onClick={() => {
                  setMapLock(false)
                  //console.log("map freed")
                }}>
                Unlock Map
              </button>
            )}
            {mapLock === false && (
              <button
                className="border-4 w-full border-x-ADJO_Keppel px-1 py-1 text-l uppercase font-rubik font-medium rounded-lg text-ADJO_Keppel"
                onClick={() => {
                  setMapLock(true)
                  //console.log("map locked")
                  updateLocation(currentAddress)
                }}>
                Center on My Location
              </button>
            )}
          </div>
        </section>
        <div id="map" className="flex justify-center items-center w-11/12">
          <section className="flex flex-col items-center justify-center w-full">
            <div className="bg-ADJO_Keppel w-full h-[400px] p-3 rounded-lg">
              {mapLock === false && (
                <Map className="" defaultZoom={10} defaultCenter={currentLocation} mapId={mapId}>
                  <AdvancedMarker position={currentLocation}>
                    <Pin background={"#ffffff"} borderColor={"#08BFA1"} glyphColor={"#08BFA1"} />
                  </AdvancedMarker>
                  {allPins}
                </Map>
              )}
              {mapLock === true && (
                <Map className="" defaultZoom={10} center={currentLocation} mapId={mapId}>
                  <AdvancedMarker position={currentLocation}>
                    <Pin background={"#ffffff"} borderColor={"#08BFA1"} glyphColor={"#08BFA1"} />
                  </AdvancedMarker>
                  {allPins}
                </Map>
              )}
            </div>
          </section>
        </div>
        <section id="listingsTable" className="flex justify-center w-full">
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
            <table className="border-collapse font-rubik text-sm w-full">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[100px]">Listing</th>
                  <th className="w-[100px]">Client</th>
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

                  <th className="w-[60px]">
                    <Tooltip position="top" content="Flight Range (miles)">
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

        <div id="showMoreLess" className="flex w-36 justify-center pb-10">
          <div className="flex w-full justify-center items-center border-4 border-ADJO_Celeste rounded-full">
            {maxListingQty > 5 && (
              <>
                <section
                  onClick={() => {
                    setMaxListingQty(maxListingQty - 5)
                  }}
                  className="flex items-center justify-center hover: cursor-pointer">
                  <BiMinusCircle size={40} style={{ color: "#08BFA1" }} />
                  <section className="font-rubik font-medium text-[20px] text-ADJO_Keppel"></section>
                </section>
                <section className="flex justify-center w-24">
                <p className=" font-rubik font-medium justify-center text-center text-[20px] text-[#000000]">
                  {maxListingQty}
                </p>

                </section>
              </>
            )}
            <section
              onClick={() => {
                setMaxListingQty(maxListingQty + 5)
              }}
              className="flex items-center justify-start hover: cursor-pointer">
              <BiPlusCircle size={40} style={{ color: "#08BFA1" }} />
              <section className="font-rubik font-medium text-[20px] text-ADJO_Keppel"></section>
            </section>
          </div>
        </div>
      </div>
    </APIProvider>
  )
}

export default Listings
