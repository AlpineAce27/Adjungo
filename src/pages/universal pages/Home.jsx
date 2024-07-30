import GreenButton from "../../components/GreenButton"
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    return (
        <>
            <h1>Welcome to Adjungo!</h1>
            <p>
                This is the landing page for Adjungo.
                It should show some pictures, a clean layout, and a welcome message.
                a button/link to the login page should be provided near to beginning,
                
            </p>

            <GreenButton text="Log In" onClickFunction={()=>{navigate("/login")}} />

                <p>
                and after scrolling through details a link to the account creation page
                should be provided toward the end of the page.
                </p>

            <GreenButton text="Create an Account" onClickFunction={()=>{navigate("/register")}} />
        </>
    )
}

export default Home