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
        <section className="flex bg-AJGO_White">
          <div className="flex flex-col justify-around items-center w-1/2" >
            <div className="flex justify-center">
              <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">
                Welcome to Adjungo!
              </h1>
            </div >
            <div className="flex flex-col items-center pl-20 pr-20 justify-center h-[50%]" >
              <p className="font-rubik text-xl pb-5">
                Whether your a solo-pilot with a fresh new 107 card, or a
                multi-national corporation, Adjungo is here to fastrack your
                partnership with a qualified pilot, or interested client
              </p>
              <p className="font-rubik text-xl">
                Check out our listings page to get an idea of what kinds of Jobs
                the Adjungo community is doing! Or if you want to know more
                about Adjungo itself, checkout the about page. If you're already
                an Adjungo member, go ahead and log in!
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  navigate("/login")
                }}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="w-1/2">
            <img
              src="src\assets\photos\mitch-nielsen-pWtNPCpvVA8-unsplash.jpg"
              alt="A photo by Mitch Nielsen showing a hovering drone"
            />
          </div>
        </section>
        <section className="flex-col bg-AJGO_Platnum pt-10 pb-10">
          <div className="flex justify-center">
            <p className="font-rubik text-xl ps-5 pb-5">
              New to Adjungo and want to boost your drone operations? Create an
              account for free and get started!
            </p>
          </div>
                <div className="flex justify-center">
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
            onClick={() => {
              navigate("/register")
            }}
          >
            Create an Account
          </button>
                </div>
        </section>
      </main>
    )
  }
}

export default Welcome
