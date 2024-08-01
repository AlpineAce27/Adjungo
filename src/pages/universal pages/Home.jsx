
import Header from "../../components/Header"
import Footer from  "../../components/Footer"
import { Outlet } from "react-router-dom"


function Home() {

  return (
    <div id="homePage">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Home
