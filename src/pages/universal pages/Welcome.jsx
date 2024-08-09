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
      <main>
        <section>
          <h1>Welcome to Adjungo!</h1>
          <p>
            This is the landing page for Adjungo for a user who is already
            logged it. It should show some pictures, a clean layout, and a
            welcome message. a button/link to the logout page should be provided
            near to beginning,
          </p>
        </section>

        <button
          onClick={() => {
            axios.post("/api/logout")
            dispatch({ type: "LOGOUT" })
            navigate("/")
          }}
        >
          Log Out
        </button>
      </main>
    )
  } else {
    return (
      <main>
        <section className="flex-col items-center bg-AJGO_White">
          <h1 className="pt-20 pb-10 font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray">
            Welcome to Adjungo!
          </h1>
          <button
            className="bg-ADJO_Keppel px-10 py-2 text-xl text- uppercase"
            onClick={() => {
              navigate("/login")
            }}
          >
            Log In
          </button>
          <p className="font-rubik text-xl">
            Whether your a solo-pilot with a fresh new 107 card, or a
            multi-national corporation, Adjungo is here to get you paired with the
            best pilots and clients.
          </p>
        </section>

        <img
          src="src\assets\photos\mitch-nielsen-pWtNPCpvVA8-unsplash.jpg"
          alt=""
        />
        <p>
          and after scrolling through details a link to the account creation
          page should be provided toward the end of the page.
        </p>

        <button
          onClick={() => {
            navigate("/register")
          }}
        >
          Create an Account
        </button>
      </main>
    )
  }
}

export default Welcome
