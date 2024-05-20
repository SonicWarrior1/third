import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import UserReducer from "../Reducers/userSlice";
import TodoReducer from "../Reducers/todoSlice";
import createSagaMiddleware from 'redux-saga'
import rootSaga from "../sagas";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { pokemonApi } from "../api/apislice";


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,

}

const RootReducer = combineReducers({ todo: TodoReducer, user: UserReducer, [pokemonApi.reducerPath]: pokemonApi.reducer })

const persistedReducer = persistReducer(persistConfig, RootReducer,)
const sagaMiddleware = createSagaMiddleware()

// const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware))
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(sagaMiddleware).concat(pokemonApi.middleware),
})
sagaMiddleware.run(rootSaga)
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export default store;