import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"

function Register() {
  const navigate = useNavigate()
  const [accountType, setAccountType] = useState('')

  //Universal properties
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [bio, setBio] = useState('')
  //client properties
  const [company, setCompany] = useState('')
  const [website, setWebsite] = useState('')
  const [individual, setIndividual] = useState('')
  //pilot properties
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [part107, setPart107] = useState('')

  const handleAccountCreation = (e) => {
    e.preventDefault()
    let newAccount = {}
    console.log("handler function hit")
    if (accountType === "client") {
      console.log('if hit')
      newAccount = {
        company: company,
        login: login,
        password: password,
        website: website,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        companyBio: bio,
        individual: individual,
      }
    }
    else if (accountType === "pilot") {
      console.log('else if hit')
      newAccount = {
        fname: fname,
        lname: lname,
        login: login,
        password: password,
        contactEmail: contactEmail,
        contactPhone: contactPhone,
        bio: bio,
        part107Cert: part107,
      }
    }

    axios
      .post(`/api/account/${accountType}`, newAccount)
      .then((res) => {
        console.log('post success hit')
        navigate("/login")
      })
      .catch((err) => {
        console.log('post error', err)
      })
  }
  return (
    <div className="flex flex-col items-center">


      <div className="flex flex-col items-center justify-center w-1/2">
        <div className="flex flex-col items-center w-full">
          <h1 className=" font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">Account Creation</h1>
          <p className="font-rubik text-xl">
            Please select which account type you'd like to create
          </p>
          <br />
          <div className="bg-AJGO_Platnum flex w-full justify-around font-rubik text-xl">
            <div className="flex items-center">
              <input
                className="h-4 w-4"
                onChange={() => setAccountType("client")}
                type="radio"
                id="accountType"
                name="accountType"
              />
              <label className="pl-3" >Client Account</label>
            </div>
            <div className="flex items-center">
              <input
                className="h-4 w-4"
                onChange={() => setAccountType("pilot")}
                type="radio"
                id="accountType"
                name="accountType"
              />
              <label className="pl-3" >Pilot Account</label>
            </div>
          </div>
        </div>



        {accountType === "client" && (
          <div className=" bg-ADJO_Celeste flex flex-col items-start w-full">
            <form className="p-5 font-rubik text-l w-full">
              <div className="pt-1 pb-1">
                <label htmlFor="company">Company Name:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                />
              </div>
              <div className="pt-1 pb-1">
                <label htmlFor="website">Company Website:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  required
                />
                <div className="pt-1 pb-1">
                  <label htmlFor="email">Email:</label>
                  <input
                    className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                    type="text"
                    name="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="pt-1 pb-1">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                    type="text"
                    name="phone"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="pt-1 pb-1">
                  <label htmlFor="login">Username:</label>
                  <input
                    className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                    type="text"
                    name="login"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                    required
                  />
                </div>
                <div className="pt-1 pb-1">
                  <label htmlFor="password">Password:</label>
                  <input
                    className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                    type="text"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="pt-1 pb-1 flex flex-col">
                <label htmlFor="companyBio">Company Bio:</label>
                <textarea
                  className="pl-2 pt-1 pb-1 w-full h-40 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="companyBio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                >
                </textarea>
              </div>
              <div className="pt-1 pb-1">
                <label className="pr-3" htmlFor="individual">
                  Is this Company owned and operated by a single individual?
                </label>
                <input
                  className="h-4 w-4"
                  type="radio"
                  name="individual"
                  checked={individual}
                  onChange={() => setIndividual(true)}
                />
                <label className="pr-5 pl-2" htmlFor="individual">Yes</label>
                <input
                  className="h-4 w-4"
                  type="radio"
                  name="individual"
                  checked={!individual}
                  onChange={() => setIndividual(false)}
                />
                <label className="pl-2" htmlFor="individual">No</label>
              </div>
            </form>
          </div>
        )}
        {accountType === "pilot" && (
          <div className=" bg-ADJO_Celeste flex flex-col items-start w-full">

            <form  className="p-5 font-rubik text-l w-full">
              <div  className="pt-1 pb-1">
                <label htmlFor="fname">Pilot's First Name:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="fname"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  required
                />
              </div>
              <div  className="pt-1 pb-1">
                <label htmlFor="lname">Pilot's Last Name:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="lname"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  required
                />
              </div>
              <div  className="pt-1 pb-1">
                <label htmlFor="part107">Part 107 Registration #:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="part107"
                  value={part107}
                  onChange={(e) => setPart107(e.target.value)}
                  required
                />
              </div>
              <div  className="pt-1 pb-1">
                <label htmlFor="email">Email:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  required
                />
              </div>
              <div  className="pt-1 pb-1">
                <label htmlFor="phone">Phone:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  required
                />
              </div>
              <div  className="pt-1 pb-1">
                <label htmlFor="login">Username:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  required
                />
              </div>
              <div  className="pt-1 pb-1">
                <label htmlFor="password">Password:</label>
                <input
                  className="pl-2 pt-1 pb-1 w-80 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div  className="pt-1 pb-1">
                <label htmlFor="pilotBio">Pilot Bio:</label>
                <textarea
                  className="pl-2 pt-1 pb-1 w-full h-40 rounded-lg ring-2 ring-inset ring-[#9ca3af] focus-within:ring-4 focus-within:ring-inset focus-within:ring-ADJO_Keppel"
                  type="text"
                  name="pilotBio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  required
                >
                </textarea>
              </div>
            </form>
          </div>
        )}
        <br />
        <button
          className="bg-ADJO_Keppel px-8 py-1 text-xl text- uppercase font-rubik rounded-lg"
          onClick={handleAccountCreation}>
          Create My Account
        </button>
      </div>
    </div>
  )
}

export default Register
