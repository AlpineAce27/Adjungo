import axios from 'axios'

async function getListings({params}) {
    const {userType} = params

    let data

    if (userType === "client") {
        await axios.get("/api/myListings")
        .then((response) => {
            data = response.data
        })
        .catch((err) => {
           console.log('client err', err)
        })
    } else if (userType === "pilot") {
        await axios.get("/api/myJobs")
            .then((response) => {
                data = response.data
            })
            .catch((err) => {
                console.log('pilot err', err)
            })
    }

    return data
}

export default getListings