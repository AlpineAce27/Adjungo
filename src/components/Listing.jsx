import React from 'react'
import { useLoaderData, NavLink } from "react-router-dom"
import axios from "axios"

const Listing = ({listing}) => {
    console.log(listing.nightFlying)
  return (
    <tr>
        <td>
          <NavLink to={`/listing/${listing.listingId}`}>{listing.listingId}</NavLink>
        </td>
        <td>{listing.clientId}</td>
        <td>${listing.offer}</td>
        <td>{listing.flightDate}</td>
        <td>{listing.hardwareProvided.toString()}</td>
        <td>{listing.softwareProvided.toString()}</td>
        <td>{listing.nightFlying.toString()}</td>
        <td>{listing.crowdFlying.toString()}</td>
      </tr>
  )
}

export default Listing