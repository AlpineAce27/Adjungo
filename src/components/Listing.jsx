import React from "react"
import { useLoaderData, NavLink } from "react-router-dom"
import axios from "axios"
import { useSelector } from "react-redux"

const Listing = ({ listing }) => {
  //console.log(listing.nightFlying)
  let usertype = useSelector((state) => state.userType)
  return (
    <>
    {usertype === "pilot" || usertype === "client" && listing.completed === "false" && (
      <tr>
        <td>
          <NavLink to={`/listing/${listing.listingId}`}>
            {listing.listingId}
          </NavLink>
        </td>
        <td>
          <NavLink to={`/clientProfile/${listing.clientId}`}></NavLink>
          {listing.clientId}
        </td>
        <td>
          <NavLink to={`/pilotProfile/${listing.assignedPilot}`}></NavLink>
          {listing.assignedPilot}
        </td>
        <td>${listing.offer}</td>
        <td>{listing.flightDate}</td>
        <td>{listing.multiday}</td>
        <td>{listing.hardwareProvided.toString()}</td>
        <td>{listing.softwareProvided.toString()}</td>
        <td>{listing.desription}</td>
        <td>{listing.nightFlying.toString()}</td>
        <td>{listing.crowdFlying.toString()}</td>
        <td>{listing.flightRadius}</td>
        <td>{listing.completed}</td>
      </tr>
    )}
    {usertype === null && listing.completed === "false" && (
      <tr>
        <td>
          <NavLink to={`/listing/${listing.listingId}`}>
            {listing.listingId}
          </NavLink>
        </td>
        <td>
          <NavLink to={`/clientProfile/${listing.clientId}`}></NavLink>
          {listing.clientId}
        </td>
        <td>
          <NavLink to={`/pilotProfile/${listing.assignedPilot}`}></NavLink>
          {listing.assignedPilot}
        </td>
        <td>${listing.offer}</td>
        <td>{listing.flightDate}</td>
        <td>{listing.multiday}</td>
        <td>{listing.hardwareProvided.toString()}</td>
        <td>{listing.softwareProvided.toString()}</td>
        <td>{listing.desription}</td>
        <td>{listing.nightFlying.toString()}</td>
        <td>{listing.crowdFlying.toString()}</td>
        <td>{listing.flightRadius}</td>
        <td>{listing.completed}</td>
      </tr>
    )}
      {usertype === "client" && listing.completed === "false" && (
        <tr>
          <td>
            <NavLink to={`/listing/${listing.listingId}`}>
              {listing.listingId}
            </NavLink>
          </td>
          <td>
            <NavLink to={`/clientProfile/${listing.clientId}`}></NavLink>
            {listing.clientId}
          </td>
          <td>
            <NavLink to={`/pilotProfile/${listing.assignedPilot}`}></NavLink>
            {listing.assignedPilot}
          </td>
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{listing.hardwareProvided.toString()}</td>
          <td>{listing.softwareProvided.toString()}</td>
          <td>{listing.flightAddress}</td>
          <td>{listing.flightRadius}</td>
        </tr>
      )}
      
      {usertype === "pilot" && listing.completed === "false" && (
        <tr>
          <td>
            <NavLink to={`/listing/${listing.listingId}`}>
              {listing.listingId}
            </NavLink>
          </td>
          <td>
            <NavLink to={`/clientProfile/${listing.clientId}`}></NavLink>
            {listing.clientId}
          </td>
          <td>
            <NavLink to={`/pilotProfile/${listing.assignedPilot}`}></NavLink>
            {listing.assignedPilot}
          </td>
          <td>${listing.offer}</td>
          <td>{listing.flightDate}</td>
          <td>{listing.multiday}</td>
          <td>{listing.hardwareProvided.toString()}</td>
          <td>{listing.softwareProvided.toString()}</td>
          <td>{listing.desription}</td>
          <td>{listing.nightFlying.toString()}</td>
          <td>{listing.crowdFlying.toString()}</td>
          <td>{listing.flightAddress}</td>
          <td>{listing.flightRadius}</td>
          <td>{listing.completed}</td>
        </tr>
      )}
    </>
  )
}

export default Listing
