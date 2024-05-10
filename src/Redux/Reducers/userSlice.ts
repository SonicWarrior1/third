import User from "../../interfaces/user_interface";

const userInitialState: { currentUser: User | undefined, allUser: { [key: string]: User } } = { currentUser: undefined, allUser: {} };
export default function UserReducer(state = userInitialState, action: { type: string, payload: User | undefined | User[] }) {
    switch (action.type) {
        case "users/setCurrentUser": {
            return {
                ...state,
                currentUser: action.payload
            }
        }
        case "users/deleteCurrentUser": {
            return {
                ...state,
                currentUser: undefined
            }
        }
        case "users/setAllUsers": {
            return {
                ...state,
                allUser: action.payload
            }
        }
        default:
            return state;
    }
}
