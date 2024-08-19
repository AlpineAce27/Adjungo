import { useSelector } from "react-redux"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
//import { connect } from 'react-redux'
import { BiListUl, BiHomeAlt2, BiLogIn } from "react-icons/bi"
import {
  MdOutlineAssignment,
  MdOutlineAssignmentInd,
  MdAccountCircle,
  MdQuestionMark,
} from "react-icons/md"
import { PiUserList } from "react-icons/pi"

function Header() {
  //grab the usertype property from redux
  let usertype = useSelector((state) => state.userType)
  let navigate = useNavigate()
  //console.log(usertype)
  return (
    <>
      {/*Create a navbar for a user who is not logged in*/}
      {usertype !== "client" && usertype !== "pilot" && (
        <nav className="flex justify-between items-center h-[8vh] bg-ADJO_Celeste pr-10">
          {/*Div for the logo*/}
          <div
            onClick={() => {
              navigate("/")
            }}
            className="w-[15vw] pl-10 "
          >
            <img
              className="object-scale-down"
              src="src\assets\LogoTransparentBG.png"
              alt="Adjungo Logo"
            />
          </div>

          <div className="flex">
            {/*Section for the Home button*/}
            <section
              onClick={() => {
                navigate("/")
              }}
              className="flex w-[150px] items-center hover: cursor-pointer"
            >
              <BiHomeAlt2 size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Home
              </section>
            </section>

            {/*Section for the Listings button*/}
            <section
              onClick={() => {
                navigate("/listings")
              }}
              className="flex w-[160px] items-center hover: cursor-pointer"
            >
              <BiListUl size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Listings
              </section>
            </section>

            {/*Section for the About button*/}
            <section
              onClick={() => {
                navigate("/about")
              }}
              className="flex w-[150px] items-center hover: cursor-pointer"
            >
              <MdQuestionMark size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                About
              </section>
            </section>

            {/*Section for the Login button*/}
            <section
              onClick={() => {
                navigate("/login")
              }}
              className="flex w-[160px] items-center hover: cursor-pointer"
            >
              <BiLogIn size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Login
              </section>
            </section>
          </div>
        </nav>
      )}

      {/*Create a navbar for a user who is logged in as a pilot*/}
      {usertype === "pilot" && (
        <nav className="flex justify-between items-center h-[8vh] bg-ADJO_Celeste pr-10">
          {/*Div for the logo*/}
          <div
            className="w-[15vw] pl-10 "
            onClick={() => {
              navigate("/")
            }}
          >
            <img
              className="object-scale-down"
              src="src\assets\LogoTransparentBG.png"
              alt="Adjungo Logo"
            />
          </div>

          <div className="flex">
            {/*Section for the Home button*/}
            <section
              onClick={() => {
                navigate("/homepage")
              }}
              className="flex w-[150px] items-center hover: cursor-pointer"
            >
              <BiHomeAlt2 size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Home
              </section>
            </section>

            {/*Section for the Listings button*/}
            <section
              onClick={() => {
                navigate("/listings")
              }}
              className="flex w-[160px] items-center hover: cursor-pointer"
            >
              <BiListUl size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Listings
              </section>
            </section>

            {/*Section for the My Jobs button*/}
            <section
              onClick={() => {
                navigate("/myJobs")
              }}
              className="flex w-[160px] items-center hover: cursor-pointer"
            >
              <PiUserList size={30} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                My Jobs
              </section>
            </section>

            {/*Section for the Applied button*/}
            <section
              onClick={() => {
                navigate("/applications")
              }}
              className="flex w-[200px] items-center hover: cursor-pointer"
            >
              <MdOutlineAssignment size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Applications
              </section>
            </section>

            {/*Section for the my Account button*/}
            <section
              onClick={() => {
                navigate("/myAccount")
              }}
              className="flex w-[150px] items-center hover: cursor-pointer pr-5"
            >
              <MdAccountCircle size={25} style={{ color: "#08BFA1" }} />
              <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
                Account
              </section>
            </section>
          </div>
        </nav>
      )}
      {/*Create a navbar for a user who is logged in as a client*/}
      {usertype === "client" && (
        <nav className="flex justify-between items-center h-[8vh] bg-ADJO_Celeste">
          {/*Div for the logo*/}
          <div
            className="w-[15vw] pl-10 "
            onClick={() => {
              navigate("/")
            }}
          >
            <img
              className="object-scale-down"
              src="src\assets\LogoTransparentBG.png"
              alt="Adjungo Logo"
            />
          </div>

          <div className="flex">
          {/*Section for the Home button*/}
          <section
            onClick={() => {
              navigate("/homepage")
            }}
            className="flex w-[140px] items-center hover: cursor-pointer"
          >
            <BiHomeAlt2 size={25} style={{ color: "#08BFA1" }} />
            <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
              Home
            </section>
          </section>

          {/*Section for the Listings button*/}
          <section
            onClick={() => {
              navigate("/listings")
            }}
            className="flex w-[160px] items-center hover: cursor-pointer"
          >
            <BiListUl size={25} style={{ color: "#08BFA1" }} />
            <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
              Listings
            </section>
          </section>

          {/*Section for the My Listings button*/}
          <section
            onClick={() => {
              navigate("/myJobs")
            }}
            className="flex w-[160px] items-center hover: cursor-pointer"
          >
            <PiUserList size={30} style={{ color: "#08BFA1" }} />
            <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
              My Jobs
            </section>
          </section>

          {/*Section for the ClientApplications button*/}
          <section
            onClick={() => {
              navigate("/applications")
            }}
            className="flex w-[200px] items-center hover: cursor-pointer"
          >
            <MdOutlineAssignmentInd size={25} style={{ color: "#08BFA1" }} />
            <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
              Applications
            </section>
          </section>

          {/*Section for the my Account button*/}
          <section
            onClick={() => {
              navigate("/myAccount")
            }}
            className="flex w-[150px] items-center hover: cursor-pointer pr-5"
          >
            <MdAccountCircle size={25} style={{ color: "#08BFA1" }} />
            <section className="pl-2 font-rubik font-medium text-[20px] text-ADJO_Keppel">
              Account
            </section>
          </section>
          </div>

        </nav>
      )}
    </>
  )
}

export default Header
