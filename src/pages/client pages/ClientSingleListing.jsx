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
      <>
        <h1>Listing #{listing.listingId}</h1>
        <p>
          This page should show a single listing with all of it's details. There
          should be a delete button at the bottom, which would delete the
          listing. There should also be an edit button which turns every feild
          into an editable field and adds a "save changes" button and "cancel"
          button at the bottom. Links to the pilots profile should be provided,
          as well as a button that allows the client to create a new new listing
          based on this completed one.
        </p>
        <div>
          <h3>Listing Id: {listing.listingId}</h3>
          <h3>Owner Id: {listing.clientId}</h3>
          <br />
          <p>Date: {listing.date}</p>
          <p>Flight Address: {listing.flightAddress}</p>
          <p>Description: {listing.description}</p>
          <table>
            <thead>
              <tr>
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
          <div>
            <button onClick={handleEditButton}>Edit Listing</button>
            <button
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
      </>
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
      <>
        <h1>Edit this Listing</h1>
        <p>
          This page is one giant form that allows a client to edit an already
          existing listing. The buttons at the bottom should be "save changes",
          and "cancel"
        </p>
        <form onSubmit={handleListingEdit}>
          <label htmlFor="clientId">Client ID: {userId}</label>
          <br />
          <label htmlFor="offer">Offer: </label>
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
            onChange={(e) => setMultiday(e.target.checked)}
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
            step={0.1}
            min={0.1}
            value={flightRadius}
            onChange={(e) => setFlightRadius(Number(e.target.value).toFixed(1))}
            required
          ></input>
          <br />
          <input
            type="checkbox"
            name="hardwareProvided"
            checked={hardwareProvided}
            onChange={(e) => setHardware(e.target.checked)}
          ></input>
          <label htmlFor="hardwareProvided">
            I can provide some or all of the hardware needed
          </label>
          <br />
          <input
            type="checkbox"
            name="softwareProvided"
            checked={softwareProvided}
            onChange={(e) => setSoftware(e.target.checked)}
          ></input>
          <label htmlFor="softwareProvided">
            I can provide some or all of the software needed
          </label>
          <br />
          <input
            type="checkbox"
            name="nightFlying"
            checked={nightFlying}
            onChange={(e) => setNightflying(e.target.checked)}
          ></input>
          <label htmlFor="nightFlying">
            This job requires flying at dusk, dawn, or at night
          </label>
          <br />
          <input
            type="checkbox"
            name="crowdFlying"
            checked={crowdFlying}
            onChange={(e) => setCrowdflying(e.target.checked)}
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
          <input
            type="checkbox"
            name="completed"
            check={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          ></input>
          <label htmlFor="completed">Job is completed</label>
          <br />
          <input type="submit" value="Save Changes"></input>
        </form>
        <button onClick={handleEditButton}>Discard Changes</button>
      </>
    )
  }
}

export default ClientSingleListing
