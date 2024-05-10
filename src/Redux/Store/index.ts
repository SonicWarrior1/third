import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import UserReducer from "../Reducers/userSlice";
import TodoReducer from "../Reducers/todoSlice";


const loggerMiddleware = (storeAPI: { getState: () => any; }) => (next: (arg0: any) => any) => (action: any) => {
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', storeAPI.getState())
    return result
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const RootReducer = combineReducers({ TodoReducer, UserReducer })

const middlewareEnhancer = applyMiddleware(loggerMiddleware)

const persistedReducer = persistReducer(persistConfig, RootReducer)

const store = createStore(persistedReducer, middlewareEnhancer)

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;