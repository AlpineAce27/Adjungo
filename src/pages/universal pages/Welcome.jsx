import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import Header from "../../components/Header"
import { MdInfoOutline } from "react-icons/md";
import { LuClipboardCheck } from "react-icons/lu";
import { TbStars, TbFilterSearch } from "react-icons/tb";
import { FaSearchDollar } from "react-icons/fa";

import mitchnielsenDJIDroneshot from '../../public/mitchnielsenDJIDroneshot.jpg';

function Welcome() {
  let userType = useSelector((state) => state.userType)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <main>
      <section className="flex bg-AJGO_White">
        <div className="flex flex-col justify-around items-center w-1/2">
          <div className="flex justify-center">
            <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">
              Welcome to Adjungo!
            </h1>
          </div>
          <div className="flex flex-col items-center pl-20 pr-20 justify-center h-[50%]">
            <p className="font-rubik text-xl pb-5">
              Whether your a solo-pilot with a fresh new 107 card, or a multi-national corporation, Adjungo is here to
              fastrack your partnership with qualified pilots and interested clients.
            </p>
            <p className="font-rubik text-xl">
              Check out our listings page to get an idea of what kinds of Jobs the Adjungo community is doing! Or if you
              want to know more about Adjungo itself, checkout the about page. If you already have an account, go ahead
              and log in!
            </p>
          </div>
          <div className="flex justify-center">
            {(userType === "client" || userType === "pilot") && (
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  navigate("/listings")
                }}>
                View the Current Listings
              </button>
            )}
            {userType !== "client" && userType !== "pilot" && (
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  navigate("/login")
                }}>
                Log In
              </button>
            )}
          </div>
        </div>
        <div className="w-1/2">
          <img
            src={mitchnielsenDJIDroneshot}
            alt="A photo by Mitch Nielsen showing a hovering drone"
          />
        </div>
      </section>
      <section className="flex-col bg-AJGO_Platnum pt-10 pb-10">
        <div className="flex justify-center">
          {(userType === "client" || userType === "pilot") && (
            <div className="flex flex-col items-center">
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  axios.post("/api/logout")
                  dispatch({ type: "LOGOUT" })
                  navigate("/")
                }}>
                Log Out
              </button>
            </div>
          )}
          {userType !== "client" && userType !== "pilot" && (
            <div className="flex flex-col items-center">
              <div className="flex justify-center">
                <p className="font-rubik text-xl ps-5 pb-5">
                  New to Adjungo? Create an account for free and get started!
                </p>
                <br />
              </div>
              <button
                className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
                onClick={() => {
                  navigate("/register")
                }}>
                Create an Account
              </button>
            </div>
          )}
        </div>
      </section>
      <section id="adjungo-details" className="pb-28">
        <div className="flex justify-center py-10">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">
            What does Adjungo provide?
          </h1>
        </div>
        <section className="flex w-full px-10 gap-10 font-rubik">
          <div
            id="clientPros"
            className="flex flex-col w-1/2 justify-center border-4 border-AJGO_Platnum rounded-xl px-10 gap-10 pb-10">
            <h1 className="flex font-medium text-[30px] justify-center pt-4 text-AJGO_DarkSlateGray">Clients</h1>

            <div className="flex border-4 border-AJGO_DarkSlateGray rounded-lg pl-5">
            <section className="flex flex-col w-2/3 gap">
              <h1 className="flex font-medium text-[20px] justify-start pt-4 text-AJGO_DarkSlateGray">
                Job creation aids
              </h1>
              <p className="pb-5">
                Our job creation page helps you create jobs with safety, legality and cost in mind. When you create a
                job, each property is linked to a specific section in ECF Part 107 to help you understand why the
                property exists, and how you can craft your jobs to be safe, legal, and cost effective.
              </p>
            </section>
            <section className="flex w-1/3 items-center justify-center">
            <MdInfoOutline size={100} style={{ color: "283B36" }}/>
            </section>
            </div>

            <div className="flex border-4 border-AJGO_DarkSlateGray rounded-lg pl-5">
            <section className="flex flex-col w-2/3">
              <h1 className="flex font-medium text-[20px] justify-start pt-4 text-AJGO_DarkSlateGray">
                Effective Pilot Filtering
              </h1>
              <p className="pb-5">
                Accepting and denying applications are one-step processes. 
                When you view your applications, 
                you can see a pilots profile, rating, and reviews to ensure you're working with the best partner possible.
                
              </p>
            </section>
            <section className="flex w-1/3 items-center justify-center">
            <TbFilterSearch size={100} style={{ color: "283B36" }}/>
            </section>
            </div>

            <div className="flex border-4 border-AJGO_DarkSlateGray rounded-lg pl-5">
            <section className="flex flex-col w-2/3">
              <h1 className="flex font-medium text-[20px] justify-start pt-4 text-AJGO_DarkSlateGray">
                Pilot Review System
              </h1>
              <p className="pb-5">
                You are allowed to review every single pilot you work with. This means that every pilot you come
                accross will have a history of reviews and ratings by other clients, which means rest assured you're never
                working with a mystery pilot.
              </p>
            </section>
            <section className="flex w-1/3 items-center justify-center">
            <TbStars size={100} style={{ color: "283B36" }}/>
            </section>
            </div>


            
          </div>

          <div
            id="pilot-pros"
            className="flex flex-col w-1/2 justify-center border-4 border-ADJO_Celeste rounded-xl px-10 gap-10 pb-10">
            <h1 className="flex font-medium text-[30px] justify-center pt-4 text-AJGO_DarkSlateGray">Pilots</h1>

            <div className="flex border-4 border-ADJO_Keppel rounded-lg pl-5">
            <section className="flex flex-col w-2/3 gap">
              <h1 className="flex font-medium text-[20px] justify-start pt-4 text-AJGO_DarkSlateGray">
                Effective Job Search
              </h1>
              <p className="pb-5">
                Our listings page utlizes a multitude of filtering and sorting behaviors to help you narrow
                down the hundres of potential options. You can filter by job characteristics, sort by offers,
                client ratings, date, and more. Which means you will never have to spend more than a few seconds looking
                for your next gig.
              </p>
            </section>
            <section className="flex w-1/3 items-center justify-center">
            <FaSearchDollar size={100} style={{ color: "08BFA1" }}/>
            </section>
            </div>

            <div className="flex border-4 border-ADJO_Keppel rounded-lg pl-5">
            <section className="flex flex-col w-2/3">
              <h1 className="flex font-medium text-[20px] justify-start pt-4 text-AJGO_DarkSlateGray">
                Effective Application Management
              </h1>
              <p className="pb-5">
                Apply for a job is as simple as one click. We also provide pilots with a page showing all of their pending applictions,
                which automatically updates, and lets you retract applications at any time.
              </p>
            </section>
            <section className="flex w-1/3 items-center justify-center">
            <LuClipboardCheck size={100} style={{ color: "08BFA1" }}/>
            </section>
            </div>

            <div className="flex border-4 border-ADJO_Keppel rounded-lg pl-5">
            <section className="flex flex-col w-2/3">
              <h1 className="flex font-medium text-[20px] justify-start pt-4 text-AJGO_DarkSlateGray">
                Client Review System
              </h1>
              <p className="pb-5">
                Just like cliens, you too are allowed to review every single client you work with. This means that every client you come
                accross will have a history of reviews and ratings by other pilots, which means rest assured you know who your working for.
              </p>
            </section>
            <section className="flex w-1/3 items-center justify-center">
            <TbStars size={100} style={{ color: "08BFA1" }}/>
            </section>
            </div>


            
          </div>
        </section>
        <div>
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center"></h1>
        </div>
      </section>
    </main>
  )
}

export default Welcome
