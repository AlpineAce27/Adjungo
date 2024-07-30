import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import GreenButton from "../../components/GreenButton";
import { response } from "express";

function Login() {
  const [ClientUsername, setClientUsername] = useState("ClientUserName")
  const [ClientPassword, setClientPassword] = useState("ClientPassword")
  const [PilotUsername, setPilotUsername] = useState("PilotUserName")
  const [PilotPassword, setPilotPassword] = useState("PilotPassword")

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleClientLogin = () => {
      axios.post("api/auth", {
        userType: "client",
        enteredLogin: ClientUsername,
        enteredPassword: ClientPassword,
      })
    dispatch({ type: "LOGIN", payload: { userType: "client", userId: response.data.userId } })
    navigate("/clientHome")
    console.log("Client logged in, redirected the user to client homepage")
  }

  const handlePilotLogin = () => {
    
      axios.post("api/auth", {
        userType: "pilot",
        enteredLogin: PilotUsername,
        enteredPassword: PilotPassword,
      })
    dispatch({ type: "LOGIN", payload: { userType: "pilot", userId: response.data.userId } })
    navigate("/pilotHome")
    console.log("redirected the user to pilot homepage")
  }

  
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
          placeholder="ClientUserName"
          onChange={(e) => setClientUsername(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="clientPassword">Password: </label>
        <input
          type="password"
          name="clientPassword"
          placeholder="password123"
          onChange={(e) => setClientPassword(e.target.value)}
        />
        <br />
        <br />
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
          onChange={(e) => setPilotUsername(e.target.value)}
        />
        <br />
        <br />
        <label htmlFor="pilotPassword">Password: </label>
        <input
          type="password"
          name="pilotPassword"
          placeholder="password123"
          onChange={(e) => setPilotPassword(e.target.value)}
        />
        <br />
        <br />
        <GreenButton text="Pilot Log In" onClickFunction={handlePilotLogin} />
      </div>
      <br />
      <br />
      <div>
        <p>Don't have an account? Let's get you airborne!</p>
        <button
          onClick={() => {
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