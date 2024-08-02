import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"

function PilotAccount() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  //create a function to log the user out
  async function logout() {
    await axios.post(`/api/logout`)
    dispatch({ type: "LOGOUT" })
    console.log("user logged out")
    navigate("/")
  }
  return (
    <>
      <h1>My account details</h1>
      <p>
        here the client should be able to view their account details, edit them,
        save them and see their rating. There should also be a button or link
        near the ratings that redirects the user to their reviews page.
      </p>
      <button onClick={logout}>Log Out</button>
    </>
  )
}

export default PilotAccount