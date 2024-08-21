import { NavLink, Link, Navigate, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

//icon imports
import { ImCross, ImCheckmark, ImPowerCord } from "react-icons/im";
import { GiOrange } from "react-icons/gi";
import { TbCalendarStats, TbCalendar, TbDrone, TbWifi, TbCloudShare, TbRadioactiveFilled, TbWeight  } from "react-icons/tb";
import { BiNetworkChart } from "react-icons/bi";
import { GiBombingRun } from "react-icons/gi";
import { MdDarkMode } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";

function Listings() {
  const navigate = useNavigate()
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  //create a state value for an array of listings
  let [listings, setListings] = useState([])

  //create state values for the filters
  const [filterConditions, setFilterConditions] = useState({})

  //create a handler function for changing filters
  const changeFilter = (key) => {
    if(filterConditions[key] === false)
    {
      const copy = filterConditions
      delete copy[key]
      setFilterConditions({...copy})

    }else if(filterConditions[key] === true){
      
      setFilterConditions({...filterConditions, [key]:false})

    }else if(!filterConditions[key]){setFilterConditions({...filterConditions, [key]:true})}
  }
  console.log("filter changed:", filterConditions)

  //create handler function for filtering the listings (Magic box)
  const filterListings = (data) => {
    const filteredData = data.filter(item => Object.keys(filterConditions).every(key => item[key] === filterConditions[key]))
    return filteredData
  }

  //grab all the listings in the database
  useEffect(() => {
    axios.get("/api/listings").then((response) => {
      setListings(response.data)
    })
  }, [])

  let filteredListings = filterListings(listings)
  console.log(filteredListings)

  let listingsItems
  if (userType === "client" || userType === "pilot") {
    //create an array of listings mapped to the axios response
    listingsItems = filteredListings.map((listing) => {
      //change assigned pilot
      let assignedPilot
      if (listing.assignedPilot === null) {
        assignedPilot = "Unclaimed"
      } else {
        assignedPilot = listing.assignedPilot
      }

      //create a table row with each variable in the correct spot
      if (!listing.assignedPilot) {
        return (
          <tr
            key={listing.listingId}
            className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
          >
            <td>
              <button
                onClick={() => {
                  navigate(`/singleListing/${listing.listingId}`)
                }}
                className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
              >
                {" "}
                {listing.listingId}
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  navigate(`/userProfile/client/${listing.clientId}`)
                }}
                className="border-2 border-ADJO_Keppel opacity-70 rounded-full w-20 text-ADJO_Keppel font-medium"
              >
                {" "}
                {listing.clientId}
              </button>
            </td>
            
            <td>${listing.offer}</td>
            <td>{listing.flightZipcode}</td>
            <td>{listing.flightDate}</td>
            <td>{listing.flightRadius}</td>
            <td>
            {listing.multiday === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.multiday === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.hardwareProvided === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.hardwareProvided === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.softwareProvided === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.softwareProvided === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.internetProvided === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.internetProvided === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.powerProvided === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.powerProvided === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.highFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.highFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.payloadDropping === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.payloadDropping === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.hazmatFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.hazmatFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.heavyFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.heavyFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.nightFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.nightFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.crowdFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.crowdFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
          </tr>
        )
      }
    })
  } else {
    //create an array of listings mapped to the axios response
    listingsItems = filteredListings.map((listing) => {
      //change true/false/null to more readable strings
      //change "assigned pilot"
      let assignedPilot
      if (listing.assignedPilot === null) {
        assignedPilot = "Unclaimed"
      } else {
        assignedPilot = "Claimed"
      }

      //create a table row with each variable in the correct spot
      if (!listing.assignedPilot) {
        return (
          <tr
            key={listing.listingId}
            className="pt-2 pb-2 border-b-2 border-opacity-10 border-b-AJGO_DarkSlateGray"
          >
            <td>{listing.listingId}</td>
            <td>{listing.clientId}</td>
            <td>${listing.offer}</td>
            <td>{listing.flightZipcode}</td>
            <td>{listing.flightDate}</td>
            <td>{listing.flightRadius}</td>
            <td>
            {listing.multiday === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.multiday === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.hardwareProvided === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.hardwareProvided === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.softwareProvided === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.softwareProvided === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.internetProvided === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.internetProvided === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.powerProvided === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.powerProvided === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.highFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.highFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.payloadDropping === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.payloadDropping === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.hazmatFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.hazmatFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.heavyFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.heavyFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.nightFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.nightFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
            <td>
            {listing.crowdFlying === true && <div className ="flex items-center justify-center"><ImCheckmark size={15} style={{ color: "#08BFA1" }}/></div>}
            {listing.crowdFlying === false &&<div className ="flex items-center justify-center"><ImCross size={13} style={{ color: "#dc2626" }} /></div>}
            </td>
          </tr>
        )
      }
    })
  }

  //render all the elements we created on the page
  return (
    <>
      <div className="flex-col items-center">
        <section className="flex flex-col justify-center items-center">
          <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
            Welcome the Adjugo Listings
          </h1>
          <p className="font-rubik text-l pb-5 w-3/4 text-center">
            This page shows all the listings on the entire Adjungo site! If you
            want to see more details on a specific listing, then you can log in
            and explore more in depth! You can easily sort and filter by clicking on 
            column headers.
          </p>
        </section>

        {/* <input type="checkbox" id="showCompleted" name="showCompleted" value="showCompleted"/>
        <label for="showCompleted">Show Completed Jobs:</label> */}
        <section className="flex justify-center pb-10">
          <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
            <table className="table-auto border-collapse font-rubik pb-20 text-sm w-full">
              <thead>
                <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                  <th className="w-[100px]">Listing</th>
                  <th className="w-[100px]">Client</th>
                  <th className="w-[80px]">Offer</th>
                  <th className="w-[100px]">Zipcode</th>
                  <th className="w-[100px]"><TbCalendar /></th>
                  <th><GiOrange /></th>
                  <th><button onClick={()=>changeFilter("multiday")}><TbCalendarStats /></button></th>
                  <th><button onClick={()=>changeFilter("hardwareProvided")}><TbDrone /></button></th>
                  <th><button onClick={()=>changeFilter("softwareProvided")}><BiNetworkChart /></button></th>
                  <th><button onClick={()=>changeFilter("internetProvided")}><TbWifi /></button></th>
                  <th><button onClick={()=>changeFilter("powerProvided")}><ImPowerCord /></button></th>
                  <th><button onClick={()=>changeFilter("highFlying")}><TbCloudShare /></button></th>
                  <th><button onClick={()=>changeFilter("payloadDropping")}><GiBombingRun /></button></th>
                  <th><button onClick={()=>changeFilter("hazmatFlying")}><TbRadioactiveFilled /></button></th>
                  <th><button onClick={()=>changeFilter("heavyFlying")}><TbWeight /></button></th>
                  <th><button onClick={()=>changeFilter("nightFlying")}><MdDarkMode /></button></th>
                  <th><button onClick={()=>changeFilter("crowdFlying")}><FaPeopleGroup /></button></th>
                </tr>
              </thead>
              <tbody>{listingsItems}</tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  )
}

export default Listings
