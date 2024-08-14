import { useNavigate, NavLink } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

function MyAccount() {
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  let userId = useSelector((state) => state.userId)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountDetails, SetAccountDetails] = useState({})
  const [receivedReviews, SetReceivedReviews] = useState([])

  //create a function to log the user out
  async function logout() {
    await axios.post(`/api/logout`)
    dispatch({ type: "LOGOUT" })
    console.log("user logged out")
    navigate("/")
  }
  //grab account information of the current user
  useEffect(() => {
    axios.get("/api/myAccount").then((response) => {
      SetAccountDetails(response.data)
    })
    axios.get("/api/receivedReviews").then((response) => {
      SetReceivedReviews(response.data)
    })
  }, [])

  //calculate the average rating that this user has
  let avg = 0
  receivedReviews.forEach((review) => {
    if (userType === "client") {
      avg = avg + Number(review.clientRating)
    } else if (userType === "pilot") {
      avg = avg + Number(review.pilotRating)
    }
    //console.log(avg)
  })
  avg = avg / receivedReviews.length
  //console.log(avg)
  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
          {accountDetails.company}
        </h1>
        <p className="font-rubik text-l pb-5 w-3/4 text-center">
          Here you can view your Account details, your rating, and links to your
          reviews
        </p>
        {userType === "client" && (
          <div className="flex flex-col pb-4 w-3/4">
            
              <div className="flex flex-col">
                <h3 className="pt-3 pb-0 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                  {accountDetails.company}
                </h3>
                <h3 className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                  {accountDetails.individual === true && (
                    <> Individual / Single Member LLC</>
                  )}
                  {accountDetails.individual === false && (
                    <> LLC or Incorporation</>
                  )}
                </h3>
                <h3 className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                  Adjungo ID: {userId}{" "}
                </h3>
              
              <div>
                <h3 className="pt-3 pb-0 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                  <NavLink to="/receivedReviews">
                    Rating: {avg.toFixed(2)}/5
                  </NavLink>
                </h3>
                <div className="flex flex-col">
                  <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                    <NavLink to="/receivedReviews">Recieved Reviews</NavLink>
                  </h3>
                  <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                    <NavLink to="/givenReviews">Given Reviews</NavLink>
                  </h3>
                </div>
              </div>
              <br />
              <p className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                Username: {accountDetails.login}
              </p>
              <p className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                Password: {accountDetails.password}
              </p>
              <h3 className="pt-3 pb-3 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                {" "}
                Contact Information
              </h3>
              <p className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                Website: {accountDetails.website}
              </p>
              <p className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">Email: {accountDetails.contactEmail}</p>
              <p className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">Phone: {accountDetails.contactPhone}</p>
              <br />
              <p className="flex flex-col items-start font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">Company Bio: </p>
              <p className="flex flex-col items-start font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">{accountDetails.companyBio}</p>
            </div>
          </div>
        )}
        {userType === "pilot" && (
          
          <div>
            <h3>Adjungo User ID: {userId}</h3>
            <h3>
              Name: {accountDetails.fname} {accountDetails.lname}{" "}
            </h3>
            <h3>
              <NavLink to="/receivedReviews">
                Rating: {avg.toFixed(2)}/5
              </NavLink>
            </h3>
            <h3>
              <NavLink to="/givenReviews">
                Reviews I've Given other Users
              </NavLink>
            </h3>
            <br />
            <p>
              login: {accountDetails.login} password: {accountDetails.password}
            </p>
            <br />

            <h3>Contact Information</h3>
            <p>
              Email: {accountDetails.contactEmail} Phone:{" "}
              {accountDetails.contactPhone}
            </p>
            <p>Bio: </p>
            <p>{accountDetails.bio}</p>
            <br />
            <p>Part 107 License #: {accountDetails.part107Cert}</p>
            <p>
              Client Type:
              {accountDetails.individual === true && (
                <> Individual / Single Member LLC</>
              )}
              {accountDetails.individual === false && (
                <> LLC or Incorporation</>
              )}
            </p>
          </div>
        )}
        <div className="flex justify-around pt-4 w-3/4">
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-l text- uppercase font-rubik rounded-lg"
            onClick={logout}
          >
            Edit Account
          </button>
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-l text- uppercase font-rubik rounded-lg"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  )
}

export default MyAccount
