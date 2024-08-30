
import KimballgossRocketLaunch from '../../../public/KimballgossRocketLaunch.jpg'

function About() {
    return (
        <div className="flex flex-col items-center justify-center">

            <h1 className="pt-15 pb-10 font-rubik font-medium text-[50px] text-AJGO_DarkSlateGray justify-center">About Adjungo</h1>
            <div className="flex justify-center pt-10 ">
                
                <div className="flex flex-col items-start w-1/2 pr-10">
                    <h1 className=" font-rubik font-medium text-[30px] text-AJGO_DarkSlateGray justify-start">Intro</h1>
                    <p className=" font-rubik text-AJGO_DarkSlateGray">
                        Adjungo was created by me, Kimball Goss. I graduated from Utah State University with a degree in Drones and UAS
                        where I learned how to build, fly, maintain, and manage all kinds of Drone technologies.
                    </p>
                    <p className=" font-rubik text-AJGO_DarkSlateGray">
                        After I graduated, I couldn't wait to utilize my new skills and fly drones for a living. Come to find out,
                        it's actually difficult to find potential partners! From what I could tell there were two types of companies:
                    </p>
                    <p className=" font-rubik text-AJGO_DarkSlateGray">
                        First, there  are those who are big enough, and do so many drone operations, that they hire their own full-time pilots. These companies
                        don't often need free-lance work, and they are typically pretty happy with where they are at.
                    </p>
                    <p className=" font-rubik text-AJGO_DarkSlateGray"> 
                        Second, there are small companies who are just dipping their toes into drone operation. They have little experience, and their first
                        few drone operations might cause a bad experience because they had too little info. These are the companies Adjungo was built for.
                    </p>
                </div>
                <div className="flex w-[400px] h-auto justify-center items-center">
                    <img className="w-full rounded-3xl"
                        src= {KimballgossRocketLaunch}
                        alt="A photo of Kimball Goss working on his UAS Senior Project for USU"
                    />
                </div>
            </div>
            <div className=" w-5/6 flex flex-col items-start pr-10 pl-10 pt-10 pb-15">
                <h1 className=" font-rubik font-medium text-[30px] text-AJGO_DarkSlateGray justify-start">The Goal of Adjungo</h1>
                <p className=" font-rubik text-AJGO_DarkSlateGray">Adjungo is latin for "joining" or "connecting." My goal in creating Adjungo is to connect small companies and individuals with experienced drone pilots
                    to make sure they both have a good experience with their drone operations! Adjungo assists clients with our listing creation tool which helps
                    potential pilots fully understand the requirements of a job before they accept it.
                </p>
                <p className=" font-rubik text-AJGO_DarkSlateGray pb-20">
                    Adjungo also utilizes a review system to ensure both parties have clarity and feedback in their operations. These reviews get combined into an
                    average rating for every user, helping potential partners understand the quality of pilot or client they are working with.
                </p>
            </div>
        </div>

    )
}

export default About