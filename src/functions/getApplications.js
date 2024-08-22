import axios from 'axios'

async function getAppsLoader({params}) {
    const {userType} = params

    let data

    if (userType === "client") {
        await axios.get("/api/applicationsForClient").then((response) => {
           data = response.data
        })
    } else if (userType === "pilot") {
        await axios.get("/api/appliedForJobs").then((response) => {
            data = response.data
        })

    }

    //console.log(data)
    return data
}

export default getAppsLoader