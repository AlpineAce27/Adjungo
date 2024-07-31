import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

function NewListing() {
  let usertype = useSelector((state) => state.userType)
  let userid = useSelector((state) => state.userId)
  const navigate = useNavigate()

  const [offer, setOffer] = useState()
  const [flightDate, setFlightDate] = useState()
  const [multiday, setMultiday] = useState()
  const [flightAddress, setFlightAddress] = useState()
  const [flightRadius, setFlightRadius] = useState()
  const [hardware, setHardware] = useState()
  const [software, setSoftware] = useState()
  const [nightFlying, setNightflying] = useState()
  const [crowdFlying, setCrowdflying] = useState()
  const [description, setDescription] = useState()

  const handleListingSubmission = (e) => {
    e.preventDefault()
    axios
      .post("/api/listing", {
        newListing: {
          offer: offer,
          flightDate: flightDate,
          multiday: multiday,
          hardwareProvided: hardware,
          softwareProvided: software,
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
            placeholder="$100"
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
            onChange={(e) => setFlightDate(e.target.value)}
          ></input>
          <br />
          <input
            type="checkbox"
            name="multiday"
            
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
            onChange={(e) => setFlightAddress(e.target.value)}
            required
          ></input>
          <br />
          <label htmlFor="flightRadius">Flight Radius in miles:</label>
          <input
            type="number"
            name="flightRadius"
            onChange={(e) => setFlightRadius(e.target.value)}
            required
          ></input>
          <br />
          <input
            type="checkbox"
            name="hardwareProvided"
            
            onChange={(e) => setHardware(e.target.value)}
          ></input>
          <label htmlFor="hardwareProvided">
            I can provide some or all of the hardware needed
          </label>
          <br />
          <input
            type="checkbox"
            name="softwareProvided"
            
            onChange={(e) => setSoftware(e.target.value)}
          ></input>
          <label htmlFor="softwareProvided">
            I can provide some or all of the software needed
          </label>
          <br />
          <input
            type="checkbox"
            name="nightFlying"
            
            onChange={(e) => setNightflying(e.target.value)}
          ></input>
          <label htmlFor="nightFlying">
            This job requires flying at dusk, dawn, or at night
          </label>
          <br />
          <input
            type="checkbox"
            name="crowdFlying"
            
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
