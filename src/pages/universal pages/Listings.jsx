function Listings() {
    return (
        <>
            <h1>Adjungo Listings</h1>
            <p>
                This page should show all of the listings in table form where
                they can easily sort by any column header, and click on any listing
                to see more details on it. The default filter should be by distance/location

                If a user clicks on a listing, we need to be sure they are logged in before
                sending them to the details page. If they are not logged in, we should send
                them to the login page.
            </p>
        </>
    )
}

export default Listings