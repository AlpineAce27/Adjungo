import { useSelector } from "react-redux"
import { NavLink, Outlet } from "react-router-dom"
//import { connect } from 'react-redux'

function Header() {
  //grab the usertype property from redux
  let usertype = useSelector(state=> state.userType)
  //console.log(usertype)
  return (
    <>
    {/*Create a navbar for a user who is not logged in*/}
    { usertype !== 'client' && usertype !== 'pilot' && <nav> 
          <NavLink to="/">Home </NavLink>
          <NavLink to="/login">Login </NavLink>
          <NavLink to="/listings">Listings </NavLink>
          <NavLink to="/about">About </NavLink>
    </nav>} 
    {/*Create a navbar for a user who is logged in as a pilot*/}
    {usertype === 'pilot' && <nav>
        <NavLink to="/pilotHome">Home </NavLink>
        <NavLink to="/PilotJobs">My Jobs </NavLink>
        <NavLink to="/PilotJobsApplied">My Applications </NavLink>
        <NavLink to="/listings">All Listings </NavLink>
        <NavLink to="/myAccount">My Account </NavLink>
  </nav>}
    {/*Create a navbar for a user who is logged in as a client*/}
  {usertype === 'client' && <nav>
        <NavLink to="/">Home </NavLink>
        <NavLink to="/listings">All Listings </NavLink>
        <NavLink to="/myListings">My Listings </NavLink>
        <NavLink to="/clientApplications">My Applications </NavLink>
        <NavLink to="/myAccount">My Account </NavLink>
  </nav>}
  </>
  )
  
}

export default Header
