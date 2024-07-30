import "./App.css"
import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Outlet } from "react-router-dom"
//import { connect } from 'react-redux'

let usertype = await axios.get("api/auth").then(res => {
  usertype = res.data.userType
})

function App() {
  
  return (
    <>
    { usertype !== 'client' && usertype !== 'pilot' && <nav> 
          <NavLink to="/">Home</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/listings">Listings</NavLink>
          <NavLink to="/about">About</NavLink>
    </nav>} 
    {usertype === 'pilot' && <nav>
        <NavLink to="/pilotHome">Home</NavLink>
        <NavLink to="/pilotApplications">My Applications</NavLink>
        <NavLink to="/PilotJobs">My Jobs</NavLink>
        <NavLink to="/listings">Listings</NavLink>
        <NavLink to="/pilotAccount">My Account</NavLink>
  </nav>}
  {usertype === 'client' && <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/myListings">My Listings</NavLink>
        <NavLink to="/clientApplications">My Applications</NavLink>
        <NavLink to="/clientAccount">My Account</NavLink>
  </nav>}

    <Outlet />
  </>
  )
  
}

export default App
