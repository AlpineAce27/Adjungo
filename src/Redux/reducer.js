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

    // reducer({ type: "LOGIN", payload: { userType: "client", userId: 1 } }) //log in action
    // reducer({ type: "LOGOUT" }) //log out action
    export default reducer