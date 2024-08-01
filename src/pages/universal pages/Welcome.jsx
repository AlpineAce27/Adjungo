import GreenButton from "../../components/GreenButton"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Header from "../../components/Header"

function Welcome() {
  let usertype = useSelector((state) => state.userType)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  if (usertype === "client" || usertype === "pilot") {
    return (
      <>
        <h1>Welcome to Adjungo!</h1>
        <p>
          This is the landing page for Adjungo for a user who is already logged
          it. It should show some pictures, a clean layout, and a welcome
          message. a button/link to the logout page should be provided near to
          beginning,
        </p>
        <GreenButton
          text="Log out"
          onClickFunction={() => {
                axios.post("/api/logout")
              dispatch({ type: "LOGOUT" })
              navigate("/")
            }
          }
        />
      </>
    )
  } else {
    return (
      <>
        <h1>Welcome to Adjungo!</h1>
        <p>
          This is the landing page for Adjungo. It should show some pictures, a
          clean layout, and a welcome message. a button/link to the login page
          should be provided near to beginning,
        </p>

        <GreenButton
          text="Log In"
          onClickFunction={() => {
            navigate("/login")
          }}
        />

        <p>
          and after scrolling through details a link to the account creation
          page should be provided toward the end of the page.
        </p>

        <GreenButton
          text="Create an Account"
          onClickFunction={() => {
            navigate("/register")
          }}
        />
      </>
    )
  }
}

export default Welcome
