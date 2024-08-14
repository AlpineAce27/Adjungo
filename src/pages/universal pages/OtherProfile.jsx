import { useLoaderData } from "react-router-dom"

function OtherProfile() {
  //take the data from the loader and assign it to the listing variable (this should be an entire listing object)
  //this loader data comes from the loader section of this route in the App.jsx
  const account = useLoaderData()
  console.log(account)
  return (
    <>
      <div>
        {account.userType === "client" && (
          <>
            <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
              Welcome to the profile page for {account.company}
            </h1>
            <div className="pb-5">
              <h3 className="pt-3 pb-0 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                {account.company}
              </h3>
              <h3 className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                {account.individual === true && (
                  <> Individual / Single Member LLC</>
                )}
                {account.individual === false && <> LLC or Incorporation</>}
              </h3>
              <h3 className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                Client ID: {account.clientId}{" "}
              </h3>
            </div>

            <div className="flex items-center">
              <div className="flex">
                <h3 className="pr-2  font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                  Rating:{" "}
                </h3>
                <div>
                  {account.rating < 2 && (
                    <h3 className="text-[#dc2626] font-bold text-[20px]">
                      {account.rating}
                    </h3>
                  )}
                  {account.rating >= 2 && account.rating < 3 && (
                    <h3 className="text-[#ea580c] font-bold text-[20px]">
                      {account.rating}
                    </h3>
                  )}
                  {account.rating >= 3 && account.rating < 4 && (
                    <h3 className="text-[#fbbf24] font-bold text-[20px]">
                      {account.rating}
                    </h3>
                  )}
                  {account.rating >= 4 && account.rating <div 5 && (
                    <h3 className="text-[#84cc16] font-bold text-[20px]">
                      {account.rating}
                    </h3>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {account.userType === "pilot" && (
          <>
            <h1 className="pt-10 pb-10 font-rubik font-medium text-[40px] text-AJGO_DarkSlateGray justify-center">
              Welcome to {account.fname} {account.lname}'s profile
            </h1>
            <div className="pb-5">
              <h3 className="pt-3 pb-0 font-rubik font-medium text-[20px] text-AJGO_DarkSlateGray justify-center">
                {account.fname} {" "} {account.lname}
              </h3>
              <h3 className="font-rubik font-medium text-[15px] text-AJGO_DarkSlateGray justify-center">
                Pilot ID: {account.pilotId}{" "}
              </h3>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default OtherProfile
