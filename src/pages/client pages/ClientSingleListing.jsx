function ClientSingleListing() {
    return (
        <>
            <h1>Listing #12345</h1>
            <p>
                This page should show a single listing with all of it's details.

                If the listing IS NOT completed:
                There should always be a cancel button at the bottom, which would delete the listing.
                If the listing does not have any applications, there should also be an edit 
                button which turns every feild into an editable field and adds a "save changes"
                button and "discard changes" button at the bottom.
                If the listing IS completed: 
                The fields are all locked, but links to the pilots profile should be provided,
                as well as a button that allows the client to create a new new listing based on
                this completed one.
            </p>
        </>
    )
}

export default ClientSingleListing