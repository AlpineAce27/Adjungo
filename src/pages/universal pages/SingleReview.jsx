function SingleReview() {

    const [review, setReview] = useState(useLoaderData())
    
    return (
        <>
            <h1>Single Review Page</h1>
            <p>
             This page can show a review given to you, a review you made, or a review made by another user for another user
             </p>
        </>
    )
}

export default SingleReview