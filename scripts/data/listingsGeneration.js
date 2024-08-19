import { faker } from '@faker-js/faker';
const { date, boolean, datatype, location, lorem, number } = faker;

const numEntries = 100;

const listings = Array.from({ length: numEntries }, () => ({
    clientId: number.int({min: 1, max: 5}),
    assignedPilot: number.int({min: 1, max: 5}) || null,
    offer: number.float({ min: 50.00, max: 500.00, precision: 0.01 }),
    flightDate: date.betweens({ from: '2024-01-01T00:00:00.000Z', to: '2025-01-01T00:00:00.000Z', count:1 })[0],
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
    flightAddress: `${location.streetAddress()}, ${location.city()}, ${location.state()}}`,
    flightRadius: number.float({ min: 1.0, max: 5.0, precision: 0.1 }),
    completed: datatype.boolean(),
}));

//console.log(JSON.stringify(listings, null, 4));
const generatedListingData=listings
export default generatedListingData