import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, NavLink } from "react-router-dom"
import axios from "axios"

const ModalEditAccount = ({accountDetails, toggleEdit, showEdit, setShowEdit}) => {

    // console.log('account details', accountDetails)
    let userType = useSelector((state) => state.userType)
    let userId = useSelector((state) => state.userId)

    // Generic State Values
    const [login, setLogin] = useState(accountDetails.login)
    const [password, setPassword] = useState(accountDetails.password)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [contactEmail, setContactEmail] = useState(accountDetails.contactEmail)
    const [contactPhone, setContactPhone] = useState(accountDetails.contactPhone)

    // Client State Values
    const [company, setCompany] = useState(accountDetails.company)
    const [companyBio, setCompanyBio] = useState(accountDetails.companyBio)
    const [individual, setIndividual] = useState(accountDetails.individual)
    // const [rating, setRating] = useState(accountDetails.rating)
    // const [ratingCol, setRatingCol] = useState(accountDetails.ratingCol)
    const [website, setWebsite] = useState(accountDetails.website)
    // const [] = useState(accountDetails)

    // Pilot State Values
    const [fname, setFname] = useState(accountDetails.fname)
    const [lname, setLname] = useState(accountDetails.lname)
    const [bio, setBio] = useState(accountDetails.bio)
    const [part107Cert, setPart107Cert] = useState(accountDetails.part107Cert)

    const submitChanges = ()  => {
        if(password !== confirmPassword){
            alert('Passwords do not match')
        }else{

            let bodyObj

            if(userType === 'client'){
                bodyObj = {
                    changes: {
                        login,
                        password,
                        company,
                        website,
                        contactEmail,
                        contactPhone,
                        companyBio,
                        individual
                    }
                }
            }else if(userType === 'pilot'){
                console.log('pilot body needed')
                bodyObj = {
                    changes: {
                        bio,
                        contactEmail,
                        contactPhone,
                        fname,
                        lname,
                        login,
                        part107Cert,
                        password
                    }
                }
            }

            axios.put('/api/account', bodyObj)
                .then((res) => {
                    // console.log(res.data)
                    toggleEdit()
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    return (
        <>
            <div className="flex flex-col items-center">

{/* Client conditional render */}
    {userType === "client" && (
        <div className="flex flex-col pb-5 w-[125%]">
            <div className="flex flex-col w-full justify-center">
                <div className="pb-5 w-full flex flex-col">

                    <div className="pt-3 pb-0 font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between w-full ">
                        <p className='w-1/2'>Company Name</p>
                        <input value={company} onChange={(e) => setCompany(e.target.value)} className='border-[1px] w-1/2'/>
                    </div>
                    <br />

                    <div className="font-rubik font-medium text-[15px] w-full text-AJGO_DarkSlateGray flex flex-col justify-between align-middle">
                        <section className='flex justify-between text-center align-middle pb-2'>
                            <p>Company Type</p>
                            {individual === true && (
                                <p className='self-center w-1/2' >Individual/Single Member LLC</p>
                            )}
                            {individual === false && (
                                <p className='self-center w-1/2' >LLC/Incorporation</p>
                            )}
                        </section>

                        <div className='flex w-[100%]'>
                            {individual === true && (
                                    <div className='w-full flex justify-end'>
                                        <button onClick={() => setIndividual(false)} className='self-end text-center flex flex-col w-1/2 border-[1px] bg-ADJO_Keppel px-8 text-xs uppercase font-rubik rounded-lg'>
                                            <p className='self-center'>Switch Company to</p>
                                            <p className='self-center'>LLC/Incorporation</p>
                                        </button>
                                    </div>
                            )}

                            {individual === false && (

                                <div className='w-full flex justify-end'>
                                <button onClick={() => setIndividual(true)} className='self-end flex flex-col w-1/2 border-[1px] bg-ADJO_Keppel px-4 text-xs uppercase font-rubik rounded-lg'>
                                    <p className='self-center'>Switch Company to</p>
                                    <p className='self-center'>Individual/Single Member LLC</p>
                                </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* <h3 className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                        Client ID: {userId}{" "}
                    </h3> */}

                </div>

                {/* <div className="flex items-center">
                    <div className="flex">
                        <h3 className="pr-2  font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                            Rating:{" "}
                        </h3>
                        <div>
                            <h3 className={`font-bold font-rubik text-[20px] text-${ratingCol}`}>{rating}</h3>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col pb-5">
                    <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                        <NavLink to="/receivedReviews">Recieved Reviews</NavLink>
                    </h3>
                    <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                        <NavLink to="/givenReviews">Given Reviews</NavLink>
                    </h3>
                </div> */}

            <div className='text-center'>
                <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                    <p>Username</p>
                    <input value={login} onChange={(e) => setLogin(e.target.value)} className='border-[1px] w-[50%]' />
                </div>

                <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                    <p>Password</p>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='border-[1px] w-[50%]' />
                </div>

                <h3 className="pt-3 pb-3 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray flex justify-between">
                {" "}
                    Contact Information
                </h3>

                <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                    <p>Website</p>
                    <input value={website} onChange={(e) => setWebsite(e.target.value)} className='border-[1px] w-[50%]' />
                </div>

                <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                    <p>Email</p>
                    <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className='border-[1px] w-[50%]' />
                </div>

                <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                    <p>Phone</p>
                    <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className='border-[1px] w-[50%]' />
                </div>
                <br />

                <div className="flex justify-between font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray ">
                    {/* Company Bio:{" "} */}
                    <p>Company Bio</p>
                    <textarea name="" id="" value={companyBio} onChange={(e) => setCompanyBio(e.target.value)} className='border-[1px] w-[50%]'></textarea>
                </div>
                <br />

                <h2 className=''>Re-enter password to confirm changes</h2>
                <br />

                <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                    <p>Confirm Current Password</p>
                    <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='border-[1px] w-[50%]' />
                </div>

            </div>
        </div>
    </div>
    )}

{/* Pilot conditional render */}
    {userType === "pilot" && (
        <div className="flex flex-col pb-5 w-[125%]">

            <div className="flex flex-col">

                <div className="pb-5">
                    <h3 className="pt-3 pb-0 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center text-center">
                    Adjungo Pilot
                    </h3>
                    <h3 className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center text-center">
                    Pilot ID: {userId}{" "}
                    </h3>
                </div>

                {/* <div className="flex items-center">
                    <div className="flex">
                    <h3 className="pr-2  font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                        Rating:{" "}
                    </h3>
                    <h3 className={`font-bold font-rubik text-[20px] text-${accountDetails.ratingCol}`}>{accountDetails.rating}</h3>
                    </div>
                </div>

                <div className="flex flex-col pb-5">
                    <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                    <NavLink to="/receivedReviews">Recieved Reviews</NavLink>
                    </h3>
                    <h3 className="  font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center underline">
                    <NavLink to="/givenReviews">Given Reviews</NavLink>
                    </h3>
                </div> */}

                <div className='text-center'>

                    <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                        <p>First Name</p>
                        <input value={fname} onChange={(e) => setFname(e.target.value)} className='border-[1px] w-[50%]' />
                    </div>

                    <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                        <p>Last Name</p>
                        <input value={lname} onChange={(e) => setLname(e.target.value)} className='border-[1px] w-[50%]' />
                    </div>

                    <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                        <p>Username</p>
                        <input value={login} onChange={(e) => setLogin(e.target.value)} className='border-[1px] w-[50%]' />
                    </div>

                    <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                        <p>Password</p>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} className='border-[1px] w-[50%]' />
                    </div>

                    <h3 className="pt-3 pb-3 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray flex justify-between">
                    {" "}
                        Contact Information
                    </h3>

                    <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                        <p>Email</p>
                        <input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} className='border-[1px] w-[50%]' />
                    </div>

                    <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                        <p>Phone</p>
                        <input value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} className='border-[1px] w-[50%]' />
                    </div>

                    <br />

                    <div className="flex justify-between font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray ">
                        <p>Pilot  Bio</p>
                        <textarea name="" id="" value={bio} onChange={(e) => setBio(e.target.value)} className='border-[1px] w-[50%]'></textarea>
                    </div>

                    <br />

                    <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                        <p>Part 107 Certification #</p>
                        <input value={part107Cert} onChange={(e) => setPart107Cert(e.target.value)} className='border-[1px] w-[50%]' />
                    </div>

                    <br />
                    <h2 className=''>Re-enter password to confirm changes</h2>
                    <br />

                    <div className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray flex justify-between">
                        <p>Confirm Current Password</p>
                        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className='border-[1px] w-[50%]' />
                    </div>

                </div>

            </div>

        </div>
)}

{/* End Pilot Render */}

            <div className="flex justify-around pt-4 w-full pb-6 ">
                <button
                    className="bg-ADJO_Keppel px-8 py-1 text-l text- uppercase font-rubik rounded-lg"
                    onClick={() => setShowEdit(false)}
                >
                    Cancel
                </button>
                <button
                    className="bg-ADJO_Keppel px-8 py-1 text-l text- uppercase font-rubik rounded-lg"
                    onClick={submitChanges}
                >
                    Save Changes
                </button>
            </div>

        </div>
    </>
    )
}

export default ModalEditAccount