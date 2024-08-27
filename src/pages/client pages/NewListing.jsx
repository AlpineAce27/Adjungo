import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { getCoordinatesFromAddress} from "../../../util/location"

function NewListing() {
  let usertype = useSelector((state) => state.userType)
  let userid = useSelector((state) => state.userId)
  const navigate = useNavigate()

  //values in case the user edits this listing
  const [offer, setOffer] = useState(100.0)
  const [flightDate, setFlightDate] = useState("2024-09-02")
  const [flightTime, setFlightTime] = useState("12:30")
  const [multiday, setMultiday] = useState(false)
  const [flightAddress, setFlightAddress] = useState("123 Blue Sky Way")
  const [flightRadius, setFlightRadius] = useState(0.1)
  const [hardwareProvided, setHardware] = useState(false)
  const [softwareProvided, setSoftware] = useState(false)
  const [internetProvided, setInternetProvided] = useState(true)
  const [powerProvided, setPowerProvided] = useState(true)
  const [highFlying, setHighFlying] = useState(false)
  const [blosFlying, setBlosFlying] = useState(false)
  const [payloadDropping, setPayloadDropping] = useState(false)
  const [hazmatFlying, setHazmatFlying] = useState(false)
  const [heavyFlying, setHeavyFlying] = useState(false)
  const [nightFlying, setNightflying] = useState(false)
  const [crowdFlying, setCrowdflying] = useState(false)
  const [description, setDescription] = useState(
    "This is a placeholder description"
  )
  const [completed, setCompleted] = useState(false)

  const handleListingSubmission = async (e) => {
    e.preventDefault()
    let coordinates = await getCoordinatesFromAddress(flightAddress)
    //console.log(coordinates)
    axios
      .post("/api/listing", {
        newListing: {
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
          flightCoordinates: coordinates,
          flightRadius: flightRadius,
          completed: completed,
        },
      })
      .then(() => {
        navigate("/myJobs/client")
        console.log(
          "A new listing has been created. User redirected to 'my listings' page."
        )
      })
  }

  if (usertype === "client") {
    return (
      <div className="flex flex-col items-center justify-center text-center w-5/6">
        <div className="flex flex-col items-center pt-10 pb-10">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">
            Create a New Listing
          </h1>
          <p className="font-rubik text-xl">
            Fill out the fields below to submit your listing
          </p>
        </div>

        <form className="flex items-center justify-center w-full">
          <section className="flex flex-col w-1/2 gap-3 items-start pt-10 pb-10 justify-between font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray text-lg">
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
                onChange={(e) => {setFlightTime(e.target.value)
                  console.log(flightTime)
                }}
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
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => navigate("/myListings")}
          >
            Cancel
          </button>
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={handleListingSubmission}
          >
            Submit
          </button>
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
