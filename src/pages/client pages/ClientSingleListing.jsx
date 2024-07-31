import axios from "axios"
import { useState, useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { useNavigate } from "react-router-dom"

function ClientSingleListing() {
  //const [listing, setListing] = useState({})
  const listing = useLoaderData()
  const navigate = useNavigate()
  console.log(listing)
  return (
    <>
      <h1>View a single listing</h1>
      <p>
        This page should show a single listing with all of it's details. If the
        listing IS NOT completed: There should always be a cancel button at the
        bottom, which would delete the listing. If the listing does not have any
        applications, there should also be an edit button which turns every
        feild into an editable field and adds a "save changes" button and
        "discard changes" button at the bottom. If the listing IS completed: The
        fields are all locked, but links to the pilots profile should be
        provided, as well as a button that allows the client to create a new new
        listing based on this completed one.
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

      <button>Edit Listing</button>

      <button
        onClick={() => {
          axios.delete(`/api/listing/${listing.listingId}`).then(() => {
            navigate("/mylistings")
          })
        }}
      >
        Delete Listing
      </button>
    </>
  )
}

export default ClientSingleListing

async function getOneListing({params}) {
   const {listingId} = params
  const { data } = await axios.get(`/api/listings/${listingId}`)
  return data
}

export { getOneListing }
