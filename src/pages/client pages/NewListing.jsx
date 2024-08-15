import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

function NewListing() {
  let usertype = useSelector((state) => state.userType)
  let userid = useSelector((state) => state.userId)
  const navigate = useNavigate()

  const [offer, setOffer] = useState(10.00)
  const [flightDate, setFlightDate] = useState("2009-09-02")
  const [multiday, setMultiday] = useState(false)
  const [flightAddress, setFlightAddress] = useState("123 Blue Sky Way")
  const [flightRadius, setFlightRadius] = useState(0.1)
  const [hardwareProvided, setHardware] = useState(false)
  const [softwareProvided, setSoftware] = useState(false)
  const [nightFlying, setNightflying] = useState(false)
  const [crowdFlying, setCrowdflying] = useState(false)
  const [description, setDescription] = useState("description")

  const handleListingSubmission = (e) => {
    e.preventDefault()
    axios
      .post("/api/listing", {
        newListing: {
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
          completed: false,
        },
      })
      .then(() => {
        navigate("/myListings")
        console.log(
          "A new listing has been created. User redirected to 'my listings' page."
        )
      })
  }

  if (usertype === "client") {
    return (
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center pt-10 pb-10">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Create a New Listing</h1>
          <p className="font-rubik text-xl">
            Fill out the fields below to submit your listing
          </p>
        </div>

        <form className="font-rubik text-xl bg-ADJO_Celeste p-5 rounded-lg w-3/5">

          <div className="flex justify-center">
            <label htmlFor="clientId">Client ID: {userid}</label>
          </div>

          <br />

          <div className="pb-1 pt-1">
            <label htmlFor="offer" required>
              Offer: ${" "}
            </label>
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
              type="text"
              name="flightAddress"
              value={flightAddress}
              onChange={(e) => setFlightAddress(e.target.value)}
              required
            ></input>
          </div>

          <div>
            <label htmlFor="flightRadius">Flight Radius in miles:</label>
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
          </div>

          <br />

          <div className="flex flex-col items-center">
            <div>
              <input
                type="checkbox"
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                name="multiday"
                checked={multiday}
                onChange={(e) => setMultiday(e.target.value)}
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
                onChange={(e) => setHardware(e.target.value)}
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
                onChange={(e) => setSoftware(e.target.value)}
              ></input>
              <label className="pl-3" htmlFor="softwareProvided">
                I can provide some or all of the software needed
              </label>
            </div>
            <br />
            <div>
              <input
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                type="checkbox"
                name="nightFlying"
                checked={nightFlying}
                onChange={(e) => setNightflying(e.target.value)}
              ></input>
              <label className="pl-3" htmlFor="nightFlying">
                This job requires flying at dusk, dawn, or at night
              </label>
            </div>
            <br />
            <div>
              <input
                className="h-5 w-5 checked:bg-ADJO_Keppel text-ADJO_Keppel hover:ring-2 hover:ring-inset hover:ring-ADJO_Keppel"
                type="checkbox"
                name="crowdFlying"
                checked={crowdFlying}
                onChange={(e) => setCrowdflying(e.target.value)}
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
              className="p-3 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel" name="description"
              rows="10"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </form>
        <div className="pt-10 pb-10 flex w-3/5 justify-around">
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={()=>navigate("/myListings")}>Cancel</button>
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={handleListingSubmission}>Submit</button>
        </div>
      </div>
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

export default NewListing
