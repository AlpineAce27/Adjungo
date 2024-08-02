import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

function NewListing() {
  let usertype = useSelector((state) => state.userType)
  let userid = useSelector((state) => state.userId)
  const navigate = useNavigate()

  const [offer, setOffer] = useState(10.00)
  const [flightDate, setFlightDate] = useState(2025-12-25)
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
      <>
        <h1>Create a New Listing</h1>
        <p>
          This page is one giant form that allows a client to create an entirely
          new listing, if we were redirected here from a "completed" listing, it
          should inherit all of those values, only requiring a new flight date.
          The buttons at the bottom should be "submit", "save draft", and
          "cancel".
        </p>
        <form onSubmit={handleListingSubmission}>
          <label htmlFor="clientId">Client ID: {userid}</label>
          <br />
          <label htmlFor="offer" required>
            Offer:{" "}
          </label>
          <input
            type="number"
            name="offer"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            required
          ></input>
          <br />
          <label htmlFor="flightDate" required>
            Flight Date:{" "}
          </label>
          <input
            type="date"
            name="flightDate"
            value={flightDate}
            onChange={(e) => setFlightDate(e.target.value)}
          ></input>
          <br />
          <input
            type="checkbox"
            name="multiday"
            checked={multiday}
            onChange={(e) => setMultiday(e.target.value)}
          ></input>
          <label htmlFor="multiday">
            This operation will take multiple days to complete
          </label>
          <br />
          <label htmlFor="flightAddress">Flight Address: </label>
          <input
            type="text"
            name="flightAddress"
            value={flightAddress}
            onChange={(e) => setFlightAddress(e.target.value)}
            required
          ></input>
          <br />
          <label htmlFor="flightRadius">Flight Radius in miles:</label>
          <input
            type="number"
            name="flightRadius"
            step= {0.1}
            min ={0.1}
            value={flightRadius}
            onChange={(e) => setFlightRadius(Number(e.target.value).toFixed(1))}
            required
          ></input>
          <br />
          <input
            type="checkbox"
            name="hardwareProvided"
            checked={hardwareProvided}
            onChange={(e) => setHardware(e.target.value)}
          ></input>
          <label htmlFor="hardwareProvided">
            I can provide some or all of the hardware needed
          </label>
          <br />
          <input
            type="checkbox"
            name="softwareProvided"
            checked={softwareProvided}
            onChange={(e) => setSoftware(e.target.value)}
          ></input>
          <label htmlFor="softwareProvided">
            I can provide some or all of the software needed
          </label>
          <br />
          <input
            type="checkbox"
            name="nightFlying"
            checked={nightFlying}
            onChange={(e) => setNightflying(e.target.value)}
          ></input>
          <label htmlFor="nightFlying">
            This job requires flying at dusk, dawn, or at night
          </label>
          <br />
          <input
            type="checkbox"
            name="crowdFlying"
            checked={crowdFlying}
            onChange={(e) => setCrowdflying(e.target.value)}
          ></input>
          <label htmlFor="crowdFlying">
            This job requires flying over people who are unaware of the
            operation
          </label>
          <br />
          <br />
          <label htmlFor="description">Details about this job: </label>
          <br />
          <input
            type="textarea"
            name="description"
            rows="10"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <br />
          <br />
          <br />
          <input
            type="button"
            name="saveDraft"
            id="saveDraft"
            value="Save Draft"
          />
          <br />
          <input type="submit" value="Submit New Listing"></input>
        </form>
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

export default NewListing
