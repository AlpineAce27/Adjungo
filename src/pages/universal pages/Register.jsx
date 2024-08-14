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
    if(accountType === "client"){
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
    else if (accountType === "pilot"){
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
    <>
      <h1>Account Creation</h1>
      <input
        onChange={() => setAccountType("client")}
        type="radio"
        id="accountType"
        name="accountType"
      />
      <label >Client Account</label>
      <input
        onChange={() => setAccountType("pilot")}
        type="radio"
        id="accountType"
        name="accountType"
      />
      <label >Pilot Account</label>
      <p>
        Welcome to the account creation page
      </p>
      {accountType === "client" && (
        <>
          <h1>Creating a client Account</h1>
          <form onSubmit={handleAccountCreation}>
            <label htmlFor="company">Company Name:</label>
            <input
              type="text"
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
            <br />
            <label htmlFor="website">Company Website:</label>
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              required
            />
            <br />
            <label htmlFor="companyBio">Company Bio:</label>
            <input
              type="text"
              name="companyBio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
            <br />
            <label htmlFor="individual">
              Is this Company owned and operated by a single individual?
            </label>
            <input
              type="radio"
              name="individual"
              checked={individual}
              onChange={() => setIndividual(true)}
            />
            <label htmlFor="individual">Yes</label>
            <input
              type="radio"
              name="individual"
              checked={!individual}
              onChange={() => setIndividual(false)}
            />
            <label htmlFor="individual">No</label>
            <br />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <br />
            <label htmlFor="phone">Email:</label>
            <input
              type="text"
              name="phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
            <br />
            <label htmlFor="login">Username:</label>
            <input
              type="text"
              name="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <input type="button" value="Create my Account" className="bg-ADJO_Keppel" onClick={handleAccountCreation}/>
          </form>
        </>
      )}
      {accountType === "pilot" && (
        <>
          <h1>Creating a pilot Account</h1>
          <form onSubmit={handleAccountCreation}>
          <label htmlFor="fname">Pilot's First Name:</label>
            <input
              type="text"
              name="fname"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              required
            />
            <br />
            <label htmlFor="lname">Pilot's Last Name:</label>
            <input
              type="text"
              name="lname"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              required
            />
            <br />
            <label htmlFor="pilotBio">Pilot Bio:</label>
            <input
              type="text"
              name="pilotBio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              required
            />
            <br />
            <label htmlFor="part107">Part 107 Registration #:</label>
            <input
              type="text"
              name="part107"
              value={part107}
              onChange={(e) => setPart107(e.target.value)}
              required
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
            <br />
            <label htmlFor="phone">Phone:</label>
            <input
              type="text"
              name="phone"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              required
            />
            <br />
            <label htmlFor="login">Username:</label>
            <input
              type="text"
              name="login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <input type="button" value="Create my Account" className="bg-ADJO_Keppel" onClick={handleAccountCreation}/>
          </form>
        </>
      )}
    </>
  )
}

export default Register
