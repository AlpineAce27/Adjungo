import { useNavigate, NavLink } from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import ModalEditAccount from "../../components/ModalEditAccount"

function MyAccount() {
  //grabbing the usertype from redux store
  let userType = useSelector((state) => state.userType)
  let userId = useSelector((state) => state.userId)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [accountDetails, setAccountDetails] = useState({})
  const [showEdit, setShowEdit] = useState(false)


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
      // console.log(response.data)
      setAccountDetails(response.data)
    })
  }, [showEdit])

  const toggleEdit = () => {
    setShowEdit(!showEdit)
  }

  // console.log(accountDetails.ratingCol)
  //calculate the average rating that this user has

  return (
    <>
      <div className="flex flex-col items-center">
        {userType === "client" && (
          <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
            {accountDetails.company}
          </h1>
        )}
        {userType === "pilot" && (
          <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
            {accountDetails.fname} {accountDetails.lname}
          </h1>
        )}

        {!showEdit && <p className="font-rubik text-l pb-5 w-3/4 text-center">
          Here you can view your Account details, your rating, and links to your
          reviews
        </p>}

        {showEdit && <p className="font-rubik text-l pb-5 w-3/4 text-center">
          Edit your account details here
        </p>}

        {showEdit && <ModalEditAccount accountDetails={accountDetails} toggleEdit={() => toggleEdit(false)} showEdit={showEdit} setShowEdit={setShowEdit} />}

        {userType === "client" && !showEdit && (
          <div className="flex flex-col pb-5 w-3/4">
            <div className="flex flex-col">
              <div className="pb-5">
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
                  Client ID: {userId}{" "}
                </h3>
              </div>

              <div className="flex items-center">
                <div className="flex">
                  <h3 className="pr-2  font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                    Rating:{" "}
                  </h3>
                  <div>
                  <h3 className={`font-bold font-rubik text-[20px] text-${accountDetails.ratingCol}`}>{accountDetails.rating}</h3>
                  </div>
                </div>
              </div>

              <div className="flex flex-col pb-5">
                <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                  <NavLink to="/receivedReviews">Recieved Reviews</NavLink>
                </h3>
                <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                  <NavLink to="/givenReviews">Given Reviews</NavLink>
                </h3>
              </div>

              <div>
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
                <p className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                  Email: {accountDetails.contactEmail}
                </p>
                <p className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                  Phone: {accountDetails.contactPhone}
                </p>
                <br />
                <p className="flex flex-col items-start font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">
                  Company Bio:{" "}
                </p>
                <p className="flex flex-col items-start font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">
                  {accountDetails.companyBio}
                </p>
              </div>
            </div>
          </div>
        )}
        {userType === "pilot" && !showEdit && (
          <>
            <div className="flex flex-col pb-5 w-3/4">
              <div className="flex flex-col">
                <div className="pb-5">
                  <h3 className="pt-3 pb-0 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                    Adjungo Pilot
                  </h3>
                  <h3 className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                    Pilot ID: {userId}{" "}
                  </h3>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <h3 className="pr-2  font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                      Rating:{" "}
                    </h3>
                    <h3 className={`font-bold font-rubik text-[20px] text-${accountDetails.ratingCol}`}>{accountDetails.rating}</h3>
                  </div>
                </div>

                <div className="flex flex-col pb-5">
                  <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                    <NavLink to="/receivedReviews">Recieved Reviews</NavLink>
                  </h3>
                  <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                    <NavLink to="/givenReviews">Given Reviews</NavLink>
                  </h3>
                </div>

                <div>
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
                    Email: {accountDetails.contactEmail}
                  </p>
                  <p className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                    Phone: {accountDetails.contactPhone}
                  </p>
                  <br />
                  <p className="flex flex-col items-start font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">
                    Pilot Bio:{" "}
                  </p>
                  <p className="flex flex-col items-start font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">
                    {accountDetails.bio}
                  </p>
                  <br />
                  <p className="flex flex-col items-start font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray">
                    Part 107 Certification #{accountDetails.part107Cert}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {!showEdit && <div className="flex justify-around pt-4 w-3/4 pb-6 ">
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-l text- uppercase font-rubik rounded-lg"
            onClick={toggleEdit}
          >
            Edit Account
          </button>
          <button
            className="bg-ADJO_Keppel px-8 py-1 text-l text- uppercase font-rubik rounded-lg"
            onClick={logout}
          >
            Log Out
          </button>
        </div>}
      </div>
    </>
  )
}

export default MyAccount
