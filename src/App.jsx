import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom"
import getOneListing from "./functions/getOneListing.js"
import getAccountDetails from "./functions/getAccountDetails.js"
import getOneReview from "./functions/getOneReview.js"
import paramsPassthrough from "./functions/paramsPassthrough.js"
//imort universal pages
import Home from "./pages/universal pages/Home.jsx"
import MyAccount from "./pages/universal pages/MyAccount.jsx"
import About from "./pages/universal pages/About.jsx"
import Login from "./pages/universal pages/Login.jsx"
import Register from "./pages/universal pages/Register.jsx"
import Listings from "./pages/universal pages/Listings.jsx"
import ErrorPage from "./pages/universal pages/ErrorPage.jsx"
import Welcome from "./pages/universal pages/Welcome.jsx"
import OtherProfile from "./pages/universal pages/OtherProfile.jsx"
import MyCompletedJobs from "./pages/universal pages/MyCompletedJobs.jsx"
import ReceivedReviews from "./pages/universal pages/ReceivedReviews.jsx"
import GivenReviews from "./pages/universal pages/GivenReviews.jsx"
import SingleReview from "./pages/universal pages/SingleReview.jsx"
import CreateReview from "./pages/universal pages/CreateReview.jsx"
import MyJobs from "./pages/universal pages/MyJobs.jsx"
import Homepage from "./pages/universal pages/Homepage.jsx"
import SingleListing from "./pages/universal pages/SingleListing.jsx"

//import client pages
import ClientReviews from "./pages/client pages/ClientReviews.jsx"
import NewListing from "./pages/client pages/NewListing.jsx"
//import pilot pages
import Applications from "./pages/universal pages/Applications.jsx"
import PilotReviews from "./pages/pilot pages/PilotReviews.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
      {/* universal routes */}
      <Route index element={<Welcome />} />
      <Route path="/myAccount" element={<MyAccount />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/homepage" element={<Homepage />} />
      <Route path="/applications" element={<Applications/>}/>

      <Route path="/receivedReviews" element={<ReceivedReviews />} />
      <Route path="/givenReviews" element={<GivenReviews />} />
      <Route
        path="/review/:authorUserType/:reviewId"
        element={<SingleReview />}
        loader={getOneReview}
      />
      <Route
        path="/userProfile/:userType/:userId"
        element={<OtherProfile />}
        loader={getAccountDetails}
      />
      <Route path="/myCompletedJobs" element={<MyCompletedJobs />} />
      <Route
        path="/createReview/:userBeingReviewed"
        element={<CreateReview />}
        loader={paramsPassthrough}
      />
      <Route path="/myJobs" element={<MyJobs />} />

      <Route
        path="/singleListing/:listingId"
        element={<SingleListing />}
        loader={getOneListing}
      />

      {/* client routes */}
      <Route path="/clientApplications" element={<ClientApplications />} />
      <Route path="/clientReviews" element={<ClientReviews />} />
      <Route path="/newListing" element={<NewListing />} />
      {/* pilot routes */}
      <Route path="/pilotReviews" element={<PilotReviews />} />
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
