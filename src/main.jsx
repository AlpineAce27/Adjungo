import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom"
import App from "./App.jsx"
import store from "./Redux/store.js"
//imort universal pages
import Home from "./pages/universal pages/Home.jsx"
import About from "./pages/universal pages/About.jsx"
import Login from "./pages/universal pages/Login.jsx"
import Register from "./pages/universal pages/Register.jsx"
import Listings from "./pages/universal pages/Listings.jsx"
import ErrorPage from "./pages/universal pages/ErrorPage.jsx"
//import client pages
import ClientHome from "./pages/client pages/ClientHome.jsx"
import MyListings from "./pages/client pages/MyListings.jsx"
import ClientAccount from "./pages/client pages/ClientAccount.jsx"
import ClientApplications from "./pages/client pages/ClientApplications.jsx"
import ClientSingleListing from "./pages/client pages/ClientSingleListing.jsx"
import ClientReviews from "./pages/client pages/ClientReviews.jsx"
import NewListing from "./pages/client pages/NewListing.jsx"
//import pilot pages
import PilotHome from "./pages/pilot pages/PilotHome.jsx"
import PilotAccount from "./pages/pilot pages/PilotAccount.jsx"
import PilotApplications from "./pages/pilot pages/PilotApplications.jsx"
import PilotJobs from "./pages/pilot pages/PilotJobs.jsx"
import PilotSingleListing from "./pages/pilot pages/PilotSingleListing.jsx"
import PilotReviews from "./pages/pilot pages/PilotReviews.jsx"
import { Provider } from "react-redux"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>} errorElement={<ErrorPage/>}>
      {/* unauth routes */}
      <Route index element={<Home />} />
      <Route path="/listings" element={<Listings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/register" element={<Register />} />
      {/* client routes */}
      <Route path="/clientHome" element={<ClientHome />}/>
      <Route path="/myListings" element={<MyListings />}/>
      <Route path="/clientAccount" element={<ClientAccount />}/>
      <Route path="/clientApplications" element={<ClientApplications />}/>
      <Route path="/clientListings/:id" element={<ClientSingleListing />} />
      <Route path="/clientReviews" element={<ClientReviews />}/>
      <Route path="/newListing" element={<NewListing />}/>
      {/* pilot routes */}
      <Route path="/pilotHome" element={<PilotHome />}/>
      <Route path="/pilotAccount" element={<PilotAccount />}/>
      <Route path="/pilotApplications" element={<PilotApplications />}/>
      <Route path="/pilotJobs" element={<PilotJobs />}/>
      <Route path="/pilotListings/:id" element={<PilotSingleListing />} />
      <Route path="/pilotReviews" element={<PilotReviews />}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
