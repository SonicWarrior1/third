import { createReducer, createSlice } from "@reduxjs/toolkit";
import User from "../../interfaces/user_interface";
import { product } from "../sagas";


const userInitialState: { currentUser: User | undefined, allUser: { [key: string]: User }, products: product[] } = { currentUser: undefined, allUser: {}, products: [] };
// export default function UserReducer(state = userInitialState, action: { type: string, payload: User | undefined | User[]|product[] }) {
//     switch (action.type) {
//         case "users/setCurrentUser": {
//             return {
//                 ...state,
//                 currentUser: action.payload
//             }
//         }
//         case "users/deleteCurrentUser": {
// return {
//     ...state,
//     currentUser: undefined
// }
//         }
// case "users/setAllUsers": {
//     return {
//         ...state,
//         allUser: action.payload
//     }
// }
//         case "users/getProducts":{
// return{
//     ...state,
//     products:action.payload
// }
//         }
//         default:
//             return state;
//     }
// }

// const UserReducer = createReducer(userInitialState, (builder) => {
//     builder.addCase("users/setCurrentUser", (state, action) => {
//         return {
//             ...state,
//             currentUser: action.payload
//         }
//     })
//         .addCase("users/deleteCurrentUser", (state, action) => {
//             return {
//                 ...state,
//                 currentUser: undefined
//             }
//         })
//         .addCase("users/setAllUsers", (state, action) => {
//             return {
//                 ...state,
//                 allUser: action.payload
//             }
//         })
//         .addCase("users/getProducts", (state, action) => {
//             return {
//                 ...state,
//                 products: action.payload
//             }
//         })
//         .addDefaultCase((state, action) => { return state; })
// })

const userSlice = createSlice({
    name: "user",
    initialState: userInitialState,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser = action.payload;
        },
        deleteCurrentUser(state) {
            state.currentUser = undefined;
        },
        setAllUser(state, action) {
            state.allUser = action.payload
        },
        getProducts(state, action) {
            state.products = action.payload
        }
    }
})
// export default UserReducer;
export default userSlice.reducer;
export const { setCurrentUser, deleteCurrentUser, setAllUser, getProducts } = userSlice.actions;