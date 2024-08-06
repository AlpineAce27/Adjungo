import "./App.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom"
import getOneListing from "./functions/getOneListing.js"
//imort universal pages
import Home from "./pages/universal pages/Home.jsx"
import MyAccount from "./pages/universal pages/MyAccount.jsx"
import About from "./pages/universal pages/About.jsx"
import Login from "./pages/universal pages/Login.jsx"
import Register from "./pages/universal pages/Register.jsx"
import Listings from "./pages/universal pages/Listings.jsx"
import ErrorPage from "./pages/universal pages/ErrorPage.jsx"
import Welcome from "./pages/universal pages/Welcome.jsx"
//import client pages
import ClientHome from "./pages/client pages/ClientHome.jsx"
import MyListings from "./pages/client pages/MyListings.jsx"
import ClientApplications from "./pages/client pages/ClientApplications.jsx"
import ClientSingleListing from "./pages/client pages/ClientSingleListing.jsx"
import ClientReviews from "./pages/client pages/ClientReviews.jsx"
import NewListing from "./pages/client pages/NewListing.jsx"
//import pilot pages
import PilotHome from "./pages/pilot pages/PilotHome.jsx"
import PilotAccount from "./pages/pilot pages/PilotAccount.jsx"
import PilotApplications from "./pages/pilot pages/PilotApplications.jsx"
import PilotJobs from "./pages/pilot pages/PilotJobs.jsx"
import PilotJobsApplied from "./pages/pilot pages/PilotJobsApplied.jsx"
import PilotSingleListing from "./pages/pilot pages/PilotSingleListing.jsx"
import PilotReviews from "./pages/pilot pages/PilotReviews.jsx"
import ReceivedReviews from "./pages/client pages/ReceivedReviews.jsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home/>} errorElement={<ErrorPage/>}>
      {/* unauth routes */}
      <Route index element={<Welcome />} />
      <Route path="/myAccount" element={<MyAccount />}/>
      <Route path="/listings" element={<Listings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      <Route path="/receivedReviews" element={<ReceivedReviews />} />
      {/* client routes */}
      <Route path="/clientHome" element={<ClientHome />}/>
      <Route path="/myListings" element={<MyListings />}/>
      <Route path="/clientApplications" element={<ClientApplications />}/>
      <Route path="/clientListing/:listingId" element={<ClientSingleListing/>} loader={getOneListing} />
      <Route path="/clientReviews" element={<ClientReviews />}/>
      <Route path="/newListing" element={<NewListing />}/>
      {/* pilot routes */}
      <Route path="/pilotHome" element={<PilotHome />}/>
      <Route path="/pilotApplications" element={<PilotApplications />}/>
      <Route path="/pilotJobs" element={<PilotJobs />}/>
      <Route path="/pilotJobsApplied" element={<PilotJobsApplied />}/>
      <Route path="/pilotListing/:listingId" element={<PilotSingleListing />} loader={getOneListing}/>
      <Route path="/pilotReviews" element={<PilotReviews />}/>
    </Route>
  )
)

function App() {
  return <RouterProvider router={router} />
}

export default App
