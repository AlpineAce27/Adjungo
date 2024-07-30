function PilotSingleListing() {
    return (
        <>
            <h1>Listing #12345</h1>
            <p>
                This page should show a single listing with all of it's details.

                If the listing IS NOT completed:
                There should be an apply button at the bottom, which creates 
                an appilcation by this pilot for the listing.
                If the pilot already has an application for this listing, the button should
                read "retract application" which would effectively delete their application for
                this listing
                
                If the listing IS completed: 
                The fields are all locked, but links to the clients profile should be provided.
            </p>
        </>
    )
}

export default PilotSingleListing