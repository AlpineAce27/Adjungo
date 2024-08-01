import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import GreenButton from "../../components/GreenButton"

//create the function
function Login() {
  //set up useStates for the client username/password and pilot username/password
  //these are purposefully useState's instead of redux values, because these values are only needed in this page, and nowhere else on the site
  const [ClientUsername, setClientUsername] = useState("client1")
  const [ClientPassword, setClientPassword] = useState("client1")
  const [PilotUsername, setPilotUsername] = useState("pilot1")
  const [PilotPassword, setPilotPassword] = useState("pilot1")

  //setup useDispatch for redux, and navigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //create a function that will be run when the client attempts to login
  const handleClientLogin = () => {
    //send the entered username and password, and client usertype
    axios.post("api/auth", {
      userType: "client",
      enteredLogin: ClientUsername,
      enteredPassword: ClientPassword,
    })
      //after that completes, send a dispatch/action to the redux store to update the usertype and user Id
      .then((response) => {
        dispatch({
          type: "LOGIN",
          payload: { userType: "client", userId: response.data.userId },
        })
        //now that the user is logged in and redux values are updated, redirect the user to their home/dashboard
        navigate("/clientHome")
        //console.log("Client logged in, redirected the user to client homepage")
      })
      .catch((error) => {
        console.log(error)
        alert("Username or password is incorrect")
      })
  }

  //create a function that will be run when the pilot attempts to login
  const handlePilotLogin = () => {
    //send the entered username and password, and pilot usertype
    axios.post("api/auth", {
      userType: "pilot",
      enteredLogin: PilotUsername,
      enteredPassword: PilotPassword,
    })
      //after that completes, send a dispatch/action to the redux store to update the usertype and user Id
      .then((response) => {
        dispatch({
          type: "LOGIN",
          payload: { userType: "pilot", userId: response.data.userId },
        })
        //now that the user is logged in and redux values are updated, redirect the user to their home/dashboard
        navigate("/pilotHome")
        //console.log("Pilot logged in, redirected the user to pilot homepage")
      })
      .catch((error) => {
        console.log(error)
        alert("Username or password is incorrect")
      })
  }

  //what to render on the page
  return (
    <>
      <h1>Welcome to Adjungo!</h1>
      <div>
        <p>Please log in</p>
        <br />
        <br />
        <label htmlFor="clientLogin">Client Login: </label>
        <input
          type="text"
          name="clientLogin"
          placeholder="ClientUserName" value={ClientUsername}
          onChange={(e) => setClientUsername(e.target.value)} //this allows the textbox to update immediately as the user inputs text
        />
        <br />
        <br />
        <label htmlFor="clientPassword">Password: </label>
        <input
          type="password"
          name="clientPassword"
          placeholder="password123"
          value={ClientPassword}
          onChange={(e) => setClientPassword(e.target.value)} //this allows the textbox to update immediately as the user inputs text
        />
        <br />
        <br />
        {/*when this button is clicked, we run the handler function we made above*/}
        <GreenButton text="Client Log In" onClickFunction={handleClientLogin} />
        <br />
        <br />
        <br />
        <br />
        <label htmlFor="login">Pilot Login: </label>
        <input
          type="text"
          name="pilotLogin"
          placeholder="PilotUserName"
          value="pilot1"
          onChange={(e) => setPilotUsername(e.target.value)} //this allows the textbox to update immediately as the user inputs text
        />
        <br />
        <br />
        <label htmlFor="pilotPassword">Password: </label>
        <input
          type="password"
          name="pilotPassword"
          placeholder="password123"
          value="pilot1"
          onChange={(e) => setPilotPassword(e.target.value)} //this allows the textbox to update immediately as the user inputs text
        />
        <br />
        <br />
        {/*when this button is clicked, we run the handler function we made above*/}
        <GreenButton text="Pilot Log In" onClickFunction={handlePilotLogin} />
      </div>
      <br />
      <br />
      <div>
        {/*make sure the user has an option to create an account if they dont have a login*/}
        <p>Don't have an account? Let's get you airborne!</p>
        <button
          onClick={() => { //this onclick does not have a handler function, since the handler code is so short, it's just coded here
            navigate("/register")
            console.log("redirected the user to the registration page")
          }}
        >
          Create an Account
        </button>
      </div>
    </>
  )
}

export default Login
