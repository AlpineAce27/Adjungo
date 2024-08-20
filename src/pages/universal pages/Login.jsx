import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"

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
    axios
      .post("api/auth", {
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
        navigate("/homepage")
        //console.log(`Client logged in, userId: ${response.data.userId}, redirected the user to client homepage`)
      })
      .catch((error) => {
        console.log(error)
        alert("Username or password is incorrect")
      })
  }

  //create a function that will be run when the pilot attempts to login
  const handlePilotLogin = () => {
    //send the entered username and password, and pilot usertype
    axios
      .post("api/auth", {
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
        navigate("/homepage")
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
      <div className=" flex flex-col items-center justify-between h-[100%] w-full">
        <div className="flex flex-col items-center pt-14">
          <h1 className="font-rubik font-medium text-[30px] text-AJGO_DarkSlateGray justify-center">Welcome to Adjungo!</h1>
          <p className="font-rubik font-medium text-AJGO_DarkSlateGray justify-center">Please log in</p>
        </div>

        <div className="flex justify-around w-full">
          <div className="flex w-1/3 justify-end">
            <section className="flex flex-col w-4/5 items-center  bg-ADJO_Celeste rounded-xl pr-10 pl-10 pt-5 pb-8">
              <label htmlFor="clientLogin" className="text-l text- uppercase font-rubik"> Client Login: </label>
              <input
                type="text"
                name="clientLogin"
                placeholder="ClientUserName"
                value={ClientUsername}
                onChange={(e) => setClientUsername(e.target.value)} //this allows the textbox to update immediately as the user inputs text
              />
              <br />
              <label  htmlFor="clientPassword" className="text-l text- uppercase font-rubik">Password: </label>
              <input
                type="password"
                name="clientPassword"
                placeholder="password123"
                value={ClientPassword}
                onChange={(e) => setClientPassword(e.target.value)} //this allows the textbox to update immediately as the user inputs text
              />
              <br />
              {/*when this button is clicked, we run the handler function we made above*/}
              <button
              className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
              onClick={handleClientLogin}>Client Log In</button>
            </section>
          </div>

          <div className="flex w-1/3 justify-start">
            <section className="flex flex-col w-4/5 items-center  bg-ADJO_Celeste rounded-xl pr-10 pl-10 pt-5 pb-8">
              <label htmlFor="login" className=" text-l text- uppercase font-rubik">Pilot Login: </label>
              <input
                type="text"
                name="pilotLogin"
                placeholder="PilotUserName"
                value={PilotUsername}
                onChange={(e) => setPilotUsername(e.target.value)} //this allows the textbox to update immediately as the user inputs text
              />
              <br />
              <label htmlFor="pilotPassword"  className=" text-l text- uppercase font-rubik">Password: </label>
              <input
                type="password"
                name="pilotPassword"
                placeholder="password123"
                value={PilotPassword}
                onChange={(e) => setPilotPassword(e.target.value)} //this allows the textbox to update immediately as the user inputs text
              />
              <br />
              {/*when this button is clicked, we run the handler function we made above*/}
              <button
              className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
              onClick={handlePilotLogin}>Pilot Log In</button>
            </section>
          </div>
        </div>

        <div className="flex flex-col items-center pb-14">
          {/*make sure the user has an option to create an account if they dont have a login*/}
          <p className="font-rubik font-medium text-AJGO_DarkSlateGray justify-center pb-6">Don't have an account? Let's get you airborne!</p>
          <button
          className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => {
              //this onclick does not have a handler function, since the handler code is so short, it's just coded here
              navigate("/register")
              console.log("redirected the user to the registration page")
            }}
          >
            Create an Account
          </button>
        </div>
      </div>
    </>
  )
}

export default Login
