import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Header from "../../components/Header"

function Welcome() {
  let userType = useSelector((state) => state.userType)
  const navigate = useNavigate()
  const dispatch = useDispatch()

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
              partnership with qualified pilots and interested clients.
            </p>
            <p className="font-rubik text-xl">
              Check out our listings page to get an idea of what kinds of Jobs
              the Adjungo community is doing! Or if you want to know more
              about Adjungo itself, checkout the about page. If you already
              have an account, go ahead and log in!
            </p>
          </div>
          <div className="flex justify-center">
            {(userType === 'client' || userType === 'pilot') &&
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  navigate("/listings")
                }}
              >
                View the Current Listings
              </button>
            }
            {(userType !== 'client' && userType !== 'pilot') &&
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  navigate("/login")
                }}
              >
                Log In
              </button>
            }
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
          {(userType === 'client' || userType === 'pilot') &&
            <div className="flex flex-col items-center">
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  axios.post("/api/logout")
                  dispatch({ type: "LOGOUT" })
                  navigate("/")
                }}
              >
                Log Out
              </button>
            </div>
          }
          {(userType !== 'client' && userType !== 'pilot') &&
            <div className="flex flex-col items-center">
              <div className="flex justify-center">
                <p className="font-rubik text-xl ps-5 pb-5">
                  New to Adjungo? Create an
                  account for free and get started!
                </p>
                <br />
              </div>
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  navigate("/register")
                }}
              >
                Create an Account
              </button>
            </div>
          }
        </div>
      </section>
    </main>
  )
}

export default Welcome
