import axios from "axios"
import { useLoaderData } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useSelector } from "react-redux"

function PilotSingleListing() {
  //take the data from the loader and assign it to the listing variable (this should be an entire listing object)
  //this loader data comes from the loader section of this route in the App.jsx

  //setup the navigate functionality
  const listing = useLoaderData()
  console.log(listing)

  //Render this if they are not in edit mode
  return (
    <>
      <h1>View a single listing</h1>
      <p>
        This page should show a single listing with all of it's details. From a
        pilots perspective this listing can fall into 1 of the 3 categories:
        <p>
          New: They havent had any interaction with it so far
        </p>
        <p>
          Applied For: They have applied for this job but haven't been accepted/rejected
          yet
        </p>
        <p>Assigned To: They are the pilot assiged to this job</p>

        depending on which relationship the pilot has with the listing,
        different options should be shown. If it's new, there should be an
        "apply" button. If they have already applied, there should be a "retract
        application" button. If they are assigned to this job, there should be a
        "resign from job" button.
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

      <button onClick={() => {}}>Do nothing button</button>
    </>
  )
}

export default PilotSingleListing
