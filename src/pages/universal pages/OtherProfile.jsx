import { useLoaderData } from "react-router-dom"

function OtherProfile() {
    //take the data from the loader and assign it to the listing variable (this should be an entire listing object)
  //this loader data comes from the loader section of this route in the App.jsx
  const account = useLoaderData()


    return (
        <>
         <p>
                This page should show the profile of a user for inspection of a potential
                partner. This would show the user's name or company, thier bio, their rating,
                and a link to reviews on that pilot/customer. 
                If the person who made this profile chose to make their location, phone number,
                and/or email public, then show those as well.

                You should only be able to access other users profiles if you are logged in. If you
                try to access another users profile without being logged in, you should be sent to the
                login page.
            </p>
        {account.userType === "client" &&
        <>
        <h3>Welcome to the profile page of {account.company}</h3>
        <p>Rating: </p>
        </>
        }
        {account.userType === "pilot" &&
        <>
        <h3>Welcome to the profile page of {account.fname} {account.lname}</h3>
        </>
        }
           
        </>
    )
}

export default OtherProfile