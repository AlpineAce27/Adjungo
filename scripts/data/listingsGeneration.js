import { faker } from "@faker-js/faker"
const { date, boolean, datatype, location, lorem, number } = faker
function generateAssignedPilot() {
  // Randomly decide if the value should be null or a number
  const isNull = Math.random() < 0.5 // 50% chance to be null

  if (isNull) {
    return null
  } else {
    // Generate a random number between 1 and 5
    return number.int({ min: 1, max: 5 })
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

//create the listings arrray
const listings = Array.from({ length: 100 }, () => {
  const assignedPilot = generateAssignedPilot()
  const complete = generateCompletionCriteria(assignedPilot)

  return {
    clientId: number.int({ min: 1, max: 5 }),
    assignedPilot: assignedPilot,
    offer: number.float({ min: 50.0, max: 500.0, multipleOf: 0.01 }),
    flightDate: date.betweens({
      from: "2024-01-01T00:00:00Z",
      to: "2025-01-01T00:00:00Z",
      count: 1,
    })[0],
    flightTime: date.anytime(),
    multiday: datatype.boolean(),
    hardwareProvided: datatype.boolean(),
    softwareProvided: datatype.boolean(),
    internetProvided: datatype.boolean(),
    powerProvided: datatype.boolean(),
    description: lorem.paragraph(6),
    highFlying: datatype.boolean(),
    blosFlying: datatype.boolean(),
    payloadDropping: datatype.boolean(),
    hazmatFlying: datatype.boolean(),
    heavyFlying: datatype.boolean(),
    nightFlying: datatype.boolean(),
    crowdFlying: datatype.boolean(),
    flightAddress: location.streetAddress(),
    flightZipcode: location.zipCode(),
    flightRadius: number.float({ min: 1.0, max: 5.0, multipleOf: 0.1 }),
    completed: complete,
  }
})

//console.log(JSON.stringify(listings, null, 4));
const generatedListingData = listings
export default generatedListingData
