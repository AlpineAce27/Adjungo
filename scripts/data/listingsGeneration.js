import { faker } from "@faker-js/faker"
const { date, boolean, datatype, location, lorem, number } = faker
function generateAssignedPilot() {
  // Randomly decide if the value should be null or a number
  const isNull = Math.random() < 0.5 // 50% chance to be null

  if (isNull) {
    return null
  } else {
    // Generate a random number between 1 and 5
    return number.int({ min: 1, max: 20 })
  }
}
function generateCompletionCriteria(pilot) {
  //check if the job has a pilot
  if (pilot) {
    const isComplete = Math.random() < 0.5 //50% chance to be null

    if (isComplete) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function lowOddsOfTrue() {
  const isNull = Math.random() < 0.1
  if(isNull){
    return true
  }
  else return false
}
function highOddsOfTrue() {
  const isNull = Math.random() < 0.9
  if(isNull){
    return true
  }
  else return false
}

function generateLocation() {
  const address = location.streetAddress() + ", " + location.city() +", "+ location.state()
  return address
}

function generateNearbyCoordinates() {
  const rawCoordinates = location.nearbyGPSCoordinate({origin: [40.759, -111.886], radius: 50})
  //console.log(rawCoordinates)
  const coordinates = {"lat": rawCoordinates[0], "lng": rawCoordinates[1]}
  //console.log(coordinates)
  return coordinates
}
//create the listings arrray
const listings = Array.from({ length: 200 }, () => {
  const assignedPilot = generateAssignedPilot()
  const complete = generateCompletionCriteria(assignedPilot)
  
  return {
    clientId: number.int({ min: 1, max: 20 }),
    assignedPilot: assignedPilot,
    offer: number.float({ min: 50.0, max: 500.0, multipleOf: 0.01 }),
    flightDate: date.betweens({
      from: "2024-01-01T00:00:00Z",
      to: "2025-01-01T00:00:00Z",
      count: 1,
    })[0],
    flightTime: "12:30",
    multiday: datatype.boolean(),
    hardwareProvided: datatype.boolean(),
    softwareProvided: datatype.boolean(),
    internetProvided: highOddsOfTrue(),
    powerProvided: highOddsOfTrue(),
    description: lorem.paragraph(6),
    highFlying: lowOddsOfTrue(),
    blosFlying: lowOddsOfTrue(),
    payloadDropping: lowOddsOfTrue(),
    hazmatFlying: false,
    heavyFlying: lowOddsOfTrue(),
    nightFlying: datatype.boolean(),
    crowdFlying: datatype.boolean(),
    flightAddress: generateLocation(),
    flightCoordinates: generateNearbyCoordinates(),
    flightRadius: number.float({ min: 0.1, max: 2.5, multipleOf: 0.1 }),
    completed: complete,
  }
})

//console.log(JSON.stringify(listings, null, 4));
const generatedListingData = listings
//console.log(generatedListingData)
export default generatedListingData
