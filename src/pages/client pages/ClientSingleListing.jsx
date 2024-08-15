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
  const [multiday, setMultiday] = useState(listing.multiday)
  const [flightAddress, setFlightAddress] = useState(listing.flightAddress)
  const [flightRadius, setFlightRadius] = useState(listing.flightRadius)
  const [hardwareProvided, setHardware] = useState(listing.hardwareProvided)
  const [softwareProvided, setSoftware] = useState(listing.softwareProvided)
  const [nightFlying, setNightflying] = useState(listing.nightFlying)
  const [crowdFlying, setCrowdflying] = useState(listing.crowdFlying)
  const [description, setDescription] = useState(listing.description)
  const [completed, setCompleted] = useState(listing.completed)

  //setup the navigate functionality
  const navigate = useNavigate()

  if (editing === false) {
    //Render this if they are not in edit mode
    return (
      <div className="flex flex-col items-center">

        <div className="flex flex-col items-center pt-10 pb-10">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Listing #{listing.listingId}</h1>
          <p className="font-rubik text-xl">
            This show's all the details for listing {listing.listingId}, here you can edit or delete the listing, as well as accept or deny applications
          </p>
        </div>

        <div className="flex pt-10 pb-10 justify-between font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray">

          <div className="pr-10 pl-10">
            <h3>Listing Id: {listing.listingId}</h3>
            <h3>Owner Id: <button
              onClick={() => {
                navigate(`/userProfile/client/${listing.clientId}`)
              }}
              className="border-2 border-ADJO_Keppel opacity-70 rounded-full h-8 w-20 text-ADJO_Keppel text-lg font-medium"
            >
              {" "}
              {listing.clientId}
            </button></h3>
          </div>

          <div>
            <p>Flight Date: {listing.flightDate}</p>
            <p>Flight Address: {listing.flightAddress}</p>
          </div>

        </div>

        <div className="flex pt-10 pb-10 font-rubik font-medium w-3/5 justify-center">
          <p className="text-center">Description: {listing.description}</p>
        </div>

        <div className="flex justify-center bg-ADJO_Celeste bg-opacity-30 rounded-xl w-11/12 pr-10 pl-10 pt-5 pb-5">
          <table className="table-auto border-collapse font-rubik pb-20">
            <thead>
              <tr className="border-b-4 border-opacity-30 border-b-AJGO_DarkSlateGray">
                <th>Offering</th>
                <th>Multi-Day Operation</th>
                <th>Providing Hardware</th>
                <th>Providing Software</th>
                <th>Operating at Night</th>
                <th>Operating over People</th>
                <th>Flight Radius</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{listing.offer}</td>
                <td>{listing.multiday.toString()}</td>
                <td>{listing.hardwareProvided.toString()}</td>
                <td>{listing.softwareProvided.toString()}</td>
                <td>{listing.nightFlying.toString()}</td>
                <td>{listing.crowdFlying.toString()}</td>
                <td>{listing.flightRadius}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {listing.clientId === userId && (
          <div className=" w-1/2 pt-10 pb-10 flex justify-around">
            <button
              className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
              onClick={handleEditButton}>Edit Listing</button>
            <button
              className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
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
            multiday: multiday,
            hardwareProvided: hardwareProvided,
            softwareProvided: softwareProvided,
            description: description,
            nightFlying: nightFlying,
            crowdFlying: crowdFlying,
            flightAddress: flightAddress,
            flightRadius: flightRadius,
            completed: completed,
          },
        })
        .then((res) => {
          console.log("The listing changes have been saved", res.data)
          setListing(res.data)
          setEditing(!editing)
        })
    }
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center pt-10 pb-10">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Edit this Listing</h1>
          <p className="font-rubik text-xl">
            Here you can change any property on this listing, including marking it as complete
          </p>
        </div>

        <form className="font-rubik text-xl bg-ADJO_Celeste p-5 rounded-lg w-3/5">

          <div >
            <div className="flex justify-center font-rubik font-medium text-[25px] text-AJGO_DarkSlateGray ">
              <label htmlFor="listingId">Listing #{listing.listingId}</label>
            </div>
            <div className="flex justify-center">
              <label htmlFor="clientId">Client {userId}</label>
            </div>
          </div>

          <br />

          <div className="pb-1 pt-1">
            <label htmlFor="offer">Offer: $</label>
            <input
              className="pl-2 pt-1 pb-1 w-24 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
              type="number"
              name="offer"
              value={offer}
              step={5}
              onChange={(e) => setOffer(Number(e.target.value).toFixed(2))}
              required
            ></input>
          </div>

          <div className="pb-1 pt-1">
            <label htmlFor="flightDate" required>
              Flight Date:{" "}
            </label>
            <input
              className="pl-2 pt-1 pb-1 w-44 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
              type="date"
              name="flightDate"
              value={flightDate}
              onChange={(e) => setFlightDate(e.target.value)}
            ></input>
          </div>

          <div className="pb-1 pt-1">
            <label htmlFor="flightAddress">Flight Address: </label>
            <input
              className="pl-2 pt-1 pb-1 w-4/5 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
              type="text" pb-1 pt-1
              name="flightAddress"
              value={flightAddress}
              onChange={(e) => setFlightAddress(e.target.value)}
              required
            ></input>
          </div>

          <div className="flex pb-1 pt-1 items-center">
            <label htmlFor="flightRadius">Flight Radius: </label>
            <input
              className="pl-2 pt-1 pb-1 w-16 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
              type="number"
              name="flightRadius"
              step={0.1}
              min={0.1}
              max={5}
              value={flightRadius}
              onChange={(e) => setFlightRadius(Number(e.target.value).toFixed(1))}
              required
            ></input>
            <label htmlFor="flightRadius"> miles </label>
          </div>

          <br />

          <div className="flex flex-col items-center">
            <div>
              <input
                type="checkbox"
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                name="multiday"
                checked={multiday}
                onChange={(e) => setMultiday(e.target.checked)}
              ></input>
              <label className="pl-3" htmlFor="multiday">
                This operation will take multiple days to complete
              </label>
            </div>
            <br />
            <div>
              <input
                type="checkbox"
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                name="hardwareProvided"
                checked={hardwareProvided}
                onChange={(e) => setHardware(e.target.checked)}
              ></input>
              <label className="pl-3" htmlFor="hardwareProvided">
                I can provide some or all of the hardware needed
              </label>
            </div>
            <br />
            <div>
              <input
                type="checkbox"
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                name="softwareProvided"
                checked={softwareProvided}
                onChange={(e) => setSoftware(e.target.checked)}
              ></input>
              <label className="pl-3" htmlFor="softwareProvided">
                I can provide some or all of the software needed
              </label>
            </div>
            <br />
            <div>
              <input
                type="checkbox"
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                name="nightFlying"
                checked={nightFlying}
                onChange={(e) => setNightflying(e.target.checked)}
              ></input>
              <label className="pl-3" htmlFor="nightFlying">
                This job requires flying at dusk, dawn, or at night
              </label>
            </div>
            <br />
            <div>
              <input
                type="checkbox"
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                name="crowdFlying"
                checked={crowdFlying}
                onChange={(e) => setCrowdflying(e.target.checked)}
              ></input>
              <label className="pl-3" htmlFor="crowdFlying">
                This job requires flying over people
              </label>
            </div>
          </div>

          <br />

          <div className="flex flex-col items-center">
            <label htmlFor="description">Details about this job: </label>
            <br />
            <textarea
              className="p-3 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
              name="description"
              rows="10"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <br />
            <div>
              <input
                type="checkbox"
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                name="completed"
                check={completed}
                onChange={(e) => setCompleted(e.target.checked)}
              ></input>
              <label className="pl-3" htmlFor="completed">This Job is complete</label>
            </div>
          </div>
        </form>
        <div className="pt-10 pb-10 flex w-3/5 justify-around">
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={handleListingEdit}>Save Changes</button>
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={handleEditButton}>Cancel</button>

        </div>
      </div>
    )
  }
}

export default ClientSingleListing
