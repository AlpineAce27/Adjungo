import React from 'react'
import { useLoaderData, NavLink } from "react-router-dom"
import axios from "axios"

const listing = ({listing}) => {
  return (
    <tr>
        <td>
          <NavLink to={`/listing/${listing.id}`}>{listing.id}</NavLink>
        </td>
        <td>{listing.clientId}</td>
        <td>{listing.offer}</td>
        <td>{listing.flightDate}</td>
        <td>{listing.hardwareProvided}</td>
        <td>{listing.softwareProvided}</td>
        <td>{listing.nightFlying}</td>
        <td>{listing.crowdFlying}</td>
      </tr>
  )
}

export default listing