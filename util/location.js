import axios from "axios"
console.log(import.meta.env)
//export const API_KEY = import.meta.env.VITE_API_KEY
//export const mapId = import.meta.env.VITE_MAP_ID

export async function getCoordinatesFromAddress(address) {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=AIzaSyAaHN0-rTbSmQ-lZ9iFo_MNKkcCz2fGkFw`)

const data = response.data
let coordinates = {}
if(!data || data.status === 'ZERO_RESULTS') {
    console.log("could not find location at the specified address")
}else{
    coordinates = data.results[0].geometry.location
}
return coordinates
}

