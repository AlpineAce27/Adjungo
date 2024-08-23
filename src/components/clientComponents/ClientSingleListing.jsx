import axios from "axios"
import { useLoaderData, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"

function ClientSingleListing() {
  //take the data from the loader and assign it to the listing variable (this should be an entire listing object)
  //this loader data comes from the loader section of this route in the App.jsx
  const [listing, setListing] = useState(useLoaderData())
  //console.log("clientsinglelisting rendered")
  //create a value to determine if we are viewing this listing, or editing this listing
  const [editing, setEditing] = useState(false)

  //create a function to change the value of editing
  function handleEditButton(e) {
    //e.preventDefault()
    setEditing(!editing)
  }

  //figure out the user ID of this session
  let userId = useSelector((state) => state.userId)
  //console.log(userId)

  //values in case the user edits this listing
  const [offer, setOffer] = useState(listing.offer)
  const [flightDate, setFlightDate] = useState(listing.flightDate)
  const [flightTime, setFlightTime] = useState(listing.flightTime)
  const [multiday, setMultiday] = useState(listing.multiday)
  const [flightAddress, setFlightAddress] = useState(listing.flightAddress)
  const [flightZipcode, setFlightZipcode] = useState(listing.flightZipcode)
  const [flightRadius, setFlightRadius] = useState(listing.flightRadius)
  const [hardwareProvided, setHardware] = useState(listing.hardwareProvided)
  const [softwareProvided, setSoftware] = useState(listing.softwareProvided)
  const [internetProvided, setInternetProvided] = useState(
    listing.internetProvided
  )
  const [powerProvided, setPowerProvided] = useState(listing.powerProvided)
  const [highFlying, setHighFlying] = useState(listing.highFlying)
  const [blosFlying, setBlosFlying] = useState(listing.blosFlying)
  const [payloadDropping, setPayloadDropping] = useState(
    listing.payloadDropping
  )
  const [hazmatFlying, setHazmatFlying] = useState(listing.hazmatFlying)
  const [heavyFlying, setHeavyFlying] = useState(listing.heavyFlying)
  const [nightFlying, setNightflying] = useState(listing.nightFlying)
  const [crowdFlying, setCrowdflying] = useState(listing.crowdFlying)
  const [description, setDescription] = useState(listing.description)

  //setup the navigate functionality
  const navigate = useNavigate()

  if (editing === false) {
    //Render this if they are not in edit mode
    return (
      <div className="flex flex-col items-center justify-center text-center w-5/6">
        <div className="flex flex-col items-center pt-10 pb-10">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">
            Listing #{listing.listingId}
          </h1>
          <p className="font-rubik text-xl">
            This show's all the details for listing {listing.listingId}, here
            you can edit or delete the listing, as well as accept or deny
            applications
          </p>
        </div>

        <div className="flex items-center justify-center w-5/6">
          <section className="flex flex-col gap-3 items-start pt-10 pb-10 justify-between font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray w-2/3 text-lg">
            <p className="flex items-center justify-between">
              Owner Id:{" "}
              <button
                className="flex items-center text-center justify-center border-2 border-ADJO_Keppel opacity-70 rounded-full h-[20px] w-[50px] text-ADJO_Keppel text-sm font-medium"
                onClick={() => {
                  navigate(`/userProfile/client/${listing.clientId}`)
                }}
              >
                {" "}
                {listing.clientId}
              </button>
            </p>
            {listing.assignedPilot && (
              <p className="flex items-center justify-between">
                Assigned Pilot:
                <button
                  className="flex items-center text-center justify-center border-2 border-ADJO_Keppel opacity-70 rounded-full h-[20px] w-[50px] text-ADJO_Keppel text-sm font-medium"
                  onClick={() => {
                    navigate(`/userProfile/pilot/${listing.assignedPilot}`)
                  }}
                >
                  {" "}
                  {listing.clientId}
                </button>
              </p>
            )}
            {!listing.assignedPilot && (
              <p className="flex items-center justify-between">
                Assigned Pilot: None
              </p>
            )}
            <p>Flight Date: {listing.flightDate}</p>
            <p>Flight Time: {listing.flightTime}</p>
            <div className="flex flex-col items-start text-left text-sm">
              <p className="text-lg">Flight Address:</p>
              <p>{listing.flightAddress}</p>
            </div>
            <div className="flex flex-col items-start text-left text-sm">
              <p className="text-lg">Flight Area Zipcode:</p>
              <p>{listing.flightZipcode}</p>
            </div>
            <div className="flex flex-col items-start text-left text-sm">
              <p className="text-lg">Description:</p>
              <p>{listing.description}</p>
            </div>
          </section>

          <section className="flex w-1/3 justify-center font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">
            <div className="flex flex-col items-start pr-2 w-5/6">
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Offer</p>
                <p>${listing.offer}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Flight Radius</p>
                <p>{listing.flightRadius} miles</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Multi-Day</p>
                <p>{listing.multiday.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Hardware Provided</p>
                <p>{listing.hardwareProvided.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Software Provided</p>
                <p>{listing.softwareProvided.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Internet Access</p>
                <p>{listing.internetProvided.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Power Access</p>
                <p>{listing.powerProvided.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Flying over 400ft</p>
                <p>{listing.highFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Beyond-line-of-sight</p>
                <p>{listing.blosFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Payload Drop</p>
                <p>{listing.payloadDropping.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Carrying Hazmat</p>
                <p>{listing.hazmatFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Liftoff Weight Over 55lbs</p>
                <p>{listing.heavyFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between bg-ADJO_Celeste w-full">
                <p>Operating at Night</p>
                <p>{listing.nightFlying.toString()}</p>
              </section>
              <section className="pl-3 pr-3 flex justify-between w-full">
                <p>Operating over People</p>
                <p>{listing.crowdFlying.toString()}</p>
              </section>
            </div>
          </section>
        </div>

        {listing.clientId === userId && (
          <div className=" w-1/2 pt-10 pb-10 flex justify-around">
            <button
              className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
              onClick={handleEditButton}
            >
              Edit Listing
            </button>
            <button
              className="border-2 w-[200px] border-[#dd7d7d] px-3 py-1 text-xl uppercase font-rubik rounded-lg text-[#dd7d7d]"
              onClick={() => {
                //This will delete the listing we are currently viewing from the database, and then redirect the user back to their listings
                axios.delete(`/api/listing/${listing.listingId}`).then(() => {
                  navigate("/mylistings")
                })
              }}
            >
              Delete Listing
            </button>
          </div>
        )}
      </div>
    )
  } else if (editing === true) {
    //Render this if they clicked the edit button
    const handleListingEdit = (e) => {
      e.preventDefault()
      axios
        .put(`/api/listing/${listing.listingId}`, {
          changes: {
            offer: offer,
            flightDate: flightDate,
            flightTime: flightTime,
            multiday: multiday,
            hardwareProvided: hardwareProvided,
            softwareProvided: softwareProvided,
            internetProvided: internetProvided,
            powerProvided: powerProvided,
            description: description,
            highFlying: highFlying,
            blosFlying: blosFlying,
            payloadDropping: payloadDropping,
            hazmatFlying: hazmatFlying,
            heavyFlying: heavyFlying,
            nightFlying: nightFlying,
            crowdFlying: crowdFlying,
            flightAddress: flightAddress,
            flightZipcode: flightZipcode,
            flightRadius: flightRadius,
          },
        })
        .then((res) => {
          console.log("The listing changes have been saved", res.data)
          setListing(res.data)
          setEditing(!editing)
        })
    }
    return (
      <div className="flex flex-col items-center justify-center text-center w-5/6">
        <div className="flex flex-col items-center pt-10 pb-10">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">
            Edit this Listing
          </h1>
          <p className="font-rubik text-xl">
            This show's all the details for listing {listing.listingId}, here
            you can edit or delete the listing, as well as accept or deny
            applications
          </p>
          <p className="font-rubik text-xl">
            Here you can change any property on this listing, including marking
            it as complete
          </p>
        </div>

        <form className="flex items-center justify-center w-full">
          <section className="flex flex-col w-1/2 gap-3 items-start pt-10 pb-10 justify-between font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray text-lg">
            <p>Listing Id: {listing.listingId}</p>

            <p className="flex items-center justify-between">
              Owner Id:{" "}
              <button
                className="flex items-center text-center justify-center border-2 border-ADJO_Keppel opacity-70 rounded-full h-[20px] w-[50px] text-ADJO_Keppel text-sm font-medium"
                onClick={() => {
                  navigate(`/userProfile/client/${listing.clientId}`)
                }}
              >
                {" "}
                {listing.clientId}
              </button>
            </p>

            <div className="pb-1 pt-1">
              <label htmlFor="flightDate">Flight Date: </label>
              <input
                className="pl-2 pt-1 pb-1 w-44 text-sm rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                type="date"
                name="flightDate"
                value={flightDate}
                required
                onChange={(e) => setFlightDate(e.target.value)}
              ></input>
            </div>

            <div className="pb-1 pt-1">
              <label htmlFor="flightTime">Flight Time: </label>
              <input
                className="pl-2 pt-1 pb-1 text-sm w-44 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                type="time"
                name="flightTime"
                value={flightTime}
                onChange={(e) => setFlightTime(e.target.value)}
              ></input>
            </div>

            <div className="pb-1 pt-1 text-left ">
              <label htmlFor="flightAddress">Flight Address: </label>
              <input
                className="pl-2 pt-1 pb-1 w-full text-sm rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                type="text"
                name="flightAddress"
                value={flightAddress}
                onChange={(e) => setFlightAddress(e.target.value)}
                required
              ></input>
            </div>

            <div className="flex pb-1 pt-1 text-left ">
              <label htmlFor="flightZipcode">Flight Area Zipcode: </label>
              <input
                className="pl-2 pt-1 pb-1 w-24 text-sm rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                type="text"
                name="flightZipcode"
                value={flightZipcode}
                onChange={(e) => setFlightZipcode(e.target.value)}
                required
              ></input>
            </div>

            <div className="flex flex-col items-start">
              <label htmlFor="description">Details about this job: </label>
              <textarea
                className="p-3 text-sm rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                name="description"
                rows="10"
                cols="50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
          </section>

          <section className="flex w-1/2 justify-center font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">
            <div className="flex flex-col items-start pr-2 w-5/6">
              <section className="pl-3 pt-2 pb-2 pr-3 flex justify-between items-center bg-ADJO_Celeste w-full">
                <label htmlFor="offer">Offer: $</label>
                <input
                  className="pl-2 w-24 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="number"
                  name="offer"
                  value={offer}
                  step={5}
                  onChange={(e) => setOffer(Number(e.target.value).toFixed(2))}
                  required
                ></input>
              </section>
              <section className="pl-3 pt-2 pb-2 pr-3 flex justify-between w-full">
                <label htmlFor="flightRadius">Flight Radius: </label>
                <div className="flex items-center">
                  <input
                    className="pl-2 w-14 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                    type="number"
                    name="flightRadius"
                    step={0.1}
                    min={0.1}
                    max={5}
                    value={flightRadius}
                    onChange={(e) =>
                      setFlightRadius(Number(e.target.value).toFixed(1))
                    }
                    required
                  ></input>
                  <label htmlFor="flightRadius"> miles </label>
                </div>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between bg-ADJO_Celeste w-full">
                <label htmlFor="multiday">
                  This operation will take multiple days to complete
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="multiday"
                  checked={multiday}
                  onChange={(e) => setMultiday(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between w-full">
                <label htmlFor="hardwareProvided">
                  I can provide some or all of the hardware needed
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="hardwareProvided"
                  checked={hardwareProvided}
                  onChange={(e) => setHardware(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between bg-ADJO_Celeste w-full">
                <label htmlFor="softwareProvided">
                  I can provide some or all of the software needed
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="softwareProvided"
                  checked={softwareProvided}
                  onChange={(e) => setSoftware(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between w-full">
                <label htmlFor="internetProvided">
                  There will be internet access at this flight location
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="internetProvided"
                  checked={internetProvided}
                  onChange={(e) => setInternetProvided(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between bg-ADJO_Celeste w-full">
                <label htmlFor="powerProvided">
                  There will be access to power at this flight location
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="powerProvided"
                  checked={powerProvided}
                  onChange={(e) => setPowerProvided(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between w-full">
                <label htmlFor="highFlying">
                  This job requires flying over 400ft
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="highFlying"
                  checked={highFlying}
                  onChange={(e) => setHighFlying(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between bg-ADJO_Celeste w-full">
                <label htmlFor="blosFlying">
                  This job requires flying beyond line-of-sight
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="blosFlying"
                  checked={blosFlying}
                  onChange={(e) => setBlosFlying(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between w-full">
                <label htmlFor="payloadDropping">
                  This job requires dropping a payload
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="payloadDropping"
                  checked={payloadDropping}
                  onChange={(e) => setPayloadDropping(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between bg-ADJO_Celeste w-full">
                <label htmlFor="hazmat">
                  This job requires carrying of hazardous materials
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="hazmat"
                  checked={hazmatFlying}
                  onChange={(e) => setHazmatFlying(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between w-full">
                <label htmlFor="heavyFlying">
                  The drone and payload will weigh more than 55lbs on take-off
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="heavyFlying"
                  checked={heavyFlying}
                  onChange={(e) => setHeavyFlying(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between bg-ADJO_Celeste w-full">
                <label htmlFor="nightFlying">
                  This job requires flying at dusk, dawn, or at night
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="nightFlying"
                  checked={nightFlying}
                  onChange={(e) => setNightflying(e.target.checked)}
                ></input>
              </section>
              <section className="pl-3 pr-3 pt-2 pb-2 flex justify-between w-full">
                <label htmlFor="crowdFlying">
                  This job requires flying over people
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                  name="crowdFlying"
                  checked={crowdFlying}
                  onChange={(e) => setCrowdflying(e.target.checked)}
                ></input>
              </section>
            </div>
          </section>
        </form>

       
          <div className="pt-10 pb-10 flex w-3/5 justify-around">
            <button
              className="border-2 w-[200px] border-x-ADJO_Keppel px-8 py-1 text-l uppercase font-rubik rounded-lg text-ADJO_Keppel"
              onClick={handleListingEdit}
            >
              Save Changes
            </button>
            <button
              className="border-2 w-[200px] border-[#dd7d7d] px-8 py-1 text-l uppercase font-rubik rounded-lg text-[#dd7d7d]"
              onClick={handleEditButton}
            >
              Cancel
            </button>
          </div>
        
      </div>
    )
  }
}

export default ClientSingleListing
