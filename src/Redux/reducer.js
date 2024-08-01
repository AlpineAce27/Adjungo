const initalState = {
    userType: null,
    userId: null}

    function reducer(state = initalState, action) {
        switch (action.type) {
            case "LOGIN":
                return {
                    userType: action.payload.userType,
                    userId: action.payload.userId
                }
            case "LOGOUT":
                return {
                    userType: null,
                    userId: null
                }
            default:
                return state
        }
    }
    export default reducer