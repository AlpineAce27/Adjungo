import React from "react"
import { useLoaderData, NavLink } from "react-router-dom"
import axios from "axios"
import { list } from "@sequelize/core/_non-semver-use-at-your-own-risk_/expression-builders/list.js"

const ClientListing = ({ listing }) => {
  if(listing.assignedPilot === null)
  {listing.assignedPilot = "None"}
  let hardwareProvided
  if(listing.hardwareProvided === "true"){
    hardwareProvided = "Yes"
  }
  else{
    hardwareProvided = "No"
  }
  let softwareProvided
  if(listing.softwareProvided === "true"){
    softwareProvided = "Yes"
  }
  else{
    softwareProvided = "No"
  }

  return (
    <tr key={listing.listingId}>
      <td>
        <NavLink to={`/listing/${listing.listingId}`}>
          {listing.listingId}
        </NavLink>
      </td>
      <td>
        <NavLink to={`/clientAccount`}></NavLink>
        {listing.clientId}
      </td>
      <td>
        <NavLink to={`/pilotProfile/${listing.assignedPilot}`}></NavLink>
        {listing.assignedPilot}
      </td>
      <td>${listing.offer}</td>
      <td>{listing.flightDate}</td>
      <td>{hardwareProvided}</td>
      <td>{softwareProvided}</td>    
      <td>{listing.flightAddress}</td>
      <td>{listing.flightRadius}</td>
    </tr>
  )
}

export default ClientListing
