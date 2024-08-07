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
    if(userType === "client"){
      avg = avg + Number(review.clientRating)
    }
    else if(userType === "pilot"){
      avg = avg + Number(review.pilotRating)
    } 
    //console.log(avg)
  })
  avg = avg / receivedReviews.length
  //console.log(avg)
  return (
    <>
      <h1>My account details</h1>
      <p>
        here the client should be able to view their account details, edit them,
        save them and see their rating. There should also be a button or link
        near the ratings that redirects the user to their reviews page.
      </p>
      {userType === "client" && (
        <div>
          <h3>Adjungo User ID: {userId}</h3>
          <h3>Company: {accountDetails.company}</h3>
          <h3><NavLink to="/receivedReviews">Rating: {avg.toFixed(2)}/5</NavLink></h3>
          <h3><NavLink to="/givenReviews">Reviews I've Given other Users</NavLink></h3>
          <br />
          <p>
            login: {accountDetails.login} password: {accountDetails.password}
          </p>
          <p>website: {accountDetails.website}</p>
          <br />

          <h3>Contact Information</h3>
          <p>
            Email: {accountDetails.contactEmail} Phone:{" "}
            {accountDetails.contactPhone}
          </p>
          <p>Company Bio: </p>
          <p>{accountDetails.companyBio}</p>
          <br />
          <p>
            Client Type:
            {accountDetails.individual === true && (
              <> Individual / Single Member LLC</>
            )}
            {accountDetails.individual === false && <> LLC or Incorporation</>}
          </p>
          
        </div>
      )}
      {userType === "pilot" && (
        <div>
          <h3>Adjungo User ID: {userId}</h3>
          <h3>
            Name: {accountDetails.fname} {accountDetails.lname}{" "}
          </h3>
          <h3><NavLink to="/receivedReviews">Rating: {avg.toFixed(2)}/5</NavLink></h3>
          <h3><NavLink to="/givenReviews">Reviews I've Given other Users</NavLink></h3>
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
            {accountDetails.individual === false && <> LLC or Incorporation</>}
          </p>
          
        </div>
      )}

      <button onClick={logout}>Log Out</button>
    </>
  )
}

export default MyAccount
