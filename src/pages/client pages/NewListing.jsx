function NewListing() {
    return (
        <>
            <h1>Create a New Listing</h1>
            <p>
                This page is one giant form that allows a client to create an entirely
                new listing, if we were redirected here from a "completed" listing, it should
                inherit all of those values, only requiring a new flight date.
                The buttons at the bottom should be "submit", "save draft", and "cancel".
            </p>
        </>
    )
}

export default NewListing