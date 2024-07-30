import { useLoaderData } from "react-router-dom"
import { axios } from "../lib/axios.js"

function MyListings() {
    const {listings} = await axios.get('/api/listings')
    {
        const listingsItems = listings.map((listing) => (
            <tr key={listing.id}>
                <td><NavLink to={`/listing/${listing.id}`}>{listing.id}</NavLink></td>
                <td><NavLink to={`/OtherProfile/${listing.clientId}`}>{clientId}</NavLink></td>
                <td>{listing.offer}</td>
                <td>{listing.flightDate}</td>
                <td>{listing.hardwareProvided}</td>
                <td>{listing.softwareProvided}</td>
                <td>{listing.nightFlying}</td>
                <td>{listing.crowdFlying}</td>
            </tr>
        ))
    }
    return (
        <>
            <h1>Welcome to your Listings</h1>
            <p>
                This page should show all of the clients listings in table form where
                they can easily sort by any column header, and click on any listing
                to see more details on it. There should also be a "completed" tab where
                the client can view all of their completed jobs. Each listing should also
                show how many applications it has, with a link to the applications page.
            </p>
            <table>
                <tr>
                    <th>Listing ID</th>
                    <th>Client ID</th>
                    <th>Offer</th>
                    <th>Flight Date</th>
                    <th>Hardware Provided</th>
                    <th>Software Provided</th>
                    <th>Night Flying</th>
                    <th>Crowd Flying</th>
                </tr>
                {listingsItems}
            </table>
        </>
    )
}

export default MyListings