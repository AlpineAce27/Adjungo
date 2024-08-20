import Header from "../../components/Header"
import Footer from "../../components/Footer"
import { Outlet } from "react-router-dom"

function Home() {
  return (
    <div id="homePage" className="flex-col justify-between min-h-full">
      <Header />
      <div className="flex">
        <div className="w-[10vw] bg-AJGO_Platnum"></div>
        <div className="flex w-[80vw] min-h-[87vh] justify-center items-start">
          <Outlet />
        </div>
        <div className="w-[10vw] bg-AJGO_Platnum"></div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
